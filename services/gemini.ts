import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStory = async (language: Language, topic: string = "Bhagavad Gita or Lord Krishna"): Promise<string> {
  try {
    const prompt = `Tell me a short, inspiring story or explain a verse about ${topic}. 
    The response must be in ${language} language. 
    Keep it under 200 words. 
    Make it easy to understand and morally uplifting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate story at this time.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Network error. Please try again later.";
  }
};
