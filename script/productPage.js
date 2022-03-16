const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");

// We spoke about querySelector last week (see below; lines; 6-10)
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Retrieve the articles from the API

function getArticle() {
   fetch('http://localhost:3000/api/products/' + idProduct)
  .then ((res) => {
      return res.json ();
  })

  .then(async function(products) {
      article = await products;     

      if (article) {
        getPost(article);
    }

}).catch((error) => {                 
    console.log('there has been an error in your request');
  
  });  
}

//STEPS REQUIRED
// Breakdown of the API data in the DOM



function getPost(article){
    // Image insertion
    let productImage = document.createElement("img");
    document.querySelector('.item__img').appendChild(productImage);
    productImage.src = article.imageUrl;
    productImage.alt = article.altTxt;

    // Modification of the title "h1
    let ProductTitle = document.getElementById('title');
    ProductTitle.innerHTML = article.name;

    // Modification of the price
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification of the description
    let ProductDescription = document.getElementById('description');
    ProductDescription.innerHTML = article.description;

    // Insertion of color options

    for (let colors of article.colors) {
        let colorOptions = document.createElement("option");
        document.querySelector("#colors").append(colorOptions);
        colorOptions.value = colors;
        colorOptions.innerHTML = colors;
    }

    addToCart(article);

}


        function addToCart(article) {
            const basket = document.querySelector("#addToCart");
            let colorChoice = colorPicked.value;
            let quantityChoice = quantityPicked.value;
        
            //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
            basket.addEventListener("click", (event) => { 
                if (quantityChoice.value > 0 && quantityChoice.value < 100) {
        
        
                     //Retrieving the options of the item to add to the cart
                    let retrieveOptions = {
                        idProduct: idProduct,
                        image: article.imageUrl,
                        altProduct: article.altTxt,
                        name: article.title,
                        price: article.price,
                        description: article.description,
                        colorOption: colorChoice,
                        quantityOption: quantityChoice,
                    }
                
            //Initialisation du local storage
            let productLocalStorage = JSON.parse(localStorage.getItem("product"));
        
            //window pop-up
            const popUpConfirmation =() =>{
                if (window.confirm (`Your order of ${quantityChoice}  ${article.name}  ${colorChoice} is added to the cart
        To view your cart, click OK`)) {
                    window.location.href ="cart.html";
                }
            }
                
            //Import into local storage
            //If the basket already contains at least 1 item
            if (productLocalStorage) {
                const resultFind = productLocalStorage.find(
                    (el) => el.idProduct === idProduct && el.colorOption === colorChoice);
                 //If the ordered product is already in the basket
            if (resultFind) {
                let newQuantity = parseInt(retrieveOptions.quantityOption) + parseInt(resultFind.quantityOption);
                resultFind.quantityOption = newQuantity;
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                popUpConfirmation();

                    
            //If the ordered product is not in the basket
            } else {
                productLocalStorage.push(retrieveOptions);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                popUpConfirmation();
            }
            //If the basket is empty
        } else {
            productLocalStorage =[];
            productLocalStorage.push(retrieveOptions);
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
            popUpConfirmation();
            }}
            });
        }
        
    
    
    
    









