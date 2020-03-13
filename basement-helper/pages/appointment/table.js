// pages/table/table.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomname: '',
    roomid: '',
    today: {},
    //表格基础数据
    //时间
    tableWeek: ['日', '一', '二', '三', '四', '五', '六'],
    tableDate: [],
    tableTime: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '', ''],
    redClass: 'td tdl2',
    greenClass: 'td tdr2',

    recvRoomStatus: {}, // 从服务器获取的数据

    appointList: [], //该房间的已有预约
    tableUsed: [] //数组，先列后行
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
      roomid: options.id,
      today: app.globalData.today
    })

    var that = this
    // 向服务器进行同步请求，而不是异步请求
    var getData = new Promise(function(resolve, reject) {
      // 获取当前房间预约信息
      wx.request({
        url: 'http://39.107.70.176:9000/appointment/get-room',
        method: 'POST',
        data: {
          Rid: that.data.roomid
        },
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success: function(res) {
          resolve(res.data)
        }
      })
    })
    // 定义取得数据后的回调函数then
    getData.then(function(data) {
      that.setData({
        recvRoomStatus: data
      })
      console.log('获取房间信息', data)
    })

    //生成后面7天的日期
    var nowYear = this.data.today.year
    var nowMonth = this.data.today.month
    var nowDay = this.data.today.day
    var monthArray = [];
    var dayArray = [];
    monthArray.push(nowMonth)
    dayArray.push(nowDay)
    for (var i = 1; i <= 6; i++) {
      if (nowMonth == 12 && nowDay == 31)
        nowYear++;
      if (nowMonth == 1 || nowMonth == 3 || nowMonth == 5 || nowMonth == 7 || nowMonth == 8 || nowMonth == 10 || nowMonth == 12) {
        if (nowDay == 31) {
          nowDay = 1;
          nowMonth++;
          if (nowMonth == 13) nowMonth = 1;
        } else nowDay++;
      } else if (nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11) {
        if (nowDay == 30) {
          nowDay = 1;
          nowMonth++;
        } else nowDay++;
      } else if (nowMonth == 2) {
        if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) { //闰年
          if (nowDay == 29) {
            nowDay = 1;
            nowMonth = 3;
          } else nowDay++;
        } else { //平年
          if (nowDay == 28) {
            nowDay = 1;
            nowMonth = 3;
          } else nowDay++;
        }
      }
      monthArray.push(nowMonth);
      dayArray.push(nowDay);
    }
    var monthStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var dayStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    var rst = []
    for (var i = 0; i < 7; i++)
      rst.push(monthStr[monthArray[i]] + '-' + dayStr[dayArray[i]])
    this.setData({
      tableDate: rst
    })

    //初始化二维数组
    var tempArray = new Array()//0:可以预约；1:不能预约
    for (i = 0; i < 7; i++) {
      tempArray[i] = new Array()
    }
    for (var i = 0; i < 7; i++)
      for (var j = 0; j < 56; j++)
        tempArray[i][j] = 0;
    //处理预约信息
    if(this.data.recvRoomStatus.data.length!=0){
      //挨个检查每一条预约信息的Astatus，根据起始结束时间，不能预约的块改成1
      
    }
    //把tempArray用this.setData赋值给tableUsed 
    //然后前面data里定义了redClass: 'td tdl2',greenClass: 'td tdr2',在wxml里根据tableUsed的值选择用什么颜色渲染(wxml里有样例)

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