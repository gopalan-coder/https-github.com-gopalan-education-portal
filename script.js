// script.js – navigation, language handling, voice input, and form submit

// ---- Navigation handling ----
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); // remove '#'
        // hide all sections
        document.querySelectorAll('main section').forEach(sec => sec.style.display = 'none');
        // show the selected one
        const target = document.getElementById(targetId);
        if (target) target.style.display = 'block';
        // update active link styling
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
// Show home section by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('main section').forEach(sec => sec.style.display = 'none');
    const home = document.getElementById('home');
    if (home) home.style.display = 'block';
    const homeLink = document.querySelector('nav a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
});

// ---- Language handling (simple dictionary) ----
const translations = {
    en: {
        homeTitle: "Welcome",
        homeDesc: "Providing quality education to every child, even in remote villages.",
        aboutTitle: "About Us",
        aboutDesc: "The portal is an official portal of the Education Department, aiming to support schools that lack basic facilities.",
        complaintTitle: "Register a Complaint",
        schoolNameLabel: "School Name:",
        issueLabel: "Issue Description:",
        submitBtn: "Submit",
        contactTitle: "Contact",
        contactInfo: "Email: info@education.gov"
    },
    ta: {
        homeTitle: "வரவேற்பு",
        homeDesc: "தொலைவுள்ள கிராமங்களிலும் ஒவ்வொரு குழந்தைக்கும் தரமான கல்வியை வழங்குவது.",
        aboutTitle: "எங்களைப் பற்றி",
        aboutDesc: "இந்த போர்டல் கல்வி துறை அதிகாரப்பூர்வ போர்டல், அடிப்படை வசதிகள் இல்லாத பள்ளிகளை ஆதரிக்கிறது.",
        complaintTitle: "புலன் பதிவு செய்யவும்",
        schoolNameLabel: "பள்ளி பெயர்:",
        issueLabel: "சிக்கல் விவரம்:",
        submitBtn: "சமர்ப்பிக்க",
        contactTitle: "தொடர்பு",
        contactInfo: "மின்னஞ்சல்: info@education.gov"
    },
    hi: {
        homeTitle: "स्वागत",
        homeDesc: "दूरस्थ गाँवों में भी हर बच्चे को गुणवत्तापूर्ण शिक्षा प्रदान करना।",
        aboutTitle: "हमारे बारे में",
        aboutDesc: "यह पोर्टल शिक्षा विभाग का आधिकारिक पोर्टल है, वह स्कूलों का समर्थन करता है जिनके पास बुनियादी सुविधाएँ नहीं हैं।",
        complaintTitle: "शिकायत दर्ज करें",
        schoolNameLabel: "स्कूल का नाम:",
        issueLabel: "समस्या विवरण:",
        submitBtn: "जमा करें",
        contactTitle: "संपर्क",
        contactInfo: "ईमेल: info@education.gov"
    }
};

function setLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    console.log('Language set to', lang);
}

// ---- Voice input ----
function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice input not supported in this browser.');
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = document.getElementById('language').value;
    recognition.interimResults = false;
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('issue').value = transcript;
    };
    recognition.start();
}

// ---- Form submit ----
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('result').innerText = 'Thank you! Your complaint has been recorded.';
    this.reset();
});
