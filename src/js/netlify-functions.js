// src/js/netlify-functions.js

async function fetchProducts() {
    const response = await fetch('/.netlify/functions/fetchProducts');
    const data = await response.json();
    return data;
  }
  