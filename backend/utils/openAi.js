const OpenAI = require("openai");
  if(!process.env.OPENAI_API_KEY){
    console.error("OPENAI_API_KEY is not set in enviroment varibles.");
    throw new Error("OPENAI_API_KEY is required for OpenAI integration.");
  }
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getAIResponse(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you're subscribed
      messages: [
        { role: "system", content: "You are a helpful e-commerce assistant." },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI API error:", err);
    return "Sorry, I couldn't process your request right now.";
  }
}

module.exports = { getAIResponse };
