import changePageLanguage from './lang/translation.js';
import langES from './lang/lang_es.js';
import langEN from './lang/lang_en.js';

const englishLink = document.getElementById('english-link');
const spanishLink = document.getElementById('spanish-link');

function toggleLink(clickedLink, newClickableLink, callback) {
  const oldLink = clickedLink;
  const newLink = newClickableLink;

  if (newLink.getAttribute('href') == null) {
    oldLink.removeAttribute('href');
    oldLink.style.fontWeight = '600';
    newLink.setAttribute('href', '');
    newLink.style.fontWeight = 'normal';
    callback();
  }
}

window.onpageshow = () => {
  if (window.localStorage.getItem('lang') === 'en') {
    toggleLink(englishLink, spanishLink, () => {
      changePageLanguage(langEN);
    });
  }
};

englishLink.onclick = () => {
  toggleLink(englishLink, spanishLink, () => {
    changePageLanguage(langEN);
  });
};

spanishLink.onclick = () => {
  toggleLink(spanishLink, englishLink, () => {
    changePageLanguage(langES);
  });
};
