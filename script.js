let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners to "Add to Cart" buttons
	
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
	});
  });
}

// Render cart list
function renderCart() {
	const cartList = document.getElementById("cart-list");
	cartList.innerHTML = ""; //clear the cart list
	cart.forEach((product) => {
		const li = document.createElement("li");
		li.innerHTML = `${product.name} - $${product.price} 
		<button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
		cartList.appendChild(li);
	});
	
	// Attach event listeners for remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      removeFromCart(productId);
    });
  

  // Assuming there's a "Clear Cart" button
  const clearCartButton = document.getElementById("clear-cart-btn");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
     }
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
	sessionStorage.setItem('cart', JSON.stringify(cart));//save cart to session
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
	const index = cart.findIndex(p => p.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
	sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
	
}

// Clear cart
function clearCart() {
	cart.length = 0; // Clears the cart array
	sessionStorage.removeItem('cart');
  renderCart();
	
}

// Initial render

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
	renderCart();
});