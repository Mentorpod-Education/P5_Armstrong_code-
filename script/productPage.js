const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

let element = "";


// grabbing information from api 

function getArticle() {
   fetch('http://localhost:3000/api/products/' + idProduct)
  .then ((res) => {
      return res.json();
  })

  .then(async function (products) {
      element = await products;     

      if (element) {
        getPost(element);
    }

}).catch(error => {                 
    return error;
  }) 
}
getArticle();

// inserting data from the api into the dom

function getPost(element) {
    // image
    let dataImage = document.createElement("img");
    document.querySelector('.item__img').appendChild(dataImage);
    dataImage.src = element.imageUrl;
    dataImage.alt = element.altTxt;

    // title
    let dataTitle = document.getElementById('title');
    dataTitle.innerHTML = element.name;

    // price
    let dataPrice = document.getElementById('price');
    dataPrice.innerHTML = element.price;

    // description
    let dataDescription = document.getElementById('description');
    dataDescription.innerHTML = element.description;

    // colors

    for (let colors of element.colors) {
        let dataColors = document.createElement("option");
        color.appendChild(dataColors);
        dataColors.value = colors;
        dataColors.innerHTML = colors;
    }

    addToCart(element);

}


        function addToCart(element) {
            const basket = document.querySelector("#addToCart");
            const colorChoice = colorPicked.value;
            const quantityChoice = quantityPicked.value;
        
         
            basket.addEventListener("click", (event) => { 
                if (quantityChoice.value > 0 && quantityChoice.value < 100) {
        
        
                     //Retrieving the options of the item to add to the cart
                    let retrieveOptions = {
                        idProduct: idProduct,
                        image: article.imageUrl,
                        altProduct: article.altTxt,
                        name: article.name,
                        price: article.price,
                        description: article.description,
                        colorOption: colorChoice,
                        quantityOption: quantityChoice,
                    }
                
           
                let productLocalStorage = JSON.parse(localStorage.getItem("product"));
            
                //window pop-up
                const popUpConfirmation = () => {
                    if (window.confirm (`Your order of ${quantityChoice}  ${article.name}  ${colorChoice} is added to the cart
            To view your cart, click OK`)) {
                        window.location.href ="cart.html";
                    }
                }
                    
                //Import into local storage
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
                productLocalStorage = [];
                productLocalStorage.push(retrieveOptions);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                popUpConfirmation();
            }}
          });
        }


    


        
    
    
    
    









