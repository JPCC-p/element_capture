document.querySelectorAll(".color").forEach((elm) => {
    elm.addEventListener("click", (e) => {
        var options = {
            Capture_Mode: e.target.innerText
        };
        chrome.storage.sync.set(options);
        document.querySelector("#msg").innerText = `Set option to ${options.Capture_Mode}.`;
    });
});
document.querySelectorAll(".type").forEach((elem) => {
    elem.addEventListener("click", (e) => {
        var options = {
            Capture_Format: e.target.innerText
        };
        chrome.storage.sync.set(options);
        document.querySelector("#msg2").innerText = `Set option to ${options.Capture_Format}.`;
    });
});
document.querySelectorAll(".continue").forEach((elem) => {
    elem.addEventListener("click", (e) => {
        var options = {
            Capture_Continue: e.target.innerText
        };
        chrome.storage.sync.set(options);
        document.querySelector("#msg3").innerText = `Set option to ${options.Capture_Format}.`;
    });
});