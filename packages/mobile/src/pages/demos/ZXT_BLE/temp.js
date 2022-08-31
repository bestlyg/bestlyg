var app = getApp();
var deviceId;
var i = 0;
var serviceId = [];
var characteristicId = [];
Page({
  data: {
    // 单条发送
    // msg: 'A5050301AE',
    // 连续发送
    // msg: 'A50B0607e604100b0e28f1',
    msg: 'A50802000003E898',
  },
  onLoad: function () {
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log('adapterState changed, now is', res);
    });
  },
  /**
   * 将字符串转换成ArrayBufer
   */
  string2buffer(str) {
    let val = '';
    if (!str) return;
    let length = str.length;
    let index = 0;
    let array = [];
    while (index < length) {
      array.push(str.substring(index, index + 2));
      index = index + 2;
    }
    val = array.join(',');
    // 将16进制转化为ArrayBuffer
    return new Uint8Array(
      val.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16);
      })
    ).buffer;
  },

  // 打开适配器
  openadapter: function () {
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('已打开蓝牙', res);
      },
      fail: function (res) {
        console.log('蓝牙未打开', res);
      },
    });
  },
  // 关闭适配器
  closeadapter: function () {
    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log(res, 'success');
      },
      fail: function (res) {
        console.log(res, 'fail');
      },
    });
  },
  // 开始搜索
  opendiscovery: function () {
    if (this._discoveryStarted) {
      return;
    }
    this._discoveryStarted = true;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      services: ['FFE0', 'FFE5'],
      success: res => {
        console.log('startBluetoothDevicesDiscovery success', res);
        // wx.showLoading({title: '正在搜索设备',});
        // this.onBluetoothDeviceFound()
        // wx.stopBluetoothDevicesDiscovery()
      },
      fail: function (res) {
        console.log('111', res);
        wx.showToast({
          title: '搜索蓝牙外围设备失败,请重新初始化蓝牙!',
          icon: 'none',
        });
      },
    });
  },
  // 关闭搜索
  closediscovery: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res, 'fail');
      },
    });
  },
  // 获取设备
  getdevice: function () {
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
      });
      return hexArr.join('');
    }
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res);
        i = 0;
        while (res.devices[i]) {
          console.log(i);
          console.log(res.devices[i].name, res.devices[i].deviceId);
          if (res.devices[i].name == 'XL0203E2D51AFD249AAA') {
            deviceId = res.devices[i].deviceId;
            console.log('设备', deviceId);
          }
          i++;
        }
      },
    });
  },
  // 获取已连接设备
  getconnecteddevice: function () {
    wx.getConnectedBluetoothDevices({
      //services:[],
      success: function (res) {
        console.log(res);
      },
    });
  },
  // 连接我的设备
  connecteddevice: function () {
    wx.onBluetoothDeviceFound(function (res) {
      console.log('链接我的设备', res.devices);
      var deviceId = res.devices[0].deviceId;
      wx.setStorageSync('deviceId', res.devices[0].deviceId);
      // 自动连接
      wx.createBLEConnection({
        deviceId,
        success: res => {
          console.log('连接蓝牙', res);
        },
      });
    });
  },
  // 获取服务
  getservice: function () {
    wx.getBLEDeviceServices({
      deviceId: wx.getStorageSync('deviceId'),
      success: function (res) {
        console.log('获取服务', res.services);
        for (var i = 0; i < res.services.length; i++) {
          // 获取特征值
          if (res.services[i].uuid == '0000FFE0-0000-1000-8000-00805F9B34FB') {
            var serviceId1 = res.services[i].uuid;
            wx.setStorageSync('serviceId1', res.services[i].uuid);
            console.log('获取FFE0的serviceId1', serviceId1);
          } else if (res.services[i].uuid == '0000FFE5-0000-1000-8000-00805F9B34FB') {
            var serviceId = res.services[i].uuid;
            wx.setStorageSync('serviceId', res.services[i].uuid);
            console.log('获取FFE5的serviceId', serviceId);
          }
        }
      },
      fail(res) {
        console.log('获取服务失败', res);
      },
    });
  },
  // 获取特征值
  getcharacteristics: function () {
    // 获取FFE0的特征值
    wx.getBLEDeviceCharacteristics({
      deviceId: wx.getStorageSync('deviceId'),
      serviceId: wx.getStorageSync('serviceId1'),
      success: function (res) {
        console.log('获取可读1:', res.characteristics);
        wx.setStorageSync('characteristicId1', res.characteristics[0].uuid);
      },
    });
    // 获取FFE5的特征值
    wx.getBLEDeviceCharacteristics({
      deviceId: wx.getStorageSync('deviceId'),
      serviceId: wx.getStorageSync('serviceId'),
      success: function (res) {
        console.log('获取可读2:', res.characteristics);
        wx.setStorageSync('characteristicId', res.characteristics[0].uuid);
      },
    });
  },

  // 读取值
  startread: function () {
    wx.readBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId[2],
      characteristicId: characteristicId[0],
      success: function (res) {
        console.log('readBLECharacteristicValue:', res.errCode);
      },
    });
  },
  // 开启notify
  startnotify: function () {
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: wx.getStorageSync('deviceId'),
      serviceId: wx.getStorageSync('serviceId1'),
      characteristicId: wx.getStorageSync('characteristicId1'),
      success: function (res) {
        console.log('开启notify success', res.errMsg);
      },
    });

    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
      });
      return hexArr.join('');
    }
    wx.onBLECharacteristicValueChange(function (res) {
      console.log('监听变化', ab2hex(res.value));
    });
  },

  // 写数据
  startwrite: function () {
    var that = this;
    let buffer = that.string2buffer(that.data.msg);
    console.log('写入数据', that.data.msg);

    wx.writeBLECharacteristicValue({
      deviceId: wx.getStorageSync('deviceId'),
      serviceId: wx.getStorageSync('serviceId'),
      characteristicId: wx.getStorageSync('characteristicId'),
      value: buffer,
      success: function (res) {
        console.log('写入数据成功success', res);

        function ab2hex(buffer) {
          var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
            return ('00' + bit.toString(16)).slice(-2);
          });
          return hexArr.join('');
        }
        wx.onBLECharacteristicValueChange(function (res) {
          console.log('characteristic value comed:', ab2hex(res.value));
          var number = ab2hex(res.value);
          if (parseInt(number.substring(6, 8), 16) == 1) {
            // 同步历史记录
            console.log('指令传输成功');
            that.setData({
              msg: 'A5050300AD',
            });
            that.startwrite();
          }

          // 当前电量
          var a = parseInt(number.substring(6, 8), 16);
          console.log('当前电量', a);
          // 当前次数
          var b = parseInt(number.substring(8, 12), 16);
          that.setData({
            number: b,
          });
          console.log('当前次数', b);
          // 预设次数
          var c = parseInt(number.substring(12, 16), 16);
          console.log('预设次数', c);
          // 运行时间
          var d = parseInt(number.substring(16, 20), 16);
          that.setData({
            time: d,
          });
          console.log('运行时间', d);
          // 预设时间
          var e = parseInt(number.substring(20, 24), 16);
          console.log('预设时间', e);
          // 绊绳次数
          var f = parseInt(number.substring(24, 26), 16);
          console.log('绊绳次数', f);
          // 连续个数
          var g = parseInt(number.substring(26, 30), 16);
          console.log('连续个数', g);
          // 当前转态
          var h = parseInt(number.substring(30, 32), 16);
          console.log('当前状态', h);
          // 重量
          var i = parseInt(number.substring(32, 34), 16);
          console.log('重量', i);
          // 卡路里
          var j = parseInt(number.substring(34, 38), 16);
          that.setData({
            calories: j,
          });
          console.log('卡路里', j);
        });
      },
    });
  },
  // 写数据1到计数
  startwrite1() {
    var that = this;
    that.setData({
      msg: 'A5080200320000e1',
    });
    that.startwrite();
  },
  // 写数据1到计时
  startwrite2() {
    var that = this;
    that.setData({
      msg: 'A508020000009948',
    });
    that.startwrite();
  },
  // 写数据1自由跳
  startwrite3() {
    var that = this;
    that.setData({
      msg: 'A5080200000000AF',
    });
    that.startwrite();
  },
  // 写数据1挑战者
  startwrite4() {
    var that = this;
    that.setData({
      msg: 'A508020032006445',
    });
    that.startwrite();
  },
  // 写数据同步时间
  startwrite5() {
    var that = this;
    that.setData({
      msg: 'A50B0607e604100b0e28f1',
    });
    that.startwrite();
  },
  // 写数据历史记录
  startwrite6() {
    var that = this;
    that.setData({
      msg: 'A50507B1',
    });
    that.startwrite();
  },

  // 进入pageone
  startwrite6() {
    var that = this;
    wx.navigateTo({
      url: 'pageone/pageone',
    });
  },
});
