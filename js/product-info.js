let listacomments =[];


document.addEventListener("DOMContentLoaded", function(e){
showProducts();
showComments();
showRelacionados();

}
)



//Función que muestra las imágenes en galería.
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}




//Guardar fecha y hora.
function getDate(){
  let date = new Date();
  let formatDate = date.getDate().toString().padStart(2,'0') + "/" + (date.getMonth() + 1).toString().padStart(2,'0') + "/" + date.getFullYear().toString() + "  " + date.getHours().toString().padStart(2,'0') + ":" + date.getMinutes().toString().padStart(2,'0') + ":" + date.getSeconds().toString().padStart(2,'0');
return formatDate;
}


//Dibuja estrellas.
function drawStars(stars){
  let number = parseInt(stars);
  let html="";
  for(let i= 1; i<=number; i++){
    html += `<span class="fa fa-star checked"></span>`
  }
  for(let j= number+1; j<=5; j++){
    html += `<span class="fa fa-star"></span>`
  }
  return html;
}



//Guardar comentario.
function saveComment(){
  let comentario = {
    description: document.getElementById("description").value,
    dateTime: getDate(),
    score: document.getElementById("score").value,
    user: localStorage.getItem("username")
  }
  listacomments.push(comentario);
  showComment();
}


//Mostrar comentarios que se hagan.
function showComment(){
  let opinion = ""
  for (let i = listacomments.length - 1; i >= 0; i--) {
    let comment = listacomments[i];
    opinion += 
          `<div class="comment-card container"><h4>${comment.user} ${drawStars(comment.score)}</h4>
              <p>${comment.description}<p class="text-right">${comment.dateTime}</p></p>
              </div><br>`
  }
  document.getElementById("comentarios").innerHTML = opinion;
}



//Muestro comentarios del JSON.
function showComments() { 

  let comentarios = document.getElementById('comentarios')

  //Petición fetch para traer los datos de los comentarios.
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(respuesta => respuesta.json())
    .then(comment => {

      for (let comments of comment) {
        saveStar = "";
        for (let i = 0; i < 5; i++) {
          if (i >= comments.score) {
            saveStar += `<span class="fa fa-star"></span>`
          } else {
            saveStar += `<span class="fa fa-star checked"></span>`
          }
        }
        
        comentariosJSON.innerHTML +=
          `<div class="comment-card container"><h4>${comments.user} ${saveStar}</h4>
              <p>${comments.description}<p class="text-right">${comments.dateTime}</p></p>
              </div><br>`
           
      }})
      showComment();
    }
    



    //Muestro información del producto.
function showProducts(){
    
  //Petición para traer los datos del producto.
  getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        product = resultObj.data;

        let productNameHTML  = document.getElementById("productName");
        let productDescriptionHTML = document.getElementById("productDescription");
        let productCountHTML = document.getElementById("productCount");
        let productCostHTML = document.getElementById("productCost");
    
        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCountHTML.innerHTML = product.soldCount;
        productCostHTML.innerHTML = product.cost;

        //Muestro las imagenes en forma de galería.
        showImagesGallery(product.images);
    }
     

    function showRelacionados(){
      getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {let prodRel = ``;
        for (let i = 0; i < resultObj.relatedProducts.length; i++) {
            prodRel += `
            <div class="col-sm-4">
                    <div class="card">
                        <a class="card-link" href="#">
                            <img class="card-img-top" src="${prods[info.relatedProducts[i]].imgSrc}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${`prods`[info.relatedProducts[i]].name}</h5>
                                <p class="card-text">${prods[info.relatedProducts[i]].description}</p>
                                <p class="card-text">${prods[info.relatedProducts[i]].currency} ${prods[info.relatedProducts[i]].cost}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `
        }


        }
    })
    
  }})}