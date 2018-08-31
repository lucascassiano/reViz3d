import { app, BrowserWindow } from 'electron';
const path = require('path');

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]engine/);
const rootDirectory = path.join(__dirname, "..");
const srcDirectory = path.join(rootDirectory, "./src");
const engineDirectory = path.join(rootDirectory, "./engine");
const appDirectory = path.join(rootDirectory, "./engine/app");

const isDev = require('electron-is-dev');

let enableReload = process.env.RELOAD;
import SerialPorts from "./sys/SerialPorts";

if (enableReload && isDev) {
    require('electron-reload')(engineDirectory); //only changes on engine directory
    console.log('Running in development with Reload');
} else if (isDev) {
    console.log('Running in development without Reload');
}
else {
    console.log('Running in production');
}

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadURL(`file://${appDirectory}/index.html`);

    if (isDev) {
        // await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

