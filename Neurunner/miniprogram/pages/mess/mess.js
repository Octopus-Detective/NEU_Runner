// pages/item/item.js
const app=getApp();
const dbase = wx.cloud.database();
const shop = dbase.collection('shop');
const user = dbase.collection('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:'',
    cardCur: 0,
    swiperList: [],
    pagedata:[],
    used:false,
    useid:'',
    ban:false,
    isAdd:false
  },
  //添加收藏
  addFavorites: function (options) {
    if (app.globalData.loged && (!app.globalData.back)){
    this.setData({ isAdd: true });
    }
    else{
      wx.showModal({
        title: '登陆才能收藏哦',
        confirmText: '确定',
        showCancel: false,
      })
    }
  },
  cancelFavorites: function () {
    this.setData({ isAdd: false });
  },
  //剪贴板
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
    this.data.shuju=options.shuju1;
    var that=this;
    if (app.globalData.loged && (!app.globalData.back))
    {
      this.setData({
        ban:true
      })
      user.where({
        _openid: app.globalData.openid,
        collection: options.shuju1
      }).get({
        success: function (res) {
          if (res.data.length != 0) {
            that.setData({
              isAdd: true,
              used: true,
              useid: res.data[0]._id,
            })
          }
        }
      })
    }
    else{
      wx.showModal({
        title: '登陆才能查看完整信息哦',
        confirmText: '确定',
        showCancel:false,
      })
    }
      shop.where({
      _id:that.data.shuju
    }).get({
      success:function(res){
        that.setData({
          pagedata:res.data,
          swiperList:res.data[0].fileIDs,
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
    if (this.data.isAdd&&(!this.data.used)) {
      user.add({
        data: {
          collection: this.data.pagedata[0]._id,
          mingcheng:this.data.pagedata[0].mingcheng,
          phone: this.data.pagedata[0].phone,
          piece: this.data.pagedata[0].piece,
          weixin: this.data.pagedata[0].weixin,
          type: this.data.pagedata[0].type,
          neew: this.data.pagedata[0].neew[0],
          fileIDs: this.data.pagedata[0].fileIDs[0],
        }
      }) 
      shop.doc(this.data.pagedata[0]._id).update({
       data:{
          love:this.data.pagedata[0].love+1
       },
       success: console.log,
        fail: console.error
      })
    }
    else{
       if((!this.data.isAdd)&&this.data.used){
         user.doc(this.data.useid).remove({
           success: console.log,
           fail: console.error
         })
         shop.doc(this.data.pagedata[0]._id).update({
           data: {
             love: this.data.pagedata[0].love-1
           },
           success: console.log,
           fail: console.error
         })
       }
    }
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