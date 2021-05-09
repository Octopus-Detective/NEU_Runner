// pages/messs/messs.js
const app = getApp();
const dbase = wx.cloud.database();
const lost = dbase.collection('lost');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: '',
    ban:false,
    cardCur: 0,
    pagedata: [],
    swiperList: [],
    picker: ['一号楼', '生科楼', '建筑楼', '信息楼', '风雨操场', '文管楼', '食堂', '澡堂', '其他地点'],
  },
  fuzhi: function (options) {
    wx.setClipboardData({
      data: this.data.pagedata[0].phone,
      success: function () {
        console.log('success');
      }
    })
  },
  fuzhi2: function (options) {
    wx.setClipboardData({
      data: this.data.pagedata[0].weixin,
      success: function () {
        console.log('success');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loged && (!app.globalData.back)) {
            this.setData({
              ban: true
            })
    }
    else {
      wx.showModal({
        title: '登陆才能查看完整信息哦',
        confirmText: '确定',
        showCancel: false,
      })
    }
    this.data.shuju = options.shuju1;
    var that = this;
    lost.where({
      _id: that.data.shuju
    }).get({
      success: function (res) {
        that.setData({
          pagedata: res.data,
          swiperList: res.data[0].fileIDs1,
        })
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