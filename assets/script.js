// Matrix-style letter rain inside the hero banner (gold/teal, no pink)
(function matrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  const hero = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 18;
  const colors = ["#17b8a6", "#5b3ea6", "#ffcf56"];
  let columns, drops;

  function resize() {
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -40);
  }
  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.fillStyle = "rgba(20, 12, 40, 0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px "Courier New", monospace`;

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = 0.55;
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      ctx.globalAlpha = 1;

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Balloon pop -> reveal birthday message modal
(function balloonPop() {
  const balloons = document.querySelectorAll("[data-balloon]");
  const modal = document.getElementById("message-modal");
  const closeBtn = document.getElementById("modal-close");
  const burstColors = ["#ffcf56", "#ff8c42", "#17b8a6", "#a78bfa"];

  function spawnBurst(x, y) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      p.style.position = "fixed";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.width = "7px";
      p.style.height = "7px";
      p.style.borderRadius = "2px";
      p.style.background = burstColors[Math.floor(Math.random() * burstColors.length)];
      p.style.zIndex = "15";
      p.style.pointerEvents = "none";
      p.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 650);
    }
  }

  function openModal() {
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("show"));
  }

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => { modal.hidden = true; }, 250);
  }

  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      if (balloon.classList.contains("popped")) return;
      const rect = balloon.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      balloon.classList.add("popped");
      setTimeout(openModal, 200);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
})();

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
