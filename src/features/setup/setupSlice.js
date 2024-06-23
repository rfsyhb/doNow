/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const setupSlice = createSlice({
  name: 'settings',
  initialState: {
    webhookUrl: '',
    webhookReminderUrl: '',
    usernameReminder: '',
    discordEnabled: false,
    title: '',
    duration: 25, // default duration in minutes
  },
  reducers: {
    setWebhookUrl: (state, action) => {
      state.webhookUrl = action.payload;
    },
    setWebhookReminderUrl: (state, action) => {
      state.webhookReminderUrl = action.payload;
    },
    setUsernameReminder: (state, action) => {
      state.usernameReminder = action.payload;
    },
    setDiscordEnabled: (state, action) => {
      state.discordEnabled = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setWebhookUrl,
  setWebhookReminderUrl,
  setUsernameReminder,
  setDiscordEnabled,
  setTitle,
  setDuration,
} = setupSlice.actions;
export default setupSlice.reducer;
