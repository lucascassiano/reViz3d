const BasicProject = {
    entryPoint: {
        name: "new project",
        author: null,
        creation_date: null,
        last_update: null,
        indexed_files: {
            main: "main.js",
            shadersDirectory: "shaders",
            modelsDirectory: "models",
            dataDirectory: "datasets",
            imagesDirectory: "images"
        },
        user_preferences: {
            auto_reload: true,
            background: "white"
        }
    },
    directories: ["datasets", "shaders", "models", "images"],
    files: [{
            name: "main.js",
            directory: "",
            content: `//This method will be called when the Component is Mounted
            Setup = (scene, camera, renderer) => {
    
            }
    
            //Thi method will be called 30 times per second (30FPS)
            Update = (scene, camera, renderer) => {
    
        }
        `
        },
        {
            name: "basic.vert",
            directory: "shaders",
            content: "//basic shader"
        }
    ]
};

module.exports = BasicProject;