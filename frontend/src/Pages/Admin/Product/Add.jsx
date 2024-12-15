
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-undef */
// /* eslint-disable eqeqeq */
// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import { Context } from '../../../Contexts/MainContext';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const { fetchCategory, category, fetchColor, openToast , colors, APP_BASE_URL , PRODUCT_BASE_URL } = useContext(Context);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [productColor, setProductColor] = useState([]);

  const handleChange = (file) => {
    setFile(file); 
  };

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  const priceRef = useRef();
  const discountPreRef = useRef();
  const discountPriceRef = useRef();
  const nameRef = useRef();
  const slugRef = useRef();
  // const shopAddressRef = useRef();
  // const shopNameRef = useRef();
  // const ratingsRef = useRef();
  const timeRef = useRef();

  const categoryOptions = category.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

//   const colorOptions = colors.map((color) => ({
//     label: color.name,
//     value: color._id,
//   }));

  const calDiscount = () => {
    const price = priceRef.current.value;
    const discountPrec = discountPreRef.current.value;
    if (price && discountPrec) {
      const discountedPrice = price - (price * discountPrec) / 100;
      discountPriceRef.current.value = discountedPrice;
    }
  };

  const TitleToSlug = () => {
    const slug = nameRef.current.value
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "");
    slugRef.current.value = slug;
  };

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(FormSubmitHandler);
    
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("price", e.target.price.value);
    formData.append("discount_percent", e.target.discount_per.value);
    formData.append("discount_price", e.target.discount_price.value);
    formData.append("image", file);
    formData.append("category", productCategory);
    formData.append("color", JSON.stringify(productColor));
    // formData.append("shop_address", shopAddressRef.current.value);
    // formData.append("shop_name", shopNameRef.current.value);
    // formData.append("ratings", ratingsRef.current.value);
    formData.append("time", timeRef.current.value);

    console.log([...formData]); // For debugging: log form data

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PRODUCT_BASE_URL}/create`, formData);
      console.log(response);
      if (response.data.status === 1) {
        openToast(response.data.message, "success");
        navigate("/admin/product");
      } else {
        openToast(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      openToast("An error occurred while adding the product", "error");
    }
  };

  return (
    <div className="shadow m-5 p-2">
      <div className="text-2xl font-semibold">Add Product</div>
      <hr className="my-2" />
      <form className="p-2" onSubmit={FormSubmitHandler}>
        <div className="grid grid-cols-2 gap-3">
          {/* Product name */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Product Name
            </label>
            <input
              ref={nameRef}
              onChange={TitleToSlug}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Product slug */}
          <div className="mb-5">
            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Product Slug
            </label>
            <input
              ref={slugRef}
              readOnly
              type="text"
              id="slug"
              name="slug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Product price */}
          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              ₹ Price
            </label>
            <input
              ref={priceRef}
              onChange={calDiscount}
              type="number"
              id="price"
              name="price"
              min={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Discount percentage */}
          <div className="mb-5">
            <label htmlFor="discount_per" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Discount (%)
            </label>
            <input
              ref={discountPreRef}
              onChange={calDiscount}
              type="number"
              id="discount_per"
              name="discount_per"
              min={0}
              max={99}
              defaultValue={0}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Discounted price */}
          <div className="mb-5">
            <label htmlFor="discount_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              ₹ Price After Discount
            </label>
            <input
              ref={discountPriceRef}
              type="number"
              id="discount_price"
              name="discount_price"
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        {/* Category and Color selection */}
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Category
            </label>
            <Select
              onChange={(option) => setProductCategory(option.value)}
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="category"
              options={categoryOptions}
            />
          </div>

          {/* <div className="mb-5">
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Color
            </label>
            <Select
              onChange={(options) => setProductColor(options.map(option => option.value))}
              closeMenuOnSelect={false}
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              isMulti
              name="color"
              options={colorOptions}
            />
          </div> */}
        </div>

        {/* Additional product fields */}
        <div className="grid grid-cols-2 gap-3">
          {/* <div className="mb-5">
            <label htmlFor="shop_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Shop Address
            </label>
            <input
              ref={shopAddressRef}
              type="text"
              id="shop_address"
              name="shop_address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div> */}
{/* 
          <div className="mb-5">
            <label htmlFor="shop_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Shop Name
            </label>
            <input
              ref={shopNameRef}
              type="text"
              id="shop_name"
              name="shop_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div> */}
{/* 
          <div className="mb-5">
            <label htmlFor="ratings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Ratings
            </label>
            <input
              ref={ratingsRef}
              type="number"
              id="ratings"
              name="ratings"
              min={1}
              max={5}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div> */}

          <div className="mb-5">
            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Estimated Time
            </label>
            <input
              ref={timeRef}
              type="text"
              id="time"
              name="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        {/* Image uploader */}
        <div className="mb-5">
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Image
          </label>
          <FileUploader handleChange={handleChange} name="file" />
          <span>{file?.name}</span>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
