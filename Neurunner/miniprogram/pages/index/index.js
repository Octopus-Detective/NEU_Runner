// pages/fun/fun.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/images/about.png',
    name: '点击头像登录',
    info: null
  },
  newgetInfo: function (e) {
    let that = this
    let info = wx.getUserProfile({
      desc: '正在获取', //不写不弹提示框
      success: function (res) {
        console.log("获取成功:", res),
        that.setData({
          src: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          info: res.userInfo,
        })
        console.log(that.data.name)
        app.globalData.src1 = that.data.src
        app.globalData.name1 = that.data.name
        app.globalData.back=false;
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
    if (app.globalData.loged != true)
    {
      app.globalData.loged =true
      wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.userInfo.openId)
        app.globalData.openid = res.result.userInfo.openId
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    }
  },
  exit:function(){
    wx.showModal({
      title: '您真的要离开吗',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor:'#e54d42',
      success: res => {
        if (res.confirm) {
  app.globalData.back=true;
  this.setData({
    src: '/images/about.png',
    name: '点击头像登录'
  })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserProfile 获取头像昵称，不会弹框
    //       if(app.globalData.loged&&(!app.globalData.back)){
    //           this.setData({
    //             src: app.globalData.src1,
    //             name: app.globalData.name1,
    //             info: null
    //           })
    //       }
    //     }
    //   }
    // })
    
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