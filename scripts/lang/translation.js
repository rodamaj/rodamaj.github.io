import { setElementContent, clearElementContent } from "../shared/html-handler.js";

export function changePageLanguage(lang) {
  translateStaticElements(lang);
  translateHeaderLinks(lang.headerLinks);
  translateInterestsList(lang.interests);
  translateCVLinksList(lang.cvLinks);

  window.localStorage.setItem("lang", lang.abbreviation);
}

function translateStaticElements(lang) {
  const descriptionName = document.getElementById("description-name");
  setElementContent(descriptionName, lang.descriptionName);
  const descriptionField = document.getElementById("description-field");
  setElementContent(descriptionField, lang.descriptionField);
  const descriptionPlace = document.getElementById("description-place");
  setElementContent(descriptionPlace, lang.descriptionPlace);

  const interestsTitle = document.getElementById("interests-title");
  setElementContent(interestsTitle, lang.interestsTitle);
  const cvLinksTitle = document.getElementById("cv-links-title");
  setElementContent(cvLinksTitle, lang.cvLinksTitle);
}

function translateHeaderLinks(newHeaderLinks) {
  const headerLinks = document.getElementById("header-links");
  clearElementContent(headerLinks);
  newHeaderLinks.forEach((link) => {
    const a = document.createElement("a");
    a.innerHTML = link;
    headerLinks.appendChild(a);
  });
}

function translateInterestsList(newInterests) {
  const interestsList = document.getElementById("interests-list");
  clearElementContent(interestsList);
  newInterests.forEach((interest) => {
    const li = document.createElement("li");
    li.innerHTML = interest;
    interestsList.appendChild(li);
  });
}

function translateCVLinksList(newCVLinks) {
  const cvLinksList = document.getElementById("cv-links-list");
  for (let i = 0; i < cvLinksList.children.length; i++) {
    cvLinksList.children[i].firstElementChild.innerHTML = newCVLinks[i];
  }
}
