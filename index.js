const input = document.getElementById("text");
const generate = document.getElementById("generate");
const qrsection = document.getElementById("qrsection");
const copyUrl = document.getElementById("copyUrl");
const downloadQr = document.getElementById("downloadQr");
const qrCode = document.getElementById("qrCode");
const textValue = document.getElementById("textValue");

if (input && textValue) {
    input.addEventListener("input", () => {
        textValue.textContent = input.value;
    });
}

if (generate) {
    generate.addEventListener("click", () => {
        const value = input.value.trim();
        if (!value) return;

        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(value)}`;
        qrsection.classList.remove("hidden");
        qrsection.classList.remove("animate-fade-in");
        void qrsection.offsetWidth;
        qrsection.classList.add("animate-fade-in");
    });
}

if (copyUrl) {
    copyUrl.addEventListener("click", async () => {
        const value = input.value.trim();
        if (!value) return;

        await navigator.clipboard.writeText(value);
        copyUrl.innerHTML = "<i class='fa-solid fa-check'></i> Copied";

        setTimeout(() => {
            copyUrl.innerHTML = "<i class='fa-solid fa-copy'></i> Copy Text";
        }, 2000);
    });
}

if (downloadQr) {
    downloadQr.addEventListener("click", async () => {
        if (!qrCode.src) return;

        const originalText = downloadQr.innerHTML;
        downloadQr.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Saving...";

        try {
            const res = await fetch(qrCode.src);
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
            console.error(err);
        } finally {
            downloadQr.innerHTML = originalText;
        }
    });
}