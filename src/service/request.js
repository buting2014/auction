/**
 * 创建服务的库
 */
import wepy from 'wepy';
let methods = 'get delete head options post put patch';

let request = {};
methods.split(' ').forEach(method => {
  request[method] = (url, params) => new Promise((resolve, reject) => {
    wepy.getStorage({
      key: 'token',
      success: res => {
        params.token = res.data;
      }
    });
    wepy.getStorage({
      key: 'id',
      success: res => {
        params.id = res.data;
      }
    });
    wepy.request({
      url: url, // 仅为示例，并非真实的接口地址
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: method,
      success: res => {
        res.data.code === 100000 && resolve(res.data);
      },
      fail: err => {
        reject(err)
      }
    });
  });
});
export default request;
