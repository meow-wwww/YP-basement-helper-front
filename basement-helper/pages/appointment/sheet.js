// pages/appointment/sheet.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomname: '',
    roomid: '',
    isAgree: false,
    me: {},
    today: {
      year: new Date().getFullYear(),// 年
      month: new Date().getMonth() + 1,//月
      day: new Date().getDate()//日
    },

    iusage: '',

    dateArray:[
      { id: 1, name: '' },
      { id: 2, name: '' },
      { id: 3, name: '' },
      { id: 4, name: '' },
      { id: 5, name: '' },
      { id: 6, name: '' },
      { id: 7, name: '' }
    ],
    dateIndex: 0,

    objectMultiArray: [
      [ { id: '09', name: '9时'  },
        { id: '10', name: '10时' },
        { id: '11', name: '11时' },
        { id: '12', name: '12时' },
        { id: '13', name: '13时' },
        { id: '14', name: '14时' },
        { id: '15', name: '15时' },
        { id: '16', name: '16时' },
        { id: '17', name: '17时' },
        { id: '18', name: '18时' },
        { id: '19', name: '19时' },
        { id: '20', name: '20时' },
        { id: '21', name: '21时' },
        { id: '22', name: '22时' }
      ],
      [ { id: '00', name: '00分' },
        { id: '15', name: '15分' },
        { id: '30', name: '30分' },
        { id: '45', name: '45分' },
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

  bindDateChange2: function (e) {
    console.log(e)
    this.setData({
      dateIndex: e.detail.value
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
    //设置全局数据
    this.setData({
      roomname: decodeURI(options.name),
      roomid: options.id,
      me: app.globalData.me
    })
    //初始化日期选择器
    var nowYear=this.data.today.year
    var nowMonth = this.data.today.month
    var nowDay = this.data.today.day
    var yearArray = [];
    var monthArray = [];
    var dayArray = [];
    monthArray.push(nowMonth)
    dayArray.push(nowDay)
    for (var i = 1; i <= 6; i++) {
      if(nowMonth==12&&nowDay==31)
        nowYear++;
      if (nowMonth == 1 || nowMonth == 3 || nowMonth == 5 || nowMonth == 7 || nowMonth == 8 || nowMonth == 10 || nowMonth == 12) {
        if (nowDay == 31) {
          nowDay = 1;
          nowMonth++;
          if (nowMonth == 13)
            nowMonth = 1;
        }
        else
          nowDay++;
      }
      else if (nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11) {
        if (nowDay == 30) {
          nowDay = 1;
          nowMonth++;
        }
        else nowDay++;
      }
      else if (nowMonth == 2) {
        if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) {//闰年
          if (nowDay == 29) {
            nowDay = 1;
            nowMonth = 3;
          }
          else nowDay++;
        }
        else {//平年
          if (nowDay == 28) {
            nowDay = 1;
            nowMonth = 3;
          }
          else nowDay++;
        }
      }
      yearArray.push(nowYear)
      monthArray.push(nowMonth);
      dayArray.push(nowDay);
    }
    this.setData({
      'dateArray[0].id': yearArray[0] + '-' + monthArray[0] + '-' + dayArray[0],
      'dateArray[0].name': monthArray[0] + '月' + dayArray[0] + '日',
      'dateArray[1].id': yearArray[1] + '-' + monthArray[1] + '-' + dayArray[1],
      'dateArray[1].name': monthArray[1] + '月' + dayArray[1] + '日',
      'dateArray[2].id': yearArray[2] + '-' + monthArray[2] + '-' + dayArray[2],
      'dateArray[2].name': monthArray[2] + '月' + dayArray[2] + '日',
      'dateArray[3].id': yearArray[3] + '-' + monthArray[3] + '-' + dayArray[3],
      'dateArray[3].name': monthArray[3] + '月' + dayArray[3] + '日',
      'dateArray[4].id': yearArray[4] + '-' + monthArray[4] + '-' + dayArray[4],
      'dateArray[4].name': monthArray[4] + '月' + dayArray[4] + '日',
      'dateArray[5].id': yearArray[5] + '-' + monthArray[5] + '-' + dayArray[5],
      'dateArray[5].name': monthArray[5] + '月' + dayArray[5] + '日',
      'dateArray[6].id': yearArray[6] + '-' + monthArray[6] + '-' + dayArray[6],
      'dateArray[6].name': monthArray[6] + '月' + dayArray[6] + '日',
    })
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function() {
  },
  /*生命周期函数--监听页面显示*/
  onShow: function() {
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function() {
  },
  /*生命周期函数--监听页面卸载*/
  onUnload: function() {
  },
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {
  },
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function() {
  },
  /*用户点击右上角分享*/
  onShareAppMessage: function() {
  }
})