import { useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { requestJson } from "../../services/api";
import "./ChatBot.css";

const quickPrompts = [
  "How do I compare cars?",
  "What should I check before buying?",
  "How do I sell my car?",
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I am Veloce Assistant. Ask me about finding, comparing, saving, or selling cars.",
    },
  ]);

  async function sendMessage(text = message) {
    const cleanText = text.trim();

    if (!cleanText || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: cleanText }]);
    setMessage("");
    setLoading(true);

    const data = await requestJson("/chatbot", {
      method: "POST",
      body: JSON.stringify({ message: cleanText }),
    });

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: data.success
          ? data.reply
          : data.message || "Sorry, I cannot answer right now.",
      },
    ]);
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="chatbot-widget">
      {open && (
        <section className="chatbot-panel" aria-label="Veloce Assistant">
          <div className="chatbot-header">
            <div>
              <span>Veloce AI</span>
              <strong>Car assistant</strong>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <FiX />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((item, index) => (
              <div className={`chatbot-message ${item.from}`} key={`${item.from}-${index}`}>
                {item.text}
              </div>
            ))}
            {loading && <div className="chatbot-message bot">Thinking...</div>}
          </div>

          <div className="chatbot-prompts">
            {quickPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about cars..."
            />
            <button type="submit" aria-label="Send message" disabled={loading}>
              <FiSend />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        aria-label="Open Veloce Assistant"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}

export default ChatBot;
