import { createSlice,current } from "@reduxjs/toolkit";
import { clearAllUsers } from "../Action";

const UserSlice = createSlice({
    name:"cartData",
    initialState:{
        cartArray:[],
        checkoutItems:[],
    },
    
    reducers:{
        addProduct(state,action){
            state.cartArray.push(action.payload);
        },

        removeProduct(state,action){
            state.cartArray.splice(action.payload,1)
        },

        updateProductQuantity(state,action){
            // let userCart=(current(state.cartArray)).filter(item => item.user ===action.payload.userEmail).map(item=>({product:item.product,quantity:item.quantity}));

            // let productArray = userCart.filter(item=>item.product.id===action.payload.id);
            // productArray[0].quantity=action.payload.quantity;

            // let index = (current(state.cartArray)).findIndex(obj=>obj.user===action.payload.userEmail&& 
            // obj.product.id === action.payload.id);

            // state.cartArray.splice(index,1,{user:action.payload.userEmail,product:productArray[0].product,quantity:productArray[0].quantity});
            
            const { userEmail, id, quantity } = action.payload;

            const index = state.cartArray.findIndex(obj => obj.user === userEmail && obj.product.id === id);
            if (index !== -1) {
                state.cartArray[index].quantity = quantity;
            }
        },

        addCheckoutItems(state,action){
            (state.checkoutItems).push(action.payload);
        },
        removeCheckoutItems(state,action){
            (state.checkoutItems).splice(0,(state.checkoutItems).length);
        }

    },
    extraReducers(builder){
        builder.addCase(clearAllUsers,(state,action)=>{
            let cart = (current(state.cartArray)).filter(item => !(item.user === action.payload));
            state.cartArray=cart;
        })
    }
    
})


export default UserSlice.reducer;
export const{addProduct,updateProductQuantity,removeProduct,addCheckoutItems,removeCheckoutItems} = UserSlice.actions;