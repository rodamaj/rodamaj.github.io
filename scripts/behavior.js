import { language as langES } from "./lang_es.js";
import { language as langEN } from "./lang_en.js";

const englishLink = document.getElementById("english-link");
const spanishLink = document.getElementById("spanish-link");

window.onpageshow = function () {
  if (window.localStorage.getItem("lang") === "en") {
    toggleLink(englishLink, spanishLink, () => {
      changePageLanguage(langEN);
    });
  }
};

englishLink.onclick = function () {
  toggleLink(englishLink, spanishLink, () => {
    changePageLanguage(langEN);
  });
};

spanishLink.onclick = function () {
  toggleLink(spanishLink, englishLink, () => {
    changePageLanguage(langES);
  });
};

function changePageLanguage(lang) {
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
  clearElementContent(cvLinksList);
  newCVLinks.forEach((link) => {
    const li = document.createElement("li");
    li.setAttribute("id", link.id);
    const a = document.createElement("a");
    a.innerHTML = link.text;
    a.setAttribute("href", link.href);
    li.appendChild(a);
    cvLinksList.appendChild(li);
  });
}

function setElementContent(element, newContent) {
  element.innerHTML = newContent;
}

function clearElementContent(element) {
  element.innerHTML = "";
}

function toggleLink(clickedLink, newClickableLink, callback) {
  if (newClickableLink.getAttribute("href") == null) {
    clickedLink.removeAttribute("href");
    clickedLink.style.fontWeight = "bold";
    newClickableLink.setAttribute("href", "");
    newClickableLink.style.fontWeight = "normal";
    callback();
  }
}
