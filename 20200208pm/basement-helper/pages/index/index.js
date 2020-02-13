//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},//微信的身份信息
    me:{},//姓名学号预约信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

//跳转到对应自习室的sheet页面
  tostudyhall:function(options){
    wx.navigateTo({
      url: '/pages/study-hall/study-hall',
    })
  },

//跳转到对应自习室的预约表页面(appointment页面)
  toappointment:function(options){
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据(wx个人信息)
      that.setData({
        userInfo: userInfo
      })
    })
    //同步个人信息
    that.setData({
      me:app.globalData.me
    })
  },

  onShow: function () {
    this.setData({
      me: app.globalData.me
    })
  },

  onReady: function () {
    this.setData({
      me: app.globalData.me
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