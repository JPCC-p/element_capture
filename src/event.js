// クリック時の挙動を設定  
chrome.contextMenus.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "I want to change to designMode!!" }, function (response) {
            console.log(response);
        });
    });
});