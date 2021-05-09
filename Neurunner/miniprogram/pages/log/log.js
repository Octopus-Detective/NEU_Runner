const app = getApp()
const dd = wx.cloud.database()
var bianliang=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check1:true,
    fileIDs: [],
    fileIDs1:[],
    TabCur: 0,
    openid:'',
    selected: true,
    selected1: false,
    imgList: [], //二手
    length1:0,
    length2:0,
    shiwu:null,
    di:0,
    imgList1: [], //失物
    index: null,
    picker: ['一号楼', '生科楼', '建筑楼', '信息楼', '风雨操场', '文管楼', '食堂', '澡堂', '其他地点'],
    index1: 0,
    picker1: ['手机数码', '书籍资料', '运动健身','服装配饰','鞋靴','美妆个护','文具','户外用品','其他'],
    tablist: [
      {
        id: 0,
        mess: '短期订单'
      },
      {
        id: 1,
        mess: '长期订单'
      },
    ]
  },
  //提交表单
  formSubmit1: function (e) {
    if (app.globalData.loged&&(!app.globalData.back)){

    if (e.detail.value.mingcheng.length == 0) {
      wx.showModal({
        title: '请输入订单名称哦',
        showCancel:false
      })
    }
   else{ if (e.detail.value.jiage.length == 0) {
      wx.showModal({
        title: '请输入订单价格',
        showCancel:false
      })
    }
    else {if (e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '请填写正确的手机号码',
        showCancel:false
      })
    }
   else{ 
     //提交数据
         wx.showLoading({
            title: '发布中',
          })
          const promiseArr = []
          //遍历临时的图片数组
          for (let i = 0; i < this.data.length1; i++) {
            let filePath = this.data.imgList[i]
            let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
            //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才继续往下执行
            promiseArr.push(new Promise((reslove, reject) => {
              wx.cloud.uploadFile({
                cloudPath: new Date().getTime() + suffix,
                filePath: filePath, // 文件路径
              }).then(res => {
                // get resource ID
                console.log(res.fileID)
                this.setData({
                  fileIDs: this.data.fileIDs.concat(res.fileID)
                })
                reslove()
              }).catch(error => {
                console.log(error)
              })
            }))
          }
          Promise.all(promiseArr).then(res => {
            dd.collection('shop').add({
              data: {
                mingcheng: e.detail.value.mingcheng,
                miaoshu: e.detail.value.miaoshu,
                piece: e.detail.value.jiage,
                phone: e.detail.value.phone,
                neew: e.detail.value.new1,
                type: e.detail.value.type1,
                fileIDs: this.data.fileIDs, //只有当所有的图片都上传完毕后，这个值才能被设置
                username:app.globalData.name1,
                touxiangurl:app.globalData.src1,
                weixin:e.detail.value.weixin,
                view:0,
                love:0,
                rule:1,
                height:0
              }
            })
              .then(res => {
                console.log(app.globalData.src1)
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '发布成功',
                })
              })
              .catch(error => {
                console.log(error)
              })
          })
    }
   }
    }
    }
    else{
      wx.showModal({
        title: '请先登录',
        showCancel:false,
      })
    }
  },
  //表单重置1
  formreset1:function(e){
   this.data.imgList.splice(0, this.data.length1);
    this.setData({
      imgList: [],
      length1: 0,
      index1:0
    })
  },
  //表单重置2
  formreset2: function (e) {
    this.data.imgList1.splice(0, this.data.length2);
    this.setData({
      imgList1: [],
      length2: 0,
      di:0,
    })
  },
  //提交表单失物
  formSubmit2: function (e) {
    if (app.globalData.loged&&(!app.globalData.back)) {

      if (e.detail.value.mingcheng2.length == 0) {
        wx.showModal({
          title: '请输入订单名称哦',
          showCancel:false
        })
      }
      else {
        if (e.detail.value.phone2.length != 11) {
          wx.showModal({
            title: '请填写正确的手机号码',
            showCancel:false
          })
        }
        else {
          if(e.detail.value.type2=='0'){
               bianliang=0;
          }
          if(e.detail.value.type2=='1'){
             bianliang=1;
          }
          //提交数据
          wx.showLoading({
            title: '发布中',
          })
          const promiseArr1= []
          //遍历临时的图片数组
          for (let i = 0; i < this.data.length2; i++) {
            let filePath = this.data.imgList1[i]
            let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
            //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才继续往下执行
            promiseArr1.push(new Promise((reslove, reject) => {
              wx.cloud.uploadFile({
                cloudPath: new Date().getTime() + suffix,
                filePath: filePath, // 文件路径
              }).then(res => {
                // get resource ID
                console.log(res.fileID)
                this.setData({
                  fileIDs1: this.data.fileIDs1.concat(res.fileID)
                })
                reslove()
              }).catch(error => {
                console.log(error)
              })
            }))
          }
          Promise.all(promiseArr1).then(res => {
            dd.collection('lost').add({
              data: {
                mingcheng: e.detail.value.mingcheng2,
                miaoshu: e.detail.value.miaoshu2,
                phone: e.detail.value.phone2,
                didian: e.detail.value.location,
                type2: bianliang,
                fileIDs1: this.data.fileIDs1, //只有当所有的图片都上传完毕后，这个值才能被设置
                username:app.globalData.name1,
                touxiangurl:app.globalData.src1,
                weixin:e.detail.value.weixin1,
                view:0,
                love:0,
                rule:1,
                height:0
              }
            })
              .then(res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '发布成功',
                })
                this.formreset2();
              })
              .catch(error => {
                console.log(error)
              })
          })      
        }
      }
    }
    else {
      wx.showModal({
        title: '请先登录',
        showCancel: 'false'
      })
    }
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      di: e.detail.value
    })
  },
  PickerChange1(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  //上传图片
  ChooseImage() {
    var that=this
    wx.chooseImage({
      count: 5-(that.data.length1),
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        if (that.data.length1 != 0) {
          that.setData({
            imgList: that.data.imgList.concat(res.tempFilePaths),
            length1: that.data.imgList.concat(res.tempFilePaths).length
          })
        } else {
          that.setData({
            imgList: res.tempFilePaths,
            length1: res.tempFilePaths.length
          })

        } 
      }
    });
  },
  ChooseImage1() {
    var that = this
    wx.chooseImage({
      count: 5 - (that.data.length2),
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if (that.data.length2 != 0) {
          that.setData({
            imgList1: that.data.imgList1.concat(res.tempFilePaths),
            length2: that.data.imgList1.concat(res.tempFilePaths).length
          })
        } else {
          that.setData({
            imgList1: res.tempFilePaths,
            length2: res.tempFilePaths.length
          })

        }
      }
    });
  },
  //查看图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ViewImage1(e) {
    wx.previewImage({
      urls: this.data.imgList1,
      current: e.currentTarget.dataset.url
    });
  },
  //删除图片
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList,
            length1:this.data.imgList.length
          })
        }
      }
    })
  },
  DelImg1(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList1.splice(e.currentTarget.dataset.shiwu, 1);
          this.setData({
            imgList1: this.data.imgList1,
            length2: this.data.imgList1.length
          })
        }
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