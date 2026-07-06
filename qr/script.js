const qrConfigs = {
  yara: {
    data: "https://hatoonj.github.io/happy-birthday/yara/",
    colorStops: [
      { offset: 0, color: "#17b8a6" },
      { offset: 0.5, color: "#ffcf56" },
      { offset: 1, color: "#ff8c42" },
    ],
    cornerColor: "#ffcf56",
    dotColor: "#ff8c42",
    bgColors: ["#241646", "#5b3ea6", "#17b8a6"],
    textColor: "#ffcf56",
    emoji: "🎉",
    name: "Yara",
    subtext: "tap to open your surprise",
  },
  reem: {
    data: "https://hatoonj.github.io/happy-birthday/reem/",
    colorStops: [
      { offset: 0, color: "#39ff9c" },
      { offset: 1, color: "#4ad9ff" },
    ],
    cornerColor: "#4ad9ff",
    dotColor: "#39ff9c",
    bgColors: ["#0d1117", "#10222a"],
    textColor: "#39ff9c",
    emoji: "💻",
    name: "Reem",
    subtext: "tap to open your surprise",
  },
};

function makeQrCode(config, size) {
  return new QRCodeStyling({
    width: size,
    height: size,
    type: "svg",
    data: config.data,
    margin: 8,
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: {
      type: "rounded",
      gradient: { type: "linear", rotation: 0.7, colorStops: config.colorStops },
    },
    backgroundOptions: { color: "transparent" },
    cornersSquareOptions: { type: "extra-rounded", color: config.cornerColor },
    cornersDotOptions: { type: "dot", color: config.dotColor },
  });
}

// on-page preview (small, vector, always crisp)
makeQrCode(qrConfigs.yara, 220).append(document.getElementById("qr-yara"));
makeQrCode(qrConfigs.reem, 220).append(document.getElementById("qr-reem"));

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// high-resolution composite for sharing/printing
const SCALE = 3;

async function buildAndDownload(target) {
  const opts = qrConfigs[target];
  const qrPixelSize = Math.round(232 * SCALE);
  const hiResQr = makeQrCode(opts, qrPixelSize);
  const blob = await hiResQr.getRawData("png");
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const W = 320 * SCALE, H = 460 * SCALE;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, W, H);
    opts.bgColors.forEach((c, i) => grad.addColorStop(i / (opts.bgColors.length - 1), c));
    ctx.fillStyle = grad;
    roundRectPath(ctx, 0, 0, W, H, 24 * SCALE);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = opts.textColor;
    ctx.font = `bold ${26 * SCALE}px "Segoe UI", Arial, sans-serif`;
    ctx.fillText(`${opts.emoji} Scan Me ${opts.emoji}`, W / 2, 50 * SCALE);

    const boxSize = 260 * SCALE, boxX = (W - boxSize) / 2, boxY = 75 * SCALE;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, boxX, boxY, boxSize, boxSize, 16 * SCALE);
    ctx.fill();

    ctx.drawImage(img, boxX + (boxSize - qrPixelSize) / 2, boxY + (boxSize - qrPixelSize) / 2, qrPixelSize, qrPixelSize);

    ctx.fillStyle = opts.textColor;
    ctx.font = `bold ${20 * SCALE}px "Segoe UI", Arial, sans-serif`;
    ctx.fillText(`${opts.name}'s Birthday`, W / 2, boxY + boxSize + 40 * SCALE);
    ctx.globalAlpha = 0.85;
    ctx.font = `${14 * SCALE}px "Segoe UI", Arial, sans-serif`;
    ctx.fillText(opts.subtext, W / 2, boxY + boxSize + 64 * SCALE);
    ctx.globalAlpha = 1;

    const link = document.createElement("a");
    link.download = `${target}-birthday-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

document.querySelectorAll("button.download").forEach((btn) => {
  btn.addEventListener("click", () => buildAndDownload(btn.dataset.target));
});
