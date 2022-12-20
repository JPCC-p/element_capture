document.querySelectorAll(".color").forEach((elm) => {
    elm.addEventListener("click", (e) => {
        var options = {
            Capture_Name: e.target.innerText
        }
        chrome.storage.sync.set(options);
        document.querySelector("#msg").innerText = `Set option to ${options.Capture_Name}.`;
    });
});