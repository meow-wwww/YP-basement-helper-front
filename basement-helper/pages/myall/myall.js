// pages/myall/myall.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    me:{}
  },

  cancelAppointment:function(options){
    wx.showToast({
      title: '已取消预约',
      icon: 'success',
      duration: 3000
    })
    var d = options.currentTarget.dataset
    this.data.me.appointmentlist.data.splice(d.delindex, 1)    
    app.globalData.me.appointmentlist.data = this.data.me.appointmentlist.data
    this.setData({
      me: app.globalData.me
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      me: app.globalData.me
    })
    console.log(this.data.me)
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
    this.setData({
      me: app.globalData.me
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