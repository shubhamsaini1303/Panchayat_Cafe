// /* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {  useContext, useRef} from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { Context } from "../../Contexts/MainContext";
import About from "./About";
import { useDispatch } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { addToCart } from "../../Reducers/CartSlice";


const Home = () => {


  const {category , product } = useContext(Context);
  const dispatcher = useDispatch();

  const scrollRef = useRef(null); // Create a reference to the scrollable container

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };


  return (
    <>

          {/* Hero Section */}
          <div className="mt-[2px] h-auto md:h-[600px] w-full grid grid-cols-1 md:grid-cols-2 bg-yellow-600">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/Images/panch-2-removebg-preview.png"
            alt="Hero"
            className="w-full h-[300px] md:h-[500px] object-contain"
          />
          <button 
          className=" text-white bg-black font-bold w-3/4 md:w-[270px] py-2 rounded-full mt-4 transition hover:bg-gray-800 hover:scale-105"
          >
            <Link to="/order">Order Now</Link>
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/Images/image2.png"
            className="w-full h-[300px] md:h-[500px] object-contain"
            alt="Hero 2"
          />
        </div>
      </div>


      {/* Handcrafted Curations Section */}
      <div className="" id="category">
  <div className="absolute top-0 left-0 w-full h-full opacity-60"></div>

      <div className="md:w-[1200px]  w-full mx-auto  text-white">        
        <h1 className="text-2xl p-2 font-bold  ml-5">What's Your Mind Says</h1>
        <div className="w-full overflow-hidden ">
  <div className="flex gap-[100px]  w-full overflow-x-auto no-scrollbar mt-4 px-4 justify-start scroll-smooth">
    {
      category.map((cat, index) => {
        const { name, image } = cat;
        return (
          <Link key={index} to={`/order/${cat.slug}`}>
            <div className="flex flex-col items-center min-w-[111px]">
              <img src={`${import.meta.env.VITE_API_BASE_URL}/Images/Category/${image}`} className="h-[111px] w-[111px] rounded-full" alt={name} />
              <p className="text-[15px] font-semibold mt-2">{name}</p>
            </div>
          </Link>
        );
      })
    }
  </div>
</div>
</div>

      {/* Hero Section */}
<div className=" mx-auto mt-10 px-4 text-black ">
  <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-5 ">
  </div>
</div>
<div className="h-[40px]">
  
</div>
</div>

        {/* Product Details */}

        <div className="w-fullmd:w-[1100px]  mx-auto mt-8 mb-4 px-4 md:px-0">
      <h1 className="text-3xl font-bold mt-4 ml-5  text-gray-800 uppercase">Top fast Food in Panchayat cafe</h1>
      
      <div className="flex justify-between  items-center h-[36px] px-4 mt-2">
        <button 
          onClick={scrollLeft} 
          className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollRight} 
          className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="mt-4 flex gap-6 overflow-x-scroll no-scrollbar py-2"
      >
<div className=" p-4 ">
      <div className="flex gap-4  ">
        {product.map((prod) => {
          const { name, image , time , discount_price, price, discountPercent, _id } = prod;

          return (
            <div key={_id} className="w-[300px] h-[400px] border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/Images/Product/${image}`}
                className="mx-auto h-[250px] block object-cover"
                alt={name}
              />
              <h1 className="text-center font-bold text-lg mt-2">{name}</h1>
              {/* <Stars yellow={ratings} /> */}
              {/* <div className="text-center my-2 text-sm text-gray-600">{shop_name}</div> */}
              <div className="text-center text-xs text-gray-500">{time}</div>
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

      </div>
    </div>

          {/* Background Video Section */}
          <div className="relative md:h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/bg-video.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full m-2 text-white">
          <h1 className="text-4xl font-bold">Panchayat Cafe</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className=" text-white rounded-lg border border-gray-300 p-6 shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2 text-center">Address</h2>
              <hr  className="mt-4"/>
              <p className="text-center text-xl font-semibold mt-4">
                Kirti Nagar 
                <br />
                Railway Station Road, 
                <br />
                Rajgarh (Alwar)
              </p>
            </div>
            <div className=" text-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h2 className=" text-2xl font-semibold  mb-2 text-center">
                Opening Hours
              </h2>
              <hr  className="mt-4"/>

              <div className="mt-4 text-center text-sm">
          <p>Sunday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Monday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Tuesday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Wednesday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Thursday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Friday: 09:00 AM - 09:00 PM</p>
          <br />
          <p>Saturday: 09:00 AM - 09:00 PM</p>
        </div>
              {/* <p className="text-center">Monday to Sunday, 9 AM - 9 PM</p> */}
            </div>
            <div className=" text-white border border-gray-300  rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2 text-center">Fast Delivery</h2>
              <hr  className="mt-4"/>

              <div className="flex h-[300px]  mt-4 gap-4 justify-center">
                <img
                  src="/public/Images/download-removebg-preview.png"
                  className="h-30 w-30 rounded-md object-cover"
                  alt="Gallery Image 1"
                />
                <img
                  src="/public/Images/time.png"
                  className="h-28 w-28 rounded-md object-cover"
                  alt="Gallery Image 2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
<About />
    </>
  )
}

export default Home
