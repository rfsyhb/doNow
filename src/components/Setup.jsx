import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWebhookUrl,
  setDiscordEnabled,
  setTitle,
  setDuration,
} from '../features/setup/setupSlice';
import { updateTime } from '../features/stopwatch/stopwatchSlice';

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
    const duration = Number(e.target.value);
    dispatch(setDuration(duration));
    dispatch(updateTime(duration * 60));
  };

  return (
    <div className="flex flex-col gap-4 bg-cardMain p-6 rounded-xl border border-black border-opacity-20">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
        <div className="flex flex-row">
          <h1 className="font-semibold text-2xl">Stopwatch</h1>
          <p className="text-sm">
            <a href="https://github.com/rfsyhb" target="_blank">
              <span className="text-blue-500">by limau</span>
            </a>
          </p>
        </div>
        <div className="flex md:flex-col flex-row text-right gap-2">
          <label
            htmlFor="enableDiscord"
            className="font-semibold flex items-center gap-4 px-2 self-end border border-black border-opacity-30 rounded-lg justify-between"
          >
            Discord
            <div className="relative">
              <input
                id="enableDiscord"
                type="checkbox"
                checked={setup.discordEnabled}
                onChange={handleDiscordEnabledChange}
                className="sr-only"
              />
              <div
                className={`block w-8 h-4 rounded-full ${setup.discordEnabled ? 'bg-black' : 'bg-gray-400'}`}
              />
              <div
                className={`dot absolute left-0 top-0 bg-white w-4 h-4 border border-gray-400 rounded-full transition ${
                  setup.discordEnabled ? 'transform translate-x-4' : ''
                }`}
              />
            </div>
          </label>
          <label htmlFor="webhook">
            <input
              id="webhook"
              type="text"
              value={setup.webhookUrl}
              onChange={handleWebhookUrlChange}
              className="rounded-md px-2 w-full sm:w-auto"
              placeholder="webhook url"
              disabled={!setup.discordEnabled}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <label htmlFor="title" className="w-full sm:w-[80%] flex flex-col">
          <span className="text-sm pl-2">title?</span>
          <input
            id="title"
            type="text"
            value={setup.title}
            onChange={handleTitleChange}
            className="rounded-md px-2"
            placeholder="berak"
            maxLength="25"
          />
        </label>
        <label htmlFor="duration" className="w-full sm:w-[20%] flex flex-col">
          <span className="text-sm pl-2">how long?</span>
          <input
            id="duration"
            type="number"
            value={setup.duration}
            onChange={handleDurationChange}
            className="rounded-md px-2"
          />
        </label>
      </div>
    </div>
  );
}

export default Setup;
