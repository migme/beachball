export function emptyInnerHTML (oldEle) {
  const newEle = oldEle.cloneNode(false)
  newEle.innerHTML = ''
  oldEle.parentNode.replaceChild(newEle, oldEle)
  return newEle
}
