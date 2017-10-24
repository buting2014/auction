function diffTime (lastTime) {
  var nowTime = new Date().getTime();
  if (typeof lastTime === 'object') {
    lastTime = lastTime.getTime();
  }
  if (typeof lastTime === 'string') {
    lastTime = (new Date(Date.parse(lastTime.replace(/-/g, '/')))).getTime();
  }
  return lastTime > nowTime ? lastTime - nowTime : 0;
}
function Countdown (options) {
  const defaults = {
    format: 'hh:mm:ss',
    lastTime: '2017-12-20'
  };
  for (var option in options) {
    defaults[option] = options[option];
  }
  let format = function (time) {
    return defaults.format.replace(/hh/ig, time.h).replace(/mm/ig, time.m).replace(/ss/ig, time.s);
  };
  let init = function () {
    let interval = setInterval(function () {
      if (!diffTime) {
        clearInterval(interval);
      }
      let countTime = diffTime(defaults.lastTime) / 1000;
      let h = Math.floor(countTime / 3600);
      let m = Math.floor(((countTime - h * 3600)) / 60);
      let s = Math.floor(countTime - h * 3600 - m * 60);
      h = (h > 9 ? h : '0' + h);
      m = (m > 9 ? m : '0' + m);
      s = (s > 9 ? s : '0' + s);
      return format({h: h, m: m, s: s});
    }, 1000);
  };
  init();
}

export default Countdown;
