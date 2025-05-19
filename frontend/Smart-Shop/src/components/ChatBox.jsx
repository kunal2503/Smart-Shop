import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { IoSend } from "react-icons/io5";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  
  // console.log(userId.id)

  const sendMessage = async () => {
    if (input.trim()==="") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try{

      const response = await axiosInstance.post("/chatbot/ask", {
        message: input,
        userId: userInfo.id,
      });
      const botMessage = { sender: "bot", text: response.data.reply }; 
      setMessages((prev) => [...prev, botMessage]);
    } catch(error){
      console.error(error)
      const errorMessage = {
        sender: "bot",
        text : "Sorry, I encountred an error. please try again.",
      }
      setMessages((prev) => [...prev, errorMessage]);
    }
    
  };

  const handleChanges = (e) => {
    const text = e.target.value;
    setInput(text);

    const lines = text.split("\n").length;
    e.target.rows = lines >1 ? lines : 1;

    
  };

  return (
    <div className="flex justify-center items-center">
      <div className="chatbot flex flex-col w-96 h-[500px] border border-gray-300  rounded-md overflow-hidden bg-gray-100 mt-6 px-6 py-8">
        <div className="message flex-grow p-4 overflow-y-auto flex flex-col">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-2 p-3 rounded-xl break-words ${
                m.sender === "user"
                  ? "bg-blue-300 text-black self-end rounded-br-none"
                  : "bg-blue-100 text-black self-end rounded-br-none"
              } `}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4 border-t border-gray-300 p-2">
          <textarea
            value={input}
            onChange={handleChanges}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" // Added resize-none
            rows={1} // Initial number of rows
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex-shrink-0"
          >
            <IoSend className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
