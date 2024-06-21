/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendToDiscord } from '../../api';

// Initial state
const initialState = {
  time: 0,
  isActive: false,
  title: '',
  minutes: '',
  webhookUrl: '',
  history: [],
  isCompleted: false,
};

// Thunk send webhook
export const sendToDiscordThunk = createAsyncThunk(
  'timer/sendToDiscord',
  async ({ title, time, webhookUrl }) => {
    const message = `Completed: ${title} ${time}min`;
    await sendToDiscord(message, webhookUrl);
  }
);

// Slice
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
      state.webhookUrl = action.payload;
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
        state.isCompleted = true;
      }
    },
    reset: (state) => {
      state.time = 0;
      state.isActive = false;
      state.title = '';
      state.minutes = '';
      state.isCompleted = false;
    },
  },
});

// Export actions
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

// Thunk untuk memulai timer
export const startTimer = createAsyncThunk(
  'timer/startTimer',
  async (_, { dispatch, getState }) => {
    const intervalId = setInterval(() => {
      dispatch(tick());
      const { time, isActive, title, minutes, webhookUrl } = getState().timer;
      if (!isActive || time === 0) {
        clearInterval(intervalId);
        if (time === 0) {
          dispatch(addHistory({ title, time: minutes }));
          dispatch(
            sendToDiscordThunk({
              title,
              time: minutes,
              webhookUrl,
            })
          );
        }
      }
    }, 1000);
  }
);

export default timerSlice.reducer;
