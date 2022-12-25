document.querySelectorAll(".color").forEach((elm) => {
    elm.addEventListener("click", (e) => {
        var options = {
            Capture_Mode: e.target.innerText,
            Caotyre_Format: "png"   // set
        }
        chrome.storage.sync.set(options);
        document.querySelector("#msg").innerText = `Set option to ${options.Capture_Mode}.`;
    });
});