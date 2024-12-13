
const cartItemsContainer = document.getElementById("cart-items");
const totalContainer = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");


let cart = [];


function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    } 
} 


function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function renderCart() {
    cartItemsContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <button data-index="${index}" class="remove-item">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalContainer.textContent = `Total: $${total}`;

    
    saveCartToLocalStorage();
}


document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    fetch('./js/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => renderProducts(data))
        .catch(error => console.error(error));
});
    function renderProducts(products) {
        const productsContainer = document.querySelector('.productos');
        productsContainer.innerHTML = ''; 
    
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('producto');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Agregar al Carrito</button>
                <img class="bebidas" src="${product.image}" alt="${product.name}">
            `;
            productsContainer.appendChild(productElement);
        });
    
        // Asignar eventos de clic a los botones
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const name = event.target.getAttribute("data-name");
                const price = parseFloat(event.target.getAttribute("data-price"));
                console.log(`Producto: ${name}, Precio: ${price}`); // Verificar que captura datos
                addToCart(name, price);
                
                Swal.fire({
                    title: 'Producto Agregado',
                    text: `${name} ha sido agregado al carrito.`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
            });
        });
    }


function addToCart(name, price) {
    
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        
        cart.push({ name, price, quantity: 1 });
    }
    renderCart();
}


function removeFromCart(index) {
    cart.splice(index, 1); 
    renderCart();
}


function openCartModal() {
    cartModal.style.display = "block";
}


function closeCartModal() {
    cartModal.style.display = "none";
}


cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        removeFromCart(index);
    }
});


clearCartButton.addEventListener("click", () => {
    cart = []; 
    renderCart();
});


cartButton.addEventListener("click", openCartModal);
closeModal.addEventListener("click", closeCartModal);


window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        closeCartModal();
    }
});


loadCartFromLocalStorage();
