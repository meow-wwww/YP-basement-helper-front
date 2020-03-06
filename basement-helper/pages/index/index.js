//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},//微信的身份信息
    me:{},//姓名学号预约信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    earliest:{}
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

    if (app.globalData.me.id==null){
      wx.navigateTo({
        url: '/pages/identity/identity',
      })
    }
  },

  onShow: function () {
    //index页面每次显示的时候都要自动获取新的预约信息 并同步更新全局变量和本地变量    
    //根据学号获取预约信息
    var that = this
    console.log('request id:',app.globalData.me.id)
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/get-student',
      method: 'POST',
      data: {
        'Sid':app.globalData.me.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.me.appointmentlist = res.data
        console.log('get-student success')
      }
    })

//用全局变量更新本地变量
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