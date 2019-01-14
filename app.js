App({
  onLaunch:function(){
    //获取全局唯一的背景音频管理器
    this.appMusic=wx.getBackgroundAudioManager();
    console.log('onlaunch')
    //先判断用户已经授权了那些信息
    wx.getSetting({
       success:res=>{
         if (res.authSetting['scope.userInfo']){
                //说明已经授权，可直接调用wx.getUserInfo获取用户信息
                wx.getUserInfo({
                  success:res=>{
                    console.log(res)
                    this.globalData.userInfo=res.userInfo;
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }
                })
         }
       }
    })
  },
  globalData: {
    douban:'https://douban.uieee.com',
    userInfo: null,
    postId:-1,
    isStop:false
  }
})