
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getFinancialTip = async (salary: number, remaining: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a savvy Ghanaian financial advisor. The user has a monthly salary of ${salary} GHS and ${remaining} GHS left after basic expenses like Rent, Chop Money, and Trotro. Provide a short, fun, one-sentence financial tip including some Ghanaian slang (like "chale", "enjoyment", "susu"). Focus on saving or smart spending. Keep it under 20 words.`,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text || "Tip: Chale, keep an eye on those small expenses; they add up fast!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tip: If you take trotros instead of Uber this week, you can save for extra kelewele.";
  }
};
