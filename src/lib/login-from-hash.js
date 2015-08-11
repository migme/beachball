export default function getLoginFromHash () {
  return new Promise(resolve => {
    const hash = window.location.hash.substring(1)
    const data = JSON.parse(hash)
    resolve(data.res)
  })
}
