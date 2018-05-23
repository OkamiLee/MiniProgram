//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    list:[],
    index: 0,
    dates: '2018-5-22',
    chexkStatus:false,
    chexkItem:false,
    url:"../images/check_false.png"
  },
  onLoad: function () {
    //wx.removeStorageSync('msgDetail')
   // wx.removeStorageSync('searchLog')
    if (wx.getStorageSync('searchLog')){
      this.setData({
        list: JSON.parse(wx.getStorageSync('searchLog'))
      })
    }
  },
  onShow(){
    if (wx.getStorageSync('searchLog')) {
      this.setData({
        list: JSON.parse(wx.getStorageSync('searchLog'))
      })
    }
  },
  add(){
    wx.navigateTo({
      url: '../model/model'
    })
  },
  editor(){
    this.setData({
      chexkStatus: true
    })
  },
  check(e){
    var newList = this.data.list;
    var num = ~~e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.src ==='../images/check_false.png'){
      newList[num].check = true; 
    }else{
      newList[num].check = false; 
    }
    this.setData({
      list: newList
    })
  },
  delHandel(){
    var obj = this.data.list;
    var arr = [];
    for(var i in obj){
      if (arr.length>1){
        wx.showToast({
          title: '只能选中一条',
          icon: 'error',
          duration: 1000
        })
        break;
      }else{
        if (obj[i].check) {
          arr.push(i)
        }
      }
    }
    obj.splice(arr[0], 1);
    this.setData({
      list: obj
    })
    wx.setStorageSync('searchLog', JSON.stringify(obj)); 
  },
  save(){
    this.setData({
      chexkStatus: false
    })
  },
  listDetail(e){
    var that = this;
    var _index = ~~e.currentTarget.dataset.index;
    var detailBoj = {
      title: that.data.list[_index].title,
      content: that.data.list[_index].text,
      time: that.data.list[_index].time,
      back: that.data.list[_index].backGround
    }
    wx.setStorageSync('msgDetail', JSON.stringify(detailBoj));
    wx.navigateTo({
      url: '../editor/editor'
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
