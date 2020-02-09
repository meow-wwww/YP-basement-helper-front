// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namelist: [{ message: 'B105 大讨论室' }, { message: 'B205 小讨论室' }, { message: 'B215 小音乐活动室' }, { message: 'B220 放映室' }, { message: 'B222 健身房一号' }, { message: 'B223 健身房二号' }, { message: 'B224 音乐活动室' }, { message: 'B210 乒乓球室' }, { message: 'B212 台球室' }]
  },

  navigateroom:function(options){
    var d = options.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/table/table?name=' + encodeURI(d.paraname),
    })
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