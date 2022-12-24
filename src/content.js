chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message !== "Capture") return;
        // document.getElementsByTagName("h1")[0].innerHTML = request.data;
        // console.log(request.data);
        toggle_outline();
        window.addEventListener("click", (target) => {
            target.preventDefault()
            capture(target,request);
        });
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
function capture(target,request) {
    capture_mode = request.data;
    const x = target.clientX;
    const y = target.clientY;
    // クリックした座標にあるElementを取得
    const coodinate = document.elementFromPoint(x, y)
    const rect = coodinate.getBoundingClientRect();
    console.log(rect)
}