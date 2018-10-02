"use strict";

var SerialPort = require('serialport');

SerialPort.list(function (err, ports) {
    var output = {
        err: err,
        ports: ports
    };
    console.log("PORTS", output);
});