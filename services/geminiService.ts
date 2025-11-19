import { GoogleGenAI } from "@google/genai";
import { ItineraryResponse, TripDetails, ItineraryData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (details: TripDetails): Promise<ItineraryResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const { visitorName, hostName, city, arrivalDate, departureDate, interests } = details;

  // We ask for JSON text explicitly because we cannot use responseSchema with tools: [googleSearch]
  const prompt = `
    Ты - веселый и знающий локальный гид по городу ${city} для пары: ${visitorName} (приезжает) и ${hostName} (встречает).
    
    Вводные данные:
    Город встречи: ${city}
    Дата приезда (${visitorName}): ${arrivalDate}
    Дата отъезда: ${departureDate}
    Интересы: ${interests.join(', ')}.

    ТВОЯ ЗАДАЧА:
    1. Используй Google Search, чтобы найти РЕАЛЬНЫЕ события (концерты, выставки, стендап, фестивали) в городе ${city} именно в эти даты.
    2. Составь план, учитывая, что это встреча пары (романтика + веселье).
    3. ВЕРНИ ОТВЕТ ТОЛЬКО В ФОРМАТЕ JSON. Не пиши никакого вступления или заключения вне JSON.
    
    Структура JSON должна быть такой:
    {
      "tripTitle": "Название поездки (например: Романтический уикенд в ${city})",
      "days": [
        {
          "dayTitle": "День 1",
          "date": "6 декабря",
          "theme": "Прибытие и Релакс",
          "events": [
            {
              "title": "Название места или события",
              "time": "14:00",
              "location": "Адрес или название заведения",
              "description": "Короткое описание, почему это круто для ${visitorName} и ${hostName}.",
              "type": "food" | "activity" | "culture" | "party" | "romantic"
            }
          ]
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Attempt to extract JSON from the text (it might be wrapped in ```json ```)
    let structuredData: ItineraryData | null = null;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse JSON from response", e);
      // structuredData remains null, UI will handle fallback or show raw text if needed
    }

    // Extract grounding chunks (sources)
    const sources: any[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title
          });
        }
      });
    }

    return {
      structuredData,
      rawText: text,
      sources
    };

  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Не удалось сгенерировать маршрут. Пожалуйста, попробуйте снова.");
  }
};