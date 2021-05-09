// pages/fun/fun.js
const app = getApp();
const dbase = wx.cloud.database();
const shop=dbase.collection('shop');
const lost=dbase.collection('lost');
var sectionData = [];
var sectionData2 = [];
var num=0;
var num2=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,  //tab
    scrollLeft: 0,
    tablist: [
      {
        id:0,
        mess:'短期订单'
      },
      {
        id:1,
        mess:'长期订单'
      },
    ],
      //广告轮播
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      imageUrl: 'cloud://neu-runner-5gb3vtdy4e6e0235.6e65-neu-runner-5gb3vtdy4e6e0235-1305779941/轮播/1.png'
    }, {
      id: 1,
      type: 'image',
        imageUrl: 'cloud://neu-runner-5gb3vtdy4e6e0235.6e65-neu-runner-5gb3vtdy4e6e0235-1305779941/轮播/2.png'
    }, {
      id: 2,
      type: 'image',
        imageUrl: 'cloud://neu-runner-5gb3vtdy4e6e0235.6e65-neu-runner-5gb3vtdy4e6e0235-1305779941/轮播/3.png'
    }, {
      id: 3,
      type: 'image',
        imageUrl: 'cloud://neu-runner-5gb3vtdy4e6e0235.6e65-neu-runner-5gb3vtdy4e6e0235-1305779941/轮播/4.png'
    },{
        id: 4,
        type: 'image',
        imageUrl: 'cloud://neu-runner-5gb3vtdy4e6e0235.6e65-neu-runner-5gb3vtdy4e6e0235-1305779941/轮播/5.png'
    }],
    //流式布局
    scrollH:0,
    imgWidth:0,
    loadingCount:0,
    loadingCount2:0,
     image :[],
     image2:[],
    col1:[],
    col2:[],
    col11:[],
    col22:[],
    hidden:false,
    hidden2:false
  },
  //tab
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // cardSwiper
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ TabCur: e.detail.current });
  }, 
  //点击图片跳转

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，直接调用 getUserInfo 获取头像昵称
    //       app.globalData.loged = true
    //       wx.getUserInfo({
    //         success: res => {
    //           if(app.globalData.loged&&(!app.globalData.back)){
    //           app.globalData.src1 = res.userInfo.avatarUrl
    //           app.globalData.name1 = res.userInfo.nickName
    //           }
    //         }
    //       })
    //       wx.cloud.callFunction({
    //         name: 'login',
    //         data: {},
    //         success: res => {
    //           console.log('[云函数] [login] user openid: ', res.result.openid)
    //           app.globalData.openid = res.result.openid
    //         },
    //         fail: err => {
    //           console.error('[云函数] [login] 调用失败', err)
    //         }
    //       })
    //     }
    //   }
    // })

    // wx.getSystemInfo({
    //   success: (res) => {
    //     let ww = res.windowWidth;
    //     let wh = res.windowHeight;
    //     let imgWidth = ww * 0.48;
    //     let scrollH = wh;
    //     this.setData({
    //       scrollH: scrollH,
    //       imgWidth: imgWidth
    //     });
    //     //加载首组图片
    //     this.brandShow();
    //     this.brandShow2();
    //   }
    // })

  },
  //短期流式
  onImageLoad1: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        /*比例计算*/
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.image;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj);
    } else {
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },
  //下滑加载图片
  brandShow: function () {
    var that = this;
      shop.where({
        rule:1
        }).limit(10).skip(num).get({
      success: function(res) {
        if (res.data.length==0) { //加载更多
          that.setData({
            hidden: true
          })
          wx.showToast({
            title: '没有更多了！',
            icon: 'loading',
            duration: 1500
          })
          }
        else{
          var newGoodsData = res.data
          num = num + res.data.length
          let baseId = "img-" + (+new Date());
          for (let i = 0; i < newGoodsData.length; i++) {
            newGoodsData[i].id = baseId + "-" + i;
          }
          sectionData = newGoodsData;
          that.setData({
            image: that.data.image.concat(sectionData),
            loadingCount: sectionData.length,
          });  
        }
        wx.stopPullDownRefresh();//结束动画
      }
      })
  },
  //失物流式
  onImageLoad2: function (e) {
    let imageId2 = e.currentTarget.id;
    let oImgW2 = e.detail.width;         //图片原始宽度
    let oImgH2 = e.detail.height;        //图片原始高度
    let imgWidth2 = this.data.imgWidth;  //图片设置的宽度
    let scale2 = imgWidth2 / oImgW2;        /*比例计算*/
    let imgHeight2 = oImgH2 * scale2;      //自适应高度

    let images2 = this.data.image2;
    let imageObj2 = null;

    for (let i = 0; i < images2.length; i++) {
      let img2 = images2[i];
      if (img2.id === imageId2) {
        imageObj2 = img2;
        break;
      }
    }

    imageObj2.height = imgHeight2;

    let loadingCount2 = this.data.loadingCount2 - 1;
    let col11 = this.data.col11;
    let col22 = this.data.col22;

    //判断当前图片添加到左列还是右列
    if (col11.length <= col22.length) {
      col11.push(imageObj2);
    } else {
      col22.push(imageObj2);
    }

    let data2 = {
      loadingCount2: loadingCount2,
      col11: col11,
      col22: col22
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount2) {
      data2.images2 = [];
    }

    this.setData(data2);
  },  
  brandShow2: function () {
    var that = this;
    lost.where({
      rule: 1
    }).limit(10).skip(num2).get({
      success: function (res) {
        if (res.data.length == 0) { //加载更多
          that.setData({
            hidden2: true
          })
          wx.showToast({
            title: '没有更多了！',
            icon: 'loading',
            duration: 1500
          })
        }
        else {
          var newGoodsData2 = res.data
          num2 = num2 + res.data.length
          let baseId2 = "img-" + (+new Date());
          for (let i = 0; i < newGoodsData2.length; i++) {
            newGoodsData2[i].id = baseId2 + "-" + i;
          }
          sectionData2 = newGoodsData2;
          that.setData({
            image2: that.data.image2.concat(sectionData2),
            loadingCount2: sectionData2.length,
          });
        }
        wx.stopPullDownRefresh();//结束动画
      }
    })
  },  
  //跳转
  catchTapCategory: function (e) {
    var that = this;
    let lview=0;
    let iiid = e.currentTarget.dataset.iid;
    shop.where({
    _id:iiid
    }).get({
      success:function(res){
       lview=res.data[0].view+1
        shop.doc(iiid).update({
          data: {
            view: lview
          },
          success: console.log,
          fail: console.error
        })
      }
    })
  },
  catchTapCategory2: function (e) {
    var that = this;
    let lview = 0;
    let iiid = e.currentTarget.dataset.iid;
    lost.where({
      _id: iiid
    }).get({
      success: function (res) {
        lview = res.data[0].view + 1
        lost.doc(iiid).update({
          data: {
            view: lview
          },
          success: console.log,
          fail: console.error
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
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        //加载首组图片
        this.brandShow();
        this.brandShow2();
      }
    })
 
    
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