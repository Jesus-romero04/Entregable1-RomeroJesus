
const purchaseButton = document.getElementById("comprar");

purchaseButton.addEventListener("click", () => {
    if (cart.length > 0) {
        
        Swal.fire({
            title: 'Datos del Cliente',
            html: `
                <input type="text" id="swal-name" class="swal2-input" placeholder="Nombre y Apellido">
                <input type="text" id="swal-address" class="swal2-input" placeholder="Dirección">
                <input type="tel" id="swal-phone" class="swal2-input" placeholder="Teléfono">
            `,
            confirmButtonText: 'Continuar',
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const address = document.getElementById('swal-address').value;
                const phone = document.getElementById('swal-phone').value;

                if (!name || !address || !phone) {
                    Swal.showValidationMessage('Por favor, completa todos los campos.');
                    return false;
                }

                return { name, address, phone };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, address, phone } = result.value;

                
                Swal.fire({
                    title: 'Confirmación de Compra',
                    html: `
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Dirección:</strong> ${address}</p>
                        <p><strong>Teléfono:</strong> ${phone}</p>
                        <p>Gracias por tu compra, tu pedido será procesado.</p>
                    `,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                }).then(() => {
                    cart = []; // Vaciar el carrito tras la compra
                    renderCart();
                });
            }
        });
    } else {
        // Mostrar advertencia si el carrito está vacío
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos antes de realizar la compra.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
});