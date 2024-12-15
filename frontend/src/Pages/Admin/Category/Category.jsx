// /* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { Context } from '../../../Contexts/MainContext';
import { MdDelete } from "react-icons/md"; 
import { CiEdit } from "react-icons/ci";

const Category = () => {
  const [isupdate, setisUpdate] = useState(false);
  const [toggle , setToggle] = useState(false);
  const {openToast, fetchCategory, categoryImageurl, category } = useContext(Context);


  const nameRef = useRef();
  const slugRef = useRef();
  const categoryIdRef = useRef();
  const oldNamedRef = useRef();

  const TitletoSlug = () =>{
    const slug = nameRef.current.value.toLowerCase().trim().replaceAll(" ", "-").replaceAll("'", "");
    slugRef.current.value = slug;
  }

  const formsubmitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const slug = event.target.slug.value;
    const image = event.target.image.files[0];
    console.log(name , slug , image);
  
    if (name !== "" && slug !== "") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      if (isupdate) {
        const cId = event.target.category_id.value;
        formData.append("old_name", event.target.old_name.value);
        axios
          .put(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CATEGORY_BASE_URL}/update/${cId}`, formData, config)
          .then((success) => {
            if (success.data.status === 1) {
              event.target.reset();
              setToggle(false);
              openToast(success.data.message, "Success");
              fetchCategory();
            } else {
              openToast(success.data.message, "Error");
            }
          })
          .catch((error) => {
            console.log(error.response ? error.response.data : error.message);
            openToast(error.message, "Error");
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CATEGORY_BASE_URL}/create`, formData, config)
          .then((success) => {
            if (success.data.status === 1) {
              event.target.reset();
              setToggle(false);
              openToast(success.data.message, "Success");
              fetchCategory();
            } else {
              openToast(success.data.message, "Error");
            }
          })
          .catch((error) => {
            console.log(error.response ? error.response.data : error.message);
            openToast(error.message, "Error");
          });
      }
    }
  };
  

  const deleteCategory = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CATEGORY_BASE_URL}/delete/` + id)
    .then((success) =>{
      if(success.data.status === 1){
        openToast(success.data.message, "Success");
        fetchCategory();
      } else{
        openToast(success.data.message, "error");
      }
    })
    .catch(() =>{
      openToast("Client Side error", "error");
    })
  } 

  const editcat = (category) => {
    setisUpdate(true);
    console.log(category);
    categoryIdRef.current.value = category._id;
    oldNamedRef.current.value = category.image;
    nameRef.current.value = category.name;
    slugRef.current.value = category.slug;
   setToggle(true);
  }


  const ChangeStatus = (id , new_status) => {
    axios.put(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CATEGORY_BASE_URL}/change-status/`+id+"/"+new_status)
    .then((success) => {
      if(success.data.status){
        console.log(success.data.message);
        openToast(success.data.message , "success");
        fetchCategory();
      }
      else{
        openToast(success.data.message, "error");
      }
    })
    .catch((error) =>{
      openToast(error.message , "error");
    })
  }


  return (
    <>
    <div className="relative py-10 px-3 overflow-x-auto">
      <div className={`h-full w-full flex justify-center items-center ${toggle === true ? 'flex' : 'hidden'} fixed top-0 left-0 z-[99999]`} style={{background: "rgba(0,0,0,0.6)"}}>

        <div className='w-[50%] mx-auto shadow bg-white rounded '>
          <div className='text-3xl p-3 font-semibold flex justify-between items-center'>
            {isupdate ? "Edit" : "Add"} Category
            <button className='cursor-pointer'  onClick={() => setToggle(false)}>
            <IoMdClose  />
            </button>
            </div>
          <hr />
          
          <form encType='multipart/form-data' className="p-2" onSubmit={formsubmitHandler}>
            <div className='grid grid-cols-2 gap-3' >
              <input type="hidden" name='category_id' ref={categoryIdRef} />
              <input type="hidden" name='old_name' ref={oldNamedRef} />

  <div className="mb-5">
    <label
      htmlFor="name"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      Category name
    </label>
    <input
    onChange={TitletoSlug}
    ref={nameRef}
      type="text"
      id="name"
      name='name'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required=""
    />
  </div>
  <div className="mb-5">
    <label
      htmlFor="slug"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      Category Slug
    </label>
    <input
    readOnly
    ref={slugRef}
      type="text"
      id="slug"
      name='slug'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required=""
    />
  </div>
  <div className="mb-5 col-span-2">
    <label
      htmlFor="image"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    >
      Category Image
    </label>
    <input
      type="file"
      id="image"
      name='image'
      className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name@flowbite.com"
      required=""
    />
  </div>
  </div>
  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>
</form>

        </div>

        </div>
    
     
        <div className='text-3xl flex justify-between'>
          <h1>Category Listing</h1>
          <button className='mb-4'>
        <IoIosAddCircleOutline  onClick={() => {
          setToggle(true);
          setisUpdate(false);
        }}/>
        </button>
        </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr >
      <th scope="col" className="px-6 py-3">
          SR:
        </th>
        <th scope="col" className="px-6 py-3">
          Name:
        </th>
        <th scope="col" className="px-6 py-3">
          Slug
        </th>
        <th scope="col" className="px-6 py-3"> 
          Image
        </th>
        <th scope="col" className="px-6 py-3"> 
        Status
        </th>
        <th scope="col" className="px-6 py-3">
         Action
        </th>
      </tr>
    </thead>
    <tbody>
      {
        category.map((cat , index) => {
          return (
      <tr key={cat._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
         <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index+1}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {cat.name}
        </th>
        <td className="px-6 py-4">{cat.slug}</td>
        <td className="px-6 py-4">
          <img width={"150px"} src={`http://localhost:5000/`+ categoryImageurl+ cat.image} alt="" />
          </td>
        <td className="px-6 py-4">{cat.status == true ? <button className='bg-green-500 text-white' onClick={() => ChangeStatus(cat._id , false)}>Active</button> : <button className='bg-red-500 text-white' onClick={() => ChangeStatus(cat._id , true)}>InActive</button>}</td>
        <td className="px-6 py-4 text-xl flex gap-3 ">
          <MdDelete onClick={() => deleteCategory(cat._id)} className='cursor-pointer text-red-500' />
          <CiEdit onClick={() => editcat(cat)} className='cursor-pointer text-black text-xl' />
        </td>
      </tr>
          )
        })
      }
    </tbody>
  </table>
  </div>

    </>
  )
}

export default Category
