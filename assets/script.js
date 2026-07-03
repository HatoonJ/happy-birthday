// Countdown to Yara's birthday (July 7)
function getNextBirthday() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 6, 7, 0, 0, 0); // month is 0-indexed: 6 = July
  const endOfBirthday = new Date(year, 6, 8, 0, 0, 0);
  if (now >= endOfBirthday) {
    target = new Date(year + 1, 6, 7, 0, 0, 0);
  }
  return target;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextBirthday();
  const isToday = now.toDateString() === new Date(now.getFullYear(), 6, 7).toDateString();
  const messageEl = document.getElementById("countdown-message");
  const countdownEl = document.getElementById("countdown");

  if (isToday) {
    countdownEl.style.display = "none";
    messageEl.textContent = "🎂 It's Yara's birthday today! 🎉";
    return;
  }

  const diff = target - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  messageEl.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Lightweight confetti animation (no pink!)
(function confetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const colors = ["#ffcf56", "#ff8c42", "#17b8a6", "#a78bfa", "#ffffff"];
  let pieces = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function makePiece() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1 + Math.random() * 2.5,
      drift: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      spin: Math.random() * 6 - 3,
    };
  }

  const count = Math.min(70, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < count; i++) pieces.push(makePiece());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.spin;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
