// Constantes y array para almacenar usuarios y contraseñas válidos
const validUsers = [
    { username: "pedrito123", password: "pedritopro123" },
    { username: "coderhouse", password: "codeando123" },
    { username: "admin", password: "administrador123" }
];

// Escuchador de eventos para el formulario de login
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Variables que toman los valores ingresados
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validación: busca en el array de usuarios válidos
    const userFound = validUsers.some(user => user.username === username && user.password === password);

    if (userFound) {
        window.location.href = "tiendita.html"; // Redirige a la tienda
    } else {
        const errormensaje = document.getElementById("errormensaje");
        errormensaje.style.display = "block"; // Muestra el mensaje de error
    }
});



// Elementos del DOM
const cartItemsContainer = document.getElementById("cart-items");
const totalContainer = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");

// Array para almacenar los productos en el carrito
let cart = [];

// Cargar carrito desde Local Storage al iniciar la página
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

// Guardar carrito en Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para renderizar el carrito en el modal
function renderCart() {
    cartItemsContainer.innerHTML = ""; // Limpiar el contenido actual

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

    // Calcular el total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalContainer.textContent = `Total: $${total}`;

    // Guardar el carrito actualizado en Local Storage
    saveCartToLocalStorage();
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1; // Aumentar la cantidad
    } else {
        // Agregar un nuevo producto al carrito
        cart.push({ name, price, quantity: 1 });
    }
    renderCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto por su índice
    renderCart();
}

// Función para abrir el modal del carrito
function openCartModal() {
    cartModal.style.display = "block";
}

// Función para cerrar el modal del carrito
function closeCartModal() {
    cartModal.style.display = "none";
}

// Event listeners para los botones de agregar al carrito
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const name = event.target.getAttribute("data-name");
        const price = parseFloat(event.target.getAttribute("data-price"));
        addToCart(name, price);
    });
});

// Event listener para los botones de eliminar producto del carrito
cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        removeFromCart(index);
    }
});

// Event listener para vaciar el carrito
clearCartButton.addEventListener("click", () => {
    cart = []; // Vaciar el array del carrito
    renderCart();
});

// Event listener para abrir y cerrar el modal del carrito
cartButton.addEventListener("click", openCartModal);
closeModal.addEventListener("click", closeCartModal);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

// Cargar el carrito desde Local Storage cuando se carga la página
loadCartFromLocalStorage();