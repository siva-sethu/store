import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  order_details: [],
  order_table_status: true,
};

export const itemsSlice = createSlice({
  name: 'order_details',
  initialState,
  reducers: {
   
    addOrderTableStatus: (state, action) => {
      state.order_table_status = action.payload;
    },
  },
});

export const { addOrderTableStatus} = itemsSlice.actions;
export default itemsSlice.reducer;
