const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const url = 'https://api.example.com/products'; // Substitua pelo URL da sua API

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
