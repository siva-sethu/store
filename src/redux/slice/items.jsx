import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offlineData:[],
  categories:[]
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    funofflineData:(state, action) => {
        state.offlineData=action.payload
    },
   
      getCategoryFunc:(state,action)=>{
        state.categories=action.payload
      }
  },
});

export const { funofflineData,getCategoryFunc } =
  itemsSlice.actions;
export default itemsSlice.reducer;
