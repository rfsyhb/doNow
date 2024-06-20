/* eslint-disable */
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import timerReducer, { tick } from '../features/timer/timerSlice';

export const startTimer = createAsyncThunk(
  'timer/startTimer',
  async (_, { dispatch, getState }) => {
    const { timer } = getState();
    const intervalId = setInterval(() => {
      dispatch(tick());
      const { time, isActive } = getState().timer;
      if (!isActive || time === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
);

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(startTimer);
  },
});
