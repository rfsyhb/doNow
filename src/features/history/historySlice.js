import { createSlice } from '@reduxjs/toolkit';
import { getTodayDateKey } from '../../utils/helper';

const loadHistory = () => {
  const todayKey = getTodayDateKey();
  const storedHistory = localStorage.getItem(todayKey);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

const saveHistory = (history) => {
  const todayKey = getTodayDateKey();
  localStorage.setItem(todayKey, JSON.stringify(history));
};

const historySlice = createSlice({
  name: 'history',
  initialState: loadHistory(),
  reducers: {
    addHistory: (state, action) => {
      state.push(action.payload);
      saveHistory(state);
    },
    loadHistoryFromLocalStorage: () => {
      return loadHistory();
    },
  },
});

export const { addHistory, loadHistoryFromLocalStorage } = historySlice.actions;
export default historySlice.reducer;
