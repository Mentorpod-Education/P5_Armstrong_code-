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
    const colorChoice = color.value;
    const quantityChoice = quantity.value;

    let retrieveOptions = {
        productId: idProduct,
        image: element.imageUrl,
        altProduct: element.altTxt,
        name: element.name,
        price: element.price,
        description: element.description,
        colorOption: colorChoice,
        quantityOption: quantityChoice,
    };


    for (let i = 0; i < basket.length; i++) {
        basket[i].addEventListener("click", () => { 
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

function basketNumbers(retrieveOptions) {
    let numbers = localStorage.getItem('basketNumbers');
    numbers = parseInt(numbers);

    if (numbers) {
        localStorage.setItem("basketNumbers", numbers + 1);
        document.querySelector('.cart span').textContent = numbers + 1;
    } else {
        localStorage.setItem("basketNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(retrieveOptions)
}

function setItems(retrieveOptions) {
    let items = localStorage.getItem("cartOptions");
    items = JSON.parse(items);

    if (items != null) {
        console.log(items);
        items.incart += 1
    } else {
        retrieveOptions.inCart = 1;
        items = {
            [retrieveOptions.name]: retrieveOptions
        }
    }
    localStorage.setItem("cartOptions", JSON.stringify(items));

}

function totalPrice(retrieveOptions) {
    console.log("the price is", retrieveOptions.price);
    localStorage.setItem("totalPrice", retrieveOptions.price)
}

addCartNumbers();














    
    









