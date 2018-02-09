/**
 * serialPortManager
 * 
 * This scripts manages the calls and callbacks from ipcMain to mainWindow renderer - 
 * related to SerialPort calls
 * 
 */
const { ipcMain, dialog } = require('electron');
const path = require('path');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const fs = require('fs');
var wstream = null;

const reqTypes = {
    PORTS_LIST: 'ports-data'
};

let port = null;
let parser = new Readline({
    delimiter: '\r\n'
});
let DIRECTORY;
const moment = require("moment");

const serialPortManager = function(sendToWindow, ) {
    ipcMain.on('listSerialPorts', (event, arg) => {
        SerialPort.list((err, ports) => {
            var output = {
                err: err,
                ports: ports
            };
            sendToWindow(reqTypes.PORTS_LIST, output);
        });
    });

    ipcMain.on('serialport-open', (event, portName, bauds) => {
        port = new SerialPort(portName, {
            baudRate: parseInt(bauds)
        });
        //port.open();
        console.log("new SERIALPORT " + portName + " : " + bauds);
        port.pipe(parser);

        // Open errors will be emitted as an error event
        port.on('error', function(err) {
            sendToWindow('serialport-error', err.message);
        });

        port.on('open', function() {
            sendToWindow('serialport-isOpen', true);
            console.log("SERIALPORT OPEN");
        });

        parser.on('data', function(data) {
            console.log("data");
            console.log(data);
            var time = moment("X");

            var output = { timestamp: time, data: data };
            //saving stream
            if (wstream) {
                output = JSON.stringify(output);
                wstream.write(output + ",\n");
            }


            sendToWindow('serialport-data', data);
        });

        ipcMain.on('serialport-write', (event, output) => {
            port.write(output);
        });

        ipcMain.on('serialport-close', event => {
            port.close();
        });

        port.on('close', function() {
            sendToWindow('serialport-isOpen', false);
        });

    });

    ipcMain.on('serialport-record-on', (event, project) => {

        console.log("Recording Serial Port");
        console.log(project);

        var directory = project.entryPoint.directory;
        var wsDir = path.join(directory, "/tmp/");
        if (fs.existsSync(wsDir)) {

        } else {
            fs.mkdirSync(wsDir);
        }

        wsDir = path.join(wsDir, "recorded.json");
        //var wsDir = "out.txt";


        wstream = fs.createWriteStream(wsDir);

        wstream.write('{"recorded":[');

    });

    ipcMain.on('serialport-record-off', (event) => {
        if (wstream) {
            wstream.write(']}');
            wstream.end();
            console.log(wstream);
        }
    });
};



module.exports = serialPortManager;