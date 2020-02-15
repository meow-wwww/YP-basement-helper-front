// pages/appointment/sheet.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "2020-04-01",
    startTime: "09:00",
    endTime: "10:00",
    startBlank: false,
    endBlank: false,
    roomname: '',
    roomid: '',
    isAgree: false,
    me: {},

    istart: '', //完好格式
    ifinish: '', //完好格式
    iusage: ''
  },

  //日期、时间选择器绑定的函数
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChangeStart: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindTimeChangeFinish: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  //处理输入的usage
  inputusage: function(e) {
    this.setData({
      iusage: e.detail.value
    })
  },

  //用于最后勾选
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  //提交表单
  checkAndSubmit: function() {
    console.log('will check')
    //能进入这个函数，说明一定勾选了。要检查房间有无空闲、预约者的权限（还有吗？）
    //申请预约
    var that = this
    console.log(that)
    console.log(that.data.roomid)
    console.log(that.data.roomname)
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/add-appoint',
      method: 'POST',
      data: {
        'Astart': that.data.date + ' ' + that.data.startTime + ':00',
        'Afinish': that.data.date + ' ' + that.data.endTime + ':00',
        'Ausage': that.data.iusage,
        'Rid': that.data.roomid,
        'Rtitle': that.data.roomname,
        'students': [{
          'Sid': app.globalData.me.id,
          'Sname': app.globalData.me.name
        }]
      },
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      roomname: decodeURI(options.name),
      roomid: options.id,
      me: app.globalData.me
    })
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