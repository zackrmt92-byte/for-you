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

function initParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = window.innerWidth < 600 ? 10 : 20; // Fewer particles on phone for better performance
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2 + 'px';
        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(particle);
    }
}

function generateMessage() {
    const display = document.getElementById('message-display');
    const music = document.getElementById('piano-music');
    const bg = document.querySelector('.bg-gradient');

    if (!musicStarted) {
        music.play().catch(() => console.log("Audio waiting for interaction"));
        music.volume = 0.3;
        musicStarted = true;
    }

    // Visual Pulse for Phone
    bg.style.background = "radial-gradient(circle at center, #2a344a 0%, #0d1117 100%)";
    setTimeout(() => {
        bg.style.background = "radial-gradient(circle at center, #1a1f2e 0%, #0d1117 100%)";
    }, 800);

    display.style.opacity = 0;
    display.style.transform = "translateY(10px) scale(0.98)";

    setTimeout(() => {
        if (availableQuotes.length === 0) {
            availableQuotes = [...allQuotes];
        }

        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        const selectedQuote = availableQuotes[randomIndex];
        availableQuotes.splice(randomIndex, 1);

        display.innerText = selectedQuote;
        display.style.opacity = 1;
        display.style.transform = "translateY(0px) scale(1)";
    }, 600);
}

function toggleMute() {
    const music = document.getElementById('piano-music');
    const link = document.querySelector('.mute-link');
    music.muted = !music.muted;
    link.innerText = music.muted ? "Unmute Music" : "Mute Music";
}

initParticles();