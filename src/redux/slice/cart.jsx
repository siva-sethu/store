import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart_item: [],
    total_amount_cal:null,
};

export const itemsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart_item=action.payload
    },
    totalAmountCalFunc:(state,action)=>{
        state.total_amount_cal=action.payload
    }
  },
});

export const { addCart,totalAmountCalFunc  } =
  itemsSlice.actions;
export default itemsSlice.reducer;
