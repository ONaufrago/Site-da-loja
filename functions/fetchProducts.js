// functions/fetchProducts.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/A1:H?key=${process.env.YOUR_API_KEY}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.values),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao buscar dados." }),
    };
  }
};
