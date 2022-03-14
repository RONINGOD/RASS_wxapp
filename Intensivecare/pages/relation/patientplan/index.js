// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:app.globalData.patientplanforrelation.Name,
      patient_id:app.globalData.patientplanforrelation.ID,
      keshi:app.globalData.patientplanforrelation.Department,
      bed_id:app.globalData.patientplanforrelation.Bednum,
      time:app.globalData.patientplanforrelation.InicuTime,
      tiwen:app.globalData.patientplanforrelation.BodyTemperature,
      maibo:app.globalData.patientplanforrelation.Pulse,
      xinlv:app.globalData.patientplanforrelation.Heartrate,
      xueya:app.globalData.patientplanforrelation.Xueya,
      huxiji:app.globalData.patientplanforrelation.Ventilatormode,
      fanshen:app.globalData.patientplanforrelation.Tuneposition,
      guandao:app.globalData.patientplanforrelation.Pipelinesituation,
      yizhu:app.globalData.patientplanforrelation.Doctorsadvice,
      cuoshi:app.globalData.patientplanforrelation.Nursingmanagement
    },
    onLoad:function(options){
      
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