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

document.querySelectorAll("button.download").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    qrCodes[target].download({ name: `${target}-birthday-qr`, extension: "png" });
  });
});
