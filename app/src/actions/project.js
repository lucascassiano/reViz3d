export const setProjectName = name => {
  return {
    type: "SET_PROJECT_NAME",
    name: name
  };
};

export const setProject = project => {
  return {
    type: "SET_PROJECT",
    project: project
  };
};

export const getProject = () => {
  return {
    type: "GET_PROJECT"
  };
};
