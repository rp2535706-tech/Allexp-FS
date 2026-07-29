import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Entity Adapter
const counterAdapter = createEntityAdapter();

// Initial State
const initialState = counterAdapter.getInitialState({
  loading: false,
  error: null,
});

// Initial Counters
initialState.ids = ["counter1", "counter2"];

initialState.entities = {
  counter1: {
    id: "counter1",
    value: 0,
  },
  counter2: {
    id: "counter2",
    value: 0,
  },
};

// Async Thunk (Mock API)
export const loadCounters = createAsyncThunk(
  "counter/loadCounters",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "counter1",
            value: 100,
          },
          {
            id: "counter2",
            value: 100,
          },
        ]);
      }, 2000);
    });
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment(state) {
      state.entities.counter1.value++;
      state.entities.counter2.value++;
    },

    decrement(state) {
      state.entities.counter1.value--;
      state.entities.counter2.value--;
    },

    addAmount(state, action) {
      const amount = Number(action.payload);

      state.entities.counter1.value += amount;
      state.entities.counter2.value += amount;
    },

    reset(state) {
      state.entities.counter1.value = 0;
      state.entities.counter2.value = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadCounters.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadCounters.fulfilled, (state, action) => {
        state.loading = false;

        counterAdapter.setAll(state, action.payload);
      })

      .addCase(loadCounters.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to Load Counters";
      });
  },
});

export const {
  increment,
  decrement,
  addAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;