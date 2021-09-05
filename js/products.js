var minCost;
var maxCost;
const ORDEN_ASC = "-+";
const ORDEN_DESC = "+-";
const ORDEN_POR_RELEVANCIA = "rel";

var buscar;


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(productos => {
        prodData = productos.data;
        showProducts(prodData);
    });
});

function sortProductos(criterio, array) {
    let result = [];
    if (criterio === "-+") {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            }
        );
    } else if (criterio === "+-") {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            }
        );
    } else if (criterio === "rel") {
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            }
        );
    
    }

    return result;
}



function showProducts(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))) {
            //buscador de productos
                if (buscar == undefined || producto.name.toLowerCase().indexOf(buscar) != -1 || producto.description.toLowerCase().indexOf(buscar)!= -1) {

                htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name + `</h4>
                            <small class="text-muted">` + producto.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <p class="mb-1 precio"> ` + producto.currency + ` ` + producto.cost + `</p>
                    </div>
            
                </div>
            </a>
            `
            }
        }
        document.getElementById("productos-list-container").innerHTML = htmlContentToAppend;
    }
}





document.addEventListener("DOMContentLoaded", function (e) {


    document.getElementById("sortAsc").addEventListener("click", function () {
        sortProductos(ORDEN_ASC, prodData);
        showProducts(prodData);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortProductos(ORDEN_DESC, prodData);
        showProducts(prodData);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortProductos(ORDEN_POR_RELEVANCIA, prodData);
        showProducts(prodData);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts(prodData);
    });

    document.getElementById("btnFiltro").addEventListener("click", function () {

        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProducts(prodData);
    });
    document.getElementById("buscador").addEventListener("input", function () {
        buscar = document.getElementById("buscador").value.toLowerCase();
        showProducts(prodData);
    })
});