// pages/appointment/sheet.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "2020-04-01",
    
    startBlank: false,
    endBlank: false,
    roomname: '',
    roomid: '',
    isAgree: false,
    me: {},

    iusage: '',

    objectMultiArray: [
      [ { id: 0, name: '9'  },
        { id: 1, name: '10' },
        { id: 2, name: '11' },
        { id: 3, name: '12' },
        { id: 4, name: '13' },
        { id: 5, name: '14' },
        { id: 6, name: '15' },
        { id: 7, name: '16' },
        { id: 8, name: '17' },
        { id: 9, name: '18' },
        { id: 10, name: '19' },
        { id: 11, name: '20' },
        { id: 12, name: '21' },
        { id: 13, name: '22' }
      ],
      [ { id: 0, name: '00' },
        { id: 1, name: '15' },
        { id: 2, name: '30' },
        { id: 3, name: '45' },
      ]
    ],
    multiIndexStart: [0, 0],
    multiIndexFinish: [0, 0],
    timeReverse:true,//开始时间>=结束时间？
    timeGap:0 //时间间隔
  },

  bindMultiPickerChangeStart: function(e) {
    this.setData({
      multiIndexStart: e.detail.value
    })
    var timeReverseLocal=false;
    if (this.data.multiIndexStart[0] > this.data.multiIndexFinish[0])
      timeReverseLocal = true;
    else if (this.data.multiIndexStart[0] == this.data.multiIndexFinish[0]){
      if (this.data.multiIndexStart[1] >= this.data.multiIndexFinish[1])
        timeReverseLocal = true;
    }
    this.setData({
      timeReverse:timeReverseLocal
    })
  },
  
  bindMultiPickerChangeFinish: function (e) {
    this.setData({
      multiIndexFinish: e.detail.value
    })
    var timeReverseLocal = false;
    if (this.data.multiIndexStart[0] > this.data.multiIndexFinish[0])
      timeReverseLocal = true;
    else if (this.data.multiIndexStart[0] == this.data.multiIndexFinish[0]) {
      if (this.data.multiIndexStart[1] >= this.data.multiIndexFinish[1])
        timeReverseLocal = true;
    }
    this.setData({
      timeReverse: timeReverseLocal
    })
  },

  //日期选择器绑定的函数
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
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