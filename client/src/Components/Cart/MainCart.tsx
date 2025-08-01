import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchCart } from "../../utilities/fetchArtoworks";
import "./styles/mainCart.css";

type CartType = ReturnType<typeof fetchCart>;

const MainCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartType>([]);

  useEffect(() => {
    setCartItems(fetchCart());
  }, []);

  // ✅ Increase/Decrease Quantity
  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity < 1) return null; // Remove item if qty goes below 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // ✅ Filter out items that were marked for removal
      return updatedItems.filter((item): item is NonNullable<typeof item> => item !== null);
    });
  };

  // ✅ Remove Item
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 dark:bg-transparent bg-white dark:text-white text-black">
      <h1 className="text-3xl font-bold mb-6 font-playfair">Shopping Cart</h1>

      {/* ✅ Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border-b dark:border-gray-700 border-gray-300 pb-4 cursor-pointer"
          >
            {/* --- Group 1: Image & Details --- */}
            <div className="flex items-center flex-1">
              {/* ✅ Image */}
              <img
                src={item.mainImage}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              {/* ✅ Item Details */}
              <div className="flex-1 ml-5">
                <h2 className="text-[1.1rem] font-semibold font-[Intra]">
                  {item.title}
                </h2>
                {/* ✅ Medium & Size */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.medium} • {item.size}
                </p>
              </div>
            </div>

            {/* --- Group 2: Qty, Price & Remove --- */}
            <div className="flex items-center justify-around sm:justify-end w-full sm:w-auto sm:gap-4">
              {/* ✅ Quantity Controls */}
              <div className="flex items-center gap-2">
                {/* ✅ Minus Button */}
                <button
                  className="minus text-3xl w-7 h-7 flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-gray-400/30 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  &#45;
                </button>

                <span>{item.quantity}</span>

                {/* ✅ Plus Button (disabled if quantity == stock) */}
                <button
                  className={`plus text-3xl w-7 h-7 flex items-center justify-center p-1 rounded-full ${
                    item.quantity === item.stock_quantity
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-400/30 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                  }`}
                  onClick={() => {
                    if (item.quantity < item.stock_quantity) {
                      updateQuantity(item.id, 1);
                    }
                  }}
                  disabled={item.quantity === item.stock_quantity}
                >
                  &#43;
                </button>
              </div>

              {/* ✅ Price */}
              <p className="w-24 text-center sm:w-20 sm:text-right font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>

              {/* ✅ Remove Button */}
              <button
                className="cursor-pointer rounded-full p-1.5 hover:bg-gray-400/30 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => removeItem(item.id)}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Subtotal Section */}
      <div className="mt-6 flex justify-between items-center border-t dark:border-gray-700 border-gray-300 pt-4">
        <span className="font-semibold">Subtotal</span>
        <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
      </div>

      {/* ✅ Checkout Button */}
      <button className="cursor-pointer w-full mt-4 py-3 rounded-lg font-medium dark:bg-[#817565] dark:hover:bg-[#625a50] bg-[#817565] hover:bg-[#686055] text-white transition duration-200">
        Checkout
      </button>
    </main>
  );
};

export default MainCart;
