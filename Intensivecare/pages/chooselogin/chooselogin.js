const app = getApp(); 
Page({
    data: {
      cardCur: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        url: '../../images/hostipal.jpg'
      }, {
        id: 1,
          type: 'image',
          url: '../../images/hospital2.jpg',
      }, {
        id: 2,
        type: 'image',
        url: '../../images/hostipal3.jpg'
      }, {
        id: 3,
        type: 'image',
        url: '../../images/hospital4.jpg'
      }, {
        id: 4,
        type: 'image',
        url: '../../images/sickroom1.jpg'
      }, {
        id: 5,
        type: 'image',
        url: '../../images/drop.jpg'
      }, {
        id: 6,
        type: 'image',
        url: '../../images/icu.jpg'
      }]
    },
    onLoad() {
      this.towerSwiper('swiperList');
      this.setData({
        canIUseGetUserProfile: wx.getUserProfile ? true : false
      })

      // this.setData({
      //   userInfo:user
      // })
      let that = this;
      app.logincallback = () => {
        let localData = app.getLocalUserData();
        that.setData({ ...localData });
      };
      // 初始化towerSwiper 传已有的数组名即可
    },
    //     // 手动获取用户数据
    // // 如果用户已经授权过，则不会再弹出授权窗口，直接获取到信息
    // bindGetUserInfo(e) {
    //   let that = this;
    //   auth.updateUserInfo(e, () => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },

    // // 获取用户手机号码
    // bindGetPhoneNumber(e) {
    //   let that = this;
    //   auth.updatePhoneNumber(e, () => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },
    // kindToggle(e) {
    //   var id = e.currentTarget.id,
    //     list = this.data.list;
    //   for (var i = 0, len = list.length; i < len; ++i) {
    //     if (list[i].id == id) {
    //       list[i].open = !list[i].open;
    //     } else {
    //       list[i].open = false;
    //     }
    //   }
    //   this.setData({
    //     list: list,
    //   });
    // },

    // onDeleteUser() {
    //   let that = this;
    //   auth.deleteUserInfo(() => {
    //     let localData = app.getLocalUserData();
    //     that.setData({ ...localData });
    //   });
    // },

    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    },
    // towerSwiper触摸开始
    towerStart(e) {
      this.setData({
        towerStart: e.touches[0].pageX
      })
    },
    // towerSwiper计算方向
    towerMove(e) {
      this.setData({
        direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
      })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
      let direction = this.data.direction;
      let list = this.data.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < list.length; i++) {
          list[i - 1].mLeft = list[i].mLeft
          list[i - 1].zIndex = list[i].zIndex
        }
        list[list.length - 1].mLeft = mLeft;
        list[list.length - 1].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = list.length - 1; i > 0; i--) {
          list[i].mLeft = list[i - 1].mLeft
          list[i].zIndex = list[i - 1].zIndex
        }
        list[0].mLeft = mLeft;
        list[0].zIndex = zIndex;
        this.setData({
          swiperList: list
        })
      }
    },
    nurselogin(){
      wx.navigateTo({
        url: '/pages/nurselogin/nurselogin'
      })
    },
    relationlogin(){
      wx.navigateTo({
        url: '/pages/relationlogin/relationlogin'
      })
    },
    patientlogin(){
      wx.navigateTo({
        url: '/pages/patientlogin/patientlogin'
      })
    },
    userlogin(){
      wx.getUserProfile({
        desc: '用于用户信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              this.setData({
                userId: res.result.openid
              })
              // 用户登录
              var openid = this.data.userId
              var nickName = this.data.userInfo.nickName
              var gender = this.data.userInfo.gender
              var language = this.data.userInfo.language
              var avatar = this.data.userInfo.avatarUrl
              wx.cloud.database().collection('users').where({
                _openid: openid
              }).get({
                success: res => {
                  wx.setStorageSync('user', 1)
                  wx.setStorageSync('userId', openid)
                  if (res.data.length == 0){
                    wx.cloud.database().collection('users').add({
                      data: {
                          nickName: nickName,
                          gender: gender,
                          language: language,
                          avatar: avatar
                      }
                  })
                  }
                  app.globalData.userInfo=this.data.userInfo
                }
              })
            }
          })
        }
      })
      wx.setStorageSync('isLogin', true)
      wx.switchTab({
        url: '../mine/mine',
        fail:function(){
          console.log("跳转失败")
        }
      })
    },
  })