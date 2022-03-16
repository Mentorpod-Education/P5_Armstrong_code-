
async function display() {
  const displayAllProducts = await fetch('http://localhost:3000/api/products');
  return await displayAllProducts.json();
}

async function getAllProducts() {
  await display().then(function(products) {    
  const product = products;

    for (let i in product) {   //adding each camera from the response into DOM
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${products[i]._id}`;

            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            let productImage = document.createElement("img")
            productArticle.appendChild(productImage);
            productImage.src = products[i].imageUrl;
            productImage.alt = products[i].altTxt;

            let productTitle = document.createElement("h2");
            productArticle.appendChild(productTitle);
            productTitle.classList.add("title");
            productTitle.innerHTML = products[i].name;

            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("name");
            productDescription.innerHTML = products[i].description;
    }
  }).catch(function (error) {                 
    return error;
  
  });  
} 
getAllProducts();






