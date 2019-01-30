const {promisify} = require('util');
const dbus = require('dbus-native');

const sessionBus = dbus.sessionBus();
const screenLocker = new Promise((res, rej) => {
  sessionBus
    .getService('org.gnome.ScreenSaver')
    .getInterface(
      '/org/gnome/ScreenSaver',
      'org.gnome.ScreenSaver',
      function(err, screen) {
        if (err) return rej(err);

        screen.lock = promisify(screen.Lock.bind(screen));
        screen.setActive = promisify(screen.SetActive.bind(screen));
        screen.getActive = promisify(screen.GetActive.bind(screen));
        res(screen);
      }
    )
  ;
})

exports.lock = function lock() {
  return screenLocker.then(locker => locker.lock());
}

exports.unlock = function unlock() {
  return screenLocker.then(locker => locker.setActive(false));
}

exports.isLocked = function isLocked() {
  return screenLocker.then(locker => locker.getActive()).then(active => !active);
}
