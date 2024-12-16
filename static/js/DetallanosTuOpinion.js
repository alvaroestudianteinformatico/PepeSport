var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var numero = document.getElementById('numero');
var email = document.getElementById('correo');
var mensaje = document.getElementById('mensaje');
var error = document.getElementById('error');
error.style.color = 'red';

function enviarformulario(){
    console.log('Enviando formulario...');    
    var mensajesError = [];

    if(nombre.value === null || nombre.value === ''){
        mensajesError.push('Ingrese su nombre');
    }

    if(apellido.value === null || apellido.value === ''){
        mensajesError.push('Ingrese su apellido');
    }

    if(numero.value === null|| numero.value === ''){
        mensajesError.push('Ingrese su numero');
    }

    if(mensaje.value === null || mensaje.value === ''){
        mensajesError.push('Ingrese su mensaje');
    }

    error.innerHTML = mensajesError.join(',');
 

    return false;
}

document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario si es necesario.
    
    // Mostrar el mensaje de agradecimiento
    document.getElementById('ratingForm').style.display = 'none';
    document.getElementById('thankYouMessage').classList.remove('hidden');
});

