let productosCarrito =[]; //lista de productos del carrito.
let sumaTotal;

//Muestro los artículos del carrito.
function showCarrito(array) {
  let html ="";
  for (let i = 0; i < array.length; i++) {
      let article = array[i];
      
      html +=`
          <tr>
          <td><img src="${article.src}" class = "img-fluid" style ="max-width:90px!important"></td>
          <td class="align-middle">${article.name}</td>
          <td class="align-middle"><p id="precio${i}">${article.unitCost} ${article.currency}</p></td>
          <td class="align-middle"><input type="number" min ="1" id="number${i}" value=${article.count} onchange="upProductSubTotal(${i})"></td>
          <td class="align-middle"><p id="subTotal${i}">${article.count * article.unitCost}</p></td>
          </tr>
          `      
  }

  document.getElementById("carrito").innerHTML = html;

}

//Muestro el subtotal de cada producto y luego llamo a la función de costoTotal para mostrar todo el costo.
function upProductSubTotal(i) {
    let cantidad = parseInt(document.getElementById("number"+i).value);
    let precioProduct = parseInt(document.getElementById("precio"+i).innerText);

    let subTotal = precioProduct * cantidad;

    document.getElementById("subTotal"+i).innerHTML = subTotal;

    costoTotal();

}

//Obtengo el costo total a través de la suma de los subtotales de cada artículo.
function costoTotal(){
    let sumaTotal = 0;
  for(let i = 0; i < productosCarrito.articles.length ;i++){
    sumaTotal += parseFloat(document.getElementById(`subTotal${i}`).innerHTML);
  }

  document.getElementById('total').innerHTML = "$" + " " + sumaTotal; 

}

//Obtengo los artículos de la url para mostralos y obtener el costo total.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(resultado=>{ 
        if (resultado.status === "ok") {
            productosCarrito = resultado.data;
            showCarrito(productosCarrito.articles);
            costoTotal();
        }
  
    })
});






