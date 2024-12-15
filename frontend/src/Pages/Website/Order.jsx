

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import { useContext, useEffect, useState } from "react";
import ProductBox from "../../Components/Website/ProductBox";
import { Context } from "../../Contexts/MainContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";

const Order = () => {
  const [openSection, setOpenSection] = useState(null); // Track which section is open
  const { category, fetchCategory, fetchProduct, } = useContext(Context);
  const [categorySlug, setCategorySlug] = useState(useParams().category_slug || null);
  const [limit, setLimit] = useState(localStorage.getItem("limit") || 5);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchProduct(limit, categorySlug);
  }, [limit, categorySlug]);


  useEffect(() => {
    localStorage.setItem("limit", limit);
  }, [limit]);

  const handleCategorySelect = (slug) => {
    setCategorySlug(slug);
  };

  const handleToggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const generateRandomGradient = () => {
    const getRandomColor = () => {
      const letters = "89ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    };
    return `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${getRandomColor()}, ${getRandomColor()})`;
  };

  return (
    <>
      <div className="w-full mt-[2px] overflow-hidden ">
        <Slider {...{ dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 }}>
          {category.map((cat) => (
            <div key={cat._id} className="h-[350px]  lg:h-[300px] relative">
              <div style={{ background: generateRandomGradient(), height: "100%" }}>
                <div className="ml-4 md:ml-5 pt-5 md:pt-10">
                  <h3 className="text-white text-2xl ml-4 md:text-3xl">{cat.name}</h3>
                  <Link to={`/order/${cat.slug}`}>
                  <button onClick={() => handleCategorySelect(cat.slug)} className="button mt-4">Shop Now</button>
                  </Link>
                </div>
                <img
                  className="w-[150px] md:w-[200px] lg:w-[300px] absolute bottom-[10px] h-[150px] md:h-[200px] right-[10px]"
                  src={`${import.meta.env.VITE_API_BASE_URL}/Images/Category/` + cat.image}
                  alt={cat.name}
                />
              </div>
            </div>
          ))}
        </Slider>

        <div className="mt-6">
          <h1 className="ml-20 text-[40px] font-semibold" >Order</h1>
          <p className="ml-20 text-[12px] mt-2 mb-4">
            Everyone's favorite Panchayat Cafe's put together in a specially curated collection.
          </p>
        </div>

        <div className="flex mx-auto text-center items-center">
          <div className="bg-[#F6F7F8] ml-4 w-[100px] py-2 my-4 rounded-md">
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="p-2 focus:outline-none bg-transparent text-sm md:text-base"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="0">All</option>
            </select>
          </div>
          <div className="flex space-x-10 overflow-x-auto scrollbar-hide md:scrollbar-default cursor-pointer ">
            <button onClick={() => handleToggleSection("category")}            className="mt-[10px] ml-[50px] whitespace-nowrap appearance-none bg-transparent border border-[#1A1A1A] rounded-lg box-border text-[#3B3B3B] cursor-pointer inline-block font-sans font-semibold text-[16px] leading-normal min-h-[1px] px-4 py-2 text-center transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)] select-none hover:text-white hover:bg-[#1A1A1A] hover:shadow-md hover:shadow-black/25 hover:-translate-y-0.5 active:shadow-none active:translate-y-0 disabled:pointer-events-none">Category</button>
            {/* <button onClick={() => handleToggleSection("deliveryTime")}            className="mt-[10px] ml-[50px] whitespace-nowrap appearance-none bg-transparent border border-[#1A1A1A] rounded-lg box-border text-[#3B3B3B] cursor-pointer inline-block font-sans font-semibold text-[16px] leading-normal min-h-[1px] px-4 py-2 text-center transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)] select-none hover:text-white hover:bg-[#1A1A1A] hover:shadow-md hover:shadow-black/25 hover:-translate-y-0.5 active:shadow-none active:translate-y-0 disabled:pointer-events-none">Delivery Time</button>
            <button onClick={() => handleToggleSection("price")}            className="mt-[10px] ml-[50px] whitespace-nowrap appearance-none bg-transparent border border-[#1A1A1A] rounded-lg box-border text-[#3B3B3B] cursor-pointer inline-block font-sans font-semibold text-[16px] leading-normal min-h-[1px] px-4 py-2 text-center transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)] select-none hover:text-white hover:bg-[#1A1A1A] hover:shadow-md hover:shadow-black/25 hover:-translate-y-0.5 active:shadow-none active:translate-y-0 disabled:pointer-events-none">Price</button>
            <button onClick={() => handleToggleSection("ratings")}            className="mt-[10px] ml-[50px] whitespace-nowrap appearance-none bg-transparent border border-[#1A1A1A] rounded-lg box-border text-[#3B3B3B] cursor-pointer inline-block font-sans font-semibold text-[16px] leading-normal min-h-[1px] px-4 py-2 text-center transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)] select-none hover:text-white hover:bg-[#1A1A1A] hover:shadow-md hover:shadow-black/25 hover:-translate-y-0.5 active:shadow-none active:translate-y-0 disabled:pointer-events-none">Ratings</button> */}
          </div>
        </div>

        {openSection === "category" && (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-9">
              <div className="h-[50px] flex col-span-8 gap-4 md:gap-10 mt-4 ml-10 text-[16px] overflow-x-auto scrollbar-hide whitespace-nowrap">  
                    <Link to={"/order"}>
                <button onClick={() => handleCategorySelect(null)} className={`${!categorySlug ? "font-bold" : ""}`}>
                  All
                </button>
                </Link>
                {category.map((cat) => (
                  <Link key={cat._id} to={`/order/${cat.slug}`}>
                  <button
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={` ${categorySlug === cat.slug ? "font-bold" : ""}`}
                  >
                    {cat.name}
                  </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )} 
        <ProductBox />
      </div>
    </>
  );
};

export default Order;
