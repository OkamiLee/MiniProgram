// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelimg:"",
    dates: '2018-5-22',
    title:"",
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('modelBack')){
      this.setData({
        modelimg: wx.getStorageSync('modelBack')
      })
    }
    if (wx.getStorageSync('msgDetail')){
      this.setData({
        dates: JSON.parse(wx.getStorageSync('msgDetail')).time,
        title: JSON.parse(wx.getStorageSync('msgDetail')).title,
        text: JSON.parse(wx.getStorageSync('msgDetail')).content,
        modelimg: JSON.parse(wx.getStorageSync('msgDetail')).back
      })
    }
  },
  editorSubmit(e){
    var timeNow = new Date();
    var timeStr = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDay();
    var obj = [];
    if (wx.getStorageSync('searchLog')){
      obj = JSON.parse(wx.getStorageSync('searchLog'));
    }
    obj.push({ 
        title: e.detail.value.title,
        text: e.detail.value.textarea, 
        time: this.data.dates,
        create_time: timeStr,
        check:false,
        backGround: this.data.modelimg
      });
    wx.setStorageSync('searchLog', JSON.stringify(obj));  
    wx.removeStorageSync('msgDetail');  
    wx.navigateBack({ changed: true});//返回上一页  
    
  },
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  back(){
    wx.removeStorageSync('msgDetail'); 
    wx.navigateTo({
      url: '../index/index'
    }) 
  },
  onShareAppMessage: function () {
    return {
      title: '记事本见过吗',
      desc: '第一个让我忘不掉的记事本',
      path: '/pages/index/index'
    }
  }
})