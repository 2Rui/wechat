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
     isCollect:false,
     postID:'',
     musicIndex:{},//当前音乐的一些信息
  },
  goMusic (){
    if(this.data.isStart){//需要暂停
        console.log('需要暂停');
         app.appMusic.pause();
    }else{//需要播放
           //若是音乐停止之后的播放
           if(app.globalData.isStop){//从头播放
              app.appMusic.startTime = '10'
              app.appMusic.src = this.data.musicIndex.url;
              app.appMusic.title = this.data.musicIndex.title;
              app.appMusic.coverImgUrl = this.data.musicIndex.coverImg;
           }else{//接着暂停的开始播放
             app.appMusic.play();
           }
    }
    this.setData({
      isStart:!this.data.isStart
    })
  },
  collect (){//收藏
    this.showModal(this.data.isCollect);
  },
  showModal (val){//模态对话框
    wx.showModal({
      title: '收藏',
      content: val ? '取消收藏该文章' : '收藏该文章',
      cancelColor: "#333",
      confirmColor: "#405f80",
      success: (res) => {
        if (res.confirm) {//点确定
          this.showToast(val); 
          //判断文章是出于收藏还是未收藏的状态
          this.setData({
            isCollect:!val
          });
          const collPost = wx.getStorageSync('collStatus');
          collPost['pos'+this.data.postID]=!val;
          wx.setStorageSync('collStatus',collPost);
        } else if (res.cancel) {//取消
          
        }
      }
    })
  },
  showToast (val){//消息提示框
   wx.showToast({
     title:val?'取消收藏成功！':'收藏成功!'
   })
  },
  setMusic (){
    //在a页面将音乐停止或者正常播放完，再次进入同一a页面需要重新设置音乐，所有有了后半部分的判断
    if ((app.globalData.postID != this.data.postID) || (app.globalData.postID == this.data.postID&&app.globalData.isStop)) {
      console.log('需要设置音乐')
      app.appMusic.startTime = '10'
      app.appMusic.src = this.data.musicIndex.url;
      app.appMusic.title = this.data.musicIndex.title;
      app.appMusic.coverImgUrl = this.data.musicIndex.coverImg;
    } 
    //监听音乐播放
    app.appMusic.onPlay(() => {
      console.log('音乐播放了');
      this.setData({
        isStart: true
      })
    });
    //监听音乐暂停
    app.appMusic.onPause(() => {
      console.log('音乐暂停了');
      this.setData({
        isStart: false
      })
    });
    //监听音乐停止
    app.appMusic.onStop(() => {
      console.log('音乐停止了')
      app.globalData.isStop=true;
      this.setData({
        isStart: false
      })
    })
    //监听到音乐播放完了
    app.appMusic.onEnded(()=>{
      app.globalData.isStop = true;
      this.setData({
        isStart:false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postid=options.postid;
    this.setData(postData.postList[postid]);
    this.data.postID = postid;
    const musicIndex = postData.postList[postid]["music"];
    this.data.musicIndex=musicIndex;
   // const pages=getCurrentPages();
    //var currentPage = pages[pages.length - 1];//获取到当前页面的栈
    //console.log(currentPage.data.postID)
    this.setMusic();
     //从缓存中获取该文章是否处于缓存的状态
    const collPost=wx.getStorageSync('collStatus');
    if(collPost){
      const isColl=collPost['pos'+postid];
      if(isColl){
        this.setData({
        isCollect:true
      });
      }
    }else{
      const newCollPost={};
      newCollPost['pos'+postid]=false;
      wx.setStorageSync('collStatus', newCollPost);
    }
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
    //目的保存上一个页面的id,再次进入这个页面音乐会接着播放
    app.globalData.postID=this.data.postID;
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
   * 用户点击右上角分享 res.form是menu 否则是button res.target是undefined否则是button
   */
  onShareAppMessage: function (res) {
     if(res.form=='button'){

     }else{
       console.log(res);
     }
     return {
       title:'自定义转发标题',
       path:'/pages/detail/detail?postid='+this.data.postID
     }
  }
})