// pages/bell/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: 5 * 60 * 1000,//倒计时5分钟
        timeData: {},
        img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0269032a45798bae2a85ef8baf5b814945893e761b8cf-UAh1Ry_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649419719&t=fafd4a1ab1bee5776c6202c28abf7aa2"
    },

    //倒计时绑定
    onChange(e) {
        this.setData({
          timeData: e.detail,
        });
      },
   
})