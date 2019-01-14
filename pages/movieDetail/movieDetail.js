// pages/movieDetail/movieDetail.js
const app=getApp();
const utils=require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
 movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const movieID=options.id;
    //获取单个电影的基本信息
    var url = app.globalData.douban+
      "/v2/movie/subject/" + movieID;
      this.getInfo(url);
  },
  //获取数据
  getInfo (url){
   wx.request({
     url: url,
     method:"GET",
     header:{
       'content-type':'application/xml'
     },
     success:(res)=>{
         this.manageData(res);
     }
   })
  },
  //处理数据
  manageData:function(res){
    let data=res.data;
    let acator=[];
    let acators=[];
    for(var i in data.casts){
      let obj={
        name: data.casts[i]["name"],
        image: data.casts[i]["avatars"]["large"],
        id: data.casts[i]["id"]
      };
      acators.push(obj);
      acator.push(data.casts[i]["name"]);
    }
    let movie={
      movieImg: data.images ? data.images.large : "",
      title: data["original_title"],
      country:data["countries"][0],
      year:data["year"],
      like: data["wish_count"],
      ping: data["comments_count"],
      type:data["genres"].join('、'),
      daoyan: data["directors"][0]["name"],
      yanyuan: acator.join('/'),
      summary: data["summary"],
      stars: utils.setStar(data.rating.stars),
      average: data["rating"]["average"],
      actatrs: acators
    };
    this.setData({
      movie:movie
    })
  }
,
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