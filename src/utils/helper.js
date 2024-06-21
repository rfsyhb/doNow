export const getTodayDateKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const clearOldHistory = () => {
  const todayKey = getTodayDateKey();
  Object.keys(localStorage).forEach((key) => {
    if (key !== todayKey) {
      localStorage.removeItem(key);
    }
  });
};
