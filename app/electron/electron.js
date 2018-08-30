//'use strict'; 

const { app, BrowserWindow } = require('electron');
const path = require("path");
//const isDev = require("electron-is-dev");
const mainDir = path.basename(__dirname);
const isDev = require("electron-is-dev");
//const __parentDir = path.dirname(module.parent.filename);

if (isDev && !process.env.WEBBASED) {
    require('electron-reload')(__dirname);
}

if (isDev) {
   ///const electronHot = require('electron-hot-loader');
    //electronHot.install();
    //electronHot.watchJsx(['../src/**/*.jsx']);
    //electronHot.watchCss(['../src/**/*.css']);
    //require('electron-reload')(__dirname);
    // require('electron-reload')(__dirname);
    console.log("DEVELOP ENV")
}

//require('./index.js');
// Standard stuff
console.log("hi");

app.on('ready', function () {
    let mainWindow = new BrowserWindow({ width: 800, height: 600, frame: true });
    const dirname = __dirname || path.resolve(path.dirname(''));
    const mainDir = path.basename(__dirname);

    if (process.env.WEBBASED) {
        console.log("RUNNING AS WEBBASED");
        mainWindow.loadURL("http://localhost:1234");
    } else {
        console.log("dir name" + path.join(dirname, "../src/index.html"));
        var sourceDir = `file://${path.join(dirname, "../src/index.html")}`;
        var electronDir = `file://${path.join(dirname, "./bundle/index.html")}`
        mainWindow.loadURL(electronDir);
    }

    process.env.NODE_ENV !== 'production' && mainWindow.openDevTools();
}

);