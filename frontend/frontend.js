import React, { useState, useEffect } from 'react';

document.addEventListener("DOMContentLoaded", function () {
  // Fetch products from backend
  fetch("http://localhost:8081/products")
    .then((response) => response.json())
    .then((products) => {
      console.log("Products:", products);
      // Render products on the frontend
      renderProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

function CreateProduct() {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [ratingRate, setRatingRate] = useState("");
  const [ratingCount, setRatingCount] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit form data to backend
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Rating Rate:</label>
          <input
            type="text"
            value={ratingRate}
            onChange={(e) => setRatingRate(e.target.value)}
          />
        </div>
        <div>
          <label>Rating Count:</label>
          <input
            type="text"
            value={ratingCount}
            onChange={(e) => setRatingCount(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ReadProducts() {
  // State variable to store products
  const [products, setProducts] = useState([]);

  // Function to fetch products from backend
  useEffect(() => {
    // Logic to fetch products from backend
  }, []);

  return (
    <div>
      <h2>Read Products</h2>
      {/* Display products */}
    </div>
  );
}

function UpdateProduct() {
  // State variables for form fields
  const [productId, setProductId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit form data to backend for updating product
  };

  return (
    <div>
      <h2>Update Product Price</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div>
          <label>New Price:</label>
          <input
            type="text"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function DeleteProduct() {
  // State variable for product ID
  const [productId, setProductId] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit form data to backend for deleting product
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { CreateProduct, ReadProducts, UpdateProduct, DeleteProduct };

// Main App component
function App() {
  return (
    <div>
      <h1>MERN Catalog Management</h1>
      <CreateProduct />
      <ReadProducts />
      <UpdateProduct />
      <DeleteProduct />
    </div>
  );
}
