// src/services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Generate an array of product objects from Google Gemini using the official library.
 * 
 * Example output:
 * [
 *   {
 *     "name": "Galaxy Nova Z",
 *     "description": "A futuristic phone with holographic projector...",
 *     "marketPrice": 1299,
 *     "category": "phones"
 *   },
 *   ...
 * ]
 */
const generateProductsFromGemini = async (category, count) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Prompt carefully to avoid triple backticks
    const prompt = `
    You are a helpful system that returns only valid JSON. 
    No markdown formatting or triple backticks. No extra commentary.
    Please output exactly ${count} products in a JSON array.
    Each product has these keys: "name", "description", "marketPrice", "category".
    Category must be "${category}".
    Example:
    [
      {
        "name": "XYZ Phone",
        "description": "Sample phone description",
        "marketPrice": 999,
        "category": "${category}"
      }
    ]
    `;

    try {
        const result = await model.generateContent(prompt);
        let generatedText = result.response.text();

        // (Optional) strip code fences in case the AI still includes them
        generatedText = generatedText
            .replace(/```(\w+)?/g, '')  // remove ```json or any other language
            .replace(/```/g, '')        // remove leftover ```
            .trim();

        const products = JSON.parse(generatedText);

        // Light validation
        const aiProducts = products.map(prod => ({
            name: prod.name,
            description: prod.description,
            marketPrice: parseInt(prod.marketPrice, 10),
            category: prod.category || category
        }));

        return aiProducts;
    } catch (error) {
        console.error('Gemini generateProducts error:', error);
        throw new Error('Failed to fetch from Gemini');
    }
};


module.exports = { generateProductsFromGemini };
