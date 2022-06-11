import { basketNumbers, totalPrice } from './cart.js';

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
    addToCart(element)

}

// adding products to the cart
function addToCart(element) {
    const basket = document.querySelectorAll("#addToCart");

    


    for (let i = 0; i < basket.length; i++) {
        basket[i].addEventListener("click", () => { 
            let colorChoice = color.value;
            let quantityChoice = quantity.value;
            console.log(colorChoice);

            let retrieveOptions = {
                productId: idProduct,
                image: element.imageUrl,
                altProduct: element.altTxt,
                name: element.name,
                price: element.price,
                description: element.description,
                colorOption: colorChoice,
                quantityOption: quantityChoice,
                incart: 0,
            };
            basketNumbers(retrieveOptions);
            totalPrice(retrieveOptions);
        });
    }
}

function addCartNumbers() {
    let numbers = localStorage.getItem('basketNumbers');
    if (numbers) {
        document.querySelector('.cart span').textContent = numbers;
    }
}




addCartNumbers();


















    
    









