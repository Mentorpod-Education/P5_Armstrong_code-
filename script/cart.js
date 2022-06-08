
function basketNumbers(retrieveOption, action) {
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

    setItems(retrieveOption)
}


function setItems(retrieveOption) {
    let items = localStorage.getItem("cartOptions");
    items = JSON.parse(items);

    if (items != null) {
        items.incart += 1
    } else {
        retrieveOption.incart = 1;
        items = {
            [retrieveOption.name]: retrieveOption
        }
    }

    if(items != null) {
        let currentItem = retrieveOption.name;
    
        if( items[currentItem] == undefined ) {
            items = {
                ...items,
                [currentItem]: retrieveOption
            }
        } 
        items[currentItem].incart += 1;

    } else {
        retrieveOption.incart = 1;
        items = { 
            [retrieveOption.name]: retrieveOption
        };
    }

    localStorage.setItem("cartOptions", JSON.stringify(items));

}


function totalPrice(retrieveOption, action) {
    let totalCost = localStorage.getItem("totalPrice");

    if (action) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalPrice", totalCost - retrieveOption.price);
    } else if (totalCost != null) {
        totalCost = parseInt(totalCost);
        localStorage.setItem("totalPrice", totalCost + retrieveOption.price)
    } else {
        localStorage.setItem("totalPrice", retrieveOption.price)
    }
    
}

function displayCart() {
    let items = localStorage.getItem("cartOptions");
    items = JSON.parse(items);

    let totalCost = localStorage.getItem("totalPrice");
    totalCost = parseInt(totalCost);
    let cartItems = document.querySelector("#cart__items");
    

    if (items && cartItems) {
        cartItems.innerHTML = '';
        Object.values(items).map( (item) => {
            cartItems.innerHTML += `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <ion-icon name="close-circle"></ion-icon>
            <div class="cart__item__img">
            <img src="${item.image}"/>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.colorOption}</p>
                <p>${item.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  ${item.quantityOption}
                </div>
              </div>
            </div>
          </article>
            `
        });

        cartItems.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal">$${totalCost}</h4>
            </div>`

        deleteButton();
    }
}

function deleteButton() {
    let deleteButton = document.querySelectorAll('.product ion-icon');
    let numbers = localStorage.getItem('basketNumbers');
    let cartCost = localStorage.getItem("totalPrice");
    let items = localStorage.getItem('cartOptions');
    items = JSON.parse(items);
    let productName;

    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            productName = deleteButton[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('basketNumbers', numbers - items[productName].incart);
            localStorage.setItem('totalPrice', cartCost - ( items[productName].price * items[productName].incart));

            delete items[productName];
            localStorage.setItem('cartOptions', JSON.stringify(items));

            displayCart();
            addCartNumbers();
        })
    }
}

console.log(displayCart());
export { basketNumbers, totalPrice };