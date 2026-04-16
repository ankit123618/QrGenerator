let qrCanvas = null;
const EXPORT_PADDING = 20;

function generateQR() {
    let url = document.getElementById("urlInput").value.trim();
    const qrBox = document.getElementById("qrBox");
    const downloadBtn = document.getElementById("downloadBtn");

    qrBox.innerHTML = "";
    downloadBtn.hidden = true;
    qrCanvas = null;

    if (!url) {
        alert("Enter a URL");
        return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Bigger quiet zone for watches
    const wrapper = document.createElement("div");
    wrapper.className = "qr-frame";

    qrBox.appendChild(wrapper);

    const qrDiv = document.createElement("div");
    wrapper.appendChild(qrDiv);

    new QRCode(qrDiv, {
        text: url,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        qrCanvas = qrDiv.querySelector("canvas");

        if (!qrCanvas) {
            const qrImage = qrDiv.querySelector("img");

            if (qrImage) {
                const fallbackCanvas = document.createElement("canvas");
                const fallbackSize = qrImage.naturalWidth || 100;
                fallbackCanvas.width = fallbackSize;
                fallbackCanvas.height = fallbackSize;

                const ctx = fallbackCanvas.getContext("2d");
                ctx.drawImage(qrImage, 0, 0, fallbackCanvas.width, fallbackCanvas.height);
                qrCanvas = fallbackCanvas;
            }
        }

        if (qrCanvas) {
            downloadBtn.hidden = false;
        }
    }, 400);
}

function downloadQR() {
    if (!qrCanvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = qrCanvas.width + EXPORT_PADDING * 2;
    exportCanvas.height = qrCanvas.height + EXPORT_PADDING * 2;

    const exportContext = exportCanvas.getContext("2d");
    exportContext.fillStyle = "#ffffff";
    exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportContext.drawImage(qrCanvas, EXPORT_PADDING, EXPORT_PADDING);

    const link = document.createElement("a");
    link.download = "watch-qr.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
}
