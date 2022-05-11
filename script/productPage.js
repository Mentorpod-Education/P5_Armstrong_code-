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
        incart: 0,
    };


    for (let i = 0; i < basket.length; i++) {
        basket.addEventListener("click", () => { 
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

function basketNumbers(retrieveOptions, action) {
    let numbers = localStorage.getItem('basketNumbers');
    numbers = parseInt(numbers);

    let items = localStorage.getItem("cartOptions");
    items = JSON.parse(items);

    if (action) {
        localStorage.setItem("basketNumbers", numbers - 1);
        document.querySelector('.cart span').textContent = numbers - 1;
    } else if (numbers) {
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
        items.incart += 1
    } else {
        retrieveOptions.incart = 1;
        items = {
            [retrieveOptions.name]: retrieveOptions
        }
    }
    localStorage.setItem("cartOptions", JSON.stringify(items));

}

function totalPrice(retrieveOptions, action) {
    let totalCost = localStorage.getItem("totalPrice");

    if (action) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalPrice", totalCost - retrieveOptions.price);
    } else if (totalCost != null) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalPrice", totalCost + retrieveOptions.price)
    } else {
        localStorage.setItem("totalPrice", retrieveOptions.price)
    }
    
}

function displayCart() {
    let showCart = localStorage.getItem("cartOptions");
    showCart = JSON.parse(showCart);

    let totalCost = localStorage.getItem("totalPrice");
    totalCost = parseInt(totalCost);
    let cartItems = document.querySelector("#cart__items");
    

    if (showCart && cartItems) {
        cartItems.innerHTML = '';
        Object.values(showCart).map( (item, index) => {
            cartItems.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img>${item.image}</img>
                <span>${item.name}</span>
            </div>
            </div class="price">${item.price}</div>
            </div class="quantity"> 
            <span>${item.incart}</span>
            </div>
            <div class="total">
                ${item.incart * item.price}
            </div>
            `
        });

        cartItems.innerHTML += `
            <div class="container">
                <h4 class="totalContainer">
                    Total
                </h4>
                <h4 class="finalContainer">
                    ${totalCost}
                </h4>
            </div>
        `
        deleteButton();
    }
}

function deleteButton() {
    let deleteButton = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('addCartNumbers');
    let cartCost = localStorage.getItem("totalPrice");
    let cartItems = localStorage.getItem('cartOptions');
    cartItems = JSON.parse(cartItems);
    let productName;

    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            productName = deleteButton[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('addCartNumbers', productNumbers - cartItems[productName].incart);
            localStorage.setItem('totalPrice', cartCost - ( cartItems[productName].price * cartItems[productName].incart));

            delete cartItems[productName];
            localStorage.setItem('cartOptions', JSON.stringify(cartItems));

            displayCart();
            addCartNumbers();
        })
    }
}

displayCart();
addCartNumbers();
















    
    









