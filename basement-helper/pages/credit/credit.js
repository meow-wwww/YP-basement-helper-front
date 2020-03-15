// pages/credit/credit.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    violateList:[]
  },

  getDate: function (data) {
    for (var i = 0; i < data.data.length; i++) {
      data.data[i].Adate = (data.data[i].Astart).substr(0, 10)
      data.data[i].Astart = (data.data[i].Astart).substr(11, 19)
      data.data[i].Afinish = (data.data[i].Afinish).substr(11, 19)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var getData = new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.107.70.176:9000/appointment/get-violated',
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
    var that=this
    getData.then(function (data) {

      that.getDate(data)
      that.setData({
        violateList:data.data
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