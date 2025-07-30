import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "globalState",
  initialState: {
   User: null
  },
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload
    }
  },
});

export const { setUser } = globalSlice.actions;
export default globalSlice.reducer;
