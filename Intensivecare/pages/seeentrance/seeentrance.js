const app = getApp(); 
const util = require('../../utils/util')
Page({
  data: {
    time: '12:01',
    date: '2022-2-01',
    imgList: [],
    fileIDs: [],//上传云存储后的返回值
    patient_id:null,
    patient_password:null,
    visitor_id:null,
    visitor_name:null,
    visitor_phone:null,
    visitor_time:null,
    visitor_date:null
  },
  onLoad(options){
    var nowDate = new Date
    var nowdate=util.formatDate(nowDate)[0];
    var nowtime=util.formatDate(nowDate)[1];
    this.setData({
      time:nowtime,
      date:nowdate,
      visitor_id:options.visitor_id,
      visitor_name:options.visitor_name,
      visitor_phone:options.visitor_phone,
      visitor_time:nowtime,
      visitor_date:nowdate
    })
    // console.log(this.data)
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera','album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '患者家属',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  seepatient:function(e){
    var nowDate=new Date;
    this.setData({
      patient_id:e.detail.value.patient_id,
      patient_password:e.detail.value.patient_pwd,
      visitor_time:util.formatDate(nowDate)[1],
      visitor_date:util.formatDate(nowDate)[0]
    })
    var _this=this
    if (this.data.patient_id.length == 0 || this.data.patient_password.length == 0) {
        wx.showModal({
          title: '温馨提示:',
          content: '患者病历号或密码不能为空！',
          showCancel: false
        })
      } else {
        wx.cloud.database().collection('patients').where({
            ID:_this.data.patient_id
          }).get()
          .then(res => {
            if (res.data.length == 0) {
              wx.showModal({
                title: '提示',
                content: '该患者不存在!'
              })
            } else {
              if (!this.data.imgList.length) {
                wx.showToast({
                  icon: 'none',
                  title: '图片类容为空'
                });
              } else {
                  //上传图片到云存储
                  wx.showLoading({
                    title: '上传中',
                  })
                  let promiseArr = [];
                  for (let i = 0; i < this.data.imgList.length; i++) {
                    promiseArr.push(new Promise((reslove, reject) => {
                      let item = this.data.imgList[i];
                      let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
                      wx.cloud.uploadFile({
                        cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
                        filePath: item, // 小程序临时文件路径
                        success: res => {
                          this.setData({
                            fileIDs: this.data.fileIDs.concat(res.fileID)
                          });
                          console.log(res.fileID)//输出上传后图片的返回地址
                          reslove();
                          wx.hideLoading();
                          wx.showToast({
                            title: "上传成功",
                          })
                          wx.cloud.database().collection('visitrecord').add({
                            data:{
                              Patient_ID:_this.data.patient_id,
                              Visitor_ID:_this.data.visitor_id,
                              Visitor_Name:_this.data.visitor_name,
                              Visitor_Phone:_this.data.visitor_phone,
                              Visitor_Time:_this.data.visitor_time,
                              Visitor_Date:_this.data.visitor_date,
                              Visitor_PhotoPath:res.fileID
                            }
                          })
                        },
                        fail: res=>{
                          wx.hideLoading();
                          wx.showToast({
                            title: "上传失败",
                          })
                        }
                      })
                    }));
                  }
                  Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
                    console.log("图片上传完成后再执行")
                    this.setData({
                      imgList:[]
                    })
                  })
                  wx.cloud.database().collection('patients').where({
                    ID:_this.data.patient_id
                  }).get()
                  .then(res => {
                    app.globalData.patient_id=_this.data.patient_id;
                    app.globalData.bednum = res.data[0].bednum;
                    app.globalData.visitor_id = _this.data.visitor_id;
                  })
                  .catch(res => {
                    console.log('用户不存在！', res)
                  })
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '../seepatient/seepatient'
                    })
                }, 500);
              };
              console.log(this.data.fileIDs)//图片地址
            };
          })
          .catch(res => {
            console.log('账号不存在！', res)
          })
      }
  }
})