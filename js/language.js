const translations = {
  en: {
    home: "Home",
    aboutMe: "About me",
    portfolio: "Portfolio",
    blogPost: "Blog Post",
    contact: "Contact",
    language: "Language",
    aboutHeader: "Let us create...",
    newsTitle: "What are diffusion processes and disscipative systems?",
    aboutText: 'You may contribute <a rel=\"nofollow\" href=\"http://paypal.me/templatemo\" target=\"_blank\">a small amount</a> via PayPal if <a rel=\"nofollow\" href=\"https://templatemo.com/tm-567-nomad-force\" target=\"_parent\">Nomad Force Template</a> is useful for you. This will absolutely help us to keep creating better CSS templates for you. <br><br>We provide you 100% free templates on TemplateMo website. Images are provided by FreePik and Unsplash websites.',
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
