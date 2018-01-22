const initialState = {
  name: "new project",
  author: null,
  creationDate: null,
  projectPath: null,
  mainCode: null,
  entryPoint: null,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECT_NAME":
      var newState = Object.assign({}, state);
      newState.name = action.name;
      return newState;
    case "SET_PROJECT": {
      //basically it's redefining the state
      //state = action.project;
      var newProject = Object.assign({}, state, action.project);
      return newProject;
    }
    case "GET_PROJECT": {
      return state;
    }
    default:
      return state;
  }
};
