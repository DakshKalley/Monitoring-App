const os = require('os');
const dns = require('dns');
const proc = require('child_process');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/osmonitor/freemem', (req, res) => {
    runcmd("vm_stat", (result) => {
        console.log(result);
        res.write(result);
        res.end();
    });
});

app.get('/osmonitor/iostat', (req, res) => {
    runcmd("iostat", (result) => {
        console.log(result);
        res.write(result);
        res.end();
    });
});

app.get('/static/ip', (req, res) => {
    const network = Object.keys(os.networkInterfaces())[1];
    result = ("IP Address: " + os.networkInterfaces()[network][0].address);
    console.log(result);
    res.write(result);
    res.end();
});

app.get('/static/dns', (req, res) => {
    result = ("DNS: " + dns.getServers()[0]);
    console.log(result);
    res.write(result);
    res.end();
});

app.get('/static/cpu', (req, res) => {
    result = "";
    var arch = (os.arch());
    for (i=0; i<os.cpus().length; i++){
        result += (arch + "\n" + "CPU Core #" + (i+1) + ": " + os.cpus()[i].model);    
    }
    console.log(result);
    res.write(result);
    res.end();
});

app.get('/osmonitor/disk', (req, res) => {
    runcmd("df", (result) => {
        console.log(result);
        res.write(result);
        res.end();
    });
});



//const host = '10.0.0.92'
const host = 'localhost'
const port = process.env.PORT || 8000;

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
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