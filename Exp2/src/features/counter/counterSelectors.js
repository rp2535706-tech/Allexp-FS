import { createSelector } from "@reduxjs/toolkit";

// Entire Counter Slice
export const selectCounterState = (state) => state.counter;

// Loading Selector
export const selectLoading = (state) => state.counter.loading;

// Error Selector
export const selectError = (state) => state.counter.error;

// Counter 1 Selector
export const selectCounter1 = (state) =>
  state.counter.entities.counter1?.value ?? 0;

// Counter 2 Selector
export const selectCounter2 = (state) =>
  state.counter.entities.counter2?.value ?? 0;

// Memoized Selector (Derived State)
export const selectTotal = createSelector(
  [selectCounter1, selectCounter2],
  (counter1, counter2) => counter1 + counter2
);

// Memoized Selector
export const selectIsEqual = createSelector(
  [selectCounter1, selectCounter2],
  (counter1, counter2) => counter1 === counter2
);

// Memoized Selector
export const selectHighestCounter = createSelector(
  [selectCounter1, selectCounter2],
  (counter1, counter2) => Math.max(counter1, counter2)
);
