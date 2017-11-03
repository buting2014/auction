import wepy from 'wepy';
const APPID = 'wx1036b255a83c452a';
const APPSECRET = 'a014c29008246d6418932ed6a40f4e0e';
let wxloginCb = () => {};
let wxlogin = (cb) => {
  cb && (wxloginCb = cb);
  wepy.login({
    success: function(res) {
      if (res.code) {
        // 发起网络请求
        wepy.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          data: {
            js_code: res.code,
            appid: APPID,
            secret: APPSECRET,
            grant_type: 'authorization_code'
          },
          success: res => {
            wepy.setStorageSync('openid', res.data.openid);
            getUserInfo(login);
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}
let getUserInfo = (cb) => {
  wepy.getUserInfo({
    success (res) {
      wepy.setStorageSync('ifLogin', true)
      let result = res.userInfo
      for (let key in result) {
        wepy.setStorageSync(key, result[key])
      }
      cb && cb(res.userInfo)
    }
  })
};
let login = (user) => {
  user = Object.assign(user, {openid: wepy.getStorageSync('openid')});
  wepy.request({
    url: 'http://api.pivotal-china.com/auth/login',
    data: user,
    success: res => {
      let result = res.data.result;
      wepy.setStorageSync('shopId', result.id);
      wepy.setStorageSync('userId', result.user_id);
      wepy.setStorageSync('token', result.token);
      wxloginCb();
    },
    fail: err => {
      console.log(err);
    }
  })
};
export default wxlogin;
