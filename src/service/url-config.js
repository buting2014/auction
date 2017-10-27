/**
 * 地址统一管理
 */
const DEV_DOMAIN = 'http://api.pivotal-china.com';
const PROD_DOMAIN = 'http://api.pivotal-china.com';

let createUrl = url => {
  let domain = process.env.NODE_ENV === 'development' ? DEV_DOMAIN : PROD_DOMAIN;
  return domain + url;
};

let data = {
  createShop: createUrl('/api/shops'),
  getToken: createUrl('/auth/getPicToken'),
  uploadPic: `http://up-z2.qiniu.com`,
  detailData: createUrl('detailData'),
  items: createUrl('/api/items'),
  users: createUrl('/api/users'),
  shops: createUrl('/api/shops'),
  wechat: createUrl('/api/wechat')
};

export default (() => {
  let api = {};
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      api[key] = typeof data[key] === 'string' ? data[key] : data[key];
    }
  }
  return api;
})();
