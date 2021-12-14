import langES from './lang_es.js';
import langEN from './lang_en.js';
import { setElementContent } from '../shared/html-handler.js';

function translateDescription(lang) {
  const descriptionName = document.getElementById('description-name');
  setElementContent(descriptionName, lang.descriptionName);
  const descriptionField = document.getElementById('description-field');
  setElementContent(descriptionField, lang.descriptionField);
  const descriptionPlace = document.getElementById('description-place');
  setElementContent(descriptionPlace, lang.descriptionPlace);
}

function translateInterestsTitle(newTitle) {
  const interestsTitle = document.getElementById('interests-title');
  setElementContent(interestsTitle, newTitle);
}

function translateCVLinksTitle(newTitle) {
  const cvLinksTitle = document.getElementById('cv-links-title');
  setElementContent(cvLinksTitle, newTitle);
}

function translatePortfolio(lang) {
  const portfolioTitle = document.getElementById('portfolio-title');
  portfolioTitle.innerHTML = lang.portfolioTitle;
  const portfolioSubtitle = document.getElementById('portfolio-subtitle');
  portfolioSubtitle.innerHTML = lang.portfolioSubtitle;
  const portfolioContent = document.getElementById('portfolio-content');
  portfolioContent.innerHTML = lang.portfolioContent;
}

function translateContact(lang) {
  const contactTitle = document.getElementById('contact-title');
  contactTitle.innerHTML = lang.contactTitle;
  const contactSubtitle = document.getElementById('contact-subtitle');
  contactSubtitle.innerHTML = lang.contactSubtitle;
  const contactContent = document.getElementById('contact-content');
  contactContent.innerHTML = lang.contactContent;
}

function translateStaticElements(lang) {
  translateDescription(lang);

  translateInterestsTitle(lang.interestsTitle);
  translateCVLinksTitle(lang.cvLinksTitle);

  translatePortfolio(lang);
  translateContact(lang);
}

function translateHeaderLinks(newHeaderLinks) {
  const headerLinks = document.getElementById('header-links');
  for (let i = 0; i < headerLinks.children.length; i += 1) {
    headerLinks.children[i].innerHTML = newHeaderLinks[i];
  }
}

function translateInterestsList(newInterests) {
  const interestsList = document.getElementById('interests-list');
  for (let i = 0; i < interestsList.children.length; i += 1) {
    interestsList.children[i].innerHTML = newInterests[i];
  }
}

function translateCVLinksList(newCVLinks) {
  const cvLinksList = document.getElementById('cv-links-list');
  for (let i = 0; i < cvLinksList.children.length; i += 1) {
    cvLinksList.children[i].firstElementChild.innerHTML = newCVLinks[i];
  }
}

function getLanguageObject(langAbbv) {
  if (langAbbv === 'es' || langAbbv === 'ES') return langES;
  if (langAbbv === 'en' || langAbbv === 'EN') return langEN;

  throw new Error('Language not supported');
}

function storeLanguageSelection(langAbbv) {
  window.localStorage.setItem('lang', langAbbv);
}

export default function changePageLanguage(langAbbv) {
  const lang = getLanguageObject(langAbbv);

  translateStaticElements(lang);
  translateHeaderLinks(lang.headerLinks);
  translateInterestsList(lang.interests);
  translateCVLinksList(lang.cvLinks);

  storeLanguageSelection(lang.abbreviation);
}
