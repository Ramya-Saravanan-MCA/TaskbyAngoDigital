import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../Redux/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600"> Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain rounded-lg border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="w-8 h-8 flex items-center justify-center bg-plum-600 text-white rounded-full hover:bg-plum-700 transition"
                >
                  +
                </button>
              </div>

              <p className="font-semibold text-gray-800 w-24 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-100 text-red-600 px-4 py-1 rounded-full hover:bg-red-200 transition text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-end items-center border-t pt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-plum-700">${total.toFixed(2)}</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
