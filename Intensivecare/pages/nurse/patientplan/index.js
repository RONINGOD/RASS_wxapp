// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:app.globalData.patientplanfornurse.Name,
      patient_id:app.globalData.patientplanfornurse.ID,
      keshi:app.globalData.patientplanfornurse.Department,
      bed_id:app.globalData.patientplanfornurse.Bednum,
      time:app.globalData.patientplanfornurse.InicuTime,
      tiwen:app.globalData.patientplanfornurse.BodyTemperature,
      maibo:app.globalData.patientplanfornurse.Pulse,
      xinlv:app.globalData.patientplanfornurse.Heartrate,
      xueya:app.globalData.patientplanfornurse.Xueya,
      huxiji:app.globalData.patientplanfornurse.Ventilatormode,
      fanshen:app.globalData.patientplanfornurse.Tuneposition,
      guandao:app.globalData.patientplanfornurse.Pipelinesituation,
      yizhu:app.globalData.patientplanfornurse.Doctorsadvice,
      cuoshi:app.globalData.patientplanfornurse.Nursingmanagement,
      videoContext:null,
    },
    onLoad:function(options){
      
    },

    // 点击封面自定义播放按钮时触发
    onClickLeft() {
        wx.showToast({ title: '点击返回', icon: 'none' });
      },
    onClickRight(e) {
      var data=this.data;
      wx.cloud.database().collection('patients').where({
        ID:data.patient_id
      }).get()
      .then(res => {
        if (res.data[0].length == 0) {
          wx.cloud.database().collection('patientsplan').add({
            data: {
              Name:data.username,
              ID:data.patient_id,
              Department:data.keshi,
              Bednum:data.bed_id,
              InicuTime:data.time,
              BodyTemperature:data.tiwen,
              Pulse:data.maibo,
              Heartrate:data.xinlv,
              Xueya:data.xueya,
              Ventilatormode:data.huxiji,
              Tuneposition:data.fanshen,
              Pipelinesituation:data.guandao,
              Doctorsadvice:data.yizhu,
             Nursingmanagement:data.cuoshi
            }
        })
        } else {
          wx.cloud.callFunction({
            name: 'updatepatientsplan',
            data: {
              Name:data.username,
              ID:data.patient_id,
              Department:data.keshi,
              Bednum:data.bed_id,
              InicuTime:data.time,
              BodyTemperature:data.tiwen,
              Pulse:data.maibo,
              Heartrate:data.xinlv,
              Xueya:data.xueya,
              Ventilatormode:data.huxiji,
              Tuneposition:data.fanshen,
              Pipelinesituation:data.guandao,
              Doctorsadvice:data.yizhu,
              Nursingmanagement:data.cuoshi
            }
          }).then(res => {
            wx.showModal({
              title: '修改成功！',
              showCancel: false,
            })
          })
          .catch(res => {
            console.log('修改失败', res)
            wx.showToast({
              title: '修改失败！',
            })
          });
        };
      })
      .catch(res => {
        console.log('账号不存在！', res)
      })

      // console.log(e);
      
      // wx.showToast({ title: '点击按钮', icon: 'none' });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})