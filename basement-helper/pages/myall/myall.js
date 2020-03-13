// pages/myall/myall.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    me: {}
  },

  cancelAppointment: function(options) {
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
      success: function(res) {
        wx.showToast({
          title: '已取消预约',
          icon: 'success',
          duration: 3000
        })
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
      }
    })

    // 如果这里还要写东西，需要把上面的wx.request改到Promise结构中。

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      me: app.globalData.me
    })
    console.log(this.data.me)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //index页面每次显示的时候都要自动获取新的预约信息 并同步更新全局变量和本地变量    
    //根据学号获取预约信息
    var that = this
    console.log('request id:', app.globalData.me.id)
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
        app.globalData.me.appointmentlist = res.data
        //用全局变量更新本地变量
        that.setData({
          me: app.globalData.me
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})