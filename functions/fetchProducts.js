import fetch from 'node-fetch';

export async function handler(event, context) {
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/19OfPl4OBd7QOYq2AV_qFU0ddUBvUP9jkg9IbnI8Y8w0/values/A1:H?key=AIzaSyDsXyIrF1dW6cgbD2SSfJItPa2Lngv0_XQ'; // Substitua pelo URL da sua API

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
}
