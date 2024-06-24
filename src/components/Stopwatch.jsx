/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  start,
  stop,
  tick,
  reset,
  startRemind,
  stopRemind,
} from '../features/stopwatch/stopwatchSlice';
import { addHistory } from '../features/history/historySlice';
import useDateTime from '../hooks/useDateTime';

function Stopwatch() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.stopwatch.time);
  const isRunning = useSelector((state) => state.stopwatch.isRunning);
  const isReminding = useSelector((state) => state.stopwatch.isReminding);
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

      if (
        setup.webhookReminderUrl.length > 1 &&
        setup.usernameReminder.length > 1
      ) {
        dispatch(startRemind());
        workerRef.current.postMessage({
          type: 'startReminder',
          isReminding: true,
          webhookReminderUrl: setup.webhookReminderUrl,
        });
      }
    }
  }, [time, isRunning, dispatch, setup, timeNow, todayDate, isReminding]);

  // New useEffect for handling reminder interval
  useEffect(() => {
    let reminderInterval;
    if (
      isReminding &&
      setup.webhookReminderUrl.length > 1 &&
      setup.usernameReminder.length > 1
    ) {
      reminderInterval = setInterval(() => {
        axios
          .post(setup.webhookReminderUrl, {
            content: `<@${setup.usernameReminder}> tolong tekan done!`,
            allowed_mentions: {
              users: [`${setup.usernameReminder}`],
            },
          })
          .then(() => {
            console.log('Reminder sent');
          })
          .catch((error) => {
            console.error('Error sending reminder:', error);
          });
      }, 15000);
    }

    return () => {
      if (reminderInterval) {
        clearInterval(reminderInterval);
      }
    };
  }, [isReminding, setup.webhookReminderUrl, setup.usernameReminder]);

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

  const handleReset = () => {
    dispatch(reset(setup.duration * 60));
    workerRef.current.postMessage({ type: 'reset', duration: setup.duration });
  };

  const handleStopReminder = () => {
    dispatch(stopRemind());
    workerRef.current.postMessage({ type: 'stopReminder' });
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
      <div className="flex flex-col w-full items-center">
        <h1
          className={`${!isReminding ? '' : 'hidden'} w-full text-7xl font-semibold`}
        >
          {formatTime(time)}
        </h1>
        <button
          type="button"
          className={`${!isReminding ? 'hidden' : ''} border border-black w-full p-2 rounded-xl shadow-md font-bold bg-black text-white hover:bg-white hover:text-black`}
          onClick={handleStopReminder}
        >
          done!
        </button>
      </div>
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
          disabled={!isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
