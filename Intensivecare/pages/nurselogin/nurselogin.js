// pages/nurselogin/nurselogin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:"",
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
        var id = e.detail.value.ID;
        var pwd = e.detail.value.password;
        // console.log(id,pwd)
        var _this=this;
        if (id.length == 0 || pwd.length == 0) {
          wx.showModal({
            title: '温馨提示:',
            content: '用户名或密码不能为空！',
            showCancel: false
          })
        } else {
          wx.cloud.database().collection('admin').where({
              ID:id
            }).get()
            .then(res => {
              if (res.data[0].Password == pwd) {
                  _this.setData({
                  userInfo: res.data[0],
                  isLogin: true
                })
                wx.showModal({
                  title: '登录成功!',
                  content: '登陆成功!'
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../../pages/nurse/choosebednum/choosebednum',
                  })
                 }, 1000) //延迟时间 这里是1秒             
              } else {
                wx.showModal({
                  title: '密码错误!',
                  content: '密码错误!'
                })
              };
            })
            .catch(res => {
              console.log('账号不存在！', res)
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