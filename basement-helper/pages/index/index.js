//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {}, //微信的身份信息
    me: {}, //姓名学号预约信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    earliest: {},
    nextAppointTime: "",
    nextAppointRoom: ""

  },

  //跳转到对应自习室的sheet页面
  tostudyhall: function(options) {
    wx.navigateTo({
      url: '/pages/study-hall/study-hall',
    })
  },

  //跳转到对应自习室的预约表页面(appointment页面)
  toappointment: function(options) {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据(wx个人信息)
      that.setData({
        userInfo: userInfo
      })
    })

    //同步个人信息
    that.setData({
      me: app.globalData.me
    })
  },

  onShow: function() {
    //index页面每次显示的时候都要自动获取新的预约信息 并同步更新全局变量和本地变量    
    //根据学号获取预约信息
    var that = this
    var getData = new Promise(function(resolve, reject) {
      wx.request({
        url: 'http://39.107.70.176:9000/appointment/get-student',
        method: 'POST',
        data: {
          'Sid': app.globalData.me.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          resolve(res.data)
        }
      })
    })

    getData.then(function(data){
      
      //将全局变量中的数据进行筛选
      var nowYear = app.globalData.today.year
      var nowMonth = (app.globalData.today.month).toString().padStart(2, '0');
      var nowDay = (app.globalData.today.day).toString().padStart(2, '0');
      var tempDate=new Date()
      var nowHour = (tempDate.getHours()).toString().padStart(2, '0');
      var nowMinute = (tempDate.getMinutes()).toString().padStart(2, '0');
      var nowSecond = (tempDate.getSeconds()).toString().padStart(2, '0');
      var nowTimeStr=nowYear+'-'+nowMonth+'-'+nowDay+'T'+nowHour+':'+nowMinute+':'+nowSecond
      
      console.log('准备开始splice')
      console.log(data)
      for (var i = data.data.length-1;i>=0;i--){
        console.log('i:', i)
        if(data.data[i].Astart<=nowTimeStr){
          data.data.splice(i,1)
        }
        console.log('now data:',data)
      }
      app.globalData.me.appointmentlist = data//将获取的预约信息返回给全局变量

      that.setData({
        me:app.globalData.me
      })

      var appointList = app.globalData.me.appointmentlist.data
      var nextApt
      var nextAppointStr = ""
      if (appointList.length) {
        nextApt = appointList[0]
        for (var i = 1; i < appointList.length; i++) { //!!!!!!
          if (nextApt.Astart > appointList[i].Astart)
            nextApt = appointList[i];
        }
        var ShowStr = ""
        if (nextApt.Astart[5] == '1') {
          ShowStr += '1'
        }
        ShowStr += nextApt.Astart[6]
        ShowStr += "月"
        if (nextApt.Astart[8] != '0') {
          ShowStr += nextApt.Astart[8]
        }
        ShowStr += nextApt.Astart[9]
        ShowStr += "日 "
        ShowStr += nextApt.Astart.slice(11, 16)
        ShowStr += "-"
        ShowStr += nextApt.Afinish.slice(11, 16)
        ShowStr += '\n'

        that.setData({
          nextAppointTime: ShowStr,
          nextAppointRoom: nextApt.Rtitle
        })
      }
    })
  },

  onReady: function() {
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