chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "I want to change to designMode!!") {
            document.designMode = "on";
            var elements = document.querySelectorAll('a');
            elements.forEach(function (element) {
                element.addEventListener("click", function (event) {
                    event.preventDefault();
                }, false);
            });
            sendResponse({ message: "designMode changed!!" });
        }
    }
);