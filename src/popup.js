document.getElementById("btn").addEventListener("click", async () => {
    onRun();
});

function onRun() {
    chrome.storage.sync.get(null, (options) => {
        // test用背景変更
        document.body.style.backgroundColor = "#fee";
        alert(options.Capture_Name)
        //content.jsに送る
        chrome.tab.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: "Capture",
                "data": options.Capture_Name
            });
        });
    });
}