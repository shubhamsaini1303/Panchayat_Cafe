import {configureStore} from "@reduxjs/toolkit";
import CartReducer from "./Reducers/CartSlice";
import UserReducer from "./Reducers/UserSlice"
import AdminReducer from "./Reducers/AdminSlice"

const store = configureStore(
    {
        reducer:{
            admin:AdminReducer,
            cart:CartReducer,
            user:UserReducer,
        }
    }
);

export default store;