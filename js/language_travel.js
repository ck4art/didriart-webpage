const translations = {
  en: {
    home: "Home",
    aboutMe: "About me",
    portfolio: "Portfolio",
    blogPost: "Blog Posts",
    contact: "Contact",
    language: "Language",
    aboutHeader: "Hey there...",
    newsTitle: "Arriving in china",
    aboutText: 'This is my personal homepage. Here you can find information about the different services provided as well as different blogs about diverse topics. First, some words about me: I studied Molecular Medicine (M. Sc.) and later I did some ' +
        'research in neuroscience and psychology ending up in bioinformatics. My passion travelling and art. ',
  },
  ch: {
    home: "penis",
    aboutMe: "stuhl",
    portfolio: "Portfolio",
    blogPost: "Blog-Beitrag",
    contact: "Kontakt",
    language: "Sprache",
    aboutHeader: "Lass uns etwas schaffen...",
    newsTitle: "Was juckt mich das",
    aboutText: 'leck mi do am zuckerli',
  },
};

function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    element.textContent = translations[lang][key] || translations["en"][key] || key;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const defaultLanguage = "en";
  const savedLang = localStorage.getItem("language") || defaultLanguage;
  setLanguage(savedLang);
});

function switchLanguage(lang) {
  setLanguage(lang);
  localStorage.setItem("language", lang);
}
