/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: 0,
  isActive: false,
  title: '',
  minutes: '',
  webhookUrl: '',
  history: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setWebhookURL: (state, action) => {
      state.webhookURL = action.payload;
    },
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
    tick: (state) => {
      if (state.isActive && state.time > 0) {
        state.time -= 1;
      }
      if (state.isActive && state.time === 0) {
        state.isActive = false;
      }
    },
    reset: (state) => {
      state.time = 0;
      state.isActive = false;
      state.title = '';
      state.minutes = '';
    },
  },
});

export const {
  setTime,
  setActive,
  setTitle,
  setMinutes,
  setWebhookURL,
  addHistory,
  tick,
  reset,
} = timerSlice.actions;

export default timerSlice.reducer;
