import changePageLanguage from './lang/translation.js';

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
      changePageLanguage('en');
    });
  }
};

englishLink.onclick = () => {
  toggleLink(englishLink, spanishLink, () => {
    changePageLanguage('en');
  });
};

spanishLink.onclick = () => {
  toggleLink(spanishLink, englishLink, () => {
    changePageLanguage('es');
  });
};
