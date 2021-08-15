//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(productos => {
        prodData = productos.data;
        let htmlContentToAppend = "";
        for (producto of prodData) {
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                            <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <p class="mb-1 precio">` + producto.currency + ` ` + producto.cost + `</p>  
                    </div>
                </div>
            </a>
            `
        }
            document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        });
        });

    