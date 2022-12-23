chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "Capture") {
            document.body.style.backgroundColor = "#777";
            document.getElementsByTagName("h1")[0].innerHTML = request.data;
            console.log(request.data);
            toggle_outline();
        }
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