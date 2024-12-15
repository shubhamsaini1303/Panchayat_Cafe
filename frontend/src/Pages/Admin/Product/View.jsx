
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable eqeqeq */
// /* eslint-disable array-callback-return */
import { useContext, useEffect } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Context } from '../../../Contexts/MainContext';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import axios from 'axios';

const View = () => {
  const { fetchProduct, product, openToast, productImageurl } = useContext(Context);

  useEffect(() => {
    fetchProduct();
  }, []);

  const ChangeStatus = (id, new_status) => {
    axios.put(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PRODUCT_BASE_URL}/change-status/${id}/${new_status}`)
      .then((success) => {
        if (success.data.status) {
          console.log(success.data.message);
          openToast(success.data.message, "success");
          fetchProduct();
        } else {
          openToast(success.data.message, "error");
        }
      })
      .catch((error) => {
        openToast(error.message, "error");
      });
  }

  const deleteprod = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PRODUCT_BASE_URL}/delete/${id}`)
      .then((success) => {
        if (success.data.status === 1) {
          openToast(success.data.message, "success");
          fetchProduct();
        } else {
          openToast(success.data.message, "error");
        }
      })
      .catch(() => {
        openToast("Client Side error", "error");
      });
  }

  return (
    <div className='py-7 px-3'>
      <div className='text-3xl flex justify-between'>
        <h1>Product Listing</h1>
        <button className='mb-4'>
          <Link to={"/admin/product/add"}>
            <IoIosAddCircleOutline />
          </Link>
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">SR</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Slug</th>
            <th scope="col" className="px-6 py-3">Category</th>
            {/* <th scope="col" className="px-6 py-3">Shop Name</th> */}
            {/* <th scope="col" className="px-6 py-3">Shop Address</th> */}
            {/* <th scope="col" className="px-6 py-3">Ratings</th> */}
            <th scope="col" className="px-6 py-3">Time</th>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((prod, index) => (
            <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {prod.name}
                <br />
                Original: ₹{prod.price}
                <br />
                Discounted: ₹{prod.discount_price}
              </td>
              <td className="px-6 py-4">{prod.slug}</td>
              <td className="px-6 py-4">{prod.category_id.name}</td>
              {/* <td className="px-6 py-4">{prod.shop_name}</td> */}
              {/* <td className="px-6 py-4">{prod.shop_address}</td> */}
              {/* <td className="px-6 py-4">{prod.ratings}</td> */}
              <td className="px-6 py-4">{prod.time}</td>
              <td className="px-6 py-4">
                <img width={"150px"} src={`${import.meta.env.VITE_API_BASE_URL}${productImageurl}${prod.image}`} alt="" />
              </td>
              <td className="px-6 py-4">
                {prod.status === true ? (
                  <button className='bg-green-500 text-white' onClick={() => ChangeStatus(prod._id, false)}>
                    Active
                  </button>
                ) : (
                  <button className='bg-red-500 text-white' onClick={() => ChangeStatus(prod._id, true)}>
                    Inactive
                  </button>
                )}
              </td>
              <td className="px-6 py-4 text-xl flex gap-3">
                <MdDelete onClick={() => deleteprod(prod._id)} className='cursor-pointer text-red-500' />
                <Link to={`/admin/product/edit/${prod._id}`}>
                  <CiEdit className='cursor-pointer text-black text-xl' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default View;
