chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "Capture!") {
            document.getElementsByTagName("h1")[0].innerHTML = request.data
            console.log(request.data)
        }
    }
);