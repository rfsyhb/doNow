import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWebhookUrl,
  setDiscordEnabled,
  setTitle,
  setDuration,
} from '../features/setup/setupSlice';

function Setup() {
  const dispatch = useDispatch();
  const setup = useSelector((state) => state.setup);

  const handleWebhookUrlChange = (e) => {
    dispatch(setWebhookUrl(e.target.value));
  };

  const handleDiscordEnabledChange = (e) => {
    dispatch(setDiscordEnabled(e.target.checked));
  };

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDurationChange = (e) => {
    dispatch(setDuration(Number(e.target.value)));
  };

  return (
    <div>
      <label htmlFor="webhook">
        Discord Webhook URL:
        <input
          id="webhook"
          type="text"
          value={setup.webhookUrl}
          onChange={handleWebhookUrlChange}
        />
      </label>
      <label htmlFor="enableDiscord">
        Enable Discord Notifications:
        <input
          id="enableDiscord"
          type="checkbox"
          checked={setup.discordEnabled}
          onChange={handleDiscordEnabledChange}
        />
      </label>
      <label htmlFor="title">
        Title:
        <input
          id="title"
          type="text"
          value={setup.title}
          onChange={handleTitleChange}
        />
      </label>
      <label htmlFor="duration">
        Duration (minutes):
        <input
          id="duration"
          type="number"
          value={setup.duration}
          onChange={handleDurationChange}
        />
      </label>
    </div>
  );
}

export default Setup;
