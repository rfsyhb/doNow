import { useState, useEffect } from 'react';

const useDateTime = () => {
  const [todayDate, setTodayDate] = useState('');
  const [timeNow, setTimeNow] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      setTodayDate(`${day} ${month} ${year}`);

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      setTimeNow(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { todayDate, timeNow };
};

export default useDateTime;
