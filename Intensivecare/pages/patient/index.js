// pages/patient/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            "https://img0.baidu.com/it/u=103114326,2294070380&fm=253&fmt=auto&app=138&f=JPG?w=900&h=500",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.ofweek.com%2FUpload%2FNews%2F2017-08%2F28%2Ffindus%2F1503906839043039919.jpg&refer=http%3A%2F%2Fimages.ofweek.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649331689&t=ff773c3fce16d2a1b360f0ac104b9e11",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp8.itc.cn%2Fq_70%2Fimages03%2F20210508%2F6e694c0cb0864c82a0fa292c3aaa4aab.jpeg&refer=http%3A%2F%2Fp8.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649331613&t=4b1900bfeab82dc65ff931319872f475",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimagepphcloud.thepaper.cn%2Fpph%2Fimage%2F158%2F405%2F218.png&refer=http%3A%2F%2Fimagepphcloud.thepaper.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649331905&t=5e0a1d964c15e5ec24f2b96bf7841627"
        ],
          currentIndex:0,
          patient_id:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.patient_id;
        app.globalData.patient_idforpatient=id;
        this.setData({
            patient_id:id
        });
        wx.cloud.database().collection('drug').where({
            ID:id
          }).get()
          .then(res => {
            app.globalData.drugforpatient = res.data[0];
          })
          .catch(res => {
            console.log('用户不存在！', res)
          })
          wx.cloud.database().collection('patientsplan').where({
            ID:id
          }).get()
          .then(res => {
            app.globalData.patientplanforpatient = res.data[0];
          })
          .catch(res => {
            console.log('用户不存在！', res)
          })
    },

    // swiperChange(e){
    //     console.log(e)
    //     this.setData({
    //       currentIndex:e.detail.current
    //     })
    //   },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})