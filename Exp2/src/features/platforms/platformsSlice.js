import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: ["Facebook", "Instagram", "Twitter"],
};

const platformsSlice = createSlice({
  name: "platforms",

  initialState,

  reducers: {
    addPlatform: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addPlatform } = platformsSlice.actions;

export default platformsSlice.reducer;