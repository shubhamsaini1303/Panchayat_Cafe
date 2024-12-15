

import { useContext, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../Contexts/MainContext';
import { changeCartQty, removeFromCart } from '../../Reducers/CartSlice';
import {  useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(store => store.cart);
  const { fetchProduct, product } = useContext(Context);
  const Dispatcher = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user.data);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const cartProducts = [];

  for (let p of product) {
    for (let c of cart.data) {
      if (c.pId === p._id) {
        cartProducts.push({
          ...c,
          ...p
        });
      }
    }
  }

  const checkout = () => {
    user ? navigate("/checkout") : navigate("/login");
  };

  return (
    <div className="bg-gray-100 p-4 mt-[2px]">
      <div className="text-2xl font-semibold mb-4 text-center">Your Cart</div>

      {cartProducts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div>
          {/* Cart Items List */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-5 gap-4 font-semibold text-center border-b pb-2 mb-4">
              <span>Item</span>
              <span>Shop Details</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Remove</span>
            </div>
            {cartProducts.map((prod, index) => (
              <div key={index} className="min-w-[800px] grid grid-cols-5 items-center gap-4 py-2 border-b last:border-0 text-center">
                <div className="ml-4 items-center justify-center grid grid-cols-2">
                  <img src={`${import.meta.env.VITE_API_BASE_URL}/Images/Product/${prod.image}`} className="w-16 h-16 rounded-lg" alt="" />
                  <p className="ml-4 font-semibold">{prod.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">{prod.shop_name || 'N/A'}</p>
                  <p className="text-gray-500">{prod.shop_address || 'N/A'}</p>
                </div>
                <div className="flex gap-4 items-center justify-center space-x-2">
                  <button
                    onClick={() => { Dispatcher(changeCartQty({ pId: prod._id, flag: false, price: prod.discount_price })) }}
                    className="px-2 py-1 bg-gray-200 w-[30px] rounded-md text-lg font-semibold"
                  >
                    -
                  </button>
                  <span className="font-semibold">{prod.qty}</span>
                  <button
                    onClick={() => { Dispatcher(changeCartQty({ pId: prod._id, flag: true, price: prod.discount_price })) }}
                    className="px-2 py-1 bg-gray-200 rounded-md w-[30px] text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
                <div>
                  <p className="text-red-600 font-semibold">₹{prod.discount_price * prod.qty}</p>
                </div>
                <div>
                  <button className="ml-4">
                    <MdDelete onClick={() => Dispatcher(removeFromCart({ pId: prod._id, total_price: prod.discount_price * prod.qty }))} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary and Checkout Button */}
          <div className="bottom-0 w-full left-0 p-4 bg-white border-t shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold text-red-600">₹{cart.total}</p>
            </div>
            <button onClick={checkout}
              className="bg-black text-[14px] font-bold text-white w-[250px] md:w-[270px] mt-8 h-[40px] rounded-[50px] transition-all transform hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
