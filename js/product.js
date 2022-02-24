var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Retrieve the articles from the API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })

        // Breakdown of the API data in the DOM
        .then(async function (resultAPI) {
            article = await resultAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("API request error");
        })
}

function getPost(article) {
    // Image insertion
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification of the title "h1
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification of the price
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification of the description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion of color options
    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Shopping cart management
function addToCart(article) {
    const btn_sendBasket = document.querySelector("#addToCart");

    //Listen to the basket with 2 non-zero color conditions and quantity between 1 and 100
    btn_sendBasket.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            //Recovery of the color choice
            let colorChoice = colorPicked.value;

            //Recovery of the choice of quantity
            let choiceQuantity = quantityPicked.value;

            //Retrieving the options of the item to add to the cart
            let optionsProduct = {
                idProduct: idProduct,
                productcolor: colorChoice,
                productamount: Number(choiceQuantity),
                productName: article.name,
                productPrice: article.price,
                productDescription: article.description,
                productImg: article.imageUrl,
                productImgalt: article.altTxt
            };

            //Initialisation of the local storage
            let productLocalStorage = JSON.parse(localStorage.getItem("product"));

            //window pop-up
            const popupConfirmation = () => {
                if (window.confirm(`Your order of ${choiceQuantity} ${article.name} ${colorChoice} is added to cart
        To view your basket, click OK`)) {
                    window.location.href = "cart.html";
                }
            }

            //Import into local storage
            //If the basket already contains at least 1 item
            if (productLocalStorage) {
                const resultFind = productLocalStorage.find(
                    (the) => the.idProduct === idProduct && the.productcolor === colorChoice);
                //If the ordered product is already in the basket
                if (resultFind) {
                    let newQuantity =
                        parseInt(optionsProduct.productamount) + parseInt(resultFind.productamount);
                    resultFind.productamount = newQuantity;
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.table(productLocalStorage);
                    popupConfirmation();
                    //If the ordered product is not in the basket
                } else {
                    productLocalStorage.push(optionsProduct);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.table(productLocalStorage);
                    popupConfirmation();
                }
                //If the basket is empty
            } else {
                productLocalStorage = [];
                productLocalStorage.push(optionsProduct);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                popupConfirmation();
            }
        }
    });
}