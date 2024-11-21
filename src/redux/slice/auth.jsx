import {createSlice} from '@reduxjs/toolkit';
import {English} from '../../utils/en';

const initialState = {
  selected_tab: 0,
  selected_Theme_name: 'Bare',
  items_theme: English.uiTable.uiItem1[0],
  rhs_lhs_theme: English.uiTable.uiItem2[1],
  soundSetting:English.uiTable.uiItem3[0],
  merchant_verified: false,
  merchant_token: null,
  offline_data_bool: false,
  clerk_data: null,
  merchant_data: null,
  store_details: null,
  merchant_id: null,
  selectedLanguage: 'en'
};

export const itemsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateTab: (state, action) => {
      state.selected_tab = action.payload;
    },
    updateThemes: (state, action) => {
      state.selected_Theme_name = action.payload;
    },
    marchantVerifiedFunc: (state, action) => {
      state.merchant_verified = action.payload;
    },
    marchantTokenFunc: (state, action) => {
      state.merchant_token = action.payload;
    },
    offlineDataBoolFunc: (state, action) => {
      state.offline_data_bool = action.payload;
    },
    clerkDataFunc: (state, action) => {
      state.clerk_data = action.payload;
    },
    updateMerchantData: (state, action) => {
        
      state.merchant_data = action.payload;
    },
    storeNameFunc: (state, action) => {
      state.store_details = action.payload;
    },
    merchantID: (state, action) => {
      state.merchant_id = action.payload;
    },
    itemsTheme: (state, action) => {
      state.items_theme = action.payload;
    },
    picturTheme: (state, action) => {
      state.picture_theme = action.payload;
    },
    rhsLhsTheme: (state, action) => {
      state.rhs_lhs_theme = action.payload;
    },
    soundThemeFunc:(state,action)=>{
        state.soundSetting=action.payload
    }
    
  },
});


export const {
  updateTab,
  updateThemes,
  marchantVerifiedFunc,
  marchantTokenFunc,
  offlineDataBoolFunc,
  clerkDataFunc,
  updateMerchantData,
  storeNameFunc,
  merchantID,
  itemsTheme,
  picturTheme,
  rhsLhsTheme,
  soundThemeFunc,
  
} = itemsSlice.actions;
export default itemsSlice.reducer;
