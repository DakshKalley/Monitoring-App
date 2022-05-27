const os = require('os');
const dns = require('dns');
const { spawn } = require('child_process');
const logit = require('./logit.js');

exports.getCPUInfo = function(){
    var arch = (os.arch());
    for (i=0; i<os.cpus().length; i++){
        return (arch + "\n" + "CPU Core #" + (i+1) + ": " + os.cpus()[i].model);    
    }
}

exports.getIP = function() {
    const network = Object.keys(os.networkInterfaces())[1];
    return ("IP Address: " + os.networkInterfaces()[network][0].address);
}

exports.getDNS = function() {
    return ("DNS: " + dns.getServers()[0]);
}

function getBashOutput(cmd, callback){
    const sp = spawn(cmd);
    var result = "";
    cmd.stdout.on("data", data => {
        result += data.toString();
    });
    cmd.on("close", code => {
        return callback(result);
    });
}

exports.getDiskUsage = function() {
    getBashOutput("df", (result) => {
        return result;
    })
}
