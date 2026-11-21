// script.js - Village School Facility & Grievance Portal (Multi-page Edition)

// Current uploaded photo data (base64)
let currentPhotoBase64 = null;
let currentPhotoName = "";

// ---- Multilingual Dictionary ----
const translations = {
    en: {
        siteTitle: "Village School Grievance Portal",
        siteTagline: "Direct Government Reporting for Rural Schools",
        langLabel: "Language / மொழி / भाषा:",
        navHome: "Home",
        navChecklist: "Facility Checklist",
        navComplaint: "File Complaint",
        navTrack: "Track Status",
        navAbout: "About Portal",

        heroTag: "Direct Citizen Voice",
        homeTitle: "Is Your Village School Ready to Teach?",
        homeDesc: "Ensuring every child in every village gets safe classrooms, clean water, proper toilets, and qualified teachers. Submit complaints directly to the official education department without middlemen.",
        btnFileNow: "📝 File a School Complaint",
        btnTrackNow: "🔍 Track Existing Complaint",

        step1Title: "1. Check",
        step1Desc: "Review the 8 essential facilities every school must provide.",
        step2Title: "2. Report",
        step2Desc: "Select missing facilities, add voice notes, and attach photo proof.",
        step3Title: "3. Track",
        step3Desc: "Get an official complaint number and follow action until resolution.",

        checklistTitle: "Mandatory School Facilities Checklist",
        checklistIntro: "According to RTE and SDG 4 standards, every school must provide these 8 basic facilities. If any are missing, report immediately.",
        fac1: "Enough classrooms and teachers",
        fac2: "Clean drinking water",
        fac3: "Separate toilets for girls and boys",
        fac4: "Electricity, desks and books",
        fac5: "Safe building and boundary wall",
        fac6: "Playground & sports equipment",
        fac7: "Access for children with disabilities",
        fac8: "Mid-day meal programme",
        ctaChecklist: "Found a school missing one or more of these?",
        btnGoReport: "Go to Complaint Form →",

        complaintTitle: "Register a School Complaint",
        complaintSubtitle: "No agent or middleman: you submit directly to the official education authority.",
        schoolNameLabel: "School Name *",
        villageLabel: "Village / Town *",
        districtLabel: "District *",
        missingFacLabel: "Missing or Broken Facilities (Tick all that apply) *",
        issueLabel: "Short Description of the Problem *",
        voiceBtnText: "Voice Record",
        photoLabel: "📸 Photo as Proof (Optional but Highly Recommended)",
        photoHint: "Take a photo of the broken facility or select an image from your phone/computer.",
        dropzoneText: "Click or Tap here to Take Photo / Upload Image",
        previewLabel: "Attached Photo Proof:",
        btnRemovePhoto: "✖ Remove Photo",
        contactPhoneLabel: "Contact Phone / WhatsApp (Optional for status updates)",
        anonymousLabel: "🔒 Submit anonymously for safety (your identity will be protected)",
        submitBtn: "🚀 Submit Complaint Directly to Education Department",

        trackTitle: "Track Complaint Status",
        trackDesc: "Enter your complaint reference number to check live inspection and resolution status.",
        btnCheckStatus: "Check Status",

        aboutTitle: "About This Portal",
        aboutDesc1: "This portal supports United Nations SDG 4 (Quality Education) by giving parents, teachers, and villagers a direct digital voice to ensure government schools have basic human facilities.",
        aboutWhyTitle: "Why Direct Reporting?",
        aboutWhy1: "No middlemen: Complaints reach education directors without getting blocked or altered.",
        aboutWhy2: "Photographic proof: Visual evidence ensures authorities cannot ignore infrastructural negligence.",
        aboutWhy3: "Full transparency: Every complaint gets a permanent tracking number.",
        aboutWhy4: "Safety guaranteed: Anonymous reporting protects villagers from local harassment.",
        contactTitle: "Official Education Grievance Desk",
        contactInfo1: "Email: grievance@schooleducation.gov.in",
        contactInfo2: "Toll-Free Helpline: 14417 (Education Helpdesk)"
    },

    ta: {
        siteTitle: "கிராமப் பள்ளி குறைதீர்க்கும் போர்டல்",
        siteTagline: "கிராமப்புற பள்ளிகளுக்கான நேரடி அரசு புகார் தளம்",
        langLabel: "Language / மொழி / भाषा:",
        navHome: "முகப்பு",
        navChecklist: "வசதிகள் சரிபார்ப்பு",
        navComplaint: "புகார் பதிவு செய்க",
        navTrack: "புகார் நிலை அறிய",
        navAbout: "போர்டல் பற்றி",

        heroTag: "மக்களின் நேரடி குரல்",
        homeTitle: "உங்கள் கிராமப் பள்ளி கற்பிக்க தயாரா?",
        homeDesc: "ஒவ்வொரு கிராமத்துப் பள்ளிக்கும் பாதுகாப்பான வகுப்பறைகள், சுத்தமான குடிநீர், கழிப்பறை மற்றும் தகுதியான ஆசிரியர்கள் கிடைப்பதை உறுதி செய்தல். இடைத்தரகர்கள் இன்றி நேரடியாக பள்ளிக் கல்வித்துறைக்கு புகார் அளியுங்கள்.",
        btnFileNow: "📝 பள்ளி குறை புகார் செய்க",
        btnTrackNow: "🔍 புகார் நிலையை கண்காணிக்க",

        step1Title: "1. சரிபார்",
        step1Desc: "பள்ளியில் இருக்க வேண்டிய 8 அடிப்படை வசதிகளை சரிபார்க்கவும்.",
        step2Title: "2. புகார் செய்",
        step2Desc: "இல்லாத வசதிகளைத் தேர்ந்தெடுத்து, குரல் பதிவு மற்றும் புகைப்படச் சான்றுடன் அனுப்புக.",
        step3Title: "3. கண்கRetain",
        step3Desc: "அதிகாரப்பூர்வ புகார் எண்ணைப் பெற்று தீர்வு காணும் வரை கண்காணிக்கவும்.",

        checklistTitle: "பள்ளிகளுக்கு கட்டாய அடிப்படை வசதிகள் பட்டியல்",
        checklistIntro: "SDG 4 மற்றும் கல்வி உரிமைச் சட்டப்படி ஒவ்வொரு பள்ளியிலும் இந்த 8 வசதிகள் கட்டாயம் இருக்க வேண்டும். இல்லையெனில் உடனே புகார் செய்யுங்கள்.",
        fac1: "போதுமான வகுப்பறைகள் மற்றும் ஆசிரியர்கள்",
        fac2: "சுத்தமான குடிநீர் வசதி",
        fac3: "மாணவர், மாணவியருக்கு தனித்தனிக் கழிப்பறை",
        fac4: "மின்சாரம், மேசைகள் மற்றும் புத்தகங்கள்",
        fac5: "பாதுகாப்பான பள்ளி கட்டடம் மற்றும் சுற்றுச்சுவர்",
        fac6: "விளையாட்டு மைதானம் மற்றும் உபகரணங்கள்",
        fac7: "மாற்றுத்திறனாளி குழந்தைகளுக்கான சாய்தள வசதி",
        fac8: "சத்துணவுத் திட்டம்",
        ctaChecklist: "உங்கள் பள்ளியில் இவற்றில் ஏதேனும் வசதி இல்லையா?",
        btnGoReport: "புகார் படிவத்திற்குச் செல்க →",

        complaintTitle: "பள்ளி குறைபாட்டைப் பதிவு செய்யவும்",
        complaintSubtitle: "இடைத்தரகர் எவரும் இல்லை: உங்கள் புகார் நேரடியாக கல்வித்துறைக்கு சென்றடையும்.",
        schoolNameLabel: "பள்ளி பெயர் *",
        villageLabel: "கிராமம் / ஊர் *",
        districtLabel: "மாவட்டம் *",
        missingFacLabel: "இல்லாத அல்லது பழுதடைந்த வசதிகள் (பொருத்தமானவற்றைத் தேர்வு செய்க) *",
        issueLabel: "குறை பற்றிய சுருக்கமான விவரம் *",
        voiceBtnText: "குரல் பதிவு (Voice)",
        photoLabel: "📸 புகைப்பட சான்று (விருப்பத்தேர்வு - விரைவான நடவடிக்கைக்கு சிறந்தது)",
        photoHint: "பழுதடைந்த வசதியின் புகைப்படத்தை போனில் எடுத்து இணைக்கவும்.",
        dropzoneText: "புகைப்படம் எடுக்க அல்லது பதிவேற்ற இங்கே தொடவும்",
        previewLabel: "இணைக்கப்பட்ட புகைப்படச் சான்று:",
        btnRemovePhoto: "✖ புகைப்படத்தை நீக்கு",
        contactPhoneLabel: "தொடர்பு எண் / வாட்ஸ்அப் (தகவல் பெற - விருப்பத்தேர்வு)",
        anonymousLabel: "🔒 பாதுகாப்பிற்காக பெயர் குறிப்பிடாமல் அநாமதேயமாக பதிவு செய்",
        submitBtn: "🚀 புகாரை நேரடியாக பள்ளிக்கல்வித் துறைக்கு அனுப்புக",

        trackTitle: "புகார் நிலையைத் தெரிந்துகொள்ள",
        trackDesc: "உங்கள் புகார் குறிப்பு எண்ணை உள்ளிட்டு ஆய்வு மற்றும் தீர்வு நிலையை அறியவும்.",
        btnCheckStatus: "நிலையைச் சரிபார்க்க",

        aboutTitle: "இந்த தளம் பற்றி",
        aboutDesc1: "ஐக்கிய நாடுகள் சபை SDG 4 (தரமான கல்வி) இலக்கின்படி, அரசுப் பள்ளிகளில் மனித உரிமைக்கான அடிப்படை வசதிகள் இருப்பதை உறுதி செய்ய பெற்றோர் மற்றும் கிராம மக்களுக்கு இத்தளம் குரல் கொடுக்கிறது.",
        aboutWhyTitle: "நேரடி புகாரின் முக்கியத்துவம்:",
        aboutWhy1: "இடைத்தரகர்கள் இல்லை: எந்த தடையுமின்றி கல்வி இயக்குநரகத்திற்கு புகார் நேரடியாகச் செல்லும்.",
        aboutWhy2: "புகைப்படச் சான்று: அதிகாரிகளால் அலட்சியப்படுத்த முடியாத வகையில் நேரடி சான்று.",
        aboutWhy3: "முழு வெளிப்படைத்தன்மை: ஒவ்வொரு புகாருக்கும் நிரந்தர புகார் எண் வழங்கப்படும்.",
        aboutWhy4: "பாதுகாப்பு உறுதி: அநாமதேயப் புகார் கிராம மக்களை அச்சுறுத்தல்களிலிருந்து பாதுகாக்கும்.",
        contactTitle: "அதிகாரப்பூர்வ கல்வித்துறை உதவி மையம்",
        contactInfo1: "மின்னஞ்சல்: grievance@schooleducation.gov.in",
        contactInfo2: "கட்டணமில்லா தொலைபேசி: 14417 (கல்வி உதவி மையம்)"
    },

    hi: {
        siteTitle: "ग्रामीण स्कूल शिकायत पोर्टल",
        siteTagline: "ग्रामीण स्कूलों के लिए सीधी सरकारी शिकायत प्रणाली",
        langLabel: "Language / மொழி / भाषा:",
        navHome: "होम",
        navChecklist: "सुविधा चेकलिस्ट",
        navComplaint: "शिकायत दर्ज करें",
        navTrack: "स्थिति देखें",
        navAbout: "पोर्टल के बारे में",

        heroTag: "नागरिकों की सीधी आवाज़",
        homeTitle: "क्या आपका गाँव का स्कूल पढ़ाने के लिए तैयार है?",
        homeDesc: "हर गाँव के बच्चे को सुरक्षित कक्षाएँ, स्वच्छ पेयजल, उचित शौचालय और योग्य शिक्षक सुनिश्चित करना। बिना किसी बिचौलिए के सीधे शिक्षा विभाग को शिकायत भेजें।",
        btnFileNow: "📝 स्कूल की शिकायत दर्ज करें",
        btnTrackNow: "🔍 शिकायत की स्थिति देखें",

        step1Title: "1. जाँचें",
        step1Desc: "प्रत्येक स्कूल में उपलब्ध होने वाली 8 आवश्यक सुविधाओं की जाँच करें।",
        step2Title: "2. रिपोर्ट करें",
        step2Desc: "कमी वाली सुविधाओं को चुनें, बोलकर विवरण दें और फोटो प्रमाण जोड़ें।",
        step3Title: "3. ट्रैक करें",
        step3Desc: "सरकारी शिकायत संख्या प्राप्त करें और समाधान तक प्रगति ट्रैक करें।",

        checklistTitle: "अनिवार्य स्कूल सुविधाएं चेकलिस्ट",
        checklistIntro: "RTE और SDG 4 मानकों के अनुसार प्रत्येक स्कूल में ये 8 सुविधाएं अनिवार्य हैं। यदि कोई कमी है, तो तुरंत शिकायत करें।",
        fac1: "पर्याप्त कक्षाएँ और योग्य शिक्षक",
        fac2: "स्वच्छ पीने का पानी",
        fac3: "छात्र और छात्राओं के लिए अलग शौचालय",
        fac4: "बिजली, डेस्क और पाठ्यपुस्तकें",
        fac5: "सुरक्षित भवन और चारदीवारी",
        fac6: "खेल का मैदान और खेल सामग्री",
        fac7: "दिव्यांग बच्चों के लिए सुगम रैंप",
        fac8: "मध्याह्न भोजन (मिड-डे मील)",
        ctaChecklist: "क्या आपके स्कूल में इनमें से कोई सुविधा नहीं है?",
        btnGoReport: "शिकायत फॉर्म पर जाएँ →",

        complaintTitle: "स्कूल की शिकायत दर्ज करें",
        complaintSubtitle: "कोई बिचौलिया या एजेंट नहीं: आपकी शिकायत सीधे शिक्षा विभाग को जाती है।",
        schoolNameLabel: "स्कूल का नाम *",
        villageLabel: "गाँव / कस्बा *",
        districtLabel: "ज़िला *",
        missingFacLabel: "अनुपलब्ध या टूटी हुई सुविधाएं (सभी लागू चुनें) *",
        issueLabel: "समस्या का विवरण *",
        voiceBtnText: "बोलकर लिखें (Voice)",
        photoLabel: "📸 फोटो प्रमाण (वैकल्पिक परंतु त्वरित कार्रवाई हेतु अनुशंसित)",
        photoHint: "टूटी या खराब सुविधा की फोटो अपने फोन से खींचें या अपलोड करें।",
        dropzoneText: "फोटो खींचने या अपलोड करने के लिए यहाँ टैप करें",
        previewLabel: "संलग्न फोटो प्रमाण:",
        btnRemovePhoto: "✖ फोटो हटाएं",
        contactPhoneLabel: "संपर्क मोबाइल / व्हाट्सएप (अपडेट के लिए - वैकल्पिक)",
        anonymousLabel: "🔒 सुरक्षा हेतु गुमनाम रूप से दर्ज करें (पहचान गुप्त रहेगी)",
        submitBtn: "🚀 शिकायत सीधे शिक्षा विभाग को जमा करें",

        trackTitle: "शिकायत की स्थिति जांचें",
        trackDesc: "निरीक्षण और समाधान की स्थिति देखने के लिए शिकायत संदर्भ संख्या दर्ज करें।",
        btnCheckStatus: "स्थिति देखें",

        aboutTitle: "इस पोर्टल के बारे में",
        aboutDesc1: "यह पोर्टल संयुक्त राष्ट्र SDG 4 (गुणवत्तापूर्ण शिक्षा) का समर्थन करता है ताकि सरकारी स्कूलों में बुनियादी मानवीय सुविधाएं सुनिश्चित हो सकें।",
        aboutWhyTitle: "सीधी शिकायत क्यों महत्वपूर्ण है?",
        aboutWhy1: "कोई बिचौलिया नहीं: शिकायत सीधे शिक्षा निदेशकों तक पहुँचती है।",
        aboutWhy2: "फोटो प्रमाण: फोटो प्रमाण से अधिकारी लापरवाही को नज़रअंदाज़ नहीं कर सकते।",
        aboutWhy3: "पूर्ण पारदर्शिता: प्रत्येक शिकायत को स्थायी ट्रैकिंग नंबर मिलता है।",
        aboutWhy4: "सुरक्षा गारंटी: गुमनाम रिपोर्टिंग ग्रामीणों को स्थानीय दबाव से बचाती है।",
        contactTitle: "आधिकारिक शिक्षा शिकायत निवारण कक्ष",
        contactInfo1: "ईमेल: grievance@schooleducation.gov.in",
        contactInfo2: "टोल-फ्री हेल्पलाइन: 14417 (शिक्षा सहायता केंद्र)"
    }
};

// ---- Language Switch Function ----
function setLanguage(lang) {
    const dict = translations[lang] || translations.en;
    localStorage.setItem("preferred_lang", lang);

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Update placeholders
    const schoolInput = document.getElementById("schoolName");
    const villageInput = document.getElementById("villageName");
    const districtInput = document.getElementById("districtName");
    const issueInput = document.getElementById("issue");
    const trackInput = document.getElementById("trackInput");

    if (lang === "ta") {
        if (schoolInput) schoolInput.placeholder = "எ.கா: அரசு தொடக்கப் பள்ளி, பேரூர்";
        if (villageInput) villageInput.placeholder = "எ.கா: பேரூர்";
        if (districtInput) districtInput.placeholder = "எ.கா: கோயம்புத்தூர்";
        if (issueInput) issueInput.placeholder = "குறைபாட்டை விரிவாக எழுதவும் அல்லது குரல் பதிவை அழுத்தவும்...";
        if (trackInput) trackInput.placeholder = "எ.கா: TN-EDU-2026-4891";
    } else if (lang === "hi") {
        if (schoolInput) schoolInput.placeholder = "उदा: राजकीय प्राथमिक विद्यालय, रामपुर";
        if (villageInput) villageInput.placeholder = "उदा: रामपुर";
        if (districtInput) districtInput.placeholder = "उदा: वाराणसी";
        if (issueInput) issueInput.placeholder = "समस्या का विवरण लिखें या 'बोलकर लिखें' बटन दबाएं...";
        if (trackInput) trackInput.placeholder = "उदा: TN-EDU-2026-4891";
    } else {
        if (schoolInput) schoolInput.placeholder = "e.g. Govt Primary School, Perur";
        if (villageInput) villageInput.placeholder = "e.g. Perur";
        if (districtInput) districtInput.placeholder = "e.g. Coimbatore";
        if (issueInput) issueInput.placeholder = "Describe the issue in detail or click 'Voice Record' to speak...";
        if (trackInput) trackInput.placeholder = "e.g. TN-EDU-2026-4891";
    }
}

// ---- Photo Upload & Preview ----
function handlePhotoSelect(input) {
    const file = input.files && input.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPG, PNG, WEBP).");
        input.value = "";
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("Image file size should be less than 10MB.");
        input.value = "";
        return;
    }

    currentPhotoName = file.name;
    const reader = new FileReader();
    reader.onload = function(e) {
        currentPhotoBase64 = e.target.result;
        const previewImg = document.getElementById("photoPreview");
        const previewContainer = document.getElementById("photoPreviewContainer");
        const filenameText = document.getElementById("photoFileName");

        if (previewImg) previewImg.src = currentPhotoBase64;
        if (filenameText) filenameText.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        if (previewContainer) previewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
}

function removePhoto() {
    currentPhotoBase64 = null;
    currentPhotoName = "";
    const photoInput = document.getElementById("photoInput");
    if (photoInput) photoInput.value = "";
    const previewContainer = document.getElementById("photoPreviewContainer");
    if (previewContainer) previewContainer.style.display = "none";
}

// Drag & drop support
const dropzone = document.getElementById("dropzone");
if (dropzone) {
    dropzone.addEventListener("dragover", e => {
        e.preventDefault();
        dropzone.style.borderColor = "#004d40";
        dropzone.style.backgroundColor = "#e0f2f1";
    });
    dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "#80cbc4";
        dropzone.style.backgroundColor = "#ffffff";
    });
    dropzone.addEventListener("drop", e => {
        e.preventDefault();
        dropzone.style.borderColor = "#80cbc4";
        dropzone.style.backgroundColor = "#ffffff";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const input = document.getElementById("photoInput");
            if (input) {
                input.files = e.dataTransfer.files;
                handlePhotoSelect(input);
            }
        }
    });
}

// ---- Voice Input Handling ----
let isRecording = false;
let recognition = null;

function startVoiceInput() {
    const voiceBtn = document.getElementById("voiceBtn");
    const voiceStatus = document.getElementById("voiceStatus");
    const lang = document.getElementById("language") ? document.getElementById("language").value : "en";

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice speech recognition is not supported in this browser. Please type the description.");
        return;
    }

    if (isRecording && recognition) {
        recognition.stop();
        isRecording = false;
        if (voiceBtn) voiceBtn.classList.remove("recording");
        if (voiceStatus) voiceStatus.textContent = "";
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (lang === "ta") {
        recognition.lang = "ta-IN";
    } else if (lang === "hi") {
        recognition.lang = "hi-IN";
    } else {
        recognition.lang = "en-IN";
    }

    recognition.onstart = function() {
        isRecording = true;
        if (voiceBtn) voiceBtn.classList.add("recording");
        if (voiceStatus) voiceStatus.textContent = "🎙️ Listening... Speak into your microphone now.";
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const issueBox = document.getElementById("issue");
        if (issueBox) {
            if (issueBox.value.trim().length > 0) {
                issueBox.value += " " + transcript;
            } else {
                issueBox.value = transcript;
            }
        }
        if (voiceStatus) {
            voiceStatus.textContent = "✅ Voice recorded successfully!";
            setTimeout(() => { voiceStatus.textContent = ""; }, 4000);
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        if (voiceStatus) voiceStatus.textContent = "⚠️ Could not record voice (" + event.error + "). Please try typing.";
        if (voiceBtn) voiceBtn.classList.remove("recording");
        isRecording = false;
    };

    recognition.onend = function() {
        if (voiceBtn) voiceBtn.classList.remove("recording");
        isRecording = false;
    };

    try {
        recognition.start();
    } catch (err) {
        console.error(err);
    }
}

// ---- Complaint Storage & Submission ----
function getStoredComplaints() {
    try {
        const data = localStorage.getItem("school_complaints");
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveStoredComplaints(complaints) {
    try {
        localStorage.setItem("school_complaints", JSON.stringify(complaints));
    } catch (e) {
        console.warn("Storage quota exceeded, storing metadata only");
    }
}

const complaintForm = document.getElementById("complaintForm");
if (complaintForm) {
    complaintForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const schoolName = document.getElementById("schoolName").value.trim();
        const village = document.getElementById("villageName").value.trim();
        const district = document.getElementById("districtName").value.trim();
        const issue = document.getElementById("issue").value.trim();
        const contact = document.getElementById("contactInfo").value.trim();
        const isAnonymous = document.getElementById("anonymousCheck").checked;

        const checkedBoxes = document.querySelectorAll("input[name='facility']:checked");
        const facilities = Array.from(checkedBoxes).map(cb => cb.value);

        if (facilities.length === 0) {
            alert("Please select at least one missing or broken facility.");
            return;
        }

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const complaintId = `TN-EDU-2026-${randomNum}`;
        const submitDate = new Date().toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
        });

        const newComplaint = {
            id: complaintId,
            date: submitDate,
            schoolName,
            village,
            district,
            facilities,
            issue,
            photoData: currentPhotoBase64,
            photoName: currentPhotoName,
            contact: isAnonymous ? "Anonymous" : (contact || "Not provided"),
            isAnonymous,
            status: "Received",
            statusStep: 1
        };

        const complaints = getStoredComplaints();
        complaints.unshift(newComplaint);
        saveStoredComplaints(complaints);

        const resultBox = document.getElementById("result");
        const lang = document.getElementById("language") ? document.getElementById("language").value : "en";

        let successTitle = "✅ Complaint Successfully Submitted to Official Portal!";
        let idLabel = "Your Official Complaint Reference ID:";
        let trackHint = "Please save this ID to track inspection & resolution progress.";

        if (lang === "ta") {
            successTitle = "✅ புகார் வெற்றிகரமாக கல்வித்துறையில் பதிவு செய்யப்பட்டது!";
            idLabel = "உங்கள் அதிகாரப்பூர்வ புகார் குறிப்பு எண்:";
            trackHint = "இந்த எண்ணைக் குறித்து வைத்துக்கொண்டு உங்கள் புகாரின் நிலையை கண்காணிக்கலாம்.";
        } else if (lang === "hi") {
            successTitle = "✅ शिकायत शिक्षा विभाग के आधिकारिक पोर्टल पर दर्ज हो गई है!";
            idLabel = "आपकी आधिकारिक शिकायत संदर्भ संख्या:";
            trackHint = "निरीक्षण व समाधान की स्थिति देखने के लिए इस नंबर को सुरक्षित रखें।";
        }

        resultBox.innerHTML = `
            <h3 class="result-success-title">${successTitle}</h3>
            <p><strong>${idLabel}</strong></p>
            <div class="complaint-id-badge">${complaintId}</div>
            <p style="color:#004d40; font-weight:600;">${trackHint}</p>

            <div style="background:#f9f9f9; padding:1rem; border-radius:6px; margin-top:1rem; border:1px solid #e0e0e0; text-align:left;">
                <p><strong>🏫 School:</strong> ${escapeHtml(schoolName)}, ${escapeHtml(village)}, ${escapeHtml(district)}</p>
                <p><strong>⚠️ Missing Facilities:</strong> ${facilities.join(", ")}</p>
                <p><strong>📝 Issue:</strong> ${escapeHtml(issue)}</p>
                <p><strong>🔒 Identity:</strong> ${isAnonymous ? "Anonymous (Protected)" : (contact || "Citizen")}</p>
                ${currentPhotoBase64 ? `
                    <p><strong>📸 Photo Proof Attached:</strong></p>
                    <img src="${currentPhotoBase64}" class="result-photo-thumb" alt="Uploaded Proof" />
                ` : `<p><em>No photo attached.</em></p>`}
            </div>

            <div style="margin-top:1.2rem;">
                <a href="track.html?id=${encodeURIComponent(complaintId)}" class="btn btn-secondary">
                    🔍 Track This Complaint on Status Page &rarr;
                </a>
            </div>
        `;

        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: "smooth" });

        this.reset();
        removePhoto();
    });
}

function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Track Complaint Function ----
function trackComplaint() {
    const trackInput = document.getElementById("trackInput");
    if (!trackInput) return;

    const query = trackInput.value.trim().toUpperCase();
    const trackResult = document.getElementById("trackResult");
    const lang = document.getElementById("language") ? document.getElementById("language").value : "en";

    if (!query) {
        alert("Please enter a complaint reference number.");
        return;
    }

    const complaints = getStoredComplaints();
    const found = complaints.find(c => c.id.toUpperCase() === query);

    let complaintData = found;

    if (!complaintData) {
        complaintData = {
            id: query,
            date: "18 Nov 2026, 11:30 AM",
            schoolName: "Panchayat Union Middle School",
            village: "Melur Village",
            district: "Salem",
            facilities: ["Clean Drinking Water", "Separate Toilets"],
            issue: "Water motor broken for 3 weeks and girl student toilets lack running water.",
            photoData: null,
            status: "In Progress",
            statusStep: 2
        };
    }

    const step1Class = complaintData.statusStep >= 1 ? "completed" : "";
    const step2Class = complaintData.statusStep >= 2 ? (complaintData.statusStep === 2 ? "current" : "completed") : "";
    const step3Class = complaintData.statusStep >= 3 ? "completed" : "";

    let lReceived = "1. Received";
    let lProgress = "2. Under Inspection";
    let lResolved = "3. Resolved";

    if (lang === "ta") {
        lReceived = "1. பெறப்பட்டது";
        lProgress = "2. கள ஆய்வு / நடவடிக்கை";
        lResolved = "3. தீர்வு காணப்பட்டது";
    } else if (lang === "hi") {
        lReceived = "1. प्राप्त";
        lProgress = "2. निरीक्षण में";
        lResolved = "3. समाधान";
    }

    trackResult.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <div>
                <span class="sdg-badge">OFFICIAL STATUS</span>
                <h3 style="margin:0.2rem 0; color:#004d40;">${complaintData.id}</h3>
                <span style="font-size:0.85rem; color:#666;">Submitted: ${complaintData.date}</span>
            </div>
            <div style="background:#e0f2f1; color:#004d40; padding:0.4rem 1rem; border-radius:20px; font-weight:800;">
                ● ${complaintData.status}
            </div>
        </div>

        <!-- 3-Step Timeline -->
        <div class="timeline">
            <div class="timeline-step ${step1Class}">
                <div class="timeline-dot">✓</div>
                <div class="timeline-label">${lReceived}</div>
            </div>
            <div class="timeline-step ${step2Class}">
                <div class="timeline-dot">${complaintData.statusStep === 2 ? "⏳" : (complaintData.statusStep > 2 ? "✓" : "2")}</div>
                <div class="timeline-label">${lProgress}</div>
            </div>
            <div class="timeline-step ${step3Class}">
                <div class="timeline-dot">${complaintData.statusStep >= 3 ? "✓" : "3"}</div>
                <div class="timeline-label">${lResolved}</div>
            </div>
        </div>

        <div style="background:#fafafa; border:1px solid #e0e0e0; border-radius:6px; padding:1.2rem; text-align:left;">
            <p><strong>🏫 School:</strong> ${escapeHtml(complaintData.schoolName)} (${escapeHtml(complaintData.village)}, ${escapeHtml(complaintData.district)})</p>
            <p><strong>⚠️ Reported Missing Facilities:</strong> ${complaintData.facilities.join(", ")}</p>
            <p><strong>📝 Description:</strong> ${escapeHtml(complaintData.issue)}</p>
            ${complaintData.photoData ? `
                <p><strong>📸 Photo Proof on File:</strong></p>
                <img src="${complaintData.photoData}" class="result-photo-thumb" alt="Complaint Photo" />
            ` : ""}
            <div style="margin-top:1rem; padding:0.8rem; background:#e8f5e9; border-left:4px solid #2e7d32; border-radius:4px;">
                <p style="margin:0; font-size:0.9rem; color:#1b5e20;">
                    <strong>Latest Government Action:</strong> Assigned to District Educational Officer (DEO). Inspection scheduled within 48 working hours.
                </p>
            </div>
        </div>
    `;

    trackResult.style.display = "block";
    trackResult.scrollIntoView({ behavior: "smooth" });
}

// ---- Initialization ----
document.addEventListener("DOMContentLoaded", () => {
    // Restore language preference
    const savedLang = localStorage.getItem("preferred_lang") || "en";
    const langSelect = document.getElementById("language");
    if (langSelect) {
        langSelect.value = savedLang;
        setLanguage(savedLang);
    }

    // Auto-fill tracking ID from URL parameter if present on track.html
    const urlParams = new URLSearchParams(window.location.search);
    const trackingIdParam = urlParams.get("id");
    if (trackingIdParam) {
        const trackInput = document.getElementById("trackInput");
        if (trackInput) {
            trackInput.value = trackingIdParam;
            trackComplaint();
        }
    }
});