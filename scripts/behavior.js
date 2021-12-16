import changePageLanguage from './lang/translation.js';
import {
  hasElementAttribute,
  setElementAttribute,
  setElementOnClickAction,
  removeElementAttribute,
  setElementStyleProperty,
  setElementContent,
  addClassToElement,
  setElementContentAfterTimeout,
  removeClassFromElement,
  removeClassFromElementAfterTimeout,
  getElementOnClickAction,
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

function addCopyFeedbackClasses() {
  addClassToElement('email-link', 'fading-feedback');
  addClassToElement('copy-email-button', 'copied-button');
}

function replaceEmailWithCopyFeedback() {
  setElementContent('email-link', window.localStorage.getItem('lang') === 'en' ? 'Copied!' : '¡Copiado!');
  addCopyFeedbackClasses();
}

function deleteCopyFeedbackClasses() {
  removeClassFromElement('email-link', 'fading-feedback');
  removeClassFromElement('copy-email-button', 'copied-button');
}

function addAnimationEmailClasses() {
  addClassToElement('email-link', 'fading-in');
  addClassToElement('copy-email-button', 'fading-in');
}

function restoreOnClickEventOnCopyButton(copyAction) {
  setElementOnClickAction('copy-email-button', copyAction);
}

function removeAnimationEmailClassesAfterTimeout(milliseconds, copyAction) {
  removeClassFromElementAfterTimeout('email-link', 'fading-in', milliseconds);
  removeClassFromElementAfterTimeout('copy-email-button', 'fading-in', milliseconds, () => {
    restoreOnClickEventOnCopyButton(copyAction);
  });
}

function popOnClickEventFromCopyButton() {
  const copyEmailButtonAction = getElementOnClickAction('copy-email-button');
  setElementOnClickAction('copy-email-button', null);
  return copyEmailButtonAction;
}

function restoreEmailLink() {
  const animationMillisecs = 2000;
  const copyAction = popOnClickEventFromCopyButton();

  setElementContentAfterTimeout('email-link', 'amadorrojasjosue@gmail.com', animationMillisecs, () => {
    deleteCopyFeedbackClasses();
    addAnimationEmailClasses();
    removeAnimationEmailClassesAfterTimeout(animationMillisecs, copyAction);
  });
}

function showCopiedEmailFeedback() {
  replaceEmailWithCopyFeedback();
  restoreEmailLink();
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
  navigator.clipboard.writeText('amadorrojasjosue@gmail.com');
  showCopiedEmailFeedback();
});

setElementOnClickAction('contact-form-link', () => {
  // TODO: show modal with contact form
  // eslint-disable-next-line no-alert
  alert('En construcción. / Under construction.');
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
