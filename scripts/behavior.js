import { language } from "./lang_es.js";

let englishLink = document.getElementById("english-link");
let spanishLink = document.getElementById("spanish-link");

englishLink.onclick = function() {
    toggleLink(englishLink, spanishLink, () => {
        alert("Translation to English.");
        console.log(language);
    });
};

spanishLink.onclick = function() {
    toggleLink(spanishLink, englishLink, () => {
        alert("Traducción a español.");
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