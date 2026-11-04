
const toggle = document.getElementById("jg-ai-toggle");
const closeBtn = document.getElementById("jg-ai-close");
const chat = document.getElementById("jg-ai-chat");

const form = document.getElementById("jg-ai-form");
const input = document.getElementById("jg-ai-input");
const messages = document.getElementById("jg-ai-messages");

let conversation = [];

toggle.addEventListener("click", () => {
    chat.classList.toggle("jg-ai-hidden");
});

closeBtn.addEventListener("click", () => {
    chat.classList.add("jg-ai-hidden");
});

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.className = `jg-ai-message ${sender}`;

    // Use textContent to prevent HTML injection
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    return message;
}

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    addMessage(question, "user");

    conversation.push({
        role: "user",
        text: question
    });

    input.value = "";
    input.disabled = true;

    const loading = addMessage("Thinking...", "bot");

    try {

        const response = await fetch(
            "/.netlify/functions/portfolio-chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: conversation
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI request failed.");
        }

        loading.textContent = data.reply;

        conversation.push({
            role: "assistant",
            text: data.reply
        });

    } catch (error) {

        loading.textContent =
            "Sorry, I couldn't connect to the AI assistant. Please try again.";

        console.error(error);

        // Remove failed exchange from conversation history
        conversation.pop();

    } finally {

        input.disabled = false;
        input.focus();

    }

});
