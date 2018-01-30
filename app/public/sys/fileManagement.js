const watch = require('node-watch');
const path = require("path");

const watchFolder = (directoryPath, callback) => {
    console.log("INIT FILE MANAGEMENT " + directoryPath);
    watch(directoryPath, { recursive: true }, function(evt, fileName) {
        var filePath = path.join(directoryPath, fileName);
        var fileFolder = path.basename(path.dirname(filePath));
        var fileExtension = path.extname(fileName);
        var name = path.basename(fileName, fileExtension);

        var file = {
            name: name,
            folder: fileFolder,
            path: filePath,
            extension: fileExtension
        };

        callback(file, evt);
    });
}

module.exports = {
    watchFolder
}