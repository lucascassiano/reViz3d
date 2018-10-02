'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _electron = require('electron');

var _SerialPorts = require('./sys/SerialPorts');

var _SerialPorts2 = _interopRequireDefault(_SerialPorts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var mainWindow = void 0;

var isDevMode = process.execPath.match(/[\\/]engine/);
var rootDirectory = path.join(__dirname, "..");
var srcDirectory = path.join(rootDirectory, "./src");
var engineDirectory = path.join(rootDirectory, "./engine");
var appDirectory = path.join(rootDirectory, "./engine/app");

var isDev = require('electron-is-dev');

var enableReload = process.env.RELOAD;


if (enableReload && isDev) {
    require('electron-reload')(engineDirectory); //only changes on engine directory
    console.log('Running in development with Reload');
} else if (isDev) {
    console.log('Running in development without Reload');
} else {
    console.log('Running in production');
}

var createWindow = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        mainWindow = new _electron.BrowserWindow({
                            width: 800,
                            height: 600
                        });

                        mainWindow.loadURL('file://' + appDirectory + '/index.html');

                        if (isDev) {
                            // await installExtension(REACT_DEVELOPER_TOOLS);
                            mainWindow.webContents.openDevTools();
                        }

                        mainWindow.on('closed', function () {
                            mainWindow = null;
                        });

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createWindow() {
        return _ref.apply(this, arguments);
    };
}();

_electron.app.on('ready', createWindow);

_electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        _electron.app.quit();
    }
});

_electron.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});