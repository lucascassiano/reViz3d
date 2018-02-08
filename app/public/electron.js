const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { autoUpdater } = require("electron-updater");


let port = null;


let watch = require("node-watch");
const fs = require("fs");

let mainWindow;
//const mqtt = require("mqtt");
//var client = mqtt.connect("mqtt://test.mosquitto.org");

/*File Watch Methods*/

let filePath = null;

let projectEntryPoint = null;

const templates = require("./sys/templates");
const fileManagement = require("./sys/fileManagement");
const projectLoader = require("./sys/projectLoader");
const serialPortManager = require("./sys/serialPort");
const MqttManagement = require("./sys/mqttManagement");

let mqttManager;

var sendToWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        titleBarStyle: "hidden"
    });
    mainWindow.loadURL(
        isDev ?
        "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`
    ); // load the react app
    mainWindow.on("closed", () => (mainWindow = null));

    mainWindow.webContents.send("ready");

    sendToWindow = (...args) => {
        mainWindow.webContents.send(...args);
    }

    sendToWindow = sendToWindow.bind(this);

    /*Serial Port Methods*/

    serialPortManager(sendToWindow);
    mqttManager = new MqttManagement(sendToWindow);

    //mainWindow.webContents.openDevTools();
}


// when the app is loaded create a BrowserWindow and check for updates
app.on("ready", function() {
    createWindow();
    if (!isDev) autoUpdater.checkForUpdates();
});

// on MacOS leave process running also with no windows
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// if there are no windows create one
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on("update-downloaded", info => {
    mainWindow.webContents.send("updateReady");
});

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
});

ipcMain.on("test", (event, echo) => {
    mainWindow.webContents.send("test", echo);
});

/**Sends the entry point file (.json) */
ipcMain.on("project-select-entry", (event, filePath) => {
    console.log("selected entry");
    loadProject(filePath);
});

function loadProject(filePath) {
    console.log('loading project at electron.js from: ' + filePath);
    mainWindow.webContents.send("clear-environment"); //clear 3D editor

    //filePath -> project.json <- project entry
    fs.readFile(filePath, "utf8", function(err, data) {
        if (err) {
            console.log(err);
            mainWindow.webContents.send("project-select-entry-return", err, null);
        } else {
            let entry = null;
            try {
                entry = JSON.parse(data);
                entry.directory = path.dirname(filePath);
                mainWindow.webContents.send("project-entry", entry);

                //Load files from project 
                projectLoader.loadProject(entry, (fileName, filePath, type) => {
                    //send callbacks to main window
                    projectLoader.readFile(fileName, filePath, type, sendToWindow);
                });

                //watch folder for changes
                fileManagement.watchFolder(entry.directory, function(file, event) {
                    var projectFile = projectLoader.FileToProjectFile(entry, file);
                    if (projectFile) {
                        if (event == "update") {
                            projectLoader.readFile(projectFile.name, projectFile.path, projectFile.type, sendToWindow);
                        } else if (event == "remove") {
                            //remove file
                        }
                    }

                });

            } catch (err) {
                console.log(err);
                //project.json is not a valid project
                mainWindow.webContents.send("project-select-entry-return", err, null);
            }
        }

    });

    /*
    //constantly watching files changes
    fileManagement.watchFolder(path.dirname(filePath), function(file, event) {

        console.log("FILE MANAGEMENT " + event + " ->" + file.path);
        console.log(file);

    });
*/
    //projectLoader

}

function CreateFile(fileDirectory, fileName, fileContent) {
    var filePath = path.join(fileDirectory, fileName);
    fs.writeFile(filePath, fileContent, err => {
        if (err) mainWindow.webContents.send("error", err, null);
    });
}

function CreateFolder(folderDirectory, name) {
    var folderPath = path.join(folderDirectory, name);
    fs.mkdir(folderPath, err => {
        if (err) mainWindow.webContents.send("error", err, null);
    });
}

ipcMain.on("new-project", (event) => {
    dialog.showOpenDialog({
            buttonLabel: "Create Experiment",
            properties: ["openDirectory", "createDirectory"]
        },
        function(paths) {
            if (paths)
                if (paths.length) {
                    projectLoader.createProject(paths[0], loadProject.bind(this), sendToWindow, 0); //basic = 0
                }
        }
    );
});

ipcMain.on("open-project", (event, ProjectName) => {
    dialog.showOpenDialog({
            properties: ["openFile"]
        },
        function(filePath) {
            console.log("opening file project ->" + filePath);

            if (filePath != null) {
                loadProject(filePath.toString());
                mainWindow.webContents.send("open-project");
            }
        }
    );
});

ipcMain.on("save-project", (event, project) => {
    dialog.showSaveDialog({
            defaultPath: "*/" + project.name + ".json",
            buttonLabel: "save"
        },
        function(filePath) {
            var fileContent = project.mainCode;
            if (filePath != null) {
                fs.writeFile(filePath, fileContent, err => {
                    if (err) throw mainWindow.webContents.send("error", err);
                });
                mainWindow.webContents.send("save-project", filePath);
            }
        }
    );
});

ipcMain.on("export-react-component", (event, project) => {
    //console.log("exporting project " + projectEntryPoint);
    if (project.entryPoint) {
        console.log("EXPORTING COMPONENT _ BUNDLE FROM : " + project.entryPoint.directory);

        projectLoader.loadFilesToObject(project, sendToWindow);
    } else
        mainWindow.webContents.send(
            "error",
            "You have to save this project before exporting",
            null
        );
});


//console
ipcMain.on('toggle-console', event => {
    mainWindow.webContents.openDevTools();
});

ipcMain.on('toggle-console', event => {
    mainWindow.webContents.openDevTools();
});