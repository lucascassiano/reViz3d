const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

const fileTypes = {
    MAIN: 'main',
    DATA: 'data-file',
    VERTEX_SHADER: 'vertex-shader',
    FRAGMENT_SHADER: 'fragment-shader',
    OBJ: 'obj',
    /*future implementation*/
    MTL: 'mtl',
    STL: 'stl',
    JS: 'js',
    STYLE: 'css',
    IMAGE_PNG: 'image-png',
    IMAGE_SVG: 'image-svg'
};

/**
 * Loads a Project from a give project entry (.json)
 * @param {*} project Entry (Object parsed from JSON)
 * @param {*} callback - usually from electron window
 */
const loadProject = (project, callback) => {
    //project=project entry
    let directory = project.directory; //main project directory
    let mainFile = path.join(directory, project.indexed_files.main);
    let dataDirectory = path.join(directory, project.indexed_files.dataDirectory);
    let shadersDir = path.join(directory, project.indexed_files.shadersDirectory);
    let modelsDir = path.join(directory, project.indexed_files.modelsDirectory);
    let imagesDir = path.join(directory, project.indexed_files.imagesDirectory);

    console.log('callback');
    //callback = callback.bind(this)
    console.log(callback);

    //Main.js
    callback('main', mainFile, fileTypes.MAIN);

    //Datasets
    fs.readdir(dataDirectory, (err, files) => {
        files.forEach(dataFile => {
            let dataFilePath = path.join(dataDirectory, dataFile);
            //vertex shader
            if (path.extname(dataFile) == '.json') {
                var name = path.basename(dataFile, '.json');
                callback(name, dataFilePath, fileTypes.DATA);
            }
        });
    });

    //Shaders
    fs.readdir(shadersDir, (err, files) => {
        files.forEach(shaderFile => {
            let shaderFilePath = path.join(shadersDir, shaderFile);
            //vertex shader
            if (path.extname(shaderFile) == '.vert') {
                var name = path.basename(shaderFile, '.vert');
                callback(name, shaderFilePath, fileTypes.VERTEX_SHADER);
            }
            //fragment shader
            if (path.extname(shaderFile) == '.frag') {
                var name = path.basename(shaderFile, '.frag');
                callback(name, shaderFilePath, fileTypes.FRAGMENT_SHADER);
            }
        });
    });

    //Models
    fs.readdir(modelsDir, (err, files) => {
        files.forEach(modelFile => {
            console.log('model ' + modelFile);
            let modelFilePath = path.join(modelsDir, modelFile);
            //obj model
            if (path.extname(modelFile) == '.obj') {
                var name = path.basename(modelFile, '.obj');
                callback(name, modelFilePath, fileTypes.OBJ);
            }
            //mtl textures
            if (path.extname(modelFile) == '.mtl') {
                var name = path.basename(modelFile, '.mtl');
                callback(name, modelFilePath, fileTypes.MTL);
            }
            //.stl models
            if (path.extname(modelFile) == '.stl') {
                var name = path.basename(modelFile, '.stl');
                callback(name, modelFilePath, fileTypes.STL);
            }
        });
    });

    //Images (png & svg)
    fs.readdir(imagesDir, (err, files) => {
        files.forEach(imageFile => {
            console.log('image ' + imageFile);
            let imageFilePath = path.join(imagesDir, imageFile);

            //png image
            if (path.extname(imageFile) == '.png') {
                var name = path.basename(imageFile, '.png');
                console.log('PNG ' + imageFilePath);
                callback(name, imageFilePath, fileTypes.IMAGE_PNG);
            }
            //svg image
            if (path.extname(imageFile) == '.svg') {
                var name = path.basename(imageFile, '.svg');
                callback(name, imageFilePath, fileTypes.IMAGE_SVG);
            }
        });
    });

    //Add more Loaders here -> ...
};

function readFile(fileName, filePath, type, callback) {
    if (type == fileTypes.IMAGE_PNG || type == fileTypes.IMAGE_SVG) {
        var data = fs.readFileSync(filePath, 'base64');
        callback('file-update', type, fileName, filePath, data);
    } else
        fs.readFile(filePath, 'utf8', function(err, content) {
            if (err) {
                console.log(err);
                callback('file-update', type, fileName, filePath, null);
            } else callback('file-update', type, fileName, filePath, content);
        });
}

function removeFile(fileName, filePath, type, callback) {
    callback('file-remove', type, fileName, filePath, null);
}

/**
 * Converts File to internal Project file definitions
 * @param {object} project - project entry
 * @param {object} file
 */
function FileToProjectFile(project, file) {
    let directory = project.directory; //main project directory
    let mainFile = path.join(directory, project.indexed_files.main);
    let dataDirectory = path.join(directory, project.indexed_files.dataDirectory);
    let shadersDirectory = path.join(directory, project.indexed_files.shadersDirectory);
    let modelsDirectory = path.join(directory, project.indexed_files.modelsDirectory);

    /*
    ~ProjectFile structure~
    var file = {
            name: name,
            folder: fileFolder,
            path: filePath,
            extension: fileExtension
        };
    */

    //checking files origins and files extensions
    if (file.path == mainFile && file.extension == '.js') {
        file.type = fileTypes.MAIN;
        return file;
    } else if (file.folderPath == dataDirectory && file.extension == '.json') {
        file.type = fileTypes.DATA;
        return file;
    } else if (file.folderPath == shadersDirectory) {
        var type;
        switch (file.extension) {
            /* case ""*/
            case '.vert':
                type = fileTypes.VERTEX_SHADER;
                break;
            case '.frag':
                type = fileTypes.FRAGMENT_SHADER;
                break;
            default:
                return null;
        }

        file.type = type;
        return file;
    } else if (file.folderPath == modelsDirectory) {
        var type;
        switch (file.extension) {
            /* case ""*/
            case '.obj':
                type = fileTypes.OBJ;
                break;

            case '.mtl':
                type = fileTypes.MTL;
                break;

            case '.stl':
                type = fileTypes.STL;
                break;

            default:
                return null;
        }

        file.type = type;
        return file;
    }

    //file is not a valid project file
    return null;
}

const onFileUpdate = (file, event, mainWindow) => {};

const loadFromFolder = () => {};

module.exports = {
    loadProject: loadProject,
    readFile: readFile,
    FileToProjectFile: FileToProjectFile
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