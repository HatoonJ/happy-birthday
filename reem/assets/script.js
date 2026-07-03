// Matrix-style letter rain (green/cyan, hacker terminal vibe)
(function matrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 16;
  const colors = ["#39ff9c", "#4ad9ff"];
  let columns, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -40);
  }
  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.fillStyle = "rgba(5, 10, 14, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px "Consolas", monospace`;

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = 0.35;
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

// Typewriter effect for the pre-scripted terminal lines
(function typewriter() {
  const nodes = document.querySelectorAll(".typed");
  let delay = 200;
  nodes.forEach((node) => {
    const text = node.dataset.text;
    let i = 0;
    setTimeout(function type() {
      node.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) setTimeout(type, 45);
    }, delay);
    delay += text.length * 45 + 500;
  });
})();

// Run command -> reveal birthday message modal
(function runCelebrate() {
  const btn = document.getElementById("run-btn");
  const modal = document.getElementById("message-modal");
  const closeBtn = document.getElementById("modal-close");
  const terminalBody = document.getElementById("terminal-body");

  function openModal() {
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("show"));
  }

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => { modal.hidden = true; }, 250);
  }

  btn.addEventListener("click", () => {
    if (btn.classList.contains("running")) return;
    btn.classList.add("running");

    const progress = document.createElement("div");
    progress.className = "line output";
    progress.textContent = "compiling wishes... 100%";
    terminalBody.appendChild(progress);

    setTimeout(openModal, 500);
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
})();
