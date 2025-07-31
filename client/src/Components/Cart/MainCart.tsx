import React, { useEffect,useState } from "react";
import { Trash2 } from "lucide-react";
import { fetchCart } from "../../utilities/fetchCart";

type CartItems = ReturnType<typeof fetchCart>
const MainCart: React.FC = () => {
  // Sample data in real Comes from and api
  const [cartItems, setCartItems]  = useState<CartItems>([]) ;
    useEffect(() => {
        setCartItems(fetchCart());
    },[])

  return (
    <main className="flex-grow flex flex-col items-center p-6 dark:bg-transparent bg-white dark:text-white text-black">
      <h1 className="text-3xl font-bold mb-6 font-playfair">Your Cart</h1>

      {/* ✅ If cart is empty */}
      {cartItems.length === 0 ? (
        <p className="text-lg mt-10">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
          
          {/* ✅ Left Section – Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl shadow-md border dark:border-gray-700 border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <button className="cursor-pointer text-red-500 hover:text-red-900 transition duration-200  ">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Right Section – Summary */}
          <div className="w-full md:w-1/3 p-6 rounded-2xl shadow-md border dark:border-gray-700 border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$210</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>$220</span>
            </div>

            {/* ✅ Checkout Button */}
            <button className="cursor-pointer w-full mt-6 px-4 py-3 rounded-xl font-medium 
              dark:bg-[#817565] dark:hover:bg-[#625a50] 
              bg-[#817565] hover:bg-[#686055] 
              text-white transition duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainCart;
