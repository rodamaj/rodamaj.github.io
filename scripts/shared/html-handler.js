function setElementContent(element, newContent) {
  const elementToBeModified = element;
  elementToBeModified.innerHTML = newContent;
}

function clearElementContent(element) {
  const elementToBeCleaned = element;
  elementToBeCleaned.innerHTML = '';
}

export { setElementContent, clearElementContent };
