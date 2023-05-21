
export default function ({ store, redirect }) {
    if (!store.state.user.chosenCourse) {
      return redirect('/dashboard')
    }
  }