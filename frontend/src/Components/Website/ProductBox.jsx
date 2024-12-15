
import { useContext } from "react";
import { Context } from "../../Contexts/MainContext";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Reducers/CartSlice";

const ProductBox = () => {
  const { product } = useContext(Context);
  const dispatcher = useDispatch();

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.map((prod) => {
          const { name, image, time , discount_price, price, discountPercent, shop_name, shop_address, _id } = prod;

          return (
            <div key={_id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/Images/Product/${image}`}
                className="mx-auto h-[250px] block object-cover"
                alt={name}
              />
              <h1 className="text-center font-bold text-lg mt-2">{name}</h1>
              <div className="text-center text-xs text-gray-500">{time}</div>

              {/* <Stars yellow={time} /> */}
              <div className="text-center my-2 text-sm text-gray-600">{shop_name}</div>
              <div className="text-center text-xs text-gray-500">{shop_address}</div>
              <div className="my-4 flex justify-center gap-4">
                <span className="text-[#FF4858]">${discount_price}</span>
                <span className="text-[#C1C8CE] line-through">${price}</span>
                {discountPercent > 0 && (
                  <span className="text-green-500 text-[11px] font-semibold">
                    {discountPercent}% OFF
                  </span>
                )}
                <MdShoppingCart
                  className="cursor-pointer text-xl text-green-700"
                  onClick={() => dispatcher(addToCart({ price: discount_price, pId: _id, qty: 1 }))} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBox;




