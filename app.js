
const countries = {
    "ar-SA": "Arabic",
    "rn-BI": "Kirundi",
    "en-GB": "English",
    "es-ES": "Spanish",
    "de-DE": "German",
    "is-IS": "Icelandic",
    "fr-FR": "French",
    "ru-RU": "Russian",
    "pt-PT": "Portuguese",
    "ja-JP": "Japanese",
    "la-VA": "Latin",
    "nl-NL": "Dutch",
    "ro-RO": "Romanian",
    "pl-PL": "Polish",
    "it-IT": "Italian",

}

const fromText = document.querySelector(".origem-text"),
exchageIcon = document.querySelector(".exchange"),
icons = document.querySelectorAll(".row i");
toText = document.querySelector(".destiny-text"),
translateBtn = document.querySelector("button"),
selectedLanguage = document.querySelectorAll("select"),
selectedLanguage.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "pt-PT" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectedLanguage[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectedLanguage[0].value = selectedLanguage[1].value;
    selectedLanguage[1].value = tempLang;
});
fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = selectedLanguage[0].value,
    translateTo = selectedLanguage[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});
