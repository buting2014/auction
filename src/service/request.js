/**
 * 创建服务的库
 */
import wepy from 'wepy';
let methods = 'get delete head options post put patch';
const SERVER_DOMAIN = 'http://api.pivotal-china.com';

let request = {};
methods.split(' ').forEach(method => {
  request[method] = (url, params) => new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: method,
      timeout: 10000
    }).then(response => {
      const successCodes = '100000 100204'.split(' ');

      if (successCodes.some(code => response.code === +code)) {
        if (Object.prototype.toString.call(response.result) === '[object Object]' || Array.isArray(response.result)) {
          let data = response.result;
          resolve(data);
        }
      }
      // if (response.code === 100001) {
      //   window.location.href = `${SERVER_DOMAIN}/auth/wechat?redirect_uri=${window.location.href}`;
      //   reject(response);
      // } else if (response.code === 100401) {
      //   window.location.href = `${SERVER_DOMAIN}/auth/wechat?redirect_uri=${window.location.href}`;
      // } else if (response.code === 100006) {
      //   let img = <img src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${response.result.ticket}`}/>;
      //   // Modal.alert('请长按以下二维码关注公众号', img);
      // } else {
      //   reject(response);
      // }
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  });
});
export default request;
