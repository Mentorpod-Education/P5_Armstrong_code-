// launching the api
async function display() {
  const displayAllProducts = await fetch('http://localhost:3000/api/products');
  return await displayAllProducts.json();
}
// calling the api and enserting products into the homepage
async function getAllProducts() {
  await display().then(function(products) {    
  const product = products;

    for (let i in product) {
      
            let apiLink = document.createElement("a");
            document.querySelector(".items").appendChild(apiLink);
            apiLink.href = `product.html?id=${products[i]._id}`;

            let apiArticle = document.createElement("article");
            apiLink.appendChild(apiArticle);

            let apiImage = document.createElement("img")
            apiArticle.appendChild(apiImage);
            apiImage.src = products[i].imageUrl;
            apiImage.alt = products[i].altTxt;

            let apiName = document.createElement("h2");
            apiArticle.appendChild(apiName);
            apiName.classList.add("title");
            apiName.innerHTML = products[i].name;

            let apiDescription = document.createElement("p");
            apiArticle.appendChild(apiDescription);
            apiDescription.classList.add("name");
            apiDescription.innerHTML = products[i].description;
    }
  }).catch(error => {                 
    return error;
  });  
} 
getAllProducts();






