import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bill_date: '',
  bill_time: '',
  branch_name: '',
  customer_name: '',
  delivery_fee: '',
  discount_on: '',
  items_from_order_summary: [],
  phone: '',
  sub_total: '',
  tax: '',
  total_price: '',
  order_data: null,
};

const orderSummarySlice = createSlice({
  name: 'orderSummary',
  initialState,
  reducers: {
    setOrderSummary(state, action) {
      return {...state, ...action.payload};
    },
    orderListFunc(state, action) {
      state.order_data = action.payload;
    },
  },
});

export const {setOrderSummary, orderListFunc} = orderSummarySlice.actions;
export default orderSummarySlice.reducer;
