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
    // app.globalData.me.id = 'done'
    console.log('done')
    
    wx.navigateBack()
  },

  // 点击“登陆”按钮时
  Getsubmit: function(e) {
    var val=e.detail.value;
    console.log('user',val);

    app.globalData.me.name = val.Getname
    app.globalData.me.id = val.Getnumber
  },

  // 点击“微信登陆”按钮时
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