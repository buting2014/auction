/**
 * 创建服务的库
 */
import wepy from 'wepy';
let methods = 'get delete head options post put patch';

let request = {};
methods.split(' ').forEach(method => {
  request[method] = (url, params) => new Promise((resolve, reject) => {
    if(!params) {
      params = {}
    }
    console.log(params)
    params.id = wepy.getStorageSync('id');
    params.token = wepy.getStorageSync('token');
    console.log(params, params.id)
    wepy.request({
      url: url, // 仅为示例，并非真实的接口地址
      data: params,
      header: {
        'Content-Type': 'application/json' // 默认值
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
