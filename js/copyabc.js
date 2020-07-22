document.body.addEventListener("copy", (function(e) {
    window.getSelection().toString() && window.getSelection().toString().length >= 2 && createSnackbar({
        message: "Please indicate the source!",
        message_cn: "转载请注明出处",
        actionText: "OK",
        duration: 3e3,
        mode: "copybing"
    })
}))
var createSnackbar = function() {
    var previous = null;
    return function(config) {
        var message = config.message,
        message_cn = config.message_cn,
        actionText = config.actionText,
        actionText_cn = config.actionText_cn,
        action = config.action,
        duration = config.duration,
        mode = config.mode;
        previous && previous.dismiss(),
        message_cn && "zh-cn" === (navigator.language || navigator.userLanguage).toLowerCase() && (message = message_cn, actionText = actionText_cn);
        var snackbar = document.createElement("div");
        snackbar.className = "paper-snackbar",
        "copybing" === mode && snackbar.classList.add("snackbar-copybing"),
        snackbar.dismiss = function() {
            this.style.opacity = 0
        };
        var text = document.createTextNode(message);
        if (snackbar.appendChild(text), actionText) {
            action || (action = snackbar.dismiss.bind(snackbar));
            var actionButton = document.createElement("button");
            actionButton.className = "rkmd-btn btn-flat ripple-effect",
            actionButton.innerHTML = actionText,
            actionButton.addEventListener("click", action),
            snackbar.appendChild(actionButton)
        }
        setTimeout(function() {
            previous === this && previous.dismiss()
        }.bind(snackbar), duration || 5e3),
        snackbar.addEventListener("transitionend",
        function(event, elapsed) {
            "opacity" === event.propertyName && 0 == this.style.opacity && (this.parentElement.removeChild(this), previous === this && (previous = null))
        }.bind(snackbar)),
        previous = snackbar,
        document.body.appendChild(snackbar),
        getComputedStyle(snackbar).bottom,
        snackbar.style.bottom = "70px",
        snackbar.style.left = "0px",
        snackbar.style.opacity = 1
    }
} ();
