// pages/identity/identity.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  Topage:function()
  {
    app.globalData.me.id = 'done'
    wx.navigateBack()
  },
  Getsubmit: function(e) {
    var val=e.detail.value;
    console.log('user',val);
  },
  Getuser:function()
  {
    wx.getUserInfo({
      success:function(res)
      {
        console.log(res.userInfo)
        console.log("头像："+res.userInfo.avatarUrl)
        console.log("昵称："+res.userInfo.nickName)
        console.log("性别："+res.userInfo.gender)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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