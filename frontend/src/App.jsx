
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainWeb from "./Pages/Website/MainWeb"
import Home from "./Pages/Website/Home"
import About from "./Pages/Website/About"
import Login from "./Pages/Website/Login"
import Register from "./Pages/Website/Register"
import Cart from "./Pages/Website/Cart"
import Order from "./Pages/Website/Order"
import Profile from "./Pages/Website/Profile"
import Checkout from "./Pages/Website/Checkout"
import Pay from "./Pages/Website/Pay"
import AdminMain from "./Pages/Admin/AdminMain"
import Category from "./Pages/Admin/Category/Category"
import Dashboard from "./Pages/Admin/Dashboard"
import View from "./Pages/Admin/Product/View"
import Add from "./Pages/Admin/Product/Add"
import Edit from "./Pages/Admin/Product/Edit"
import OnlineOrder from "./Pages/Website/Onlineplace"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { lsToCart } from "./Reducers/CartSlice"
import Onlineplace from "./Pages/Website/Onlineplace"
import OrderListing from "./Pages/Admin/Order/OrderListing"
import ProtectedRoute from "./Pages/Website/ProtectedRoute"
import AdminLogin from "./Pages/Admin/AdminLogin"
import AdminProtected from "./Pages/Admin/AdminProtected"
import Transaction from "./Pages/Admin/Transaction/Transaction"


const App = () => {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(lsToCart());
  })

  const routes = createBrowserRouter([
    {
      path:"/",
      element:<MainWeb/>,
      children:[
        {
          path:"",
          element:<Home/>
        }
        ,
          {
            path:"about",
            element:<About/>
          },
          {
            path:"login",
            element:<Login />
          },
          {
            path:"register",
            element:<Register />
          },
          {
            path:"cart",
            element:<Cart />
          },
          {
            path:"order/:category_slug?",
            element:<Order />
          },
          {
            path:"profile",
            element:<Profile />
          },
          {
            path:"/checkout",
            element:<Checkout />
          },
          {
            path:"pay",
            element:(
              <ProtectedRoute>
                <Pay />
              </ProtectedRoute>
            )
          },
          {
            path:"online-order",
            element:<OnlineOrder/>
          },
          {
            path:"order-placed/:order_id",
            element:<Onlineplace/>
          }
      ]
    },
    {
      path:"/admin",
      element:
      (
        <AdminProtected>
          <AdminMain />
        </AdminProtected>
      )
      ,
      // <AdminMain />,
      children:[
        {
          path:"dashboard",
          element:<Dashboard />
        },
        {
          path:"category",
          element:<Category/>
        },
        {
          path:"transation",
          element:<Transaction/>
        },
        {
          path:"product",
          element:<View/>
        },
        {
          path:"product/add",
          element:<Add/>
        },
        {
          path:"product/edit/:id",
          element:<Edit />
        },
        {
          path:"orderlisting",
          element:<OrderListing />
        }
      ]
    },
    {
      path:"/admin/login",
      element:<AdminLogin/>
    }
  ])

  return (
 <RouterProvider router={routes} />
  )
}

export default App