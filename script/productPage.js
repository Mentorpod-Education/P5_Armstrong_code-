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

}

        // adding products to the cart
        function addToCart(element) {
            const basket = document.querySelector("#addToCart");
            const colorChoice = color.value;
            const quantityChoice = quantity.value;
        
         
            basket.addEventListener("click", (event) => { 
                if (quantityChoice.value > 0 && quantityChoice.value <= 100) {
        
                    let retrieveOptions = {
                        productId: idProduct,
                        image: element.imageUrl,
                        altProduct: element.altTxt,
                        name: element.name,
                        price: element.price,
                        description: element.description,
                        colorOption: colorChoice,
                        quantityOption: quantityChoice,
                    }
                
           
                    let productLocalStorage = JSON.parse(localStorage.getItem("product"));
            
                    const popUpConfirmation = () => {
                        if (window.confirm (`Your order of ${quantityChoice}  ${element.name}  ${colorChoice} is added to the cart
                    To view your cart, click OK`)) {
                            window.location.href ="cart.html";
                        }
                    }
                    
                //Import elements into local storage
                if (productLocalStorage) {
                    const resultFind = productLocalStorage.find(
                        (el) => el.productId === idProduct && el.colorOption === colorChoice);
                 
                if (resultFind) {
                    let newQuantity = parseInt(retrieveOptions.quantityOption) + parseInt(resultFind.quantityOption);
                    resultFind.quantityOption = newQuantity;
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    popUpConfirmation();

                } else {
                    productLocalStorage.push(retrieveOptions);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    popUpConfirmation();
                }

                } else {
                    productLocalStorage = [];
                    productLocalStorage.push(retrieveOptions);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    popUpConfirmation();
                }}
          });
        }

        addToCart(element);
        console.log(addToCart(element));
        

      


    


        
    
    
    
    









