document.addEventListener("DOMContentLoaded", function() {
    fetch("/.netlify/functions/fetchProducts")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Dados de produto inválidos');
            }
            const productListHtml = data.map(product => `
                <div class='product-container'>
                    <div class='product-info'>
                        <div class='product-image'><img src='${product.imagem}' alt='${product.nome}'></div>
                        <span class='product-name'>${product.nome}</span>
                    </div>
                    <div class='product-price'>R$${product.preco.toFixed(2)}</div>
                    <div class='product-actions'>
                        <button class='add-to-cart' data-nome='${product.nome}' data-preco='${product.preco}'>Adicionar</button>
                    </div>
                </div>
            `).join('');
            document.getElementById("product-list").innerHTML = productListHtml;
        })
        .catch(error => {
            document.getElementById("product-list").innerHTML = "Erro ao carregar a lista de produtos.";
            console.error("Erro ao carregar produtos:", error);
        });
});
