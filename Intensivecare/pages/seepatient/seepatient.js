const app =getApp();
var wxCharts = require("../../utils/wxcharts.js");
let lineChart = null;
let lineChart2 =null;
let lineChart3 =null;
let lineChart4 =null;
let startPos = null;
Page({
    data: {
        src:'',
        CustomBar: app.globalData.CustomBar,
        TabCur:0,
        // score: Math.floor(Math.random()*(4+5)-5) ,
        score:0,
        patient_id:app.globalData.patient_id,
        visitor_id:app.globalData.visitor_id,
        bednum:app.globalData.bednum,
        tabNav: ['远程探望', '体温', '血压','心率','呼吸']
      },
      tabSelect(e) {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        });
      },
      touchHandler: function (e) {
        console.log(e)
        lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
        lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
        lineChart.scrollEnd(e);
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });        
    },
    touchHandler2: function (e) {
      console.log(e)
      lineChart2.scrollStart(e);
  },
  moveHandler2: function (e) {
      lineChart2.scroll(e);
  },
  touchEndHandler2: function (e) {
      lineChart2.scrollEnd(e);
      lineChart2.showToolTip(e, {
          format: function (item, category) {
              return category + ' ' + item.name + ':' + item.data 
          }
      });        
  },
  touchHandler3: function (e) {
    lineChart3.scrollStart(e);
    },
    moveHandler3: function (e) {
        lineChart3.scroll(e);
    },
    touchEndHandler3: function (e) {
        lineChart3.scrollEnd(e);
        lineChart3.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });        
    },
    touchHandler4: function (e) {
        lineChart4.scrollStart(e);
        },
        moveHandler4: function (e) {
            lineChart4.scroll(e);
        },
        touchEndHandler4: function (e) {
            lineChart4.scrollEnd(e);
            lineChart4.showToolTip(e, {
                format: function (item, category) {
                    return category + ' ' + item.name + ':' + item.data 
                }
            });        
        },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 9; i++) {
            categories.push('0'+String(i+1)+':00');
            data.push(Math.random()*(39.5-36.5)+36.5);
        }
        for(var i=8;i<24;i++){
          categories.push(String(i+1)+':00');
          data.push(Math.random()*(39.5-36.5)+36.5);
        }
        return {
            categories: categories,
            data: data
        }
    },
    createSimulationData2: function () {
      var categories = [];
      var data = [];
      var data2=[];
      for (var i = 0; i < 9; i++) {
          categories.push('0'+String(i+1)+':00');
          data.push(Math.random()*(140-120)+115);
          data2.push(Math.random()*(88-70)+70);
      }
      for(var i=8;i<24;i++){
        categories.push(String(i+1)+':00');
        data.push(Math.random()*(140-120)+115);
        data2.push(Math.random()*(88-70)+70);
      }
      return {
          categories: categories,
          data: data,
          data2:data2
      }
  },
  createSimulationData3: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 9; i++) {
        categories.push('0'+String(i+1)+':00');
        data.push(Math.random()*(80-55)+55);
    }
    for(var i=8;i<24;i++){
      categories.push(String(i+1)+':00');
      data.push(Math.random()*(80-55)+55);
    }
    return {
        categories: categories,
        data: data
    }
},
createSimulationData4: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 9; i++) {
        categories.push('0'+String(i+1)+':00');
        data.push(Math.random()*(25-12)+10);
    }
    for(var i=8;i<24;i++){
      categories.push(String(i+1)+':00');
      data.push(Math.random()*(25-12)+10);
    }
    return {
        categories: categories,
        data: data
    }
},
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        var id = app.globalData.patient_id;
        app.globalData.patient_idforpatient=id;
        this.setData({
            patient_id:id
        });
        wx.cloud.database().collection('drug').where({
            ID:id
          }).get()
          .then(res => {
            app.globalData.drugforrelation = res.data[0];
          })
          .catch(res => {
            console.log('用户不存在！', res)
          })
          wx.cloud.database().collection('patientsplan').where({
            ID:id
          }).get()
          .then(res => {
            app.globalData.patientplanforrelation = res.data[0];
          })
          .catch(res => {
            console.log('用户不存在！', res)
          })
    },

    onShow:function(){
      var windowWidth=400;
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
      var simulationData = this.createSimulationData();
      var simulationData2 = this.createSimulationData2();
      var simulationData3 = this.createSimulationData3();
      var simulationData4 = this.createSimulationData4();
      lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: simulationData.categories,
          animation: false,
          series: [{
              name: '患者体温(每隔1小时测量一次)',
              data: simulationData.data,
              format: function (val, name) {
                  return val.toFixed(1) + '°C';
              }
          }],
          xAxis: {
              disableGrid: true
          },
          yAxis: {
              title: '体温(°C)',
              format: function (val) {
                  return val.toFixed(1);
              },
              min: 35
          },
          width: windowWidth,
          height: 400,
          dataLabel: true,
          dataPointShape: true,
          enableScroll: true,
          extra: {
              lineStyle: 'curve'
          }
      });
      lineChart2 = new wxCharts({
        canvasId: 'lineCanvas2',
        type: 'line',
        categories: simulationData.categories,
        animation: false,
        series: [{
            name: '收缩压(mmHg)',
            data: simulationData2.data,
            format: function (val, name) {
                return val.toFixed(1);
            }
        },
        {
          name: '舒张压(mmHg)',
          data: simulationData2.data2,
          format: function (val, name) {
              return val.toFixed(1) ;
          }
        }
        ],
        xAxis: {
            disableGrid: true
        },
        yAxis: {
            title: '血压(mmHg)',
            format: function (val) {
                return val.toFixed(1);
            },
            min: 70
        },
        width: windowWidth,
        height: 400,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
            lineStyle: 'curve'
        }
    });
    lineChart3 = new wxCharts({
        canvasId: 'lineCanvas3',
        type: 'line',
        categories: simulationData3.categories,
        animation: false,
        series: [{
            name: '患者心率(每隔1小时测量一次)',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(0) ;
            }
        }],
        xAxis: {
            disableGrid: true
        },
        yAxis: {
            title: '次/分钟',
            format: function (val) {
                return val.toFixed(0);
            },
            min: 50
        },
        width: windowWidth,
        height: 400,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
            lineStyle: 'curve'
        }
    });
    lineChart4 = new wxCharts({
        canvasId: 'lineCanvas4',
        type: 'line',
        categories: simulationData4.categories,
        animation: false,
        series: [{
            name: '患者呼吸频率(每隔1小时测量一次)',
            data: simulationData4.data,
            format: function (val, name) {
                return val.toFixed(0) ;
            }
        }],
        xAxis: {
            disableGrid: true
        },
        yAxis: {
            title: '次/分钟',
            format: function (val) {
                return val.toFixed(0);
            },
            min: 10
        },
        width: windowWidth,
        height: 400,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
            lineStyle: 'curve'
        }
    });
    },
    /**
     * 打开本地视频
     */
    bindButtonTap: function() {
     var that = this
     //拍摄视频或从手机相册中选视频
     wx.chooseVideo({
      //album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
      sourceType: ['album', 'camera'],
      //拍摄视频最长拍摄时间，单位秒。最长支持60秒
      maxDuration: 60,
      //前置或者后置摄像头，默认为前后都有，即：['front', 'back']
      camera: ['front','back'],
      //接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
      success: function(res) {
       console.log(res.tempFilePaths[0])
       that.setData({
        src: res.tempFilePaths[0]
       })
      }
     })
    },
    /**
     * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
     */
    videoErrorCallback: function(e) {
     console.log('视频错误信息:')
     console.log(e.detail.errMsg)
    }
   })