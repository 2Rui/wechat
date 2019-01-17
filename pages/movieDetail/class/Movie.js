const utils=require('../../../utils/utils.js');
class Movie{
  constructor (url){
    this.url=url;
  }
  getInfo(callback){
    this.callback=callback;
    wx.request({
      url: this.url,
      method: "GET",
      header: {
        'content-type': 'application/xml'
      },
      success: (res) => {
        this.manageData(res);
      }
    })
  }
  manageData (res){
    let data = res.data;
    let acator = [];
    let acators = [];
    //演员的循环
    for (var i in data.casts) {
      let obj = {
        name: data.casts[i]["name"],
        image: data.casts[i]["avatars"]["large"],
        id: data.casts[i]["id"]
      };
      acators.push(obj);
      acator.push(data.casts[i]["name"]);
    }
    let movie = {
      movieImg: data.images ? data.images.large : "",
      title: data["original_title"],
      country: data["countries"][0],
      year: data["year"],
      like: data["wish_count"],
      ping: data["comments_count"],
      type: data["genres"].join('、'),
      daoyan: data["directors"][0]["name"],
      yanyuan: acator.join('/'),
      summary: data["summary"],
      stars: utils.setStar(data.rating.stars),
      average: data["rating"]["average"],
      actatrs: acators
    };
    this.callback(movie);
  }

}
export {Movie}