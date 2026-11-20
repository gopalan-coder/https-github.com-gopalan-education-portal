// script.js – placeholder for language handling and voice input
function setLanguage(lang) {
    // In a full implementation you would load a language dictionary and replace text.
    console.log('Language selected:', lang);
}

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

// Simple form submit handler – just shows a thank‑you message.
document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('result').innerText = 'Thank you! Your complaint has been recorded.';
    this.reset();
});
