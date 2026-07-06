const qrCodes = {};

qrCodes.yara = new QRCodeStyling({
  width: 220,
  height: 220,
  type: "svg",
  data: "https://hatoonj.github.io/happy-birthday/yara/",
  margin: 8,
  qrOptions: { errorCorrectionLevel: "H" },
  dotsOptions: {
    type: "rounded",
    gradient: {
      type: "linear",
      rotation: 0.7,
      colorStops: [
        { offset: 0, color: "#17b8a6" },
        { offset: 0.5, color: "#ffcf56" },
        { offset: 1, color: "#ff8c42" },
      ],
    },
  },
  backgroundOptions: { color: "transparent" },
  cornersSquareOptions: { type: "extra-rounded", color: "#ffcf56" },
  cornersDotOptions: { type: "dot", color: "#ff8c42" },
});
qrCodes.yara.append(document.getElementById("qr-yara"));

qrCodes.reem = new QRCodeStyling({
  width: 220,
  height: 220,
  type: "svg",
  data: "https://hatoonj.github.io/happy-birthday/reem/",
  margin: 8,
  qrOptions: { errorCorrectionLevel: "H" },
  dotsOptions: {
    type: "rounded",
    gradient: {
      type: "linear",
      rotation: 0.7,
      colorStops: [
        { offset: 0, color: "#39ff9c" },
        { offset: 1, color: "#4ad9ff" },
      ],
    },
  },
  backgroundOptions: { color: "transparent" },
  cornersSquareOptions: { type: "extra-rounded", color: "#4ad9ff" },
  cornersDotOptions: { type: "dot", color: "#39ff9c" },
});
qrCodes.reem.append(document.getElementById("qr-reem"));

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function buildAndDownload(target, opts) {
  const blob = await qrCodes[target].getRawData("png");
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const W = 320, H = 460;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, W, H);
    opts.bgColors.forEach((c, i) => grad.addColorStop(i / (opts.bgColors.length - 1), c));
    ctx.fillStyle = grad;
    roundRectPath(ctx, 0, 0, W, H, 24);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = opts.textColor;
    ctx.font = 'bold 26px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${opts.emoji} Scan Me ${opts.emoji}`, W / 2, 50);

    const boxSize = 260, boxX = (W - boxSize) / 2, boxY = 75;
    ctx.fillStyle = "#ffffff";
    roundRectPath(ctx, boxX, boxY, boxSize, boxSize, 16);
    ctx.fill();

    const qrSize = 232;
    ctx.drawImage(img, boxX + (boxSize - qrSize) / 2, boxY + (boxSize - qrSize) / 2, qrSize, qrSize);

    ctx.fillStyle = opts.textColor;
    ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${opts.name}'s Birthday`, W / 2, boxY + boxSize + 40);
    ctx.globalAlpha = 0.85;
    ctx.font = '14px "Segoe UI", Arial, sans-serif';
    ctx.fillText(opts.subtext, W / 2, boxY + boxSize + 64);
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
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    if (target === "yara") {
      buildAndDownload("yara", {
        bgColors: ["#241646", "#5b3ea6", "#17b8a6"],
        textColor: "#ffcf56",
        emoji: "🎉",
        name: "Yara",
        subtext: "tap to open your surprise",
      });
    } else {
      buildAndDownload("reem", {
        bgColors: ["#0d1117", "#10222a"],
        textColor: "#39ff9c",
        emoji: "💻",
        name: "Reem",
        subtext: "tap to open your surprise",
      });
    }
  });
});
