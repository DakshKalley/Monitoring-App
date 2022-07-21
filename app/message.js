const logit = require('./logit.js');
const mon = require('./monitor.js');
const express = require('express');
const proc = require('child_process');
const { callbackify } = require('util');


const host = '10.0.0.92'
const port = process.env.PORT || 8000;
const app = express();


console.log(mon.getCPUInfo());
console.log(mon.getIP());
console.log(mon.getDNS());
console.log(mon.getDiskUsage());

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/static/cpu', (req, res) => {
  res.send(mon.getCPUInfo());
});

app.get('/static/ip', (req, res) => {
  res.send(mon.getIP());
});

app.get('/static/dns', (req, res) => {
  res.send(mon.getDNS());
});

app.get('/dynamic/disk', (req, res) => {
  runcmd("df -h", (result) => {
                console.log(result);
                res.write(result);
                res.end();
            });
});

app.listen(port, host, () => {
  var msg = (`Server is running on http://${host}:${port}`);
  logit.logme(msg);
  logit.logfs(msg);
});

function runcmd(cmd, callback) {
      const sp = proc.spawn(cmd);
      var result = '';
  
      sp.stdout.on("data", (data) => {
          result += data.toString();
      });
  
      sp.on("close", (code) => {
          return callback(result);
      });
  }