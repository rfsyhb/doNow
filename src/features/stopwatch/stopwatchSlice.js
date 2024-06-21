/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState: {
    time: 1500, // 25 menit dalam detik
    isRunning: false,
  },
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    stop: (state) => {
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
    },
    reset: (state, action) => {
      state.time = action.payload;
      state.isRunning = false;
    },
    updateTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { start, stop, tick, reset, updateTime } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;
