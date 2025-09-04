import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { addToFav, removeFromFav } from "../Redux/FavSlice";
import { Heart } from "lucide-react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Check if product is in favorites
  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition relative"
          >
            {/* Favorite Button */}
            <button
              onClick={() =>
                isFavorite(product.id)
                  ? dispatch(removeFromFav(product.id))
                  : dispatch(addToFav(product))
              }
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
            >
              <Heart
                size={22}
                fill={isFavorite(product.id) ? "red" : "transparent"}
              />
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto"
            />
            <h3 className="font-bold mt-3 text-sm line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-700">${product.price}</p>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 w-full bg-plum-600 text-white py-2 rounded-lg hover:bg-plum-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-10">
          No products found matching your search.
        </p>
      )}
    </div>
  );
};

export default Product;
