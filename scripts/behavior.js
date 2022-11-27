import changePageLanguage from './lang/translation.js';
import showCopiedEmailFeedback from './copy-email.js';
import {
  hasElementAttribute,
  setElementAttribute,
  setElementOnClickAction,
  setElementOnSubmitAction,
  removeElementAttribute,
  setElementStyleProperty,
} from './shared/html-handler.js';

// * Functions

function toggleLink(oldLinkId, newLinkId, action) {
  if (!hasElementAttribute(newLinkId, 'href')) {
    removeElementAttribute(oldLinkId, 'href');
    setElementStyleProperty(oldLinkId, 'fontWeight', '600');
    setElementAttribute(newLinkId, 'href', '');
    setElementStyleProperty(newLinkId, 'fontWeight', '500');
    action();
  }
}

function copyEmailLink() {
  navigator.clipboard.writeText('bjamadorr@gmail.com');
  showCopiedEmailFeedback();
}

// * Events

window.onpageshow = () => {
  if (window.localStorage.getItem('lang') === 'en') {
    toggleLink('english-link', 'spanish-link', () => {
      changePageLanguage('en');
    });
  }
};

setElementOnClickAction('copy-email-button', () => {
  copyEmailLink();
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
