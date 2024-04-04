
import { createSlice } from "@reduxjs/toolkit";
import { setPlacedOrders } from "../Action";

const MasterSlice =createSlice({
    name:"masterData",
    initialState:{
        placedOrders:[],
        allProducts:[]
    },
    reducers:{
        getAllProducts(state,action){
            state.allProducts =action.payload
        },
        removePlacedOrders(state,action){
            state.placedOrders.splice(0,(state.placedOrders).length)
        }
    },
    
    extraReducers(builder){
        builder.addCase(setPlacedOrders,(state,action)=>{
            state.placedOrders.push(action.payload);
        })
    }
})

export default MasterSlice.reducer;
export const {getAllProducts,removePlacedOrders} = MasterSlice.actions;