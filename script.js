const allQuotes = [
    "You are doing a lot more than you realize. It's okay to let go of the pressure.",
    "The world is lucky to have your light. I know I am.",
    "You handle so much with such quiet strength. I admire that so much about you.",
    "I hope you feel as appreciated as you actually are today.",
    "Take a breath. You don't have to carry it all right now.",
    "You are a rare kind of person—brilliant, kind, and completely irreplaceable.",
    "If you could see yourself through my eyes, you’d see someone truly breathtaking.",
    "Your presence makes everything feel a little bit more grounded and beautiful.",
    "You've come so far, and I'm so incredibly proud of the woman you are.",
    "You are enough. You have always been enough. You will always be enough.",
    "I hope your heart is as peaceful as you make mine feel.",
    "You deserve all the goodness you give out to the world—and more.",
    "There is no one else quite like you. That is your power.",
    "You are deeply loved, even on the days you feel like you aren't.",
    "Resting is a skill, and you’ve earned the right to be still tonight.",
    "Your mind is a beautiful place. I hope it's kind to you.",
    "You don't need to do anything to be 'worthy' of love. You just are.",
    "I'm so glad you're in my life. You make my days feel better.",
    "Whatever is heavy on your mind right now, just know you aren't alone.",
    "You are a masterpiece, even in the moments you feel like a work in progress.",
    "Just a reminder: You are wonderful. You are brilliant. You are amazing.",
    "You are the best part of someone's day. (Probably mine.)",
    "I love the way your mind works. You're incredibly sharp.",
    "Be gentle with yourself. You're doing a great job.",
    "You have a heart of gold, and it shows in everything you do."
];

let availableQuotes = [...allQuotes];
let musicStarted = false;

// 1. Initialize Floating Particles
function initParticles() {
    const container = document.getElementById('particle-container');
    const count = window.innerWidth < 600 ? 12 : 25;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2 + 'px';
        p.style.width = size; p.style.height = size;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(p);
    }
}

// 2. Birthday Countdown & Mode Switch
function updateBirthdayLogic() {
    const now = new Date();
    
    const currentYear = now.getFullYear();
    // MONTH is 3 (April), DAY is now 8
    const birthday = new Date(currentYear, 3, 8, 0, 0, 0); 
    
    // If it's already past April 8th this year, look at next year
    if (now > birthday && (now.getDate() !== 8 || now.getMonth() !== 3)) {
        birthday.setFullYear(currentYear + 1);
    }

    const diff = birthday - now;
    // Check if TODAY is April 8th
    const isBirthday = (now.getMonth() === 3 && now.getDate() === 8);

    if (isBirthday) {
        document.body.classList.add('birthday-mode');
        const countdownEl = document.getElementById('birthday-countdown');
        if (countdownEl) countdownEl.style.display = "none";
        
        document.getElementById('message-display').innerHTML = `<div><h1 class="birthday-title">Happy Birthday!</h1><p>To the most amazing woman. Today is all about you.</p></div>`;
        document.querySelector('.action-btn').innerText = "A Birthday Wish";
        
        // Custom Birthday Quotes
        availableQuotes = [
            "May your year be as brilliant as you are.",
            "You deserve every bit of happiness today.",
            "The world got brighter the day you were born.",
            "You are a rare and beautiful soul. Happy Birthday.",
            "Cheers to another year of being completely irreplaceable."
        ];
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timerDigits = document.getElementById('timer-digits');
        if (timerDigits) {
            timerDigits.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
        }
    }
}

// 3. Main Message Action
function generateMessage() {
    const display = document.getElementById('message-display');
    const music = document.getElementById('piano-music');
    const bg = document.querySelector('.bg-gradient');

    if (!musicStarted) {
        music.play().catch(() => {});
        music.volume = 0.3;
        musicStarted = true;
    }

    bg.style.background = "radial-gradient(circle at center, #2a344a 0%, #0d1117 100%)";
    setTimeout(() => { bg.style.background = "radial-gradient(circle at center, #1a1f2e 0%, #0d1117 100%)"; }, 800);

    display.style.opacity = 0;
    display.style.transform = "translateY(10px)";

    setTimeout(() => {
        if (availableQuotes.length === 0) availableQuotes = [...allQuotes];
        const idx = Math.floor(Math.random() * availableQuotes.length);
        display.innerText = availableQuotes[idx];
        availableQuotes.splice(idx, 1);
        display.style.opacity = 1;
        display.style.transform = "translateY(0px)";
    }, 600);
}

function toggleMute() {
    const m = document.getElementById('piano-music');
    m.muted = !m.muted;
    document.querySelector('.mute-link').innerText = m.muted ? "Unmute Music" : "Mute Music";
}

// Start everything
initParticles();
setInterval(updateBirthdayLogic, 1000);
updateBirthdayLogic();