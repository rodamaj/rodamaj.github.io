import {
  setElementContent,
  clearElementContent,
} from "../shared/html-handler.js";

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

  translatePortfolio(lang);
  translateContact(lang);
}

function translateHeaderLinks(newHeaderLinks) {
  const headerLinks = document.getElementById("header-links");
  for (let i = 0; i < headerLinks.children.length; i++) {
    headerLinks.children[i].innerHTML = newHeaderLinks[i];
  }
}

function translateInterestsList(newInterests) {
  const interestsList = document.getElementById("interests-list");
  for (let i = 0; i < interestsList.children.length; i++) {
    interestsList.children[i].innerHTML = newInterests[i];
  }
}

function translateCVLinksList(newCVLinks) {
  const cvLinksList = document.getElementById("cv-links-list");
  for (let i = 0; i < cvLinksList.children.length; i++) {
    cvLinksList.children[i].firstElementChild.innerHTML = newCVLinks[i];
  }
}

function translatePortfolio(lang) {
  const portfolioTitle = document.getElementById("portfolio-title");
  portfolioTitle.innerHTML = lang.portfolioTitle;
  const portfolioSubtitle = document.getElementById("portfolio-subtitle");
  portfolioSubtitle.innerHTML = lang.portfolioSubtitle;
  const portfolioContent = document.getElementById("portfolio-content");
  portfolioContent.innerHTML = lang.portfolioContent;
}

function translateContact(lang) {
  const contactTitle = document.getElementById("contact-title");
  contactTitle.innerHTML = lang.contactTitle;
  const contactSubtitle = document.getElementById("contact-subtitle");
  contactSubtitle.innerHTML = lang.contactSubtitle;
  const contactContent = document.getElementById("contact-content");
  contactContent.innerHTML = lang.contactContent;
}
