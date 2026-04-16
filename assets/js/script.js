let qrCanvas = null;

function generateQR() {
    let url = document.getElementById("urlInput").value.trim();
    const qrBox = document.getElementById("qrBox");
    const downloadBtn = document.getElementById("downloadBtn");

    qrBox.innerHTML = "";
    downloadBtn.style.display = "none";
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
    wrapper.style.background = "white";
    wrapper.style.padding = "20px";
    wrapper.style.display = "inline-block";

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
        if (qrCanvas) {
            downloadBtn.style.display = "inline-block";
        }
    }, 400);
}

function downloadQR() {
    if (!qrCanvas) return;

    const link = document.createElement("a");
    link.download = "watch-qr.png";
    link.href = qrCanvas.toDataURL("image/png");
    link.click();
}
