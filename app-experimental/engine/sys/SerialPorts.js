const SerialPort = require('serialport');

SerialPort.list((err, ports) => {
    var output = {
        err: err,
        ports: ports
    };
    console.log("PORTS", output);
});
