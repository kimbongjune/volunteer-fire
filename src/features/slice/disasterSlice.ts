import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisasterState {
  disasterNumber: string;
}

const initialState: DisasterState = {
  disasterNumber: '',
};

export const disasterSlice = createSlice({
  name: 'disaster',
  initialState,
  reducers: {
    setDisasterNumber: (state, action: PayloadAction<string>) => {
      state.disasterNumber = action.payload;
    },
  },
});

export const { setDisasterNumber } = disasterSlice.actions;
export default disasterSlice.reducer;