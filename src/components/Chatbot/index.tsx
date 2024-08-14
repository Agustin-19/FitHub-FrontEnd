import React, { useState, useEffect, KeyboardEvent } from "react";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; type: "user" | "bot"; buttons?: string[] }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [userRole, setUserRole] = useState<string>(""); // Estado para el rol del usuario
  const [isTyping, setIsTyping] = useState<boolean>(false); // Estado para saber si el bot está escribiendo
  const [clickedButtons, setClickedButtons] = useState<Set<string>>(new Set()); // Estado para almacenar botones clickeados

  useEffect(() => {
    const initialGreeting = "Hola, ¿cómo puedo ayudarte?";
    setMessages([
      {
        text: initialGreeting,
        type: "bot",
        buttons: ["Rutinas", "Planes", "Asesor", "Crear", "Ser Entrenador"],
      },
    ]);
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = input;
    setMessages([...messages, { text: userMessage, type: "user" }]);

    // Bot está escribiendo
    setIsTyping(true);

    // Simula el tiempo de respuesta del bot
    setTimeout(() => {
      let botReply = "";
      let buttons: string[] | undefined;

      if (userMessage.toLowerCase().includes("hola")) {
        botReply = "Hola, ¿cómo puedo ayudarte?";
        buttons = ["Rutinas", "Planes", "Asesor", "Crear", "Ser Entrenador"];
      } else if (userMessage.toLowerCase().includes("rutinas")) {
        botReply =
          "Para ir a las rutinas, debes dar click aquí en el botón rutinas en tu navegador";
      } else if (userMessage.toLowerCase().includes("asesor")) {
        botReply = "Para hablar con un asesor dirígete al número +999999999";
      } else if (userMessage.toLowerCase().includes("crear")) {
        if (userRole === "entrenador") {
          botReply =
            "Para crear una rutina, plan o actividad, dirígete a crear rutinas, actividades o planes";
        } else {
          botReply =
            "Lo siento, necesitas ser un entrenador para crear rutinas, planes o actividades.";
        }
      } else if (userMessage.toLowerCase().includes("ser entrenador")) {
        botReply =
          "Para convertirte en entrenador, sigue estos pasos: ve al footer de la página y haz clic en 'Quiero ser entrenador'. Luego, sigue los pasos indicados para completar el proceso.";
        buttons = [];
      } else {
        botReply = "Lo siento, no entiendo tu mensaje.";
      }

      // Actualiza los mensajes con la respuesta del bot y oculta el estado de escritura
      setMessages([...messages, { text: botReply, type: "bot", buttons }]);
      setInput("");
      setIsTyping(false);
    }, 1000); // Simula un retraso de 1 segundo
  };

  const handleButtonClick = (buttonText: string) => {
    // Verifica si el botón ya ha sido clickeado
    if (clickedButtons.has(buttonText)) return;

    setClickedButtons(new Set(clickedButtons.add(buttonText))); // Marca el botón como clickeado

    setMessages([...messages, { text: buttonText, type: "user" }]);
    let botReply = "";
    let buttons: string[] | undefined;

    if (buttonText === "Rutinas") {
      botReply =
        "Para ir a las rutinas, debes dar click aquí en el botón rutinas en tu navegador";
    } else if (buttonText === "Planes") {
      botReply =
        "Para consultar los planes, debes dar click aquí en el botón planes en tu navegador";
    } else if (buttonText === "Asesor") {
      botReply = "Para hablar con un asesor dirígete al número +999999999";
    } else if (buttonText === "Crear") {
      if (userRole === "entrenador") {
        botReply =
          "Para crear una rutina, plan o actividad, dirígete a crear rutinas, actividades o planes";
      } else {
        botReply =
          "Lo siento, necesitas ser un entrenador para crear rutinas, planes o actividades.";
      }
    } else if (buttonText === "Ser Entrenador") {
      botReply =
        "Para convertirte en entrenador, sigue estos pasos: ve al footer de la página y haz clic en 'Quiero ser entrenador'. Luego, sigue los pasos indicados para completar el proceso.";
    }

    setMessages([...messages, { text: botReply, type: "bot", buttons }]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
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
              {message.type === "bot" && (
                <div>
                  <div>{message.text}</div>
                  {message.buttons && (
                    <div style={{ marginTop: "10px" }}>
                      {message.buttons.map((button, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(button)}
                          style={{
                            padding: "10px",
                            margin: "5px",
                            backgroundColor: "#FF3E1A",
                            color: "#97D6DF",
                            border: "none",
                            borderRadius: "5px",
                          }}
                        >
                          {button}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {message.type === "user" && <div>User: {message.text}</div>}
            </div>
          ))}
          {isTyping && (
            <div style={{ margin: "5px 0", color: "#97D6DF" }}>
              <span>El bot está escribiendo</span>
              <div style={{ display: "inline-block", marginLeft: "5px" }}>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              width: "calc(100% - 60px)",
              padding: "5px",
              backgroundColor: "#2A2D2A",
              color: "#97D6DF",
              border: "none",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: "60px",
              padding: "5px",
              marginTop: "20px",
              backgroundColor: "#FF3E1A",
              color: "#97D6DF",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
