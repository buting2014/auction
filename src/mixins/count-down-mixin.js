import wepy from 'wepy'

export default class CountDownMixin extends wepy.mixin {
  data = {
    countDownTime: '',
    formatTime: 'hh:mm:ss',
    interval: {}
  }
  initCountDown() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      let cutTime = this.diffTime(this.endTime);
      if (!cutTime) {
        clearInterval(this.interval);
      }
      let countTime = cutTime / 1000;
      let h = Math.floor(countTime / 3600);
      let m = Math.floor(((countTime - h * 3600)) / 60);
      let s = Math.floor(countTime - h * 3600 - m * 60);
      h = (h > 9 ? h : '0' + h);
      m = (m > 9 ? m : '0' + m);
      s = (s > 9 ? s : '0' + s);
      this.countDownTime = this.format({h: h, m: m, s: s});
      this.$apply();
    }, 1000);
  }
  diffTime(lastTime) {
    var nowTime = new Date().getTime();
    if (typeof lastTime === 'object') {
      lastTime = lastTime.getTime();
    }
    if (typeof lastTime === 'string') {
      lastTime = (new Date(Date.parse(lastTime.replace(/-/g, '/')))).getTime();
    }
    return lastTime > nowTime ? lastTime - nowTime : 0;
  }
  format(time) {
    return this.formatTime.replace(/hh/ig, time.h).replace(/mm/ig, time.m).replace(/ss/ig, time.s);
  }
}
