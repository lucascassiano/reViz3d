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
            content: `
/* Basic ReViz3d project
check http://lucascassiano.github.io/reViz3d/ for documentation
*/

var cube;
var t=0;
//This method will be called when the Component is Mounted
Setup = (scene, camera, renderer) => {
    cube = new Cube();
    scene.add(cube);
}
    
//Thi method will be called 30 times per second (30FPS)
Update = (scene, camera, renderer) => {
    cube.position.y = 5*Math.sin(t);
    t+=1.0/30;
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