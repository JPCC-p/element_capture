chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "Capture") {
            document.body.style.backgroundColor = "#fee";
            document.getElementsByTagName("h1")[0].innerHTML = request.data
            console.log(request.data)
        }
    }
);