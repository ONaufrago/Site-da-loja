// src/js/main.js

$(document).ready(function() {
    // Faz uma requisição para a função serverless no Netlify
    fetch('/.netlify/functions/fetchProducts')
      .then(response => response.json())
      .then(data => {
        var productList = data;
        var productListHtml = "";
  
        // Itera sobre a lista de produtos, começando do segundo item (ignora cabeçalho)
        for (var i = 1; i < productList.length; i++) {
          var nome = productList[i][0];
          var preco = parseFloat(productList[i][1]);
          var imagem = productList[i][2];
  
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
  
        $("#product-list").html(productListHtml);
      })
      .catch(error => {
        $("#product-list").html("Erro ao carregar a lista de produtos.");
      });
  
    // Eventos de clique e outras interações
    $(document).on("click", ".add-to-cart", function() {
      var nome = $(this).data("nome");
      var preco = parseFloat($(this).data("preco"));
      var cartItem = $("#cart-items .cart-item[data-nome='" + nome + "']");
  
      if (cartItem.length > 0) {
        var quantidade = parseInt(cartItem.data("quantidade")) + 1;
        cartItem.data("quantidade", quantidade);
        cartItem.find(".cart-item-quantity span").text(quantidade);
      } else {
        var cartItemHtml = "<div class='cart-item' data-nome='" + nome + "' data-preco='" + preco + "' data-quantidade='1'>";
        cartItemHtml += "<span>" + nome + "</span>";
        cartItemHtml += "<div class='cart-item-quantity'>";
        cartItemHtml += "<button class='minus-quantity' data-nome='" + nome + "'>-</button>";
        cartItemHtml += "<span>1</span>";
        cartItemHtml += "<button class='plus-quantity' data-nome='" + nome + "'>+</button>";
        cartItemHtml += "</div>";
        cartItemHtml += "<button class='remove-from-cart' data-nome='" + nome + "'>Remover</button>";
        cartItemHtml += "</div>";
        $("#cart-items").append(cartItemHtml);
      }
  
      updateCartTotal();
      updateCartItemCount();
    });
  
    $(document).on("click", ".remove-from-cart", function() {
      $(this).parent().remove();
      updateCartTotal();
      updateCartItemCount();
    });
  
    $(document).on("click", ".plus-quantity", function() {
      var nome = $(this).data("nome");
      var cartItem = $("#cart-items .cart-item[data-nome='" + nome + "']");
      var quantidade = parseInt(cartItem.data("quantidade")) + 1;
      cartItem.data("quantidade", quantidade);
      cartItem.find(".cart-item-quantity span").text(quantidade);
      updateCartTotal();
    });
  
    $(document).on("click", ".minus-quantity", function() {
      var nome = $(this).data("nome");
      var cartItem = $("#cart-items .cart-item[data-nome='" + nome + "']");
      var quantidade = parseInt(cartItem.data("quantidade")) - 1;
  
      if (quantidade > 0) {
        cartItem.data("quantidade", quantidade);
        cartItem.find(".cart-item-quantity span").text(quantidade);
      } else {
        cartItem.remove();
      }
  
      updateCartTotal();
      updateCartItemCount();
    });
  
    function updateCartTotal() {
      var total = 0;
      $("#cart-items .cart-item").each(function() {
        var preco = parseFloat($(this).data("preco"));
        var quantidade = parseInt($(this).data("quantidade"));
        total += preco * quantidade;
      });
      $("#cart-total").text("Total: R$" + total.toFixed(2));
    }
  
    function updateCartItemCount() {
      var count = $("#cart-items .cart-item").length;
      $("#cart-item-count").text(count);
    }
  });
  