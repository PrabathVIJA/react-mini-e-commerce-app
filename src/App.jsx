import "./App.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Title from "./components/Title";
import Dropdown from "./components/Dropdown";
import Product from "./components/Product";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  // useEffect to show all products
  useEffect(() => {
    setLoading(true);
    async function fetchAllProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Can't fetch product with this url");
        }
        const data = await response.json();

        setProducts(data || []);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  // useEffect to fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      const list = ["All", ...data];
      setCategories(list || []);
    }
    fetchCategories();
  }, []);

  // useEffect to show specific category items
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let url = "";

      if (!selectedCategory || selectedCategory === "All") {
        url = "https://fakestoreapi.com/products";
      } else {
        url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Can't fetch products from the server.");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data || []);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  // useEffect(() => {
  //   if (!selectedCategory || selectedCategory === "All") {
  //     setLoading(true);
  //     async function fetchAllProducts() {
  //       try {
  //         const response = await fetch("https://fakestoreapi.com/products");
  //         if (!response.ok) {
  //           throw new Error("Can't fetch product with this url");
  //         }
  //         const data = await response.json();

  //         setProducts(data || []);
  //       } catch (e) {
  //         toast.error(e.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchAllProducts();
  //   } else {
  //     setLoading(true);
  //     async function fetchSelectedCategory() {
  //       try {
  //         const response = await fetch(
  //           `https://fakestoreapi.com/products/category/${selectedCategory}`
  //         );
  //         if (!response.ok) {
  //           throw new Error("Can't fetch product with this Category");
  //         }
  //         const data = await response.json();

  //         setProducts(data || []);
  //       } catch (e) {
  //         toast.error(e.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchSelectedCategory();
  //   }
  // }, [selectedCategory]);

  function setSelectedCategoryHandler(category) {
    setSelectedCategory(category);
  }
  return (
    <>
      <div id="Container">
        <div id="Header">
          <Title />
          <Dropdown
            value={selectedCategory}
            onChange={setSelectedCategoryHandler}
            categories={categories}
          />
        </div>
        <div id="Products">
          {loading ? (
            <ClipLoader color="#000" size={50} />
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
                width="300"
                height="200"
                title="Add to cart"
              />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
