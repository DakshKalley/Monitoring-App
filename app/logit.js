//logme function
exports.logme = function (message){
    var dt = new Date(Date.now());
    var ts = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(dt);
    var lt = (ts + "\n" + message + "\n");
    console.log(lt); 
}


//logfs function
const fs = require('fs');
exports.logfs = function (message){    
    var dt = new Date(Date.now());
    var ts = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(dt);
    var lt = (ts + "\n" + message + "\n");
    fs.writeFile('logmsg.log', lt, { flag: 'a+' }, err => {
        if (err){
            console.error(err);
        }
    });
}