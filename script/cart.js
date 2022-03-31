const productLocalStorage = JSON.parse(localStorage.getItem("product"));
const emptyCart = document.querySelector("#cart__items");



// get products from local storage
function getCartProducts() {
    if (productLocalStorage === null || productLocalStorage == 0) {
        const empty = '<p>your cart is empty</p>';
        emptyCart.innerHTML = empty;
    } else {

    for (let product in productLocalStorage) {

        let article = document.createElement("article");
        emptyCart.appendChild(article);
        article.className = "cart__items";
        article.setAttribute("data-id", productLocalStorage[product].idProduct);

        let productImage = document.createElement("div");
        article.appendChild(productImage);
        productImage.className = "cart__item__image";

        let image = document.createElement("img");
        productImage.appendChild(image);  
        image.src = productLocalStorage[product].image;
        image.alt = productLocalStorage[product].altProduct;

        let productContent = document.createElement("div");
        article.appendChild(productContent);
        productContent.className = "cart__item__content";

        productTitle = document.createElement("div");
        productContent.appendChild(productTitle);
        productTitle.className = "cart__item__content__titlePrice";

        let title = document.createElement("h2")
        productTitle.appendChild(title);
        title.className = "cart__item__content__titlePrice";

        let productName = document.createElement("h2");
        productContent.appendChild(productName);
        productName.innerHTML = productLocalStorage[product].name;

        let productPrice = document.createElement("p");
        productName.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[product].productPrice + "$" ; 

        let productDescription = document.createElement("div");
        let description = document.createElement("p");
        productDescription.appendChild(description);

        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[product].productColor; 
        productColor.style.fontSize = "20px";

        let contentSettings = document.createElement("div");
        productContent.appendChild(contentSettings);
        contentSettings.className = "cart__item__content__settings";

        let quantitySettings = document.createElement("div");
        contentSettings.appendChild(quantitySettings);
        quantitySettings.className = "cart__item__content__settings__quantity";


        let productQuantity = document.createElement("input");
        quantitySettings.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[product].quantityProduct;
        productQuantity.className = "itemQuantity";
    }
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

    let totalPrice  = document.getElementById('totalPrice')
    totalPrice.innerHTML = totalPrice;
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