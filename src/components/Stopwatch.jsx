/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { start, stop, tick, reset } from '../features/stopwatch/stopwatchSlice';
import { addHistory } from '../features/history/historySlice';
import useDateTime from '../hooks/useDateTime';

function Stopwatch() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.stopwatch.time);
  const isRunning = useSelector((state) => state.stopwatch.isRunning);
  const setup = useSelector((state) => state.setup);
  const { todayDate, timeNow } = useDateTime();
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../utils/timerWorker.js', import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      if (event.data === 'tick') {
        dispatch(tick());
      } else if (event.data.type === 'reset') {
        dispatch(reset(event.data.time));
      }
    };

    return () => {
      workerRef.current.terminate();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isRunning) {
      workerRef.current.postMessage({ type: 'start' });
    } else {
      workerRef.current.postMessage({ type: 'stop' });
    }
  }, [isRunning]);

  useEffect(() => {
    if (time === 0 && isRunning) {
      const historyItem = { title: setup.title, time: setup.duration };
      dispatch(addHistory(historyItem));
      dispatch(stop());

      if (setup.discordEnabled && setup.webhookUrl) {
        axios
          .post(setup.webhookUrl, {
            content: `[${timeNow}] [${todayDate}], "${historyItem.title}" - ${historyItem.time} min, finished.`,
          })
          .then(() => {
            console.log('Posted to Discord');
          })
          .catch((error) => {
            console.error('Error posting to Discord:', error);
          });
      }
    }
  }, [time, isRunning, dispatch, setup, timeNow, todayDate]);

  useEffect(() => {
    if (!isRunning) {
      dispatch(reset(setup.duration * 60)); // update waktu
    }
  }, [dispatch, isRunning, setup.duration]);

  const handleStart = () => {
    if (setup.title.length > 0) {
      dispatch(reset(setup.duration * 60)); // Mengatur ulang sesuai durasi di pengaturan
      dispatch(start());
    } else {
      alert('u forgor to add title!');
    }
  };

  // const handleStop = () => {
  //   dispatch(stop());
  // };

  const handleReset = () => {
    dispatch(reset(setup.duration * 60));
    workerRef.current.postMessage({ type: 'reset', duration: setup.duration });
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
