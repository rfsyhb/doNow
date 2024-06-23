/* eslint-disable */
let interval;
let reminderInterval;

self.onmessage = function (event) {
  const { type, duration, isReminding, webhookReminderUrl } = event.data;

  if (type === 'start') {
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (type === 'stop') {
    clearInterval(interval);
    clearInterval(reminderInterval);
  } else if (type === 'reset') {
    clearInterval(interval);
    clearInterval(reminderInterval);
    self.postMessage('reset', duration * 60);
  } else if (type === 'startReminder') {
    if (isReminding && webhookReminderUrl.length > 1) {
      reminderInterval = setInterval(() => {
        self.postMessage('sendReminder');
      }, 8000);
    }
  } else if (type === 'stopReminder') {
    clearInterval(reminderInterval);
  }
};
