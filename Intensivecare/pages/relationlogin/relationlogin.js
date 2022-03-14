// pages/nurselogin/nurselogin.js
let app = getApp();
const db = wx.cloud.database();
const relations = db.collection('relations');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      id:"",
      phone:"",
      name:"",
      isLogin:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    login: function (e) {
        // console.log(e);
        //向jsp发送请求，判断用户是否存在
        let id = e.detail.value.ID;
        let name = e.detail.value.Name;
        let phone = e.detail.value.Phone;
        console.log(id,name,phone)
        this.setData({
          id:id,
          name:name,
          phone:phone
        })
        var _this=this;
        if (id.length == 0 || name.length == 0 || phone.length==0) {
          wx.showModal({
            title: '温馨提示:',
            content: '个人信息不能为空！',
            showCancel: false
          })
        } else {
         relations.where({
              ID:id
            }).get()
            .then(res => {
              // console.log(res.data.length);
              if (res.data.length == 0) {
                relations.add({
                  data:{
                    ID:id,
                    Name:name,
                    Phone:phone
                  }
                })
                wx.showModal({
                  title: '提示',
                  content: '您是新用户已注册成功!'
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '登录成功！'
                })
              };
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/seeentrance/seeentrance?visitor_id=' + id + '&visitor_phone=' + phone + '&visitor_name=' + name
                })
               }, 1000);//延迟时间 这里是1秒
            })
            .catch(res => {
              console.log('信息错误！', res)
            })
        }
      },
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