// pages/nurse/patientplan/index.js
const app=getApp();
Page({

    /**F
     * 页面的初始数据
     */
    //  <!-- 床上擦浴，翻身排背，口腔护理，胃肠减压 -->
    data: {
      cayu:app.globalData.drugfornurse.cayu,
      fanbei:app.globalData.drugfornurse.fanbei,
      huli:app.globalData.drugfornurse.huli,
      jianya:app.globalData.drugfornurse.jianya,
      id:null,
      unused:app.globalData.drugfornurse.unused,
      used:app.globalData.drugfornurse.used,
      waituse:app.globalData.drugfornurse.waituse
    },
    onClickRight(e) {
      var data=this.data;
      wx.cloud.database().collection('drug').where({
        ID:data.id
      }).get()
      .then(res => {
        if (res.data[0].length == 0) {
          wx.cloud.database().collection('drug').add({
            data: {
              ID:data.id,
              cayu:data.cayu,
              fanbei:data.fanbei,
              huli:data.huli,
              jianya:data.jianya,
              used:data.used,
              unused:data.unused,
              waituse:data.waituse
            }
        })
        } else {
          wx.cloud.callFunction({
            name: 'updatedrug',
            data: {
              ID:data.id,
              cayu:data.cayu,
              fanbei:data.fanbei,
              huli:data.huli,
              jianya:data.jianya,
              used:data.used,
              unused:data.unused,
              waituse:data.waituse
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
      this.setData({
        id:app.globalData.patient_idfornurse
      })
    },

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})