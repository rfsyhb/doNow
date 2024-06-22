/* eslint-disable */
let interval;

self.onmessage = function (event) {
  const { type, duration } = event.data;

  if (type === 'start') {
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (type === 'stop') {
    clearInterval(interval);
  } else if (type === 'reset') {
    clearInterval(interval);
    self.postMessage('reset', duration * 60);
  }
};
