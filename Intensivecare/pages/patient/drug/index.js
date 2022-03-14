// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    //  <!-- 床上擦浴，翻身排背，口腔护理，胃肠减压 -->
    data: {
      cayu:app.globalData.drugforpatient.cayu,
      fanbei:app.globalData.drugforpatient.fanbei,
      huli:app.globalData.drugforpatient.huli,
      jianya:app.globalData.drugforpatient.jianya,
      id:null,
      unused:app.globalData.drugforpatient.unused,
      used:app.globalData.drugforpatient.used,
      waituse:app.globalData.drugforpatient.waituse
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        id:app.globalData.patient_idforpatient
      })
    },

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})