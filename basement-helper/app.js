//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
      appointmentlist:{},//预约列表
      //tempRecvData:{}//暂存服务器返回的信息，暂时不需要了
    },
    today: {
      year: new Date().getFullYear(),// 年
      month: new Date().getMonth() + 1,//月
      day: new Date().getDate()//日
    },
  }
})