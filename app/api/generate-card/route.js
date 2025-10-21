import { NextResponse } from "next/server";

export async function POST(req) {
  const { word } = await req.json();
  console.log({ word });
  const API_KEY = process.env.NEXT_PUBLIC_SSU_API_KEY;

  const prompt = `
Generate a JSON object for creating a flashcard with the following structure:

{
  "en_word": string,       // English word
  "vn_word": string,       // Vietnamese translation
  "type": string,          // e.g., noun, verb, adjective
  "meaning": string,       // Short meaning / explanation in VietNamese
  "ex": string[],          // Example sentences
  "en_choice": string,     // English multiple choice, always 4 words separated by commas
  "vn_choice": string,     //  Vietnamese multiple choice, always 4 words separated by commas
}

Use the English word: "${word}".
Return **only JSON**, do not include any extra text.
`;

  const systemPrompt = `
You are an AI assistant that generates JSON flashcards exactly matching a specified structure. 
- Always return valid JSON only. No extra text or explanation. 
- Ensure all fields exist; if unknown, use empty string ("") or empty array ([]). 
- Fields: 
  - en_word: English word (string)
  - vn_word: Vietnamese translation (string)
  - type: part of speech like noun, verb, adjective, adverb (string)
  - meaning: short meaning or explanation in VietNamese(string)
  - ex: example sentences (array of strings)
  - en_choice: English multiple choice (string)
  - vn_choice: Vietnamese multiple choice (string) separated by commas
  - collectionId: leave empty or default (string) separated by commas
- Always return JSON that can be parsed directly.
`;

  const response = await fetch(
    "https://factchat-cloud.mindlogic.ai/v1/api/openai/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 1024,
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
