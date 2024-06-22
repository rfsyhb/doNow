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

const clearHistoryFromLocalStorage = () => {
  const todayKey = getTodayDateKey();
  localStorage.removeItem(todayKey);
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
    clearHistory: () => {
      clearHistoryFromLocalStorage();
      return [];
    },
  },
});

export const { addHistory, loadHistoryFromLocalStorage, clearHistory } =
  historySlice.actions;
export default historySlice.reducer;
