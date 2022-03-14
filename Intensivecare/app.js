App({
  globalData: {
    patient_id:null,
    visitor_id:null,
    bednum:null,
    bednumfornurse:null,
    patient_idfornurse:null,
    visit_record:null,
    namefornurse:null,
    patient_idforpatient:null,
    drugforpatient:{
      ID:"",
      cayu:"",
      fanbei:"",
      huji:"",
      jianya:"",
      unused:"",
      used:"",
      waituse:""
    },
    drugforrelation:{
      ID:"",
      cayu:"",
      fanbei:"",
      huji:"",
      jianya:"",
      unused:"",
      used:"",
      waituse:""
    },
    drugfornurse:{
      ID:"",
      cayu:"",
      fanbei:"",
      huji:"",
      jianya:"",
      unused:"",
      used:"",
      waituse:""
    },
    patientplanforpatient:{
      Name:"",
      ID:"",
      Department:"",
      Bednum:"",
      InicuTime:"",
      BodyTemperature:"",
      Pulse:"",
      Heartrate:"",
      Xueya:"",
      Ventilatormode:"",
      Tuneposition:"",
      Pipelinesituation:"",
      Doctorsadvice:"",
     Nursingmanagement:""
    },
    patientplanfornurse:{
      Name:"",
      ID:"",
      Department:"",
      Bednum:"",
      InicuTime:"",
      BodyTemperature:"",
      Pulse:"",
      Heartrate:"",
      Xueya:"",
      Ventilatormode:"",
      Tuneposition:"",
      Pipelinesituation:"",
      Doctorsadvice:"",
     Nursingmanagement:""
    },
    patientplanforrelation:{
      Name:"",
      ID:"",
      Department:"",
      Bednum:"",
      InicuTime:"",
      BodyTemperature:"",
      Pulse:"",
      Heartrate:"",
      Xueya:"",
      Ventilatormode:"",
      Tuneposition:"",
      Pipelinesituation:"",
      Doctorsadvice:"",
     Nursingmanagement:""
    }
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      env:"cloud1-7g37q754c81063a2"
    })
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  
    
})