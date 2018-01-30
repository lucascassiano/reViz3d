const watch = require('node-watch');
const path = require("path");

const watchFolder = (directoryPath, callback) => {
    console.log("INIT FILE MANAGEMENT " + directoryPath);
    watch(directoryPath, { recursive: true }, function(evt, fileName) {
        var filePath = fileName; //path.join(directoryPath, fileName);
        var fileFolder = path.basename(path.dirname(filePath));
        var fileExtension = path.extname(fileName);
        var name = path.basename(fileName, fileExtension);
        var folderPath = path.dirname(filePath);
        var file = {
            name: name,
            folder: fileFolder,
            folderPath: folderPath,
            path: filePath,
            extension: fileExtension
        };

        callback(file, evt);
    });
}

module.exports = {
    watchFolder
}