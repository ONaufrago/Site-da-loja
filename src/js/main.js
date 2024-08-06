document.addEventListener("DOMContentLoaded", function() {
  fetch('/.netlify/functions/fetchProducts')
    .then(response => response.json())
    .then(data => {
      var productList = data;
      var productListHtml = "";

      for (var i = 1; i < productList.length; i++) {
        var nome = productList[i][0]; // Nome do produto
        var preco = parseFloat(productList[i][1]); // Preço do produto
        var imagem = productList[i][2]; // URL da imagem do produto

        productListHtml += "<div class='product-container'>";
        productListHtml += "<div class='product-info'>";

        if (imagem) {
          productListHtml += "<div class='product-image'><img src='" + imagem + "' alt='" + nome + "'></div>";
        } else {
          productListHtml += "<div class='product-name-only'>" + nome + "</div>";
        }

        productListHtml += "<span class='product-name'>" + nome + "</span>";
        productListHtml += "</div>";
        productListHtml += "<div class='product-price'>R$" + preco.toFixed(2) + "</div>";
        productListHtml += "<div class='product-actions'>";
        productListHtml += "<button class='add-to-cart' data-nome='" + nome + "' data-preco='" + preco + "'>Adicionar</button>";
        productListHtml += "</div></div>";
      }

      document.getElementById("product-list").innerHTML = productListHtml;
    })
    .catch(error => {
      console.error("Erro ao carregar produtos:", error);
      document.getElementById("product-list").innerHTML = "Erro ao carregar produtos.";
    });
});