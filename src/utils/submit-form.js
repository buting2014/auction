function SetForm(data){
  let formData = new FormData();
  for (let item in data){
    formData.append(item, data[item]);
  }
  this.formData = formData
}
SetForm.prototype.send = function(action, callback){
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.onreadystatechange = (response) => {
      if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
          var blkRet = JSON.parse(xhr.responseText);
          resolve(callback(blkRet))
      } else if (xhr.status != 200 && xhr.responseText) {
        reject('请求失败')
      }
    };
    xhr.send(this.formData);
  })
  
}
export default SetForm;