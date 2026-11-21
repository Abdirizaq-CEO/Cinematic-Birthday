// ==============================
// PERSONALIZE YOUR BIRTHDAY VIDEO
// ==============================

const birthdayName = "Someone Special";

// Change this name to the birthday person's name.

// ==============================
// ELEMENTS
// ==============================

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const celebration = document.getElementById("celebration");

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const closeLetter = document.getElementById("closeLetter");

const musicBtn = document.getElementById("musicBtn");
const personName = document.getElementById("personName");

personName.textContent = "Happy Birthday, " + birthdayName + " ❤️";

// ==============================
// COUNTDOWN
// ==============================

startBtn.addEventListener("click", function () {

    startBtn.style.display = "none";

    let count = 3;

    countdown.textContent = count;

    const timer = setInterval(function () {

        count--;

        if (count > 0) {
            countdown.textContent = count;
        } else {
            countdown.textContent = "🎉";

            clearInterval(timer);

            setTimeout(function () {
                intro.classList.add("hidden");
                celebration.classList.remove("hidden");

                launchFireworks();
                startBalloons();

            }, 1000);
        }

    }, 1000);

});

// ==============================
// BIRTHDAY LETTER
// ==============================

letterBtn.addEventListener("click", function () {
    letter.classList.remove("hidden");
});

closeLetter.addEventListener("click", function () {
    letter.classList.add("hidden");
});

// Close letter if the dark background is clicked
letter.addEventListener("click", function (event) {
    if (event.target === letter) {
        letter.classList.add("hidden");
    }
});

// ==============================
// FLOATING BALLOONS
// ==============================

function startBalloons() {

    const balloonEmojis = ["🎈", "💖", "🎈", "🎊", "🎈"];

    setInterval(function () {

        const balloon = document.createElement("div");

        balloon.textContent =
            balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

        balloon.style.position = "fixed";
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.bottom = "-60px";
        balloon.style.fontSize = (30 + Math.random() * 30) + "px";
        balloon.style.zIndex = "2";
        balloon.style.pointerEvents = "none";

        document.body.appendChild(balloon);

        balloon.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                { transform: "translateY(-110vh) rotate(25deg)", opacity: 0 }
            ],
            {
                duration: 7000 + Math.random() * 3000,
                easing: "linear"
            }
        );

        setTimeout(function () {
            balloon.remove();
        }, 10000);

    }, 700);

}

// ==============================
// FIREWORKS
// ==============================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function createFirework(x, y) {

    const colors = [
        "#ff4fd8",
        "#ffd700",
        "#00ffff",
        "#ffffff",
        "#ff7b00",
        "#8c52ff"
    ];

    for (let i = 0; i < 80; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1;

        particles.push({
            x: x,
            y: y,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            life: 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 1
        });

    }

}

function animateFireworks() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle, index) {

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        particle.velocityY += 0.04;
        particle.life--;

        ctx.globalAlpha = particle.life / 100;
        ctx.fillStyle = particle.color;

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }

    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

function launchFireworks() {

    setInterval(function () {

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;

        createFirework(x, y);

    }, 900);

}

// ==============================
// BACKGROUND MUSIC
// No external music files needed.
// ==============================

let audioContext;
let musicPlaying = false;
let musicTimer;

const melody = [
    523, 523, 587, 523, 698, 659,
    523, 523, 587, 523, 784, 698,
    523, 523, 1046, 880, 698, 659, 587,
    932, 932, 880, 698, 784, 698
];

function playNote(frequency, duration) {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.12,
        audioContext.currentTime + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

function startMusic() {

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    let index = 0;

    musicTimer = setInterval(function () {

        playNote(melody[index], 0.4);

        index++;

        if (index >= melody.length) {
            index = 0;
        }

    }, 450);

    musicPlaying = true;
    musicBtn.textContent = "🔇 Stop Music";

}

function stopMusic() {

    clearInterval(musicTimer);

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    musicPlaying = false;
    musicBtn.textContent = "🎵 Play Music";

}

musicBtn.addEventListener("click", function () {

    if (musicPlaying) {
        stopMusic();
    } else {
        startMusic();
    }

});

// ==============================
// END
// ==============================