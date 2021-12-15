import changePageLanguage from './lang/translation.js';
import {
  hasElementAttribute,
  setElementAttribute,
  setElementOnClickAction,
  removeElementAttribute,
  setElementStyleProperty,
  insertElementWithIdAfterElement,
  setElementContent,
  removeElementAfterTimeout,
} from './shared/html-handler.js';

function toggleLink(oldLinkId, newLinkId, action) {
  if (!hasElementAttribute(newLinkId, 'href')) {
    removeElementAttribute(oldLinkId, 'href');
    setElementStyleProperty(oldLinkId, 'fontWeight', '600');
    setElementAttribute(newLinkId, 'href', '');
    setElementStyleProperty(newLinkId, 'fontWeight', '500');
    action();
  }
}

window.onpageshow = () => {
  if (window.localStorage.getItem('lang') === 'en') {
    toggleLink('english-link', 'spanish-link', () => {
      changePageLanguage('en');
    });
  }
};

function showCopiedEmailFeedback(afterElementId) {
  const feedbackId = 'copied-email-feedback';
  insertElementWithIdAfterElement(afterElementId, 'p', feedbackId);

  setElementContent(feedbackId, window.localStorage.getItem('lang') === 'en' ? 'Copied!' : '¡Copiado!');
  setElementStyleProperty(feedbackId, 'color', '#6e6e73');
  setElementStyleProperty(feedbackId, 'fontSize', '0.875rem');
  setElementStyleProperty(feedbackId, 'margin', '0 1em');
  setElementStyleProperty(feedbackId, 'animation', 'fade 2s');
  setElementStyleProperty(feedbackId, 'animation-fill-mode', 'forwards');

  removeElementAfterTimeout('copied-email-feedback', 2000);
}

setElementOnClickAction('copy-email-button', () => {
  navigator.clipboard.writeText('amadorrojasjosue@gmail.com');
  showCopiedEmailFeedback('copy-email-button');
});

setElementOnClickAction('contact-form-link', () => {
  // TODO
  // eslint-disable-next-line no-alert
  alert('El contacto a través del sitio web está en construcción. Por favor, contactame a través de correo electrónico. Disculpá las molestias.');
});

setElementOnClickAction('english-link', () => {
  toggleLink('english-link', 'spanish-link', () => {
    changePageLanguage('en');
  });
});

setElementOnClickAction('spanish-link', () => {
  toggleLink('spanish-link', 'english-link', () => {
    changePageLanguage('es');
  });
});
