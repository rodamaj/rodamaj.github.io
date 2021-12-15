function setElementContent(elementId, newContent) {
  document.getElementById(elementId).innerHTML = newContent;
}

function setChildrenContent(elementId, contentsList) {
  const element = document.getElementById(elementId);
  for (let i = 0; i < element.children.length; i += 1) {
    element.children[i].innerHTML = contentsList[i];
  }
}

function setChildrensFirstChildContent(elementId, contentsList) {
  const element = document.getElementById(elementId);
  for (let i = 0; i < element.children.length; i += 1) {
    element.children[i].firstElementChild.innerHTML = contentsList[i];
  }
}

function clearElementContent(elementId) {
  document.getElementById(elementId).innerHTML = '';
}

function hasElementAttribute(elementId, attributeName) {
  return !!document.getElementById(elementId)?.getAttribute(attributeName);
}

function getElementAttribute(elementId, attributeName) {
  return document.getElementById(elementId)?.getAttribute(attributeName);
}

function setElementAttribute(elementId, attributeName, newAttributeValue) {
  const element = document.getElementById(elementId);
  element.setAttribute(attributeName, newAttributeValue);
}

function setElementOnClickAction(elementId, action) {
  document.getElementById(elementId).onclick = action;
}

function removeElementAttribute(elementId, attributeName) {
  document.getElementById(elementId)?.removeAttribute(attributeName);
}

function setElementStyleProperty(elementId, propertyName, newPropertyValue) {
  const element = document.getElementById(elementId);
  element.style[propertyName] = newPropertyValue;
}

function createElementWithId(tag, id) {
  const newElement = document.createElement(tag);
  newElement.setAttribute('id', id);
  return newElement;
}

function insertElementWithIdAfterElement(referenceElementId, newElementTag, newElementId) {
  const referenceElement = document.getElementById(referenceElementId);
  const newElement = createElementWithId(newElementTag, newElementId);
  referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

function removeElementAfterTimeout(elementId, milliseconds) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }, milliseconds);
}

export {
  setElementContent,
  setChildrenContent,
  setChildrensFirstChildContent,
  clearElementContent,
  hasElementAttribute,
  getElementAttribute,
  setElementAttribute,
  setElementOnClickAction,
  removeElementAttribute,
  setElementStyleProperty,
  createElementWithId,
  insertElementWithIdAfterElement,
  removeElementAfterTimeout,
};
