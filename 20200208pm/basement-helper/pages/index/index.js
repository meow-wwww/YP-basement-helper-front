//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    screenwidth: '',
    screenheight: '',
    windowheight: '',
    sbh:''
  },

  tostudyhall:function(options){
    wx.navigateTo({
      url: '/pages/study-hall/study-hall',
    })
  },

  toappointment:function(options){
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },

  onLoad: function (options) {
    console.log('myload')
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      screenheight: wx.getSystemInfoSync().screenHeight,
      screenwidth: wx.getSystemInfoSync().screenWidth,
      windowheight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
