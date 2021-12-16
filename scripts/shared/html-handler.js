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

function setElementContentAfterTimeout(elementId, newContent, milliseconds, then) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    element.innerHTML = newContent;
    if (then) then();
  }, milliseconds);
}

function removeElementAfterTimeout(elementId, milliseconds, then) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    if (then) then();
  }, milliseconds);
}

function addClassToElement(elementId, newClass) {
  const element = document.getElementById(elementId);
  element.classList.add(newClass);
}

function removeClassFromElement(elementId, classToRemove) {
  const element = document.getElementById(elementId);
  element.classList.remove(classToRemove);
}

function removeClassFromElementAfterTimeout(elementId, classToRemove, milliseconds, then) {
  setTimeout(() => {
    removeClassFromElement(elementId, classToRemove);
    if (then) then();
  }, milliseconds);
}

function getElementOnClickAction(elementId) {
  return document.getElementById(elementId)?.onclick;
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
  setElementContentAfterTimeout,
  removeElementAttribute,
  setElementStyleProperty,
  createElementWithId,
  insertElementWithIdAfterElement,
  removeElementAfterTimeout,
  addClassToElement,
  removeClassFromElement,
  removeClassFromElementAfterTimeout,
  getElementOnClickAction,
};
