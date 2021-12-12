import { language as langES } from "./lang_es.js";
import { language as langEN } from "./lang_en.js";

const englishLink = document.getElementById("english-link");
const spanishLink = document.getElementById("spanish-link");

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

function changePageLanguage(lang) {
  document.getElementById("description").innerHTML = lang.description;
  document.getElementById("interests").children[0].innerHTML =
    lang.interestsTitle;
  document.getElementById("interests").children[1].innerHTML = "";
  lang.interests.forEach((interest) => {
    const li = document.createElement("li");
    li.innerHTML = interest;
    document.getElementById("interests").children[1].appendChild(li);
  });
}

function toggleLink(clickedLink, newClickableLink, callback) {
  if (newClickableLink.getAttribute("href") == null) {
    clickedLink.removeAttribute("href");
    clickedLink.style.fontWeight = "bold";
    newClickableLink.setAttribute("href", "");
    newClickableLink.style.fontWeight = "normal";
    callback();
  }
}
