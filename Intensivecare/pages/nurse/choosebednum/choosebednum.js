const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    bednum:[1,2,3,4]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    var floornum=1;
    var roomnum=1;
    for (let i = 0; i < 50; i++) {
      floornum=parseInt(i/10+1);
      roomnum=parseInt(i%10+1);
      list[i] = {};
      if(roomnum!=10){
        list[i].name = String(floornum)+"0"+(String(roomnum));
      }else{
        list[i].name = String(floornum)+String(roomnum);
      }
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  see:function(e){
    var bednumber = e.currentTarget.id;
    var roomnumber = this.data.list[this.data.TabCur].name;
    var sickroomnum = String(roomnumber)+'-'+String(bednumber);
    let patient_id=null;
    console.log(sickroomnum);
    wx.cloud.database().collection('patients').where({
      bednum:sickroomnum
    }).get()
    .then(res=>{
      patient_id=res.data[0].ID;
      app.globalData.patient_idfornurse=patient_id;
      app.globalData.bednumfornurse=sickroomnum;
      app.globalData.namefornurse=res.data[0].Name;
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
    wx.cloud.database().collection('visitrecord').where({
      ID:patient_id
    }).get()
    .then(res=>{
      app.globalData.visit_record=res.data;
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
    wx.cloud.database().collection('patientsplan').where({
      ID:patient_id
    }).get()
    .then(res=>{
      app.globalData.patientplanfornurse=res.data[0];
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
    wx.cloud.database().collection('drug').where({
      ID:patient_id
    }).get()
    .then(res=>{
      app.globalData.drugfornurse=res.data[0];
    })
    .catch(res=>{
      console.log('查询失败',res)
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '../../nursesee/nursesee?patient_bednum='+sickroomnum+'&patient_id='+patient_id
      })
     }, 1000);
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})