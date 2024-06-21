/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';

function History() {
  const history = useSelector((state) => state.history);

  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.title} - {item.time} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
