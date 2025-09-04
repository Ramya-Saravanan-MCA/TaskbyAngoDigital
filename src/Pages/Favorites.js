import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFav } from "../Redux/FavSlice";

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map(item => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
              
              <button
                onClick={() => dispatch(removeFromFav(item.id))}
                className="mt-auto bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
