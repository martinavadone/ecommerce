//Función que obtiene los datos.
function datosPerfil(){
   var nombre_perfil = document.getElementById("nombre_Perfil").value;
   var apellido_Perfil =  document.getElementById("apellido_Perfil").value;
   var segundoNombre = document.getElementById("nombreSegundo_Perfil").value;
   var segundoApellido = document.getElementById("apellidoSegundo_Perfil").value;
   var telefono = document.getElementById("telefono").value;
   var email_perfil= document.getElementById("email").value;
   var edad_perfil = document.getElementById("edad").value;
   
//Guardo todo en una variable datos.
    var datos = {
       nombre_perfil, apellido_Perfil, segundoNombre, segundoApellido, telefono, email_perfil, edad_perfil
    }

    alert("Su perfil ha sido guardado.");
    return datos;


}

//Función que guarda los datos en el localstorage.
function guardarPerfil() {
    localStorage.setItem("datosUsuario", JSON.stringify(datosPerfil()));

}

  //Función que muestra los datos del perfil.
function mostrarPerfil() {
  
    let datos_perfil = localStorage.getItem("datosUsuario")
    datos_perfil = JSON.parse(datos_perfil);

    document.getElementById("nombre_Perfil").value = datos_perfil.nombre_perfil
    document.getElementById("apellido_Perfil").value = datos_perfil.apellido_Perfil
    document.getElementById("nombreSegundo_Perfil").value = datos_perfil.segundoNombre
    document.getElementById("apellidoSegundo_Perfil").value = datos_perfil.segundoApellido
    document.getElementById("telefono").value = datos_perfil.telefono
    document.getElementById("email").value = datos_perfil.email_perfil
    document.getElementById("edad").value = datos_perfil.edad_perfil

}

document.addEventListener("DOMContentLoaded", function (e) {
    mostrarPerfil();
    });

