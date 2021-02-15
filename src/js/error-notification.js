import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function throwError(text) {
  error({
    type: 'error',
    title: false,
    text,
    closer: true,
    sticker: false,
    width: '400px',
    delay: 1500,
  });
}

export { throwError };
