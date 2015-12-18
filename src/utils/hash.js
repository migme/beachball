export function trim () {
  const location = window.location
  const length = location.href.length - location.hash.length
  const trimmed = location.href.substring(0, length)
  window.history.replaceState(null, null, trimmed)
}
