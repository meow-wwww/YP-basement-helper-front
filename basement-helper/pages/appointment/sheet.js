// pages/appointment/sheet.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 这4项是从前一页继承下来的数据
    roomname: '',
    roomid: '',
    me: {},
    roomstatus: {},

    today: {
      year: new Date().getFullYear(),// 年
      month: new Date().getMonth() + 1,//月
      day: new Date().getDate()//日
    },
    isAgree: false, // ‘同意公约’确认框状态
    iusage: '',//输入的用途

    recvSubmitStatus: {}, // 提交后从服务器取得的信息

    checkValid: 2, // 用于实时指示是否可以预约.0:尚未填写数据 1:不可预约 2:可以预约
    statusBackgroundColor: [
      'rgba(247, 247, 247, 0.925)', // 白色
      'rgba(204, 29, 29, 0.849)', // 红色
      'rgba(9, 165, 92, 0.877)'], // 绿色
    statusTextColor: ['rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.849)', 'rgba(255, 255, 255, 0.849)'],
    statusText: ['', '该时段房间已被占用', '该时段房间空闲'],


    dateArray:[//id没啥用
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
      [ { num: 9, id: '09', name: '9时'  },
        { num: 10, id: '10', name: '10时' },
        { num: 11, id: '11', name: '11时' },
        { num: 12, id: '12', name: '12时' },
        { num: 13, id: '13', name: '13时' },
        { num: 14, id: '14', name: '14时' },
        { num: 15, id: '15', name: '15时' },
        { num: 16, id: '16', name: '16时' },
        { num: 17, id: '17', name: '17时' },
        { num: 18, id: '18', name: '18时' },
        { num: 19, id: '19', name: '19时' },
        { num: 20, id: '20', name: '20时' },
        { num: 21, id: '21', name: '21时' },
        { num: 22, id: '22', name: '22时' }
      ],
      [ { num: 0, id: '00', name: '00分' },
        { num: 1, id: '15', name: '15分' },
        { num: 2, id: '30', name: '30分' },
        { num: 3, id: '45', name: '45分' },
      ]
    ],
    multiIndexStart: [0, 0],
    multiIndexFinish: [0, 0],
    timeReverse: true,//开始时间>=结束时间？//仅用于按钮的disable
    timeTooLong: false,//预约时长>3h?//仅用于按钮的disable
  },

  //设置开始时间
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
      timeReverse: timeReverseLocal
    })
    if(timeReverseLocal){
      // 由于用户初次操作90%会先改开始时间，导致此错误几乎一定发生。我们索性不提示，直接帮用户改过来算了...
      /* 
      wx.showToast({
        title: '开始时间必须早于结束时间',
        icon:'none',
        duration:3000
      })
      */

      // 将结束时间自动调至设置的开始时间
      this.setData({
        multiIndexFinish: e.detail.value
      })

    }
    else{
      //考察是否时间过长
      var endHour = this.data.objectMultiArray[0][this.data.multiIndexStart[0]].num+3;
      var endMinute = this.data.objectMultiArray[1][this.data.multiIndexStart[1]].num;
      if(!((this.data.objectMultiArray[0][this.data.multiIndexFinish[0]].num<endHour)||(
        this.data.objectMultiArray[0][this.data.multiIndexFinish[0]].num == endHour&&this.data.objectMultiArray[1][this.data.multiIndexFinish[1]].num<=endMinute))){
        this.setData({
          timeTooLong:true
        })
        wx.showToast({
          title: '预约时长不得超过3小时',
          icon: 'none',
          duration: 3000
        })
        // 将开始时间自动调至设置的结束时间-3h. 无需担心溢出.
        this.setData({
          multiIndexStart: [this.data.multiIndexFinish[0] - 3, this.data.multiIndexFinish[1]],
          timeTooLong: false
        })
      }
      else{
        this.setData({
          timeTooLong: false
        })
      }
    }
  },
  
  //设置结束时间
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
    if (timeReverseLocal) {
      wx.showToast({
        title: '开始时间必须早于结束时间',
        icon: 'none',
        duration: 3000
      })
      // 将开始时间自动调至设置的结束时间
      this.setData({
        multiIndexStart: e.detail.value
      })
    }
    else {
      //考察是否时间过长
      var endHour = this.data.objectMultiArray[0][this.data.multiIndexStart[0]].num + 3;
      var endMinute = this.data.objectMultiArray[1][this.data.multiIndexStart[1]].num;
      if (!((this.data.objectMultiArray[0][this.data.multiIndexFinish[0]].num < endHour) || (
        this.data.objectMultiArray[0][this.data.multiIndexFinish[0]].num == endHour && this.data.objectMultiArray[1][this.data.multiIndexFinish[1]].num <= endMinute))) {
        this.setData({
          timeTooLong: true
        })
        wx.showToast({
          title: '预约时长不得超过3小时',
          icon: 'none',
          duration: 3000
        })
        // 将结束时间自动调至设置的开始时间+3h. 同样无需担心溢出.
        this.setData({
          multiIndexFinish: [this.data.multiIndexStart[0] + 3, this.data.multiIndexStart[1]],
          timeTooLong:false
        })
      }
      else {
        this.setData({
          timeTooLong: false
        })
      }
    }
  },

  //日期选择器绑定的函数
  bindDateChange: function (e) {
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

  // 填好信息后实时查询状态
  checkRoomStatus: function() {
    
  },

  // 跳转预约成功页面
  successPage: function(options) {
    // var d = options.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/appointment/success?',
    })
  },

  //提交表单
  checkAndSubmit: function() {
    //申请预约
    var that = this

    wx.request({
      url: 'http://39.107.70.176:9000/appointment/add-appoint',
      method: 'POST',
      data: {
        'Astart': that.data.dateArray[that.data.dateIndex].id + ' ' + that.data.objectMultiArray[0][that.data.multiIndexStart[0]].id + ':' + that.data.objectMultiArray[1][that.data.multiIndexStart[1]].id + ':00',
        'Afinish': that.data.dateArray[that.data.dateIndex].id + ' ' + that.data.objectMultiArray[0][that.data.multiIndexFinish[0]].id + ':' + that.data.objectMultiArray[1][that.data.multiIndexFinish[1]].id + ':00',
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
      async: false, // 停止异步改为同步方式，可等待res返回
      success: function (res) {
        console.log(res.data);
        that.setData({recvSubmitStatus: res.data}) //需要暂存到全局变量里
      }
    });

    // 处理服务器返回的信息
    console.log(that.data.recvSubmitStatus)

    if (!that.data.recvSubmitStatus.hasOwnProperty("statusInfo")) {
      // 预约成功时, 返回的json不包含上述键
      // 跳转预约成功页面
      that.successPage({})
    }

    else {
      // 发生错误时
      var errMessage = that.data.recvSubmitStatus.statusInfo.message
      if (errMessage.length) {
        // 弹窗提示
        wx.showModal({
          title: 'Oooops... 预约失败了',
          content: errMessage,
          confirmText: "好的",
          cancelText: "知道了",
          success: function (res) {
            // console.log(res);
            if (res.confirm) {
              // console.log('用户点击主操作')
            } else {
              // console.log('用户点击辅助操作')
            }
          }
        });
      }
    }
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    //设置全局数据
    this.setData({
      roomname: decodeURI(options.name),
      roomid: options.id,
      me: app.globalData.me,
      roomstatus: decodeURI(options.status)
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
    var monthStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var dayStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    this.setData({
      'dateArray[0].id': yearArray[0] + '-' + monthStr[monthArray[0]] + '-' + dayStr[dayArray[0]],
      'dateArray[0].name': monthArray[0] + '月' + dayArray[0] + '日',
      'dateArray[1].id': yearArray[1] + '-' + monthStr[monthArray[1]] + '-' + dayStr[dayArray[1]],
      'dateArray[1].name': monthArray[1] + '月' + dayArray[1] + '日',
      'dateArray[2].id': yearArray[2] + '-' + monthStr[monthArray[2]] + '-' + dayStr[dayArray[2]],
      'dateArray[2].name': monthArray[2] + '月' + dayArray[2] + '日',
      'dateArray[3].id': yearArray[3] + '-' + monthStr[monthArray[3]] + '-' + dayStr[dayArray[3]],
      'dateArray[3].name': monthArray[3] + '月' + dayArray[3] + '日',
      'dateArray[4].id': yearArray[4] + '-' + monthStr[monthArray[4]] + '-' + dayStr[dayArray[4]],
      'dateArray[4].name': monthArray[4] + '月' + dayArray[4] + '日',
      'dateArray[5].id': yearArray[5] + '-' + monthStr[monthArray[5]] + '-' + dayStr[dayArray[5]],
      'dateArray[5].name': monthArray[5] + '月' + dayArray[5] + '日',
      'dateArray[6].id': yearArray[6] + '-' + monthStr[monthArray[6]] + '-' + dayStr[dayArray[6]],
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