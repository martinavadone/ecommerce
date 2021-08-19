
function validar(){

    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pass").value;
    if ((nombre !== "")&&(pass !== "")){
        window.location.href="home.html";
    }
    else {
        alert("Debe completar los campos");
    }
}
