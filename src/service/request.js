/**
 * 创建服务的库
 */
import wepy from 'wepy';
import wxlogin from '../utils/login';
let methods = 'get delete head options post put patch';
let request = {};
methods.split(' ').forEach(method => {
  request[method] = (url, params) => new Promise((resolve, reject) => {
    !params && (params = {});
    if (!wepy.getStorageSync('ifLogin')) {
      wxlogin(() => {
        params.token = wepy.getStorageSync('token');
        params.id = wepy.getStorageSync('userId');
        wepy.request({
          url: url, // 仅为示例，并非真实的接口地址
          data: params,
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          method: method,
          success: res => {
            res.data.code === 100000 && resolve(res.data.result);
          },
          fail: err => {
            reject(err)
          }
        });
      });
    } else {
      
    }
  });
});
export default request;
