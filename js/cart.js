//Initialisation of the local storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// If the basket is empty
function getCart() {
  if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>your basket is empty</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (let product in productLocalStorage) {
      // Insertion of the "article" element
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute('data-id', productLocalStorage[product].idProduct);

      // Insertion of the "div" element
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Image insertion
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = productLocalStorage[product].productImg;
      productImg.alt = productLocalStorage[product].productImgalt;

      // Insertion of the "div" element
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion of the "div" element
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Title insertion h3
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = productLocalStorage[product].productName;

      // Color insertion
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = productLocalStorage[product].productcolor;
      productColor.style.fontSize = "20px";

      // Insertion of the price
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = productLocalStorage[product].productPrice + "$";

      // Insertion of the "div" element
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion of the "div element
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      // Insertion of "Quanitity : "
      let productQty = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQty);
      productQty.innerHTML = "Quanitity : ";

      // Insertion of quantity
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = productLocalStorage[product].productamount;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion of the "div" element
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

      // Insertion of "p" delete
      let productdelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productdelete);
      productdelete.className = "deleteItem";
      productdelete.innerHTML = "to delete";
    }
  }
}
getCart();

function getTotals() {

  // Recovery of total quantities
  var elemsQtt = document.getElementsByClassName('itemQuantity');
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Recovery of the total price
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
    totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].productPrice);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

// Modification of a product quantity
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection of the element to modify according to its id and its color
      let quantityModif = productLocalStorage[k].productamount;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = productLocalStorage.find((the) => the.qttModifValue !== quantityModif);

      resultFind.productamount = qttModifValue;
      productLocalStorage[k].productamount = resultFind.productamount;

      localStorage.setItem("product", JSON.stringify(productLocalStorage));

      // refresh fast
      location.reload();
    })
  }
}
modifyQtt();

// Deleting a product
function deleteProduct() {
  let btn_delete = document.querySelectorAll(".deleteItem");

  for (let j = 0; j < btn_delete.length; j++) {
    btn_delete[j].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection of the element to delete according to its id and its color
      let idDelete = productLocalStorage[j].idProduct;
      let colorDelete = productLocalStorage[j].productcolor;

      productLocalStorage = productLocalStorage.filter(the => the.idProduct !== idDelete || the.productcolor !== colorDelete);

      localStorage.setItem("product", JSON.stringify(productLocalStorage));

      //Product deleted and refresh alert
      alert("This product has been successfully deleted from the basket");
      location.reload();
    })
  }
}
deleteProduct();

//Form setup with regex
function getForm() {
  // Adding Regex
  let form = document.querySelector(".cart__order__form");

  // Listening to the modification of the first name
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  // Listening to the modification of the first name
  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  // Listening to the modification of the first name
  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  // Listening to the modification of the first name
  form.city.addEventListener('change', function () {
    validCity(this);
  });

  // Listening to the modification of the first name
  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  //first name validation
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = 'Please fill in this field.';
    }
  };

  //name validation
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Please fill in this field.';
    }
  };

  //validation of the address
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Please fill in this field.';
    }
  };

  //city validation
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Please fill in this field.';
    }
  };

  //email validation
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Please fill in this field.';
    }
  };
}
getForm();

//Sending customer information to the localstorage
function postForm() {
  const btn_commander = document.getElementById("order");

  //Listen to the basket
  btn_commander.addEventListener("click", () => {

    //Retrieving contact details from the customer form
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    //Building an array from local storage
    let idProducts = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      idProducts.push(productLocalStorage[i].idProduct);
    }
    console.log(idProducts);

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problem with fetch : " + err.message);
      });
  })
}
postForm()