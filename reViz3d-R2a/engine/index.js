import { app, BrowserWindow, Menu, MenuItem } from 'electron';
const path = require('path');

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]engine/);
const rootDirectory = path.join(__dirname, "..");
const srcDirectory = path.join(rootDirectory, "./src");
const engineDirectory = path.join(rootDirectory, "./engine");
const appDirectory = path.join(rootDirectory, "./engine/app");

const isDev = require('electron-is-dev');

import SerialPorts from "./sys/SerialPorts";

/*
if (process.env.RELOAD && isDev) {
    require('electron-reload')(engineDirectory); //only changes on engine directory
    console.log('Running in development with Reload');
} else if (isDev) {
    console.log('Running in development without Reload');
}
else {
    console.log('Running in production');
}*/

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        experimentalFeatures: true,
        transparent: true, 
        frame: false
    });

    if (isDev) {
        console.log("🔬Development Mode");
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(`file://${appDirectory}/index.html`);

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

