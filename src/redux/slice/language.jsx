
import { createSlice } from '@reduxjs/toolkit';
import { english } from '../../lamguages/english';
import { tamil } from '../../lamguages/tamil';

const initialState = {
  selectedLanguage: 'en', 
  translations:{
    en: english,
    ta: tamil,
  }
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

