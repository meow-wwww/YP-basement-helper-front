//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},//微信的身份信息
    me:{},//姓名学号预约信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    earliest:{},
    nextAppointTime:"",
    nextAppointRoom:""

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
      me: app.globalData.me,
    })
    var appointList = app.globalData.me.appointmentlist.data
    var nextApt
    var nextAppointStr = ""
    if(appointList.length){
      nextApt = appointList[0]
      for(var i = 1; i < appointList.length; i++ ){
          if(nextApt.Astart > appointList[i].Astart)
            nextApt = appointList[i];
      }
      var ShowStr = ""
      if(nextApt.Astart[5]=='1'){
        ShowStr+='1'
      }
      ShowStr+=nextApt.Astart[6]
      ShowStr+="月"
      if (nextApt.Astart[8] != '0') {
        ShowStr += nextApt.Astart[8]
      }
      ShowStr+=nextApt.Astart[9]
      ShowStr+="日 "
      ShowStr+=nextApt.Astart.slice(11,16)
      ShowStr+="-"
      ShowStr+=nextApt.Afinish.slice(11,16)
      ShowStr+='\n'
      

      this.setData({
        nextAppointTime: ShowStr,
        nextAppointRoom: nextApt.Rtitle
      })

      console.log('me',app.globalData.me)
      console.log('appointlist',appointList)
      console.log('nextAppoint',nextApt)
      console.log('debug', nextAppointStr)

      

    }

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