import {
  setElementOnClickAction,
  setElementContent,
  addClassToElement,
  setElementContentAfterTimeout,
  removeClassFromElement,
  removeClassFromElementAfterTimeout,
  getElementOnClickAction,
} from './shared/html-handler.js';

function addCopyFeedbackClasses() {
  addClassToElement('email-link', 'fading-feedback');
  addClassToElement('copy-email-button', 'copied-button');
}

function replaceEmailWithCopyFeedback() {
  setElementContent(
    'email-link',
    window.localStorage.getItem('lang') === 'en' ? 'Copied!' : '¡Copiado!'
  );
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
  removeClassFromElementAfterTimeout(
    'copy-email-button',
    'fading-in',
    milliseconds,
    () => {
      restoreOnClickEventOnCopyButton(copyAction);
    }
  );
}

function popOnClickEventFromCopyButton() {
  const copyEmailButtonAction = getElementOnClickAction('copy-email-button');
  setElementOnClickAction('copy-email-button', null);
  return copyEmailButtonAction;
}

function restoreEmailLink() {
  const animationMillisecs = 2000;
  const copyAction = popOnClickEventFromCopyButton();

  setElementContentAfterTimeout(
    'email-link',
    'bjamadorr@gmail.com',
    animationMillisecs,
    () => {
      deleteCopyFeedbackClasses();
      addAnimationEmailClasses();
      removeAnimationEmailClassesAfterTimeout(animationMillisecs, copyAction);
    }
  );
}

export default function showCopiedEmailFeedback() {
  replaceEmailWithCopyFeedback();
  restoreEmailLink();
}
