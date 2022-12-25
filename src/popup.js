document.getElementById("btn").addEventListener("click", async () => {
    onRun();
});

function onRun() {
    chrome.storage.sync.get(null, (options) => {
        document.body.style.backgroundColor = "lightgreen";
        // console.log(options.Capture_Mode)
        //content.jsに送る
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: "Capture",
                "data": {
                    Capture_Mode: options.Capture_Mode,
                    Capture_Format: options.Capture_Format
                },
                "tabid": tabs[0].id
            });
        });
    });
}