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
const rimraf = require('rimraf');
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
let firstLine = true;
let isOpen = false;

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
            isOpen = true;
            sendToWindow('serialport-isOpen', true);
            console.log("SERIALPORT OPEN");
        });

        parser.on('data', function(data) {
            var time = moment("X");
            var output = { timestamp: time, data: data };
            //saving stream
            if (wstream) {
                output = JSON.stringify(output);
                if (firstLine) {
                    firstLine = false;
                    wstream.write(output);

                } else {
                    wstream.write(",\n" + output);
                }
                sendToWindow('serialport-recorded-bytes', wstream.bytesWritten);
            }

            sendToWindow('serialport-data', data);

        });

        ipcMain.on('serialport-write', (event, output) => {
            port.write(output);
        });

        ipcMain.on('serialport-close', event => {
            isOpen = false;
            port.close();
        });

        port.on('close', function() {
            sendToWindow('serialport-isOpen', false);
        });

    });

    ipcMain.on('serialport-record-on', (event, project) => {
        if (isOpen) {
            console.log("Recording Serial Port");
            console.log(project);

            var directory = project.entryPoint.directory;
            DIRECTORY = directory;
            var wsDir = path.join(directory, "/tmp/");
            firstLine = true;
            if (fs.existsSync(wsDir)) {

            } else {
                fs.mkdirSync(wsDir);
            }

            wsDir = path.join(wsDir, "recorded.json");
            //var wsDir = "out.txt";


            wstream = fs.createWriteStream(wsDir);

            wstream.write('{"recorded":[');
            sendToWindow("serialport-recording");
        } else {
            sendToWindow("serialport-not-recording", "Serialport is not Open, Use side menu to setup the Serial connection");
        }

    });

    ipcMain.on('serialport-record-off', (event) => {
        if (wstream) {
            wstream.write(']}');
            wstream.end();

            console.log(wstream);

            //save file to specific directory
            var fileContent = fs.readFileSync(wstream.path);

            //remove all contents of /tmp/ folder and the delete it
            rimraf(path.dirname(wstream.path), () => {
                //fs.rmdirSync(path.dirname(wstream.path));
            });

            dialog.showSaveDialog({
                    defaultPath: path.join(path.dirname(wstream.path), "/serial_" + moment().format("YYYY_MM_DD_HH_mm_ss") + ".json"),
                    buttonLabel: "save record"
                },

                function(filePath) {
                    if (filePath != null) {
                        fs.writeFile(filePath, fileContent, err => {
                            if (err) sendToWindow("error", err);
                            else {
                                sendToWindow("save-record", filePath);
                            }
                        });

                    }
                }
            );

        }
    });
};



module.exports = serialPortManager;