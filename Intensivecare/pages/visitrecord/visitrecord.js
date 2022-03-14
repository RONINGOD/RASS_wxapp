const app = getApp();
Page({
  data: {
    gridCol:3,
    skin: false,
    patient_id:app.globalData.patient_idfornurse,
    patient_bednum:app.globalData.bednumfornurse,
    name:app.globalData.namefornurse,
    visit_record:app.globalData.visit_record
  },
  clickimage:function(e){
    var imageid = e.currentTarget.id;
    var imgUrl = this.data.visit_record[imageid].Visitor_PhotoPath;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad(options){
    

  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})