import "./App.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Title from "./components/Title";
import Dropdown from "./components/Dropdown";
import Product from "./components/Product";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "./components/Modal";
import CartPage from "./components/CartPage";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  // for getting data from localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("react-cart-items"));

    if (savedCartItems) {
      toast.info("Fetching data from local storage...");
      setCartItems(savedCartItems);
    }
  }, []);
  // writing into local storage
  useEffect(() => {
    localStorage.setItem("react-cart-items", JSON.stringify(cartItems));
  }, [cartItems]);
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

  function handleImageClick(imageUrl) {
    setModalImage(imageUrl);
    setModalOpen(true);
  }
  // adding item to cart
  function cartItemHandler(product) {
    const productAlreadyExists = cartItems.some(
      (cartItem) => cartItem.id === product.id
    );
    if (!productAlreadyExists) {
      const newProduct = { ...product, quantity: 1 };
      setCartItems((prevProducts) => [...prevProducts, newProduct]);
      toast.info(`${product.title} added to the cart`);
      return;
    }
  }

  function showCartHandler() {
    setShowCartPage((prevState) => !prevState);
  }
  // delete cart
  function deleteCartItem(product) {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.id !== product.id
    );
    console.log(updatedCart);

    setCartItems(updatedCart);
  }

  function incrementHandler(product) {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });
    setCartItems(updatedCartItems);
  }

  //decrement handler
  function decrementHandler(product) {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
    setCartItems(updatedCartItems);
  }
  // calculating Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      {showCartPage ? (
        <CartPage
          selectedItems={cartItems}
          deleteHandler={deleteCartItem}
          incrementHandle={incrementHandler}
          decrementHandle={decrementHandler}
          hideCart={showCartHandler}
          total={totalPrice}
        />
      ) : (
        <div id="Container">
          <div id="Header">
            <Title />
            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategoryHandler}
              categories={categories}
            />
            <button onClick={showCartHandler} className="cart-button">
              <div className="cart-icon-wrapper">
                <FaShoppingCart size={30} color="white" />
                <span className="cart-badge">{cartItems.length}</span>
              </div>
            </button>
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
                  modalHandler={handleImageClick}
                  cartItemHandler={cartItemHandler}
                  isInCart={cartItems.some(
                    (cartItem) => cartItem.id === product.id
                  )}
                />
              ))
            )}
          </div>
        </div>
      )}

      {modalOpen && <Modal setModalOpen={setModalOpen} src={modalImage} />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
