const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

const exportTemplates = require("./export_templates/index.js");
const moment = require('moment');
const projectTemplates = require("./project_templates/index.js");
const reviz_version = require('project-version');

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
    let imagesDirectory = path.join(directory, project.indexed_files.imagesDirectory);

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



const loadFilesToObject = (project, callback) => {
    console.log("LOADING PROJECT FROM -> ENTRY POINT");

    let entryPoint = project.entryPoint;

    console.log(entryPoint.directory);

    try {
        //entry = JSON.parse(data);

        var directory = entryPoint.directory; //path.dirname(entryPoint);

        //directories
        let shadersDir = path.join(directory, entryPoint.indexed_files.shadersDirectory);
        let modelsDir = path.join(directory, entryPoint.indexed_files.modelsDirectory);
        let dataDirectory = path.join(directory, entryPoint.indexed_files.dataDirectory);
        let imagesDirectory = path.join(directory, entryPoint.indexed_files.imagesDirectory);

        //main file
        let mainFilePath = path.join(directory, entryPoint.indexed_files.main);
        let mainFileContent = fs.readFileSync(mainFilePath);

        var indexedContent = {
            name: entryPoint.name,
            author: entryPoint.author,
            main: mainFileContent,
            userPreferences: entryPoint.userPreferences,
            shaders: {
                vertex: {},
                fragment: {}
            },
            models: {
                obj: {},
                mtl: {},
                stl: {}
            },
            datasets: {},
            images: {
                png: {},
                svg: {}
            }
        };

        var shaders = fs.readdirSync(shadersDir);

        for (var i in shaders) {
            let shaderFile = shaders[i];
            let shaderFilePath = path.join(shadersDir, shaderFile);
            var shaderContent = fs.readFileSync(shaderFilePath, 'UTF-8');
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

            var modelContent = fs.readFileSync(modelFilePath, 'UTF-8');

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

        //Loading Model contents
        var datasets = fs.readdirSync(dataDirectory);

        for (var i in datasets) {

            let dataFile = datasets[i];
            let dataFilePath = path.join(dataDirectory, dataFile);

            var dataContent = fs.readFileSync(dataFilePath, 'UTF-8');

            let name = null;
            let dataType = path.extname(dataFile);

            if (dataType == ".json") {
                name = path.basename(dataFile, ".json");
                indexedContent.datasets[name.toString()] = dataContent;
            }

        }

        //loading images

        var images = fs.readdirSync(imagesDirectory);

        for (var i in images) {

            let imageFile = images[i];
            let imageFilePath = path.join(imagesDirectory, imageFile);

            var imageContent = fs.readFileSync(imageFilePath, 'base64');

            let name = null;
            let imageType = path.extname(imageFile);

            if (imageType == ".png") {
                name = path.basename(imageFile, ".png");
                indexedContent.images.png[name.toString()] = imageContent;
            }

        }

        callback("export-react-component-loaded");

        dialog.showSaveDialog({
                defaultPath: "*/" + project.name.replace(" ", "_") + ".jsx",
                buttonLabel: "Save React Component"
            },
            function(filePath) {
                CreateReactComponent(project, indexedContent, filePath, callback);
            }
        );

        return indexedContent;
    } catch (err) {
        console.log(err);
        callback("error", err, null);
    }


};

const CreateReactComponent = (project, indexedContent, filePath, callback) => {
    const template = exportTemplates.ReactComponent;
    var content = template.replace("$component_name", project.componentName);

    content = content.replace("$component_name", project.componentName);
    content = content.replace("$name", project.name);
    content = content.replace("$author", indexedContent.author);
    content = content.replace("$date", moment().format('MMMM Do YYYY, h:mm:ss a'));
    content = content.replace("$reviz_version", reviz_version);
    content = content.replace("$background", "#FFF");

    content = content.replace(
        "$main_code",
        project.mainCode
    );

    //console.log("INDEXED CONTENT");
    //console.log(indexedContent);

    let bundle = {
        shaders: indexedContent.shaders,
        models: indexedContent.models,
        datasets: indexedContent.datasets,
        images: indexedContent.images
    };

    if (filePath) {
        //creating .jsx file
        fs.writeFileSync(filePath, content);
        //creating bundle.json file
        fs.writeFileSync(filePath.replace(".jsx", ".json"), JSON.stringify(bundle));
    }

    callback("export-project", filePath);
}

const createProject = async(projectPath, loadProject, callback, index = 0) => {

    console.log("creating new project files from template at " + projectPath);

    var template = projectTemplates.BasicProject;
    var entry = template.entryPoint;

    entry.creation_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    entry.author = "author";

    //project.json
    await CreateFile(projectPath, "project.json", JSON.stringify(entry), callback);

    //creating folders
    for (var i = 0; i < template.directories.length; i++) {
        var folder = template.directories[i];
        await CreateFolder(projectPath, folder, callback);
    }

    //creating files
    for (var i = 0; i < template.files.length; i++) {
        var file = template.files[i];
        var directory = path.join(projectPath, file.directory);
        await CreateFile(directory, file.name, file.content, callback);
    }

    var newEntry = path.join(projectPath, "project.json");

    console.log("loading project...");
    loadProject(newEntry);

    callback("new-project");
}

const CreateFile = (fileDirectory, fileName, fileContent, callback) => {
    var filePath = path.join(fileDirectory, fileName);
    try {
        fs.writeFileSync(filePath, fileContent);
    } catch (err) {
        console.error(err);
        callback("error", err, null);
    }
}

const CreateFolder = (folderDirectory, name, callback) => {
    return new Promise(
        (resolve, reject) => {
            var folderPath = path.join(folderDirectory, name);
            console.log("creating folder-> " + folderPath);
            try {
                fs.mkdir(folderPath, function() {
                    resolve();
                });
            } catch (err) {
                reject();
                console.log("error");
                console.error(err);
                callback("error", err, null);
            }
        }
    );

}


module.exports = {
    loadProject: loadProject,
    readFile: readFile,
    FileToProjectFile: FileToProjectFile,
    loadFilesToObject: loadFilesToObject,
    createProject: createProject
};