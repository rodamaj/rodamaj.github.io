import changePageLanguage from './lang/translation.js';
import {
  hasElementAttribute,
  setElementAttribute,
  setElementOnClickAction,
  removeElementAttribute,
  setElementStyleProperty,
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

setElementOnClickAction('copy-email-button', () => {
  navigator.clipboard.writeText('amadorrojasjosue@gmail.com');
});

setElementOnClickAction('contact-form-link', () => {
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
