import Pusher from 'pusher-js';

export default {
  install(app) {
    var pusher = new Pusher('c9ef57ca7089e8f6b264', {
        cluster: 'us2'
    });
    Pusher.logToConsole = true;

    app.config.globalProperties.$pusher = pusher;
  },
};