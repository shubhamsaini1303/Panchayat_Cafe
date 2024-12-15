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
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { fetchCategory, category, productImageurl, fetchColor, openToast, colors,  } = useContext(Context);
  const { id } = useParams();
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // File state for product image
  const [productCategory, setProductCategory] = useState(null); // State for product category
  const [productColor, setProductColor] = useState([]); // State for product colors

  useEffect(() => {
    if (id != null) {
      axios.get(  `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PRODUCT_BASE_URL}/edit/` + id)
        .then((success) => {
          if (success.data.status == 1) {
            const product = success.data.product;
            setEditProduct(product);
            console.log(product);
            // Set the initial product category and colors when product is fetched
            setProductCategory({ value: product.category_id._id, label: product.category_id.name });
            setProductColor(product.color.map(color => ({ value: color._id, label: color.name })));
            setFile(product.image); // If there's a predefined image URL
          }
        }).catch(() => {});
    }
  }, [id]);

  const handleChange = (file) => {
    setFile(file); // Update image state
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

  const categoryOptions = category.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  const colorOptions = colors.map((color) => ({
    label: color.name,
    value: color._id,
  }));

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

    // Prepare form data
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("price", e.target.price.value);
    formData.append("discount_percent", e.target.discount_per.value);
    formData.append("discount_price", e.target.discount_price.value);
    formData.append("image", file);
    formData.append("category", productCategory?.value);
    formData.append("color", JSON.stringify(productColor.map(color => color.value))); // Send the selected color IDs

    try {
      const response = await axios.post(`http://localhost:5000/product/create`, formData);
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
      <div className="text-2xl font-semibold">Edit Product</div>
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
              defaultValue={editProduct?.name} // Use defaultValue to set the initial value in controlled input
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
              defaultValue={editProduct?.slug}
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
              defaultValue={editProduct?.price}
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
              defaultValue={editProduct?.discount_percent}
              onChange={calDiscount}
              type="number"
              id="discount_per"
              name="discount_per"
              min={0}
              max={99}
              // defaultValue={0}
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
              defaultValue={editProduct?.discount_price}
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
          {/* Category */}
          <div className="mb-5">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Category
            </label>
            <Select
              onChange={(option) => setProductCategory(option)} // Update category state
              value={productCategory} // Set the initial value of category selection
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="category"
              options={categoryOptions}
            />
          </div>

          {/* Colors */}
          <div className="mb-5">
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Color
            </label>
            <Select
              onChange={(options) => setProductColor(options)} // Update color state with multiple selections
              closeMenuOnSelect={false}
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              isMulti
              value={productColor} // Set the initial value of color selection
              name="color"
              options={colorOptions}
            />
          </div>
        </div>

        {/* Image uploader */}
        <div className="mb-5">
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Image
          </label>
          <FileUploader handleChange={handleChange} name="file" />
          <span>{file?.name || "No file selected"}</span>
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

export default Edit;
