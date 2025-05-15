import { createSlice } from "@reduxjs/toolkit";


const initialState={
    items:[], // final cart items
    tempItems:[], // temporary cart items
    totalPrice:0
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            const existingItem = state.items.find(item =>item.id === action.payload.id)
            if(existingItem){
                existingItem.quantity += 1
            }else {
                state.items.push({...action.payload})
            }
            state.tempItems=[...state.items]
            state.totalPrice = state.items.reduce((sum, item) => sum+item.price,0)
        },
        updateTempQuantity(state, action){
            const tempItem = state.tempItems.find(item =>item.id === action.payload.id)
            if (tempItem) {
                tempItem.quantity = action.payload.quantity
            }
        },
        removeFromCart(state, action){
            state.items = state.items.filter(item => item.id!==action.payload)
            state.tempItems = [...state.items]
        }
    }
})
export const {addToCart, removeFromCart, updateTempQuantity} = cartSlice.actions
export default cartSlice.reducer
