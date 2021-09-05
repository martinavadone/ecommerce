

function validar(){

    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if ((user !== "")&&(pass !== "")){
       
        localStorage.setItem('username', document.getElementById("user").value); //Guardo el nombre del usuario en el localStorage con el nombre username

        window.location.href="home.html"; //Cuando sean válidos ambos campos redirigir a home

    }
    
   else {
        alert("Debe completar los campos");
    }
}

    