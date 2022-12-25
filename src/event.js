//~eventは特に使わないかも, content.js で十分~
//debbuger使えなかったわ
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message !== "GetCapture") { return }

        const rect = request.data.rect;

        chrome.debugger.attach({ tabId: request.tabid }, "1.3", async () => {
            console.log("Attach debugger")
            // デバッガ起動待機
            await new Promise((resolve) => setTimeout(resolve, 500));
            chrome.debugger.sendCommand(
                { tabId: request.tabid },
                "Page.captureScreenshot",
                {
                    // format: request.data.format, png,jpeg,webp
                    clip: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 },
                    captureBeyondViewPort: true
                },
                (result) => {
                    sendResponse(result);
                    chrome.debugger.detach({ tabId: request.tabid }, () => {
                        console.log('detach ok');
                    });
                }
            )
            return;
        });
        return true;
    }
)