
const usuarios = [
    { username: "pedrito123", password: "pedritogamer123" },
    { username: "juansitopro", password: "juansitoelmejor" },
    { username: "administrador22", password: "elmejoradmin22" }
];


const loginButton = document.getElementById('loginButton');
const mensaje = document.getElementById('mensaje');


const maxIntentos = 3;


loginButton.addEventListener('click', function() {

    let intentos = 0;
    let loginExitoso = false;


    while (intentos < maxIntentos && !loginExitoso) {

        intentos++;


        const usernameInput = prompt("Intento " + intentos + ": Ingresa tu usuario:");


        if (usernameInput === null) {
            mensaje.textContent = "Login cancelado";
            return;
        }


        const passwordInput = prompt("Intento " + intentos + ": Ingresa tu contraseña:");


        if (passwordInput === null) {
            mensaje.textContent = "Login cancelado";
            return;
        }


        const usuarioValido = usuarios.find(user => user.username === usernameInput && user.password === passwordInput);


        if (usuarioValido) {

            const confirmLogin = confirm("¿Deseas acceder como " + usuarioValido.username + "?");

            if (confirmLogin) {

                alert('¡Login exitoso! Bienvenido, ' + usuarioValido.username);
                mensaje.textContent = "¡Bienvenido!";
                loginExitoso = true;  
            } else {
                mensaje.textContent = "Login cancelado por el usuario.";
                break;  
            }
        } else {

            alert("Usuario o contraseña incorrectos. Intento " + intentos + " de " + maxIntentos);
        }
    }


    if (!loginExitoso && intentos >= maxIntentos) {
        mensaje.textContent = "Has excedido el número máximo de intentos.";
        alert("Has alcanzado el máximo de intentos fallidos.");
    }
});