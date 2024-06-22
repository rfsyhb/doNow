/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa6';
import { FaRegFrownOpen } from 'react-icons/fa';
import useDateTime from '../hooks/useDateTime';
import {
  loadHistoryFromLocalStorage,
  clearHistory,
} from '../features/history/historySlice';

function History() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);
  const { todayDate } = useDateTime();

  useEffect(() => {
    dispatch(loadHistoryFromLocalStorage());
  }, [dispatch]);

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <div className="min-w-96 flex flex-col bg-cardMain p-4 rounded-xl border border-black border-opacity-20">
      <div className="flex flex-row items-center justify-between px-3 pb-3">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-xl font-semibold">History</h2>
          <p className="text-sm">{todayDate}</p>
        </div>
        <button
          type="button"
          className="text-xl hover:text-red-500 disabled:text-black"
          onClick={handleClearHistory}
          disabled={history.length === 0}
        >
          <FaTrash />
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {history.length === 0 ? (
          <div className="flex flex-col items-center">
            <FaRegFrownOpen className="text-4xl mb-2" />
            No history found!
          </div>
        ) : (
          history.map((item, index) => (
            <li
              key={index}
              className="flex flex-row justify-between gap-10 bg-cardAlt p-1 px-3 rounded-xl border border-black border-opacity-10"
            >
              <p>{item.title}</p>
              <p>
                {item.time}
                <span className="text-sm">m</span>
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default History;
