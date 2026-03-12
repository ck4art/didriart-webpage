const translations = {
  en: {
    home: "Home",
    aboutMe: "About me",
    portfolio: "Portfolio",
    blogPost: "Blog Posts",
    contact: "Contact",
    language: "Language",
    aboutHeader: "Hey there...",
    newsTitle: "What are diffusion processes and disscipative systems?",
    aboutText: 'Welcome to my personal homepage! Here, you\'ll find information about the various services I offer, along with blog posts covering a wide range of topics, from science and culture to art and medicine.\n' +
        '\n' +
        'A little about me: My background is in molecular medicine (M.Sc.), and I spent time conducting research in neuroscience and psychology before transitioning into bioinformatics and data science.\n' +
        '\n' +
        'If this site provides value to even a few people, then its purpose is fulfilled.',
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
