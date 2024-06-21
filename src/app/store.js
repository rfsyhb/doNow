/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import stopwatchReducer from '../features/stopwatch/stopwatchSlice';
import historyReducer from '../features/history/historySlice';
import setupReducer from '../features/setup/setupSlice';

export const store = configureStore({
  reducer: {
    stopwatch: stopwatchReducer,
    history: historyReducer,
    setup: setupReducer,
  },
});

export default store;
