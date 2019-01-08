// pages/detail/detail.js
//引入外部的数据js
const postData=require('../../data/posts-data.js');
const app=getApp();
//监听音乐的的暂停事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //pageData:{},
     isStart:true,//是否正在播放音乐,
     isCollect:false
  },
  goMusic (){
    console.log(this.data.isStart)
    if(this.data.isStart){//需要暂停
        console.log('需要暂停');
      app.appMusic.pause();
      //监听音乐暂停
      app.appMusic.onPause(() => {
        console.log('音乐暂停了');
        this.setData({
          isStart: false
        })
      });
    }else{//需要播放
          console.log('需要播放')
           app.appMusic.play();
        //监听音乐播放
        app.appMusic.onPlay(() => {
          console.log('监听到音乐播放了');
          this.setData({
            isStart: true
          })
        })
    }
  },
  collect (){//收藏
    this.showModal();
  },
  showModal (){//模态对话框
    wx.showModal({
      title: '收藏',
      content: this.data.isCollect ? '取消收藏该文章' : '收藏该文章',
      cancelColor: "#333",
      confirmColor: "#405f80",
      success: (res) => {
        if (res.confirm) {//点确定
          this.showToast(); 
          //判断文章是出于收藏还是未收藏的状态
          if(this.data.isCollect){
            this.setData({
              isCollect: false
            });
          }else{
            this.setData({
              isCollect: true
            });
          }
         
        } else if (res.cancel) {//取消
          
        }
      }
    })
  },
  showToast (){//消息提示框
   wx.showToast({
     title:this.data.isCollect?'取消收藏成功！':'收藏成功'
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postid=options.postid;
    this.setData(postData.postList[postid]);
    // this.setData({
    //   pageData: postData.postList[postid]
    // })
    const musicIndex = postData.postList[postid]["music"];
    app.appMusic.src = musicIndex.url;
    app.appMusic.title = musicIndex.title;
    app.appMusic.coverImgUrl = musicIndex.coverImg;
    
    
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