// pages/movie/moremovie/moremovie.js
const utils=require('../../../utils/utils.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    movieUrl:'',
    total:'',//合并数据时记录上一次的数据的总量
    isEmpty:true,//是不是需要清空之前的数据
    navationBarTitle:''//导航条的文字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url='';
    var title='';
    const type = options.type;
    // //请求数据
    // if(type=='hot'){
    //   url =app.globalData.douban + '/v2/movie/in_theaters';
    //   title='正在热映';
    // }else if(type=='comming'){
    //   url = app.globalData.douban + '/v2/movie/coming_soon';
    //   title = '即将上线';
    // }else if(type=='top'){
    //   url = app.globalData.douban + '/v2/movie/top250';
    //   title = 'Top50';
    // }
    //使用switch case
    switch(type){
    case 'hot':
        url = app.globalData.douban + '/v2/movie/in_theaters';
        title = '正在热映';
    break;
    case 'comming':
        url = app.globalData.douban + '/v2/movie/coming_soon';
        title = '即将上线';
    break;
    case 'top':
        url = app.globalData.douban + '/v2/movie/top250';
        title = 'Top50';
    break;
    }
    this.data.movieUrl=url;
    this.data.navationBarTitle=title;
    //调用公共的缓存数据的方法
    utils.http(url, this.manageData);
  },
  //跳转到电影详情
  goDetail :function(e){
 const id=e.currentTarget.dataset.movieid;
 wx.navigateTo({
   url:'../../movieDetail/movieDetail?id='+id
 })
  },
  //处理数据
  manageData:function(data) {  
    var totalMovie=[];   
    const arr = []; 
    for (var i in data) {
      const movie = data[i];
      const title = movie.title;
      const obj = {
        name: title.length > 6 ? title.substring(0, 6) + '...' : title,
        image: movie["images"].large,
        id: movie["id"],
        star: utils.setStar(movie["rating"]["stars"]),
        average: movie["rating"]["average"]
      };
      arr.push(obj);
    }
  
    wx.hideNavigationBarLoading();  //取消导航条的刷新样式
    wx.stopPullDownRefresh(); //停止当前页面的下拉刷新

    if(!this.data.isEmpty){
      //需要将两次数据合并
       totalMovie=this.data.movies.concat(arr);
    }else{
      totalMovie=arr;
    }
    this.setData({
      movies:totalMovie,
      total:totalMovie.length
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
     wx.setNavigationBarTitle({
       title:this.data.navationBarTitle
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
     console.log('开始下拉刷新');
     this.setData({
       isEmpty:true
     });
     var url=this.data.movieUrl+'?start=0&end=20';
     utils.http(url,this.manageData);
    wx.showNavigationBarLoading();//在当前页面显示导航条的加载动画
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('上了触底');
    wx.showNavigationBarLoading();//在当前页面显示导航条的加载动画
    this.setData({
      isEmpty:false
    });
    //需要请求新的数据
   const url=this.data.movieUrl+'?start='+this.data.total+'&end=20';
   utils.http(url,this.manageData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})