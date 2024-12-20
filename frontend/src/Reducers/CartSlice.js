/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:"Cart",
    initialState:{
        data:[],
        total:0,
        original_total : 0
    },
    reducers:{

        addToCart(currentState , {payload}){
            // console.log(payload);
            const d = currentState.data.find(cart => cart.pId == payload.pId);
            if(d){
                d.qty++;
            }
            else{
                currentState.data.push({pId:payload.pId , qty:payload.qty});
            }
            currentState.total += payload.price;
            localStorage.setItem("cart" , JSON.stringify(currentState));
        }, 
        removeFromCart( currentState , {payload}){
            // payload -pId , total_price
            const newState = currentState.data.filter(
                (d) => {
                    return d.pId != payload.pId
                }
            )
            currentState.data = newState;
            currentState.total -= parseFloat(payload.total_price);
            localStorage.setItem("cart" , JSON.stringify(currentState));

 
        },
        changeCartQty(currentState , {payload}){
            // payload -> pId , price , flag (true -> inc  / false -> desc)
            const d = currentState.data.find(d => d.pId == payload.pId);
            if(payload.flag){
                d.qty++;
                currentState.total +=payload.price;
                ;
            }else{
                d.qty--;
                currentState.total -= payload.price;
            }
            localStorage.setItem("cart" , JSON.stringify(currentState));

        },
        lsToCart(currentState){
            const lsCart = localStorage.getItem("cart");
            if(lsCart != null){
                const d  = JSON.parse(lsCart);
                currentState.data = d.data;
                currentState.total = d.total;
            }
        },

        emptyCart(currentState) {
            currentState.data = [];
            currentState.total = 0;
            localStorage.setItem("cart" , JSON.stringify(currentState));

        }


    }
});

export const {addToCart , removeFromCart , changeCartQty ,lsToCart , emptyCart } = CartSlice.actions;
export default CartSlice.reducer;