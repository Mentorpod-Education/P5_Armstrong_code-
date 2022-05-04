function displayCart() {
    let showCart = localStorage.getItem("cartOptions");
    showCart = JSON.parse(showCart);
    let cartItems = document.querySelector("#cart__items");
    let totalCost = localStorage.getItem("totalPrice");

    if (showCart && cartItems) {
        cartItems.innerHTML = '';
        Object.values(showCart).map(item => {
            cartItems.innerHTML += `
            <div class="product">
                <img>${item.image}</img>
                <span>${item.name}</span>
            </div>
            </div class="price">${item.price}</div>
            </div class="quantity"> 
            <span>${item.inCart}</span>
            </div>
            <div class="total">
                ${item.inCart * item.price}
            </div>
            `
        });

        cartItems.innerHTML += `
            <div class="price">
                <h4 class="totalPrice">
                    Total
                </h4>
                <h4 class="thePrice">
                    ${totalCost}
                </h4>
            </div>
        `
    }
}

displayCart();