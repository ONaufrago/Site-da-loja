exports.handler = async function(event, context) {
  try {
      const { default: fetch } = await import('node-fetch');

      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/19OfPl4OBd7QOYq2AV_qFU0ddUBvUP9jkg9IbnI8Y8w0/values/A1:H?key=AIzaSyDsXyIrF1dW6cgbD2SSfJItPa2Lngv0_XQ');
      const data = await response.json();

      return {
          statusCode: 200,
          body: JSON.stringify(data)
      };
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' })
      };
  }
};
