// pages/appointment/sheet.js
var app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "2020-04-01",
    startTime: "12:01",
    endTime: "12:01",
    roomname:'',
    isAgree: false,
    me:{}
  },

  //日期、时间选择器绑定的函数
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChangeStart: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindTimeChangeFinish: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  //用于最后勾选
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  //提交表单
  checkAndSubmit:function(){
    console.log('will check')
    if(!this.isAgree){//没有勾选
      wx.showToast({
        title: '请勾选“同意《地下室使用公约》”',
        icon: 'none',
        duration: 3000
      })
    }
    //else if()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roomname: decodeURI(options.name),
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