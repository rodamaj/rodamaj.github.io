import langES from './lang_es.js';
import langEN from './lang_en.js';
import { setElementContent, setChildrenContent, setChildrensFirstChildContent } from '../shared/html-handler.js';

function translateDescription(lang) {
  setElementContent('description-name', lang.descriptionName);
  setElementContent('description-field', lang.descriptionField);
  setElementContent('description-place', lang.descriptionPlace);
}

function translateInterestsTitle(newTitle) {
  setElementContent('interests-title', newTitle);
}

function translateCVLinksTitle(newTitle) {
  setElementContent('cv-links-title', newTitle);
}

function translatePortfolio(lang) {
  setElementContent('portfolio-title', lang.portfolioTitle);
  setElementContent('portfolio-subtitle', lang.portfolioSubtitle);
  setElementContent('portfolio-content', lang.portfolioContent);
}

function translateContact(lang) {
  setElementContent('contact-title', lang.contactTitle);
  setElementContent('contact-subtitle', lang.contactSubtitle);
  setElementContent('contact-form-link', lang.contactFormLink);
  setElementContent('contact-another-option', lang.contactAnotherOption);
  setElementContent('contact-find-me', lang.contactFindMe);
}

function translateStaticElements(lang) {
  translateDescription(lang);

  translateInterestsTitle(lang.interestsTitle);
  translateCVLinksTitle(lang.cvLinksTitle);

  translatePortfolio(lang);
  translateContact(lang);
}

function translateHeaderLinks(newHeaderLinks) {
  setChildrenContent('header-links', newHeaderLinks);
}

function translateInterestsList(newInterests) {
  setChildrenContent('interests-list', newInterests);
}

function translateCVLinksList(newCVLinks) {
  setChildrensFirstChildContent('cv-links-list', newCVLinks);
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
