// pages/movie/movie.js
const app=getApp();
//引用公用方法的js
const utils=require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hot:{},
      top:{},
      comming:{}
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
      //  正在热映
    const hotUrl = app.globalData.douban +'/v2/movie/in_theaters?start=0&count=3';
    //即将上映
    const comming = app.globalData.douban +'/v2/movie/coming_soon?start=0&count=3';
    //top250
    const top = app.globalData.douban +'/v2/movie/top250?start=0&count=3';
    this.getMovieInfo(hotUrl,'hot','正在热映');
    this.getMovieInfo(comming, 'comming', '即将上线');
    this.getMovieInfo(top, 'top', 'Top250');
      
  },
  //跳转电影的详情页面
  goDetail (e){
   const id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id='+id,
    })
  },
  goMore (e){
    //更多电影的跳转
    const type=e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/movie/moremovie/moremovie?type='+type,
    })
  },
  //获取电影信息
  getMovieInfo (url,type,name){
    wx.request({
      url:url,
      data:{},
      header:{
        'content-type':'applycation/xml'
      },
      success:(res)=>{
        this.manageData(res.data.subjects,type,name);
      } 
    })
  },
  //处理电影数据
  manageData (data,type,name){
  const movieObj={};
 movieObj["type"]=type;
 movieObj["name"]=name;
   const arr=[];
  for(var i in data){
    const movie=data[i];
    const title=movie.title;
    const obj={
      name:title.length>6?title.substring(0,6)+'...':title,
      image:movie["images"].large,
      id:movie["id"],
      star:utils.setStar(movie["rating"]["stars"]),
      average:movie["rating"]["average"]
    };
    arr.push(obj);
  }
  movieObj["movies"]=arr;
  if(type=='hot'){
    this.setData({
      hot: movieObj
    })
  }else if(type=='comming'){
    this.setData({
      comming: movieObj
    })
  }else if(type=='top'){
    this.setData({
      top: movieObj
    })
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