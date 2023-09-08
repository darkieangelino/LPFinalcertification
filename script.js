// script.js

// Function to update the login status in the menu
function updateLoginStatus() {
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const userInfo = document.getElementById("user-info");

  // Simulated authentication status
  const token = localStorage.getItem("token"); // Replace with your token storage mechanism

  if (loginButton && logoutButton) {
      if (token) {
          // Show user's first name
          loginButton.style.display = "none";
          logoutButton.style.display = "inline-block";
          userInfo.textContent = "John"; // Replace with actual user's first name
      } else {
          // Show login button
          loginButton.style.display = "inline-block";
          logoutButton.style.display = "none";
          userInfo.textContent = ""; // Hide user's first name
      }
  }
}

// Update cart functionality
function updateCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || {};
  const cartElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const grandTotalElement = document.getElementById("grand-total");

  cartElement.innerHTML = "";
  totalElement.innerHTML = "";
  grandTotalElement.innerHTML = "";

  let total = 0;

  for (const productId in cartItems) {
      if (cartItems.hasOwnProperty(productId)) {
          const item = cartItems[productId];
          total += item.price * item.quantity;

          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
              <div>${item.name}</div>
              <div>Price: $${item.price.toFixed(2)}</div>
              <div>Quantity: ${item.quantity}</div>
              <div>Total: $${(item.price * item.quantity).toFixed(2)}</div>
              <button class="remove-button" data-product-id="${productId}">Remove</button>
          `;
          cartElement.appendChild(cartItem);
      }
  }

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach(button => {
      button.addEventListener("click", function() {
          const productId = button.getAttribute("data-product-id");
          removeFromCart(productId);
      });
  });

  totalElement.innerHTML = `Total (excluding shipping): $${total.toFixed(2)}`;
  grandTotalElement.innerHTML = `Grand Total (with shipping): $${(total + 4.99).toFixed(2)}`;
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || {};

  if (cartItems.hasOwnProperty(productId)) {
      delete cartItems[productId];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      updateCart();
  }
}

// Add functionality specific to each page here

// Example: Update login status on page load for login.html
if (document.getElementById("login-button")) {
  updateLoginStatus();
}

// Example: Update cart display on page load for cart.html
if (document.getElementById("cart-items")) {
  updateCart();
}

document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  const cartValueElement = document.querySelector(".cart-value");
  const cartIcon = document.querySelector(".cart-icon");
  let cartValue = 0;



  addToCartButtons.forEach(button => {
      button.addEventListener("click", function() {
          const productName = this.getAttribute("data-product");
          const productPrice = parseFloat(this.getAttribute("data-price"));



          
          cartValue += productPrice;
          cartValueElement.textContent = cartValue.toFixed(2);
          cartIcon.textContent = "🛒";



          
          alert(`${productName} added to cart. Price: $${productPrice}`);



          updateLPTag(cartValue);
      });
  });



  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
      window.location.href = "login.html";
  });



  // Function to update LP tag with the new cart value
  function updateLPTag(cartValue) {
      const title = document.title;
      const x = cartValue.toFixed(2); // Format cartValue as a number with 2 decimal places



      lpTag.sdes = lpTag.sdes || [];
      lpTag.sdes.push({
          "type": "cart",
          "total": x, // Set the total to the formatted cartValue
          "currency": "USD",
          "numItems": x, // Assuming numItems should also be the formatted cartValue
          "products": [{
              "product": {
                  "name": "Page Title: " + title,
                  "category": ""
              },
          }]
      });
  }



  const identityFn = function(callback) {
      callback({
        "sub": "Mohammed Jaffer Islam - 910779",
        "iss": "https://jwt.io/",
        "aud": "acc:qa57221676",
        "exp": 1992025992,
        "iat": 1682030954,
        "acr": "loa1"
      });
  };



  var id_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNb2hhbW1lZCBKYWZmZXIgSXNsYW0gLSA5MTA3NzkiLCJpc3MiOiJodHRwczovL2p3dC5pby8iLCJhdWQiOiJhY2M6cWE1NzIyMTY3NiIsImV4cCI6MTk5MjAyNTk5MiwiaWF0IjoxNjgyMDMwOTU0LCJhY3IiOiJsb2ExIn0.L1B2r_KuK7AN9XmvxyXUuNTZQS1JQXGQH169jxkkRWGLpp1GwgEInkxyaueN7FAXNtNugPrfbAqyW_F2qoXGxSGirTTnk_p8g9r9PDteP-JA7eq4qxEgbtrBnSTVFA8kmY7E9GPahHnabRDt-89w6Oi3rmzs1k5CP8HkKhwadTKEAgZ8t6X2vsr1-mWi9txTjwNMjTOo9EVxgr7z31q0Kxn-XTf3zxRalQWHNS8lA00f3v7CafXl6TeXCj4Ck69LakJAu5uGW5PcVvjq4jDsqw5Siw2A1UnM3xfQ8I6iz1_IADjPWVHVcFf0IPMuZsRZ1A5rFII79VUP3ujdsv3_BA";



  lpTag.identities.push(identityFn);



  function lpGetAuthenticationToken(callback) {
      console.log("LP asked for id_token or auth code in Code Flow");
      // Do your magic…
      // On Success
      callback(id_token);
      // On Failure
      callback("", "error reason");
  }
});