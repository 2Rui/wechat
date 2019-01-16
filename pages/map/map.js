Page({
  data: {
    markers: [{
      iconPath: '/images/icon/star.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      },
        {
          longitude: 130.324520,
          latitude: 56.21229
        }],
      color: '#FF0000DD',
      width: 3,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/icon/chat.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId);
    //打开微信的内置地图
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  controltap(e) {
    console.log(e.controlId)
  }
})