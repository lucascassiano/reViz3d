const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

const fileTypes = {
    MAIN: "main",
    DATA: "data-file",
    VERTEX_SHADER: "vertex-shader",
    FRAGMENT_SHADER: "fragment-shader",
    OBJ: "obj",
    MTL: "mtl",
    STL: "stl"
};

const loadMainFile = (filePath) => {

};

const readFile = (file, event) => {

    console.log("reading file " + file.name + " from " + file.folder);

}

const onFileUpdate = (file, event, mainWindow) => {

}

const loadFromFolder = () => {

}

module.exports = {

};

/*

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
}*/