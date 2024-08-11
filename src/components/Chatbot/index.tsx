import React, { useState } from "react";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages([...messages, `User: ${userMessage}`]);

    let botReply = "";

    if (userMessage.toLowerCase().includes("hola")) {
      botReply = "Hola, ¿cómo puedo ayudarte?";
    } else if (userMessage.toLowerCase().includes("rutinas")) {
      botReply =
        "Para ir a las rutinas, debes dar click aquí en el boton rutinas en tu navegador";
    } else if (userMessage.toLowerCase().includes("asesor")) {
      botReply = "Para hablar con un asesor dirijete al numero +999999999";
    } else if (userMessage.toLowerCase().includes("crear")) {
      botReply =
        "para crear una rutina, plan o actividad dirijete a crear rutinas, actividades o planes";
    } else {
      botReply = "Lo siento, no entiendo tu mensaje.";
    }

    setMessages([...messages, `User: ${userMessage}`, `Bot: ${botReply}`]);
    setInput("");
  };

  return (
    <div className="flex absolute ml-11 top-10 bg-black items-center">
      <div
        className=" text-[#97D6DF]"
        style={{
          width: "900px",
          margin: "0 auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "400px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {messages.map((message, index) => (
            <div key={index} style={{ margin: "5px 0" }}>
              {message}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: "calc(100% - 60px)",
              padding: "5px",
              backgroundColor: "#2A2D2A",
            }}
          />
          <button
            onClick={handleSend}
            style={{ width: "60px", padding: "5px", marginTop: "20px" }}
            className="bg-[#FF3E1A] text-[#97D6DF]  rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
