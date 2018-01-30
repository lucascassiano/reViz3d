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

const reqTypes = {
    PORTS_LIST: 'ports-data'
};

let port = null;
let parser = new Readline({
    delimiter: '\r\n'
});

const serialPortManager = function(sendToWindow) {

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
        port = new SerialPort(portName, bauds);
        port.pipe(parser);

        // Open errors will be emitted as an error event
        port.on('error', function(err) {
            sendToWindow('serialport-error', err.message);
        });

        port.on('open', function() {
            sendToWindow('serialport-isOpen', true);
        });

        parser.on('data', function(data) {
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
};

module.exports = serialPortManager;