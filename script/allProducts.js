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

            let article = document.createElement("article");
            productLink.appendChild(article);

            let image = document.createElement("image")
            article.appendChild(image);
            image.src = products[i].imageUrl;
            image.alt = products[i].altTxt;

            let title = document.createElement("h2");
            article.appendChild(title);
            title.classList.add("title");
            title.innerHTML = products[i].name;

            let productDescription = document.createElement("p");
            article.appendChild(productDescription);
            productDescription.classList.add("name");
            productDescription.innerHTML = products[i].description;
    }
  }).catch(function(error) {                     // if "REJECT" clears the content of main container and displays information for user
  

    return error;

  });   
}   
getAllProducts();
console.log(getAllProducts());





