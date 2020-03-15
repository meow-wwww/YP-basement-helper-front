// pages/myall/myall.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    me: {}
  },

  getDate: function (data) {
    for (var i = 0; i < data.data.length; i++) {
      data.data[i].Adate = (data.data[i].Astart).substr(0, 10)
      data.data[i].Astart = (data.data[i].Astart).substr(11, 19)
      data.data[i].Afinish = (data.data[i].Afinish).substr(11, 19)
    }
  },

  cancelAppointment: function (options) {
    var that = this
    var d = options.currentTarget.dataset
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/cancel-appoint',
      method: 'POST',
      data: {
        'Aid': this.data.me.appointmentlist.data[d.delindex].Aid
      },
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        wx.showToast({
          title: '已取消预约',
          icon: 'success',
          duration: 3000
        })
        var getData = new Promise(function (resolve, reject) {
          wx.request({
            url: 'http://39.107.70.176:9000/appointment/get-student',
            method: 'POST',
            data: {
              'Sid': app.globalData.me.id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              app.globalData.me.appointmentlist = res.data
              //用全局变量更新本地变量
              that.setData({
                me: app.globalData.me
              })
            }
          })
        })
        getData.then(function (data) {
          //将全局变量中的数据进行筛选
          var nowYear = app.globalData.today.year
          var nowMonth = (app.globalData.today.month).toString().padStart(2, '0');
          var nowDay = (app.globalData.today.day).toString().padStart(2, '0');
          var tempDate = new Date()
          var nowHour = (tempDate.getHours()).toString().padStart(2, '0');
          var nowMinute = (tempDate.getMinutes()).toString().padStart(2, '0');
          var nowSecond = (tempDate.getSeconds()).toString().padStart(2, '0');
          var nowTimeStr = nowYear + '-' + nowMonth + '-' + nowDay + 'T' + nowHour + ':' + nowMinute + ':' + nowSecond
          for (var i = data.data.length - 1; i >= 0; i--)
            if (data.data[i].Astart <= nowTimeStr || data.data[i].Astatus == 'Canceled')
              data.data.splice(i, 1)
          that.getDate(data)
          console.log('处理后的data数组', data)//data.data.length,data.data[0]
          app.globalData.me.appointmentlist = data//将获取的预约信息返回给全局变量
          that.setData({
            me: app.globalData.me
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      me: app.globalData.me
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //myall页面每次显示的时候都要自动获取新的预约信息 并同步更新全局变量和本地变量    
    //根据学号获取预约信息
    var that = this
    var getData = new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.107.70.176:9000/appointment/get-student',
        method: 'POST',
        data: {
          'Sid': app.globalData.me.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          resolve(res.data)
        }
      })
    })
    getData.then(function (data) {
      //将全局变量中的数据进行筛选
      var nowYear = app.globalData.today.year
      var nowMonth = (app.globalData.today.month).toString().padStart(2, '0');
      var nowDay = (app.globalData.today.day-1).toString().padStart(2, '0');
      var tempDate = new Date()
      var nowHour = (tempDate.getHours()).toString().padStart(2, '0');
      var nowMinute = (tempDate.getMinutes()).toString().padStart(2, '0');
      var nowSecond = (tempDate.getSeconds()).toString().padStart(2, '0');
      var nowTimeStr = nowYear + '-' + nowMonth + '-' + nowDay + 'T' + nowHour + ':' + nowMinute + ':' + nowSecond
      for (var i = data.data.length - 1; i >= 0; i--)
        if (data.data[i].Astart <= nowTimeStr || data.data[i].Astatus == 'Canceled')
          data.data.splice(i, 1)
      that.getDate(data)
      console.log('处理后的data数组',data)//data.data.length,data.data[0]
      app.globalData.me.appointmentlist = data//将获取的预约信息返回给全局变量
      that.setData({
        me: app.globalData.me
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})