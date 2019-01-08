// pages/post/post.js
//引入外部的的js里的数据
const postData=require('../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postlist:[],
    a:'123'
  },

  /**
   * 生命周期函数--页面加载时触发，一个页面只会执行一次，可以在这里获取进入当前页面的路径的参数optins
   */
  onLoad: function (options) {
    console.log('onLoad'+this.data.a);
     this.setData({
       postlist: postData.postList
     })
  }, 
  goDetail (e){
    const postid=e.currentTarget.dataset.postid;
    wx.navigateTo({
      url:'/pages/detail/detail?postid='+postid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成,一个页面只会执行一次，可以与视图层交互
   */
  onReady: function () {
    console.log('onReady' + this.data.a);
  },

  /**
   * 生命周期函数--监听页面显示,或者切入前台
   */
  onShow: function () {
    console.log('onShow' + this.data.a);
  },

  /**
   * 生命周期函数--监听页面隐藏或者切入后台，如navigateTo/点击了tab切换
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载，如redirectTo/navigateBack
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