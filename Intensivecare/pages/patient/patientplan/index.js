// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username:app.globalData.patientplanforpatient.Name,
      patient_id:app.globalData.patientplanforpatient.ID,
      keshi:app.globalData.patientplanforpatient.Department,
      bed_id:app.globalData.patientplanforpatient.Bednum,
      time:app.globalData.patientplanforpatient.InicuTime,
      tiwen:app.globalData.patientplanforpatient.BodyTemperature,
      maibo:app.globalData.patientplanforpatient.Pulse,
      xinlv:app.globalData.patientplanforpatient.Heartrate,
      xueya:app.globalData.patientplanforpatient.Xueya,
      huxiji:app.globalData.patientplanforpatient.Ventilatormode,
      fanshen:app.globalData.patientplanforpatient.Tuneposition,
      guandao:app.globalData.patientplanforpatient.Pipelinesituation,
      yizhu:app.globalData.patientplanforpatient.Doctorsadvice,
      cuoshi:app.globalData.patientplanforpatient.Nursingmanagement
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