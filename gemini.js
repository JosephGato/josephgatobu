
document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("gemini-toggle");
    const chatbox = document.getElementById("gemini-chatbox");
    const close = document.getElementById("gemini-close");

    toggle.addEventListener("click", function () {
        chatbox.style.display = "flex";
    });

    close.addEventListener("click", function () {
        chatbox.style.display = "none";
    });

});
