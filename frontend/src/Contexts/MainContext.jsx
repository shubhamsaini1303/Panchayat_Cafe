/* eslint-disable react/prop-types */
// /* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import  { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Create the context
const Context = createContext();

const MainContext = (props) => {
  
  const [category, setCategory] = useState([]);
  const [categoryImageurl, setCategoryImageurl] = useState('');
  const [colors, setColor] = useState([]);
  const [product, setProduct] = useState([]);
  const [productImageurl, setProductImageurl] = useState('');
  
  const [order , setOrder] = useState([]);

  // Define state for filter options
  const [limit, setLimit] = useState(5);  // Default to 5 items per page
  const [category_slug, setCategorySlug] = useState(null);


  // Fetch categories from the API
  const fetchCategory = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CATEGORY_BASE_URL}`)
      .then((response) => {
        if (response.data.status == 1) {
          setCategory(response.data.category);
          setCategoryImageurl(response.data.imageBaseUrl);
        } else {
          openToast('Failed to fetch categories', 'error');
        }
      })
      .catch((error) => {
        openToast('Error fetching categories', 'error');
        console.error(error);
      });
  };

  // Fetch colors from the API
  const fetchColor = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_COLOR_BASE_URL}`)
      .then((response) => {
        if (response.data.status == 1) {
          setColor(response.data.colors);
        } else {
          openToast('Failed to fetch colors', 'error');
        }
      })
      .catch((error) => {
        openToast('Error fetching colors', 'error');
        console.error(error);
      });
  };

  // Updated fetchProduct function
const fetchProduct = (limit = 0,  category_slug = null) => {
  const urlQuery = new URLSearchParams();
  if (limit) urlQuery.append('limit', limit);
  if (category_slug) urlQuery.append('category_slug', category_slug);

  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PRODUCT_BASE_URL}?${urlQuery.toString()}`)
    .then((response) => {
      if (response.data.status == 1) {
        setProduct(response.data.product);
        setProductImageurl(response.data.imageBaseUrl);
      } else {
        openToast('Failed to fetch products', 'error');
      }
    })
    .catch(() => {
      openToast('Error fetching products', 'error');
    });
};


// orders fetch
const fetchOrder = () => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ORDER_BASE_URL}/get-orders`).then((response) => {
    if(response.data.status === 1){
      setOrder(response.data.orders)
    }
  }).catch((error) => {
    console.error(error);
  })
}

// Update the `fetchProduct` call in the useEffect
useEffect(() => {
  // Fetch products with both category and color filters applied
  fetchProduct(limit , category_slug);
}, [limit,  category_slug]);


  // Toast notification
  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };

  // Fetch initial categories and colors when the component mounts
  useEffect(() => {
    fetchCategory();
    fetchColor();
    fetchOrder();
  }, []);

  // Fetch products based on limit, color, and category whenever they change
  useEffect(() => {
    fetchProduct(limit,category_slug);
  }, [limit, category_slug]);

  return (
    <Context.Provider
      value={{
        openToast,
        fetchCategory,
        fetchColor,
        fetchProduct,
        fetchOrder,
        order,
        categoryImageurl,
        category,
        // APP_BASE_URL,
        // CATEGORY_BASE_URL,
        // COLOR_BASE_URL,
        colors,
        // PRODUCT_BASE_URL,
        product,
        productImageurl,
        limit,
        setLimit,
        category_slug,
        setCategorySlug,
      }}
    >
      <ToastContainer className="z-[999999]" />
      {props.children}
    </Context.Provider>
  );
};

export default MainContext;
export { Context };
