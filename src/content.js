chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message !== "Capture") return;
        toggle_outline();

        const CaptureElement = (target) => {
            var style = document.getElementById('__capture__')
            if (!style) { return }
            target.preventDefault();
            capture(target, request);
        }
        // イベント削除
        window.removeEventListener("click", CaptureElement)
        // イベント登録
        window.addEventListener("click", CaptureElement);
    }
);
function toggle_outline() {
    var style = document.getElementById('__capture__')
    if (style) { style.remove(); return }
    var css = 'body *:hover {outline: solid 1px white;box-sizing: border-box;}'
    style = document.createElement('style')
    style.setAttribute('id', '__capture__')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
}
function capture(target, request) {
    const x = target.clientX;
    const y = target.clientY;
    // クリックした座標にあるElementを取得
    const coodinate = document.elementFromPoint(x, y)
    const rect = coodinate.getBoundingClientRect();
    console.log(rect)   // DOMRect {x: 378, y: 189, width: 912, height: 131, top: 189, …}

    //event.jsに送る
    chrome.runtime.sendMessage({
        message: "GetCapture",
        "data": {
            "Capture_Mode": request.data.Capture_Mode,
            "Capture_Format": request.data.Capture_Format,
            "coodinate": coodinate,
            "rect": rect
        },
        "tabid": request.tabid,
    }, function (response) {
        Base64ToImage(response.data, request.data.Capture_Mode, request.data.Capture_Format);
    });
}
function Base64ToImage(base64img, mode, format) {
    var img_element = document.createElement("img");
    img_element.src = `data:image/${format};base64,${base64img}`;
    console.log(mode)
    switch (mode) {
        case "Download":
            img_element.setAttribute("download");
            img_element.click();
            break;
        case "Copy":
            copy_img(base64img, format);
            break;
        case "Copy&Download":
            img_element.setAttribute("download");
            img_element.click();
            copy_img(base64img, format);
            break;
        default:
            console.log("Unexpected")
    }
}
function copy_img(base64img, format) {
    // バイナリ変換
    var bin = atob(base64img);
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    var blob = new Blob([buffer], { type: 'image/png' }); //. イメージバッファから Blob を生成

    switch (format) {
        case "png":
            var item = new ClipboardItem({
                "image/png": blo
            });
            break;
        case "jpeg":
            var item = new ClipboardItem({
                "image/jpeg": blo
            });
            break;
        case "webp":
            var item = new ClipboardItem({
                "image/webp": blo
            });
            break;
        default:
            console.log("Unexpected");
    }
    try {
        navigator.clipboard.write([item]);
    } catch (er) {
        console.log(er)
    }
}