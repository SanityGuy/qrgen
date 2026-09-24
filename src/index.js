const input = document.getElementById("text");
const generate = document.getElementById("generate");
const qrsection = document.getElementById("qrsection");
const copyText = document.getElementById("copyText");
const downloadQr = document.getElementById("downloadQr");
const qrCode = document.getElementById("qrCode");
const textValue = document.getElementById("textValue");
const sizeValue = document.getElementById("sizeValue");
const sizewidth = document.getElementById("sizewidth");
const sizeheight = document.getElementById("sizeheight");

const DEFAULT_SIZE = 400;
const MIN_SIZE = 100;
const MAX_SIZE = 2000;

const syncQrSize = (source) => {
    if (!sizewidth || !sizeheight) return;

    const numericValue = source.value.replace(/\D/g, "");
    source.value = numericValue;

    if (numericValue) {
        sizewidth.value = numericValue;
        sizeheight.value = numericValue;
    }
};

if (sizewidth && sizeheight) {
    sizewidth.addEventListener("input", () => syncQrSize(sizewidth));
    sizeheight.addEventListener("input", () => syncQrSize(sizeheight));
}

input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        generate?.click();
    }
});


generate?.addEventListener("click", () => {
    const value = input?.value.trim();

    if (!value) return;

    const rawSize = (sizewidth?.value || sizeheight?.value || "")
        .replace(/\D/g, "");

    const parsedSize = Number(rawSize);

    const size = Math.min(
        Math.max(parsedSize || DEFAULT_SIZE, MIN_SIZE),
        MAX_SIZE
    );

    const width = size;
    const height = size;

    if (sizewidth) {
        sizewidth.value = size;
    }

    if (sizeheight) {
        sizeheight.value = size;
    }

    qrCode.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${height}&data=${encodeURIComponent(value)}`;

    // Keep the displayed QR proportional to the requested size
    qrCode.width = width;
    qrCode.height = height;

    textValue.textContent = value;
    sizeValue.textContent = `${width}px x ${height}px`;

    qrsection.classList.remove("hidden");
    qrsection.classList.remove("animate-fade-in");

    // Restart animation
    void qrsection.offsetWidth;

    qrsection.classList.add("animate-fade-in");
});

copyText?.addEventListener("click", async () => {
    const value = input?.value.trim();

    if (!value) return;

    const originalText = copyText.innerHTML;

    try {
        await navigator.clipboard.writeText(value);

        copyText.innerHTML =
            "<i class='fa-solid fa-check'></i> Copied";

        setTimeout(() => {
            copyText.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        console.error("Failed to copy text:", err);
    }
});

downloadQr?.addEventListener("click", async () => {
    if (!qrCode?.src) return;

    const originalText = downloadQr.innerHTML;

    downloadQr.innerHTML =
        "<i class='fa-solid fa-spinner fa-spin'></i> Saving...";

    try {
        const res = await fetch(qrCode.src);

        if (!res.ok) {
            throw new Error(`QR request failed: ${res.status}`);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "qr-code.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Failed to download QR code:", err);
    } finally {
        downloadQr.innerHTML = originalText;
    }
});