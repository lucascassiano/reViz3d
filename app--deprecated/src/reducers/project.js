const initialState = {
    name: "new project",
    author: null,
    creationDate: null,
    projectPath: null,
    mainCode: null,
    entryPoint: null,
    renderMap: true,
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
    componentName: "VizComponent"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROJECT_NAME":
            var newState = Object.assign({}, state);
            newState.name = action.name;
            return newState;
        case "SET_PROJECT":
            {
                //basically it's redefining the state
                //state = action.project;
                var newProject = Object.assign({}, state, action.project);
                return newProject;
            }
        case "GET_PROJECT":
            {
                return state;
            }
        case "SET_RENDER_MAP":
            {
                var newState = Object.assign({}, state);
                newState.renderMap = action.renderMap;
                return newState;
            }
        default:
            return state;
    }
};