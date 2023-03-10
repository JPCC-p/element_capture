chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message !== "Capture") return;
        toggle_outline();

        const CaptureElement = (target) => {
            var style = document.getElementById('__capture__')
            if (!style) { return }
            target.preventDefault();
            capture(target, request);
            /*if (!request.data.Capture_Continue) { window.removeEventListener("click", CaptureElement.bind(request)); }    やり方わからんかった*/
        }
        // イベント登録
        if (document.body.classList.contains("__capture__")) return;
        document.body.classList += "__capture__";
        if (request.data.Capture_Continue === "true") {
            window.addEventListener("click", CaptureElement.bind(request));
        }
        else {
            window.addEventListener("click", CaptureElement.bind(request), { once: true });
        }
    }
);
function toggle_outline() {
    var style = document.getElementById('__capture__')
    if (style) { style.remove(); return }
    var css = 'body *:hover {outline: solid 1px white !important;box-sizing: border-box !important;}'
    style = document.createElement('style')
    style.setAttribute('id', '__capture__')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
    //ContinueがTrueのときaddeventlistnerが重複する
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
        if (!request.data.Capture_Mode) {
            request.data.Capture_Mode = "Copy";
        }
        if (!request.data.Capture_Format) {
            request.data.Capture_Format = "png";
        }
        Base64ToImage(response.data, request.data.Capture_Mode, request.data.Capture_Format);
    });
}
function Base64ToImage(base64img, mode, format) {
    console.log(mode)
    switch (mode) {
        case "Download":
            download_img(base64img);
            break;
        case "Copy":
            copy_img(base64img, format);
            break;
        case "Copy&Download":
            copy_img(base64img, format);
            download_img(base64img);
            break;
        default:
            console.log("Unexpected")
    }
}
function copy_img(base64img, format) {
    var blob = bin2blob(base64img)
    switch (format) {
        case "png":
            var item = new ClipboardItem({
                "image/png": blob
            });
            break;
        // case "jpeg":
        //     var item = new ClipboardItem({
        //         "image/jpeg": blob
        //     });
        //     break;
        // case "webp":
        //     var item = new ClipboardItem({
        //         "image/webp": blob
        //     });
        //     break;
        default:
            console.log("Unexpected");
    }
    try {
        navigator.clipboard.write([item]);
    } catch (er) {
        console.log(er)
    }
}
function download_img(base64img) {
    var blob = bin2blob(base64img);
    let dlLink = document.createElement("a");
    const dataUrl = URL.createObjectURL(blob);
    dlLink.href = dataUrl;

    const fileName = `${document.title + Date.now().toString().slice(-5)}.${blob.type.replace("image/", "")}`; // 適当
    dlLink.download = fileName;

    dlLink.click();
    dlLink.remove();
}
function bin2blob(base64img) {
    // バイナリ変換
    var bin = atob(base64img);
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    var blob = new Blob([buffer], { type: 'image/png' }); //. イメージバッファから Blob を生成
    return blob;
}