
/* 1. DATA OBJECTS */
const emotionsData = {
angry: {
title: "Feeling Angry",
questions: ["What triggered this?", "Where do you feel it in your body?"],
activity: { title: "Fire Breath", steps: ["Inhale for 4 counts.", "Exhale with a 'Ha' sound."] }
},
anxious: {
title: "Feeling Anxious",
questions: ["What are you worried about?", "Name 3 things you can see."],
activity: { title: "4-7-8 Breathing", steps: ["Inhale for 4.", "Hold for 7.", "Exhale for 8."] }
},
sad: {
title: "Feeling Sad",
questions: ["What does this sadness need?", "Offer yourself kindness."],
activity: { title: "Self-Hug", steps: ["Wrap arms around yourself.", "Take 3 deep breaths."] }
},
overwhelmed: {
title: "Feeling Overwhelmed",
questions: ["What is most urgent?", "What can wait?"],
activity: { title: "Brain Dump", steps: ["Write it all down.", "Pick ONE thing to do."] }
},
numb: {
title: "Feeling Numb",
questions: ["Any subtle sensations?", "What color is your energy?"],
activity: { title: "5 Senses Grounding", steps: ["See 5 things.", "Touch 4 things."] }
},
restless: {
title: "Feeling Restless",
questions: ["What is your body saying?", "Need to move or settle?"],
activity: { title: "Energy Shake Out", steps: ["Shake hands for 10s.", "Jump 5 times."] }
}
};

const monkeyFaces = {
angry: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><path d="M 30 38 L 38 42 M 50 38 L 42 42" stroke="#5A5247" stroke-width="2"/><path d="M 33 52 Q 40 48 47 52" stroke="#5A5247" stroke-width="2" fill="none"/></svg>`,
anxious: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><circle cx="32" cy="40" r="4" fill="#5A5247"/><circle cx="48" cy="40" r="4" fill="#5A5247"/><path d="M 33 54 Q 40 51 47 54" stroke="#5A5247" stroke-width="2" fill="none"/></svg>`,
sad: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><circle cx="32" cy="40" r="3.5" fill="#5A5247"/><circle cx="48" cy="40" r="3.5" fill="#5A5247"/><path d="M 32 53 Q 40 50 48 53" stroke="#5A5247" stroke-width="2" fill="none"/></svg>`,
overwhelmed: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><circle cx="40" cy="54" r="5" fill="#5A5247"/><circle cx="32" cy="41" r="3"/><circle cx="48" cy="41" r="3"/></svg>`,
numb: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><line x1="28" y1="42" x2="36" y2="42" stroke="#5A5247" stroke-width="2"/><line x1="44" y1="42" x2="52" y2="42" stroke="#5A5247" stroke-width="2"/></svg>`,
restless: `<svg class="monkey-face" viewBox="0 0 80 80"><circle cx="40" cy="42" r="26" fill="#D4A574"/><circle cx="32" cy="40" r="4"/><circle cx="48" cy="40" r="4"/><path d="M 33 53 Q 40 56 47 53" stroke="#5A5247" stroke-width="2" fill="none"/></svg>`
};

/* 2. CORE LOGIC & API FETCH */
async function createEmotionPage(emotion) {
const data = emotionsData[emotion];
const face = monkeyFaces[emotion];
const home = document.getElementById('home');
const display = document.getElementById('emotion-pages');

// UI Change
home.classList.remove('active');
display.innerHTML = '<p class="subtitle">Bean is fetching a special quote...</p>';
display.classList.add('active');

// AJAX API Call
let quote = "You're doing great.";
try {
const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
const json = await res.json();
const quoteData = JSON.parse(json.contents);
quote = `${quoteData[0].q} — ${quoteData[0].a}`;
} catch (e) { console.log(e); }

// DOM Manipulation: Render Page
display.innerHTML = `
<div class="emotion-page">
<button class="back-btn" onclick="location.reload()">← Back to Bean</button>
<div class="emotion-header">
<div class="monkey-face">${face}</div>
<h2 class="emotion-title">${data.title}</h2>
</div>
<div class="activity">
<p><strong>Bean's Wisdom:</strong></p>
<blockquote style="font-style: italic;">"${quote}"</blockquote>
</div>
<div class="section">
<h3>Reflect with Bean</h3>
<div class="questions">
${data.questions.map(q => `<div class="question-card"><p>${q}</p></div>`).join('')}
</div>
</div>
<div class="section">
<h3>${data.activity.title}</h3>
<div class="activity-steps">
${data.activity.steps.map((step, i) => `<p><strong>${i+1}.</strong> ${step}</p>`).join('')}
</div>
</div>
</div>
`;
}

/* 3. EVENT LISTENERS */
document.querySelectorAll('.emotion-card').forEach(card => {
card.addEventListener('click', () => createEmotionPage(card.dataset.emotion));
});