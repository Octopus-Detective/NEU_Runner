// pages/col/col.js
const app = getApp()
const datab = wx.cloud.database();
const user = datab.collection('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number1: 0,
    picker1: ['手机数码', '二手书', '运动健身', '服装配饰', '鞋靴', '美妆个护', '文具', '户外用品', '其他'],
    xinxi:[],
    a:[],
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  // ListTouch触摸开始
  ListTouchStart1(e) {
    this.setData({
      ListTouchStart1: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove1(e) {
    this.setData({
      ListTouchDirection1: e.touches[0].pageX - this.data.ListTouchStart1 > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd1(e) {
    if (this.data.ListTouchDirection1 == 'left') {
      this.setData({
        modalName1: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName1: null
      })
    }
    this.setData({
      ListTouchDirection1: null
    })
  },
  //删除实现
  delete1: function (e) {
    wx.showModal({
      title: '您确定要取消收藏吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
    var that=this;
    let aa=[];
    for(let a=0;a<this.data.number1;a++){
      if(e.currentTarget.dataset.iid==that.data.xinxi[a]._id)
      {
        this.setData({ number1: that.data.number1-1,
         aa:that.data.xinxi.splice(a, 1),
        xinxi:that.data.xinxi }); 
        break;
      }
    }
    user.doc(e.currentTarget.dataset.iid).remove({
      success: console.log,
      fail: console.error
    })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loged && (!app.globalData.back)){
    var that = this;
    user.where({
      _openid: app.globalData.openid
    }).get({
      success: function (res) {
        that.setData({
          xinxi: res.data,
          number1: res.data.length
        })
      }
    })
    }
    else{
this.setData({
  number1:0,
  xinxi:[]
})
    }
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