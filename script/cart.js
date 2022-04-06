let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);
const emptyCart = document.querySelector("#cart__items");



// get products from local storage
function getCartProducts() {
    if (productLocalStorage === null || productLocalStorage == 0) {
        const empty = '<p>your cart is empty</p>';
        emptyCart.innerHTML = empty;
    } else {

    for (let product in productLocalStorage) {

        let cartArticle = document.createElement("article");
        emptyCart.appendChild(cartArticle);
        cartArticle.className = "cart__item";
        cartArticle.setAttribute("data-id", productLocalStorage[product].idProduct);
        // image
        let imageDiv = document.createElement("div");
        cartArticle.appendChild(imageDiv);
        imageDiv.className = "cart__item__img";

        let cartImage = document.createElement("img");
        imageDiv.appendChild(cartImage);  
        cartImage.src = productLocalStorage[product].image;
        cartImage.alt = productLocalStorage[product].altProduct;
        //title
        let productContent = document.createElement("div");
        cartArticle.appendChild(productContent);
        productContent.className = "cart__item__content";

        let titleDiv = document.createElement("div");
        productContent.appendChild(titleDiv);
        titleDiv.className = "cart__item__content__titlePrice";

        let productTitle = document.createElement("h2")
        titleDiv.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[product].name;

        let productName = document.createElement("h2");
        productContent.appendChild(productName);
        productName.innerHTML = productLocalStorage[product].name;
        //price
        let productPrice = document.createElement("p");
        titleDiv.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[product].price + "$" ; 
        //color
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[product].productColor; 
        productColor.style.fontSize = "20px";

        //quanity
        let contentSettings = document.createElement("div");
        productContent.appendChild(contentSettings);
        contentSettings.className = "cart__item__content__settings";

        let quantitySettings = document.createElement("div");
        contentSettings.appendChild(quantitySettings);
        quantitySettings.className = "cart__item__content__settings__quantity";


        let productQuantity = document.createElement("input");
        quantitySettings.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[product].quantityOption;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    }
    //delete
    let deleteDiv = document.createElement('div');
    contentSettings.appendChild(deleteDiv);
    deleteDiv.className = 'cart__item__content__settings__delete';

    let productDelete = document.createElement("p");
    deleteDiv.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "delete";
}}
getCartProducts();

// retrieving the total number of quantities and price 

function totalPriceAndQuantities() {
    let quantity = document.getElementsByClassName('itemQuantity');
    let quantityLength = quantity.length;
    total = 0;

    for (let i = 0; i < quantityLength; i++) {
        total += quantity[i].number;
    }

    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = total;

    price = 0;

    for (let i = 0; i < quantityLength; i++ ) {
        price += (quantity[i].number * productLocalStorage[i].number);
    }

    let finalPrice  = document.getElementById('totalPrice')
    finalPrice.innerHTML = price;
}
totalPriceAndQuantities();

//removing products from cart

function removeProducts() {
    let productRemoval = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < productRemoval.length; i++) {
        productRemoval[i].addEventListener("click", (event) => {
            event.preventDefault;

            let idRemoval = productLocalStorage[i].productId;
            let colorRemoval = productLocalStorage[i].productColor
            productLocalStorage = productLocalStorage.filter(el =>
                el.idProduct !== idRemoval || el.productColor !== colorRemoval);

            localStorage.setItem("product", JSON.stringify(productLocalStorage));

            alert("This product has been removed from the cart.");
            location.reload();
        })
    }
}
removeProducts();
