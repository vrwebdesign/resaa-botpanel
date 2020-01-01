export default function({ store, redirect, isClient }) {
  if (process.browser && !localStorage.getItem('auth')) {
    return redirect('/auth')
  }
}
