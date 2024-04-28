// Author: Owen Jewell
// ISU Netid: ojewell@iastate.edu
// Date: April 15, 2024
document.addEventListener('DOMContentLoaded', function () {
  fetch("http://localhost:8081/listproducts")
    .then(response => response.json())
    .then(products => loadproducts(products))
    .catch(error => {
      console.error("Error loading products:", error)
      displayError("Error loading products")
    });

  const newproductButton = document.getElementById('post-product');
  newproductButton.addEventListener('click', addANewproduct);
});

const fetchButton = document.getElementById('fetch-product');
const productIdInput = document.getElementById('product-id-input');
const movieContainer = document.getElementById('movie-container');

fetchButton.addEventListener('click', function () {
  const productId = productIdInput.value;
  if (!productId) {
    // If no ID provided, fetch all products
    fetch("http://localhost:8081/listproducts")
      .then(response => response.json())
      .then(products => loadproducts(products))
      .catch(error => {
        console.error("Error loading products:", error)
        displayError("Error loading products")
      });
  } else {
    fetch(`http://localhost:8081/${productId}`)
      .then(response => response.json())
      .then(product => {
        movieContainer.innerHTML = '';
        if (!product.name) {
          displayError("No product with that ID found");
        }
        else {
          displayproduct(product);
        }
      })
      .catch(error => {
        console.error("Error loading products:", error);
        displayError("Error loading products");
      });
  }
});

function loadproducts(products) {
  movieContainer.innerHTML = '';
  products.forEach(product => {
    displayproduct(product);
  })
}

function displayproduct(product) {
  const cardDiv = document.createElement('div'); // Create a new div element for each card
  cardDiv.classList.add('col');
  cardDiv.innerHTML = `
      <div class="card shadow-sm">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Delete product</button>
                  </div>
              </div>
          </div>
      </div>
    `;
  movieContainer.appendChild(cardDiv);
}

function displayError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('alert', 'alert-danger');
  errorDiv.textContent = message;
  movieContainer.appendChild(errorDiv);
}

function addANewproduct() {
  const newproductInput = document.getElementById('new-product-input');
  const newproductJson = newproductInput.value;

  try {
      const newproduct = JSON.parse(newproductJson);
      console.log('New product JSON:', newproduct);

      fetch("http://localhost:8081/addproduct", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newproduct)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to add new product.');
          }
          return response.json();
      })
      .then(data => {
          console.log('New product added:', data);
          // Optional: Refresh the list of products after adding
          fetch("http://localhost:8081/listproducts")
              .then(response => response.json())
              .then(products => loadproducts(products))
              .catch(error => {
                  console.error("Error loading products:", error)
                  displayError("Error loading products")
              });
      })
      .catch(error => {
          console.error('Error adding new product:', error);
          displayError('Error adding new product.');
      });

      // Clear the input field after adding the product
      newproductInput.value = '';
  } catch (error) {
      console.error('Invalid JSON for new product:', error);
      displayError('Invalid JSON for new product.');
  }
}

function updateOneproduct() {
  // Fetch the value from the input field
  let id = document.getElementById("updateproductById").value;
  console.log(id);
  fetch(`http://localhost:8081/updateproduct/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(
      {
        "name": "product Abraham ALDACO-GASTELUM",
        "price": 100.90,
        "description": "I product is one example of an image for my exercise",
        "imageUrl": "https://robohash.org/Abraham"
      }
    )
  })
    .then(response => response.json())
    .then(updateThisproduct => { updateOneproductById(updateThisproduct) });

}

function deleteOneproduct() {
  // Fetch the value from the input field
  let id = document.getElementById("deleteproductById").value;
  console.log(id);
  fetch(`http://localhost:8081/deleteproduct/${id}`, {
  method: 'DELETE',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(
  { "id":id}
  )
  })
  .then(response => response.json())
  .then(deleteThisproduct => {deleteOneproductById(deleteThisproduct)});
}

//{"id": 4,"name": "product Owen","price":50.4,"description": "I product is one example of an image for my exercise","imageUrl": "https://robohash.org/Owen"}

