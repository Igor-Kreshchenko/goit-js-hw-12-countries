import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

function throwError(text) {
  error({
    text,
    closer: false,
    sticker: false,
    width: '500px',
    delay: Infinity,
  });
}

export { throwError };
