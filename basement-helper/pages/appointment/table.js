// pages/table/table.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    roomname: '',
    roomid: '',

    recvRoomStatus: {}, // 从服务器获取的数据

    appointList:[]//该房间的已有预约
  },

  // 预约房间按钮回调事件：进入sheet.js
  fillTheSheet: function(options) {
    var d = options.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/appointment/sheet?id=' + d.paraid + 
          '&name=' + encodeURI(d.paraname) + 
          '&status=' + encodeURI(d.parastatus),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      roomname: decodeURI(options.name),
      roomid: options.id
    })

    var that = this
    // 获取当前房间预约信息
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/get-room',
      method: 'POST',
      data: {Rid: that.data.roomid},
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      async: false, // 同步模式
      success: function (res) {
        that.setData({
          recvRoomStatus: res.data
        })
        console.log(res)
      }
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