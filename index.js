const input = document.getElementById("text");
const generate = document.getElementById("generate");

const qrsection = document.getElementById("qrsection");
const copyUrl = document.getElementById("copyUrl");
const downloadQr = document.getElementById("downloadQr");
const qrCode = document.getElementById("qrCode");
const textValue = document.getElementById("textValue");

input.addEventListener("input", () => {textValue.innerHTML = input.value;});

generate.addEventListener("click", () => {
    qrsection.classList.remove("hidden");
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(input.value)}`;
});

copyUrl.addEventListener("click", () => {
    navigator.clipboard.writeText(input.value);
    copyUrl.innerHTML = "<i class='fa-solid fa-check'></i> Copied";
});

downloadQr.addEventListener("click", async () => {
    const res = await fetch(qrCode.src);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr.png";
    link.click();
    URL.revokeObjectURL(url);
});   