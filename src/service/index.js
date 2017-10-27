import request from './request.js';
import apis from './url-config√.js';

export function wxlogin(data) {
  return request.get(`${apis.wxlogin}`, data);
}
export function createShop (data) {
  return request.post(`${apis.createShop}`, data);
}
export function updateShop (id, data) {
  return request.put(`${apis.createShop}/${id}`, data);
}
export function addWeixinId (id) {
  return request.get(`${apis.addWeixinId}`, id);
}
export function uploadPic (formdata) {
  return request.post(`${apis.uploadPic}`, formdata);
}
export function getToken (key) {
  return request.post(`${apis.getToken}`, key);
}
export function createItem(data) {
  return request.post(`${apis.items}`, data);
}
export function deleteItem (id) {
  return request.delete(`${apis.items}/${id}`);
}

export function getTicket (id) {
  return request.get(`${apis.items}/${id}/ticket`);
}

export function getShopInfo (id) {
  return request.get(`${apis.shops}/${id}`);
}

export function getItems (id, status = 1, page = 1, per_page = 10) {
  let data = {
    status,
    page,
    per_page
  };
  return request.get(`${apis.shops}/${id}/items`, data);
}

export function getItem (id) {
  return request.get(`${apis.items}/${id}`);
}
export function updateItem (id, params) {
  return request.put(`${apis.items}/${id}`, params);
}
export function publish (id) {
  return request.put(`${apis.items}/${id}/publish`);
}
export function unPublish (id) {
  return request.delete(`${apis.items}/${id}/publish`);
}

export function updateItemDetails (id, details) {
  return request.put(`${apis.items}/${id}`, details);
}
export function getItemDetails (id) {
  return request.get(`${apis.items}/${id}`);
}
export function createAuction (id, price) {
  // POST /api/items/{id}/auctions
  return request.post(`${apis.items}/${id}/price`, JSON.stringify({price}));
}

export function getPrice (id) {
  return request.get(`${apis.items}/${id}/price`);
}

export function getInfo () {
  return request.get(`${apis.users}/me`);
}

export function getPriceRecord (id) {
  return request.get(`${apis.items}/${id}/pricerecord`);
}

export function getWxConfig () {
  return request.get(`${apis.wechat}/sdkconfig`);
}
