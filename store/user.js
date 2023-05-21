export const state = () => ({
    isAuth: false,
    data: null,
    chosenCourse: null,
    chosenCourseCount: 0
})

export const getters = {
  isAuthenticated(state) {
    return state.isAuth
  },

  user(state) {
    return state.data
  },

  chosenCourse(state) {
    return state.chosenCourse
  }
}

export const mutations = {
  setAuth: (state, value) => {
    state.isAuth = value
  },
  setUserData: (state, data) => {
    state.data = data;
  },
  setChosenCourse: (state, course) => {
    console.log('Choice updated:', course)
    state.chosenCourse = course.code;
    state.chosenCourseCount = course.count;
  }
}

export const actions = {
  syncUser({
    commit
  }, user) {
    commit("setAuth", user !== null);
    if (user) {
      commit("setUserData", {
        email: user.email,
        name: user.displayName
      });
    } else {
      commit("setUserData", null);
    }
  }
}
