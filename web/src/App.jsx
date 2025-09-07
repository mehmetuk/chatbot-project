import { useState } from 'react';
import './App.css';
import ChatbotLogo from './assets/chatbot-logo.png'; // Logoyu buraya aktarıyoruz

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

 const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
        // Mesajı Rasa sunucusuna gönder
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'user', message: input }),
        });

        const data = await response.json();

        // Rasa'dan gelen yanıtları ekle
        data.forEach((botMessage) => {
            const botResponse = { text: botMessage.text, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        });

    } catch (error) {
        console.error('Error sending message to Rasa:', error);
        const errorMessage = { text: 'Sorry, I am currently unavailable.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
};

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-header">
        <img src={ChatbotLogo} alt="Chatbot Logo" className="chatbot-avatar" />
        <div className="header-info">
          <span className="chatbot-name">Chatbot</span>
          <span className="online-status">Online Now</span>
        </div>
      </div>

      <div className="chat-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            {msg.sender === 'bot' && <img src={ChatbotLogo} alt="Bot Avatar" className="message-avatar" />}
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Reply to Chatbot..."
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;