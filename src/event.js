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
                    Base64ToImage(result, request.data.Capture_Mode, request.data.Capture_Format)
                    chrome.debugger.detach({ tabId: request.tabid }, () => {
                        console.log('detach ok');
                    });
                }
            )
            sendResponse({ response: "listeher is successful" });
            return;
        }
        );
    }
)
function Base64ToImage(base64img, mode, format) {
    var img_element = document.createElement("img");
    img_element.src = `data:image/${format};base64,${base64img}`;
    switch (mode) {
        case "Download":
            img_element.setAttribute("download");
            img_element.click();
            break;
        case "Copy":
            copy_img(base64img,format);
            break;
        case "Copy&Download":
            img_element.setAttribute("download");
            img_element.click();
            copy_img(base64img,format);
            break;
        default:
            console.log("Unexpected")
    }
}
function copy_img(base64img,format){
    async () => {
        switch (format) {
            case "png":
                var item = new ClipboardItem({
                    "image/png": base64img
                });
                break;
            case "jpeg":
                var item = new ClipboardItem({
                    "image/jpeg": base64img
                });
                break;
            case "webp":
                var item = new ClipboardItem({
                    "image/webp": base64img
                });
                break;
            default:
                console.log("Unexpected");
        }
        await navigator.clipboard.write([item]);
    }
}