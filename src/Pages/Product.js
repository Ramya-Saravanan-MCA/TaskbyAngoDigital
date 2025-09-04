import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";

const Product = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
        >
          {/* Product Image */}
          <div className="h-48 flex items-center justify-center mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 h-10">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-plum-600 mt-2">
            ${product.price.toFixed(2)}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-auto bg-plum-600 text-white py-2 rounded-lg hover:bg-plum-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
