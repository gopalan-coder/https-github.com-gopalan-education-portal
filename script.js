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

// ---- Language handling (placeholder) ----
function setLanguage(lang) {
    console.log('Language selected:', lang);
    // TODO: load language dictionary and replace text nodes
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
