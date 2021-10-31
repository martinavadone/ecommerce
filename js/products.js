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

                htmlContentToAppend += `   <div class="col-lg-4 col-md-6 col-sm-12" onclick="particularProd(` + `'` + producto.name + `'` + `)">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}" alt="${producto.description}">
                    <div class="card-body">
                        <h4 class="mb-1">${producto.name}</h4>
                        <strong><p class="mb-1">${producto.currency} ${producto.cost}</p></strong>
                        <p class="card-text">${producto.description}</p>
                        <small class="text-muted">${producto.soldCount} artículos vendidos</small>
                    </div>
                </a>
            </div>
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