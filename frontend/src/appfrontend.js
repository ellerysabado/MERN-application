import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
    const Getcatalog = () => {
        const [products, setProducts] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            fetch("http://localhost:8081/products")
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show Catalog of Products :", data);
                    setProducts(data);
                });
        }, []);

        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>

                {products.map((el) => (
                    <div key={el.id}>
                        <img src={el.image} alt="product" width={30} />
                        <div>Title: {el.title}</div>
                        <div>Category: {el.category}</div>
                        <div>Price: {el.price}</div>
                        <div>Rating: {el.rating}</div>
                    </div>
                ))}
            </div>
        );
    };

    const Getcatalogid = () => {
        const [oneProduct, setOneProduct] = useState([]);
        const navigate = useNavigate();
        const [id, setId] = useState("");

        useEffect(() => {
            if (id) {
                fetch(`http://localhost:8081/${id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Show one product :", data);
                        setOneProduct(data);
                    });
            }
        }, [id]);

        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>
                <br />
                <input type="text" placeholder="Enter ID" onChange={(e) => setId(e.target.value)} />

                {oneProduct.map((el) => (
                    <div key={el.id}>
                        <img src={el.image} alt="product" width={30} />
                        <div>Title: {el.title}</div>
                        <div>Category: {el.category}</div>
                        <div>Price: {el.price}</div>
                        <div>Rating: {el.rating}</div>
                    </div>
                ))}
            </div>
        );
    };

    const Postcatalog = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
            rating: ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            fetch("http://localhost:8081/addProducts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (response.status !== 200) {
                        return response.json()
                            .then(errData => {
                                throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                            })
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    alert("Item added successfully!");
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    alert('Error adding product:' + error.message);
                });
        }

        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>

                <form onSubmit={handleSubmit}>
                    <h1>Post a New Product</h1>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /> <br />
                    <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required /> <br />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /> <br />
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required /> <br />
                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required /> <br />
                    <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" required /> <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

    const Deletecatalog = () => {
        const [products, setProducts] = useState([]);
        const [index, setIndex] = useState(0);
        const navigate = useNavigate();

        useEffect(() => {
            fetch("http://localhost:8081/products")
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                    console.log("Load initial Catalog of Products in DELETE :", data);
                });
        }, []);

        function getOneByOneProductNext() {
            if (products.length > 0) {
                if (index === products.length - 1) setIndex(0);
                else setIndex(index + 1);
            }
        }

        function getOneByOneProductPrev() {
            if (products.length > 0) {
                if (index === 0) setIndex(products.length - 1);
                else setIndex(index - 1);
            }
        }

        const deleteOneProduct = (id) => {
            console.log("Product to delete :", id);
            fetch("http://localhost:8081/deleteproduct/" + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": id }),
            })
                .then(response => {
                    if (response.status !== 200) {
                        return response.json()
                            .then(errData => {
                                throw new Error(`POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                            })
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Delete a product completed : ", id);
                    console.log(data);
                    const newProducts = products.filter(product => product.id !== id);
                    setProducts(newProducts);
                    setIndex(0);
                    if (data) {
                        const key = Object.keys(data);
                        const value = Object.values(data);
                        alert(key + value);
                    }
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    alert('Error deleting product:' + error.message);
                });
        }

        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>

                <h3>Delete one product:</h3>
                <button onClick={() => getOneByOneProductPrev()}>Prev</button>
                <button onClick={() => getOneByOneProductNext()}>Next</button>
                <button onClick={() => deleteOneProduct(products[index].id)}>Delete</button>

                <div key={products[index].id}>
                    <img src={products[index].image} width={30} /> <br />
                    Id:{products[index].id} <br />
                    Title: {products[index].title} <br />
                    Category: {products[index].category} <br />
                    Price: {products[index].price} <br />
                    Rating :{products[index].rating} <br />
                </div>
            </div>
        );
    }

    const Putcatalog = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: '',
            rating: ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            fetch(`http://localhost:8081/updateproduct/${formData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (response.status !== 200) {
                        return response.json()
                            .then(errData => {
                                throw new Error(`PUT response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
                            })
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    alert("Item added successfully!");
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    alert('Error adding product:' + error.message);
                });
        }

        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>

                <form onSubmit={handleSubmit}>
                    <h1>Edit a Product</h1>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID" required /> <br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required /> <br />
                    <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required /> <br />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required /> <br />
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required /> <br />
                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required /> <br />
                    <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" required /> <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

    const SearchByCategory = () => {
        const navigate = useNavigate();
        const [category, setCategory] = useState('');
        const [searchResults, setSearchResults] = useState([]);
    
        const handleSearch = () => {
            fetch(`http://localhost:8081/products/category/${category}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Search Results:", data);
                    setSearchResults(data);
                })
                .catch((error) => {
                    console.error("Error searching by category:", error);
                });
        };
    
        return (
            <div>
                <button onClick={() => navigate('/getcatalog')}>GET Catalog</button>
                <button onClick={() => navigate('/getcatalogid')}>GET Item by Id</button>
                <button onClick={() => navigate('/postcatalog')}>POST a new Item</button>
                <button onClick={() => navigate('/putcatalog')}>PUT (modify) an Item</button>
                <button onClick={() => navigate('/deletecatalog')}>DELETE an Item</button>
                <button onClick={() => navigate('/search')}>Search by Category</button>

                <input
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
    
                {searchResults.map((el) => (
                    <div key={el.id}>
                        <img src={el.image} alt="product" width={30} />
                        <div>Title: {el.title}</div>
                        <div>Category: {el.category}</div>
                        <div>Price: {el.price}</div>
                        <div>Rating: {el.rating}</div>
                    </div>
                ))}
            </div>
        );
    };
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Getcatalog />} /> {/* Add this route */}
                <Route path="/getcatalog" element={<Getcatalog />} />
                <Route path="/getcatalogid" element={<Getcatalogid />} />
                <Route path="/postcatalog" element={<Postcatalog />} />
                <Route path="/putcatalog" element={<Putcatalog />} />
                <Route path="/deletecatalog" element={<Deletecatalog />} />
                <Route path="/search" element={<SearchByCategory />} />
            </Routes>
        </Router>
    );
}

export default App;