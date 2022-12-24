//~eventは特に使わないかも, content.js で十分~
//debbuger使えなかったわ
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message !== "GetCapture") { return }

        const rect = request.data.rect;

        chrome.debugger.attach({ tabId: request.tabid }, "1.3", () => { console.log("Attach debugger") })
        chrome.debugger.sendCommand(
            { tabId: request.tabid },
            "Page.captureScreenshot",
            {
                // format: request.data.format, png,jpeg,webp
                clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 },
                captureBeyondViewPort: true
            }
        )
        chrome.debugger.detach({ tabId: request.tabid }, () => {
            console.log('detach ok');
        });

        sendResponse({ response: "listeher is successful" });
        return;
    }
);
