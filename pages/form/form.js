// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getValue (e){
    console.log(e.detail.value)
  },

  getAllVal (e){
console.log(e.detail.value);
 //上传图片
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        var fileArr = res.tempFilePaths;
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);//临时文件路径列表
        console.log(res.tempFiles);//临时文件列表[{}]包括路径path与大小size
        //const tempFilePaths = res.tempFilePaths
        var arr=this.data.imgsrc;
        for (var i = 0; i < fileArr.length;i++){
          arr.push(fileArr[i]);
          //保存文件到本地
          // wx.saveFile({
          //   tempFilePath: fileArr[i],
          //   success:(resaa)=>{
          //     console.log(resaa.savedFilePath+'储存后的路径');//储存后的文件路径
          //     arr.push(resaa.savedFilePath);
          //   }
          // })
        }
        
        this.setData({
          imgsrc:arr
        });
        console.log(this.data.imgsrc);
      }
    })
  },
  showImg (e){
    const url=e.currentTarget.dataset.src;
    console.log(url)
    //获取图片的信息
    wx.getImageInfo({
      src: url,
      success(res) {
        console.log(res.width+';'+res.type)
        console.log(res.height)
        console.log(res.path);
        console.log(res.orientation)
      }
    })
    //预览图片
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  resetAll (){
   //上传文件
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})