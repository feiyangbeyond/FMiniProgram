// pages/parse/parse.js
// import {util} from "../../utils/util.js"
const DownloadSaveFile = require('../../utils/util.js');
import {downLoadVideo} from "../../utils/download.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    tishi:"点击“清空文字”解析其它链接\n保存失败则“复制链接”到浏览器手动下载",
    result: null,
    inputValue:'',
    showAddMeBtn: !0,
    canIUseClipboard: wx.canIUse('setClipboardData')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  stopTouchMove: function() {
    return false;
  },
  zcwm: function() {
    wx.previewImage({
      current: "https://hfh7.com/wp-content/uploads/2020/09/202009011551592.jpg",
      urls: [ "https://hfh7.com/wp-content/uploads/2020/09/202009011551592.jpg" ]
  });
},
  jumpjc: function() {
      wx.navigateToMiniProgram({
          appId: 'wx0e009444935db83d',
          envVersion: 'release',
        })
},
  onLoad: function (options) {
    // this.parse('https://v.douyin.com/Jr3YU9y/');
  },
  jumpxcx: function () {
     
  },

  getInputValue:function(e){
    const value = e.detail.value;
    this.setData({
      url:value
    })
  },
  verifyAndRequest:function(){
    var url = this.data.url;
    // console.log(url);
    var pattern = new RegExp("(https{0,1}://.*?douyin\.com\/[a-zA-Z0-9]+)");
    var patternKuaishou = new RegExp(/(https*:\/\/v\.kuaishou\.com\/[a-zA-Z0-9]{6})/);
    if (pattern.test(url)){
      //console.log(RegExp.$1);
      this.parse(RegExp.$1)
    }else if(patternKuaishou.test(url)){
      //console.log(RegExp.$1);
      this.parseKuaishou(RegExp.$1);
    }else{
      console.log("输入正确的url")
      wx.showToast({
        title: '输入url错误',
      })
    }
  },
  parse: function(url) {
    var that = this;
    wx.cloud.callFunction({
      name: "parseVideo",
      data: {
        "url": url
      },
      success(res) {
        console.log("云函数获取数据成功", res.result)
        that.setData({
          result: res.result
        })
      },
      fail(err) {
        console.log("云函数获取数据失败", err)
      }
    })
  },
  parseKuaishou: function(url){
    var that = this;
    wx.cloud.callFunction({
      name: "parseKuaiShou",
      data: {
        "url": url
      },
      success(res) {
        console.log("云函数获取数据成功", res.result)
        that.setData({
          result: res.result
        })
      },
      fail(err) {
        console.log("云函数获取数据失败", err)
      }
    })
  },
  copyText: function() {
    console.log(this.data.result.playAddress)
    wx.setClipboardData({
    data: this.data.result.playAddress,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      },
      fail: function(){
        console.log("复制失败")
      }
    })
  },
  saveVideo: function(){
    wx.showLoading({
      title: '加载中',
    })
    var saveurl;
    wx.cloud.callFunction({
      name: "parseVideo",
      data: {
        
        "url": this.data.result.playAddress,
        "save":"yes"
      },
      success(res) {
          wx.hideLoading();
          saveurl = res.result;    
          var tempUrl = saveurl;
          if (tempUrl.search("https") == -1){
            tempUrl = tempUrl.replace('http',"https");
          }
          console.log(tempUrl);
          downLoadVideo(tempUrl);    
      },
      fail(err) {
        console.log("云函数获取数据失败", err)
      }
    })


    // DownloadSaveFile.downloadFile("video",tempUrl)
  },
  clearText: function(){
    this.setData({
      result:null,
      inputValue:"",
      url:""
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
  onShareAppMessage: function() {
    return {
        title: "免费无水印，抖音快手一键去水印",
        path: "/pages/parse/parse",
        imageUrl: "/pics/share.jpg",
        success: function(e) {
            wx.showToast({
                title: "分享成功",
                icon: "success",
                duration: 2e3
            });
        },
        fail: function(e) {
            wx.showToast({
                title: "分享失败",
                icon: "none",
                duration: 2e3
            });
        }
    };
},
})