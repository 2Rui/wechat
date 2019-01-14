//处理星星 40 [1,1,1,1,0] 
function setStar(str) {
  const num = str.substring(0, 1);
  const arr = [];
  for (var i = 1; i < 5; i++) {
    if (i <= num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}
//请求数据
function http(url,callback){
  wx.request({
      url:url,
      method:'GET',
     header: {
      'content-type': 'applycation/xml'
    },
    success:(res)=>{
      console.log(res)
      callback(res.data.subjects);
    },
    fail:(res)=>{
      console.log(error);
    }
  })
}
module.exports = {
  setStar: setStar,
  http:http
}