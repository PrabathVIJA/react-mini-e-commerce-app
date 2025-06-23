import "./App.css";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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
  return (
    <>
      {loading ? (
        <ClipLoader color="#000" size={50} />
      ) : (
        products.map((product) => <div key={product.id}>{product.id}</div>)
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
