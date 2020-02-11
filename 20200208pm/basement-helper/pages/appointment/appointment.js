// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    namelist: [{ message: 'B105 大讨论室' }, { message: 'B205 小讨论室' }, { message: 'B215 小音乐活动室' }, { message: 'B220 放映室' }, { message: 'B222 健身房一号' }, { message: 'B223 健身房二号' }, { message: 'B224 音乐活动室' }, { message: 'B210 乒乓球室' }, { message: 'B212 台球室' }]
    */
    namelist:[]
  },

  navigateroom:function(options){
    var d = options.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/table/table?name=' + encodeURI(d.paraname),
    })
  },

//获取所有房间信息
/*
  requestAllRoom:function(){
    
  },
  */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建房间
    /*
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/add-room',
      method: 'POST',
      data: {
        'Rid':'1',
        'Rtitle':'测试房间',
        'Rmin':'5',
        'Rmax':'10',
        'Rstatus':'0'
      },
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
      }
    })
    */
    var that = this
    //获取房间
    wx.request({
      url: 'http://39.107.70.176:9000/appointment/get-room',
      method: 'GET',
      data:null,
      header:{
        'content-type':'application/json'
      },
      dataType:'json',
      success: function (res) {        
        that.setData({
          namelist: res.data
        })
        console.log(that.data)
      }
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