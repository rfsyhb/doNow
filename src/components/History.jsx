/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';

function History() {
  const history = useSelector((state) => state.history);
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const todayDate = `${day} ${month} ${year}`;

  return (
    <div className="min-w-96 flex flex-col bg-cardMain p-4 rounded-xl border border-black border-opacity-20">
      <div className="flex flex-row items-center justify-between px-10 pb-3">
        <h2 className="text-xl font-semibold">History</h2>
        <p className="text-sm">{todayDate}</p>
      </div>
      <ul className="flex flex-col gap-1">
        {history.map((item, index) => (
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
        ))}
      </ul>
    </div>
  );
}

export default History;
