// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    //  <!-- 床上擦浴，翻身排背，口腔护理，胃肠减压 -->
    data: {
      cayu:app.globalData.drugforrelation.cayu,
      fanbei:app.globalData.drugforrelation.fanbei,
      huli:app.globalData.drugforrelation.huli,
      jianya:app.globalData.drugforrelation.jianya,
      id:null,
      unused:app.globalData.drugforrelation.unused,
      used:app.globalData.drugforrelation.used,
      waituse:app.globalData.drugforrelation.waituse
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        id:app.globalData.patient_id
      })
    },

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})