import {combineReducers} from 'redux';

import Items from './slice/items';
import Cart from './slice/cart';
import orderSummarySlice from './slice/order-summary';
import auth from './slice/auth';
import Status from './slice/status';
import OrderDetails from './slice/order-details';
import languageReducer from './slice/language';

const rootReducer = combineReducers({
  items: Items,
  cart: Cart,
  orderSummary: orderSummarySlice,
  auth: auth,
  status: Status,
  orderDetails: OrderDetails,
  language: languageReducer,
});

export default rootReducer;
