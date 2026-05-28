import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY?.trim();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function getFallbackReply(message) {
  const text = message.toLowerCase();

  if (text.includes("compare")) {
    return "Go to Research > Compare Cars, choose two vehicles by make, model, and year, then click See the comparison.";
  }

  if (text.includes("save")) {
    return "Sign in first, then click the heart icon on a car card to save it to your account.";
  }

  if (text.includes("sell")) {
    return "Open the Sell page, enter your vehicle details, choose a city, then submit the listing.";
  }

  if (text.includes("buy") || text.includes("inspect")) {
    return "Open the Buying Guide to check paperwork, exterior condition, tires, fluids, brakes, electronics, and test drive behavior.";
  }

  if (text.includes("search") || text.includes("find")) {
    return "Use Shop All or the AutoAI search box to filter by price, mileage, city, make, model, fuel type, and condition.";
  }

  return "I can help you search cars, compare vehicles, save cars, sell a car, or understand what to check before buying.";
}

export async function chatWithBot(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (!ai) {
      return res.json({
        reply: getFallbackReply(message),
        source: "fallback",
      });
    }

    const prompt = `
You are Veloce Assistant, a helpful chatbot for an automotive marketplace website.

Website features:
- Users can browse new and used cars.
- Users can filter by price, mileage, city, make, model, fuel type, and condition.
- Users can save cars after signing in.
- Users can compare cars side-by-side.
- Users can read a Buying Guide before purchasing.
- Users can sell a car by submitting car details.

Answer briefly and clearly.
If the user asks something outside cars or this website, politely guide them back to car shopping.

User message:
${message}
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return res.json({
      reply: response.text,
      source: "gemini",
    });
  } catch (error) {
    console.error("Gemini chatbot error:", error);

    return res.json({
      reply: getFallbackReply(req.body.message || ""),
      source: "fallback",
    });
  }
}
