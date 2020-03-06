//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //根据学号获取预约信息
    var that = this
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/get-student',
      method:'POST',
      data:{
        'Sid':'1800017830'
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.globalData.me.appointmentlist = res.data
      }
    })
  },

  onShow:function(){
    
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    me:{//用户信息
      name:'',
      id:null,
      appointmentlist:{}//预约列表
    }
  }
})