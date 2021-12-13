function setElementContent(element, newContent) {
  element.innerHTML = newContent;
}

function clearElementContent(element) {
  element.innerHTML = "";
}

export { setElementContent, clearElementContent };
