// pages/index/index.js
//获取应用实例
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'./user-unlogin.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //公共变量中用户信息是否存在
  if(app.globalData.userInfo){
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
  }else if(this.canIUse){
    app.userInfoReadyCallback = res => {
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  }else{
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success:res=>{
        app.globalData.userinfo=res.userInfo;
        this.setData({
          avatarUrl:res.userInfo.avatarUrl
        })
      },
      fail:res=>{
        console.log('授权失败')
      }
    })
  }
  },
  selfGetInfo :function(e){
    //用户点击了允许
     if(e.detail.userInfo){
       app.globalData.userinfo = e.detail.userInfo;
       this.setData({
         avatarUrl: e.detail.userInfo.avatarUrl
       })
     }else{
       //用户点击了拒绝授权，wx.getUserInfo这个方法，则不会走success,只会走fail,可以在这里弹出提示框，让用户去授权
       this.selfModal();
     }
    
  },
  selfModal:function(){
    wx.showModal({
      title:'提示',
      content:'请接收授权，否则会影响你的使用效果',
      showCancel:false,//不显示取消按钮
      success:res=>{
        if(res.confirm){
          console.log('用户点击了确定')
        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    })
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