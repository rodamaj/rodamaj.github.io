import { changePageLanguage } from "./lang/translation.js";
import { language as langES } from "./lang/lang_es.js";
import { language as langEN } from "./lang/lang_en.js";

const englishLink = document.getElementById("english-link");
const spanishLink = document.getElementById("spanish-link");

window.onpageshow = function () {
  if (window.localStorage.getItem("lang") === "en") {
    toggleLink(englishLink, spanishLink, () => {
      changePageLanguage(langEN);
    });
  }
};

englishLink.onclick = function () {
  toggleLink(englishLink, spanishLink, () => {
    changePageLanguage(langEN);
  });
};

spanishLink.onclick = function () {
  toggleLink(spanishLink, englishLink, () => {
    changePageLanguage(langES);
  });
};

function toggleLink(clickedLink, newClickableLink, callback) {
  if (newClickableLink.getAttribute("href") == null) {
    clickedLink.removeAttribute("href");
    clickedLink.style.fontWeight = "bold";
    newClickableLink.setAttribute("href", "");
    newClickableLink.style.fontWeight = "normal";
    callback();
  }
}
