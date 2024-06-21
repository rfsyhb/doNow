/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { start, stop, tick, reset } from '../features/stopwatch/stopwatchSlice';
import { addHistory } from '../features/history/historySlice';

function Stopwatch() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.stopwatch.time);
  const isRunning = useSelector((state) => state.stopwatch.isRunning);
  const setup = useSelector((state) => state.setup);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (time === 0 && isRunning) {
      const historyItem = { title: setup.title, time: setup.duration };
      dispatch(addHistory(historyItem));
      dispatch(stop());

      if (setup.discordEnabled && setup.webhookUrl) {
        axios
          .post(setup.webhookUrl, {
            content: `Pomodoro "${historyItem.title}" finished in ${historyItem.time} minutes.`,
          })
          .then(() => {
            console.log('Posted to Discord');
          })
          .catch((error) => {
            console.error('Error posting to Discord:', error);
          });
      }
    }
  }, [time, isRunning, dispatch, setup]);

  useEffect(() => {
    if (!isRunning) {
      dispatch(reset(setup.duration * 60)); // update waktu
    }
  }, [dispatch, isRunning, setup.duration]);

  const handleStart = () => {
    dispatch(reset(setup.duration * 60)); // Mengatur ulang sesuai durasi di pengaturan
    dispatch(start());
  };

  // const handleStop = () => {
  //   dispatch(stop());
  // };

  const handleReset = () => {
    dispatch(reset(setup.duration * 60));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-row items-center justify-between md:w-[26rem] bg-cardMain py-7 px-8 gap-10 rounded-2xl shadow-md">
      <h1 className="text-7xl font-semibold">{formatTime(time)}</h1>
      <div className="flex flex-col gap-3">
        <button
          className={`hover:bg-black hover:text-white ${isRunning ? 'bg-black text-white' : 'bg-white text-black '} font-semibold p-[0.1rem] px-4 rounded-lg border border-black`}
          type="button"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="hover:bg-red-400 bg-white text-black font-semibold p-[0.1rem] px-4 rounded-lg border border-black"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
