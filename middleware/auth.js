
export default function ({ store, redirect }) {
  if (!store.state.user.isAuth) {
    return redirect('/auth/login')
  }
}