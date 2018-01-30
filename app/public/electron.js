const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { autoUpdater } = require("electron-updater");

const SerialPort = require("serialport");

let port = null;
const Readline = SerialPort.parsers.Readline;
let parser = new Readline({
    delimiter: "\r\n"
});

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

/*
//MQTT
client.on("connect", function() {
  client.subscribe("presence");
  client.publish("presence", "Hello mqtt");
});

client.on("message", function(topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
*/
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

/*Serial Port Methods*/

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("listSerialPorts", (event, arg) => {
    SerialPort.list((err, ports) => {
        var output = {
            err: err,
            ports: ports
        };

        mainWindow.webContents.send("ports-data", output);
    });
});

ipcMain.on("serialport-open", (event, portName, bauds) => {
    port = new SerialPort(portName, bauds);
    port.pipe(parser);

    mainWindow.webContents.send("serialport-isOpen", port);

    // Open errors will be emitted as an error event
    port.on("error", function(err) {
        mainWindow.webContents.send("serialport-error", err.message);
    });

    port.on("open", function() {
        mainWindow.webContents.send("serialport-isOpen", true);
    });

    parser.on("data", function(data) {
        mainWindow.webContents.send("serialport-data", data);
        //console.log("data Connected", data);
    });

    ipcMain.on("serialport-write", (event, output) => {
        port.write(output);
    });

    ipcMain.on("serialport-close", event => {
        port.close();
    });

    port.on("close", function() {
        mainWindow.webContents.send("serialport-isOpen", false);
    });
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
                    console.log("FILE MANAGEMENT " + event + " ->" + file.path);
                    console.log(file);
                    if (event == "update") {
                        var projectFile = projectLoader.FileToProjectFile(entry, file);
                        if (projectFile)
                            projectLoader.readFile(projectFile.name, projectFile.path, projectFile.type, sendToWindow);
                    } else if (event == "remove") {
                        //remove file
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

//old version only for reference
function loadProjectOld(filePath) {
    mainWindow.webContents.send("clear-environment");
    console.log("loading project from " + filePath);

    fs.readFile(filePath, "utf8", function(err, data) {
        if (err) {
            console.log(err);
            mainWindow.webContents.send("project-select-entry-return", err, null);
        }

        let entry = null;

        try {
            entry = JSON.parse(data);

            var directory = path.dirname(filePath);

            entry.directory = directory;
            mainWindow.webContents.send("project-entry", entry);

            projectEntryPoint = filePath;

            let mainFile = path.join(directory, entry.indexed_files.main);

            //watching the main file
            watchFile("main", mainFile, "main");

            fs.readdir(dataDir, (err, files) => {
                files.forEach(dataFile => {
                    console.log("data " + dataFile);
                    let dataFilePath = path.join(dataDir, dataFile);
                    //vertex shader
                    if (path.extname(dataFile) == ".json") {
                        var name = path.basename(dataFile, ".json");
                        watchFile(name, dataFilePath, "data-file");
                    }
                });
            });

            //watching the shaders files
            let shadersDir = path.join(
                directory,
                entry.indexed_files.shadersDirectory
            );

            fs.readdir(shadersDir, (err, files) => {
                files.forEach(shaderFile => {
                    console.log("shader " + shaderFile);
                    let shaderFilePath = path.join(shadersDir, shaderFile);
                    //vertex shader
                    if (path.extname(shaderFile) == ".vert") {
                        var name = path.basename(shaderFile, ".vert");
                        watchFile(name, shaderFilePath, "vertex-shader");
                    }
                    //fragment shader
                    if (path.extname(shaderFile) == ".frag") {
                        var name = path.basename(shaderFile, ".frag");
                        watchFile(name, shaderFilePath, "fragment-shader");
                    }
                });
            });

            //watching the models files (.obj and .stl)
            let modelsDir = path.join(directory, entry.indexed_files.modelsDirectory);
            fs.readdir(modelsDir, (err, files) => {
                files.forEach(modelFile => {
                    console.log("model " + modelFile);
                    let modelFilePath = path.join(modelsDir, modelFile);
                    //obj model
                    if (path.extname(modelFile) == ".obj") {
                        var name = path.basename(modelFile, ".obj");
                        watchFile(name, modelFilePath, "obj");
                    }
                    //mtl textures
                    if (path.extname(modelFile) == ".mtl") {
                        var name = path.basename(modelFile, ".mtl");
                        watchFile(name, modelFilePath, "mtl");
                    }
                    //.stl models
                    if (path.extname(modelFile) == ".stl") {
                        var name = path.basename(modelFile, ".stl");
                        watchFile(name, modelFilePath, "stl");
                    }
                });
            });
        } catch (err) {
            console.log(err);
            mainWindow.webContents.send("project-select-entry-return", err, null);
        }
    });
}

function watchFile(name, filePath, type) {
    console.log("watching " + name + " file located at \r\n" + filePath);
    ReadFile(name, filePath, type);
    /*
    watch(
        filePath, {
            recursive: false
        },
        function(evt, fileName) {
            ReadFile(name, filePath, type);
        }
    );*/
}

function ReadFile(fileName, filePath, type) {
    console.log("reading file " + fileName + " at " + filePath);
    fs.readFile(filePath, "utf8", function(err, content) {
        if (err) {
            console.log(err);
            mainWindow.webContents.send(
                "file-update",
                type,
                fileName,
                filePath,
                null
            );
        } else mainWindow.webContents.send("file-update", type, fileName, filePath, content);
    });
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
                    var dir = paths[0];
                    console.log("creating new project files from template at " + dir);

                    var template = templates.defaultProject;
                    //project.json
                    CreateFile(dir, "project.json", JSON.stringify(template.project));
                    //main.js
                    CreateFile(dir, "main.js", template.main);

                    //directories
                    template.directories.forEach(function(folder) {
                        CreateFolder(dir, folder);
                    });

                    var newEntry = path.join(dir, "project.json");

                    loadProject(newEntry);
                    mainWindow.webContents.send("new-project");
                    //callback();
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

ipcMain.on("export-react-component", event => {
    console.log("exporting project " + projectEntryPoint);
    if (projectEntryPoint) loadFilesToObject(projectEntryPoint);
    else
        mainWindow.webContents.send(
            "error",
            "You have to save this project before exporting",
            null
        );
});

function loadFilesToObject(entryPoint) {
    fs.readFile(entryPoint, "utf8", function(err, data) {
        if (err) {
            console.log(err);
            mainWindow.webContents.send("error", err, null);
        }

        let entry = null;

        try {
            entry = JSON.parse(data);

            var directory = path.dirname(entryPoint);
            let modelsDir = path.join(directory, entry.indexed_files.modelsDirectory);

            let mainFilePath = path.join(directory, entry.indexed_files.main);
            let mainFileContent = fs.readFileSync(mainFilePath);

            let shadersDir = path.join(
                directory,
                entry.indexed_files.shadersDirectory
            );

            var indexedContent = {
                name: entry.name,
                author: entry.author,
                main: mainFileContent,
                userPreferences: entry.userPreferences,
                shaders: {
                    vertex: {},
                    fragment: {}
                },
                models: {
                    obj: {},
                    mtl: {},
                    stl: {}
                }
            };

            var shaders = fs.readdirSync(shadersDir);
            for (var i in shaders) {
                let shaderFile = shaders[i];
                let shaderFilePath = path.join(shadersDir, shaderFile);
                var shaderContent = fs.readFileSync(shaderFilePath);
                //vertex shader
                let name = null;
                let shaderType = path.extname(shaderFile);

                if (shaderType == ".vert") {
                    name = path.basename(shaderFile, ".vert");
                    indexedContent.shaders.vertex[name.toString()] = shaderContent;
                }
                //fragment shader
                if (shaderType == ".frag") {
                    name = path.basename(shaderFile, ".frag");
                    indexedContent.shaders.vertex[name.toString()] = shaderContent;
                }
            }

            //Loading Model contents
            var models = fs.readdirSync(modelsDir);
            for (var i in models) {
                let modelFile = models[i];
                let modelFilePath = path.join(modelsDir, modelFile);

                var modelContent = fs.readFileSync(modelFilePath);

                let name = null;
                let modelType = path.extname(modelFile);

                //obj model
                if (modelType == ".obj") {
                    name = path.basename(modelFile, ".obj");
                    indexedContent.models.obj[name.toString()] = modelContent;
                }
                //mtl textures
                if (modelType == ".mtl") {
                    name = path.basename(modelFile, ".mtl");
                    indexedContent.models.mtl[name.toString()] = modelContent;
                }
                //.stl models
                if (modelType == ".stl") {
                    name = path.basename(modelFile, ".stl");
                    indexedContent.models.stl[name.toString()] = modelContent;
                }
            }

            mainWindow.webContents.send("export-react-component-loaded");

            dialog.showSaveDialog({
                    defaultPath: "*/" + indexedContent.name.replace(" ", "_") + ".jsx",
                    buttonLabel: "save"
                },
                function(filePath) {
                    const template = templates.ReactComponent;
                    var content = template.replace("$componentName", indexedContent.name);
                    content = content.replace("$author", indexedContent.author);
                    content = content.replace(
                        "$mainCode",
                        indexedContent.mainFileContent
                    );
                    content = content.replace(
                        "$shaders",
                        JSON.stringify(indexedContent.shaders)
                    );

                    content = content.replace(
                        "$models",
                        JSON.stringify(indexedContent.models)
                    );

                    if (filePath) fs.writeFileSync(filePath, content);

                    mainWindow.webContents.send("export-project", filePath);
                }
            );

            return indexedContent;
        } catch (err) {
            console.log(err);
            mainWindow.webContents.send("error", err, null);
        }
    });
}

//console
ipcMain.on('toggle-console', event => {
    mainWindow.webContents.openDevTools();
});