import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  payment_state: null,
  order_type: null,
  balance_amount: '00.00'
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    addPaymentStatus: (state, action) => {
      state.payment_state = action.payload;
    },
    addOrdertype: (state, action) => {
      state.order_type = action.payload;
    },
    addBalanceAmount: (state, action) => {
      state.balance_amount = action.payload;
    },
  },
});

export const {addPaymentStatus, addOrdertype, addBalanceAmount} = statusSlice.actions;
export default statusSlice.reducer;
