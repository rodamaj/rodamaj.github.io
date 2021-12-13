import { language as langES } from "./lang_es.js";
import { language as langEN } from "./lang_en.js";

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

function changePageLanguage(lang) {
  document.getElementById("description-name").innerHTML = lang.descriptionName;
  document.getElementById("description-field").innerHTML =
    lang.descriptionField;
  document.getElementById("description-place").innerHTML =
    lang.descriptionPlace;

  document.getElementById("interests").children[0].innerHTML =
    lang.interestsTitle;
  document.getElementById("links").children[0].innerHTML = lang.linksTitle;

  document.getElementById("interests").children[1].innerHTML = "";
  document.getElementById("links").children[1].innerHTML = "";

  lang.interests.forEach((interest) => {
    const li = document.createElement("li");
    li.innerHTML = interest;
    document.getElementById("interests").children[1].appendChild(li);
  });

  lang.links.forEach((link) => {
    const li = document.createElement("li");
    li.setAttribute("id", link.id);
    const a = document.createElement("a");
    a.innerHTML = link.text;
    a.setAttribute("href", link.href);
    li.appendChild(a);
    document.getElementById("links").children[1].appendChild(li);
  });

  window.localStorage.setItem("lang", lang.abbreviation);
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
