import { arraybufferToHex } from '@/utils';
import Taro from '@tarojs/taro';

export class BLE {
    /** 单条发送 */
    static MSG_ONE = 'A5050301AE';
    /** 连续发送 */
    static MSG_CONTINUE = 'A50B0607e604100b0e28f1';
    /** 设备名 */
    static DEVICE_NAME = 'XL0203E2D51AFD249AAA';
    /** 服务读 */
    static SERVICE_R = '0000FFE0-0000-1000-8000-00805F9B34FB';
    /** 服务写 */
    static SERVICE_W = '0000FFE5-0000-1000-8000-00805F9B34FB';
    /** 同步*/
    static W_SYNC = 'A5050300AD';
    /** 计数 */
    static W_CNT = 'A5080200320000e1';
    /** 计时 */
    static W_TIME = 'A508020000009948';
    /** 自由 */
    static W_FREE = 'A5080200000000AF';
    /** 挑战 */
    static W_CHALLENGE = 'A508020032006445';
    /** 同步时间 */
    static W_SYNC_TIME = 'A50B0607e604100b0e28f1';
    /** 历史记录 */
    static W_SYNC_HISTORY = 'A50507B1';
    /** 是否适配器启动 */
    isStartAdapter = false;
    /** 是否开始发现 */
    isStartDiscovering = false;
    /** 设备ID */
    deviceId: string | null = null;
    /** 服务ID */
    serviceId_r: string | null = null;
    serviceId_w: string | null = null;
    /** 特征值ID */
    characteristicId_r: string | null = null;
    characteristicId_w: string | null = null;
    constructor(public env: number = 0) {}
    log(...args: any[]) {
        if (this.env === 0) {
            console.log(...args);
        }
    }
    onListenStateChange(fn: (res: Taro.onBluetoothAdapterStateChange.CallbackResult) => void) {
        Taro.onBluetoothAdapterStateChange(res => {
            this.log('监听到适配器变化', res);
            fn(res);
        });
    }
    onListenCharacteristicValueChange(fn: (str: string) => void) {
        Taro.onBLECharacteristicValueChange(res => {
            const str = arraybufferToHex(res.value);
            this.log('监听特征值变化', str);
            fn(str);
        });
    }
    onStartAdapter() {
        return new Promise<void>((resolve, reject) => {
            Taro.openBluetoothAdapter().then(
                () => {
                    this.isStartAdapter = true;
                    this.log('蓝牙适配器打开成功');
                    resolve();
                },
                err => {
                    this.log('蓝牙适配器打开失败', err);
                    reject(err);
                },
            );
        });
    }
    onCloseAdapter() {
        return new Promise<void>((resolve, reject) => {
            Taro.closeBluetoothAdapter().then(
                () => {
                    this.isStartAdapter = false;
                    this.log('蓝牙适配器关闭成功');
                    resolve();
                },
                err => {
                    this.log('蓝牙适配器关闭失败', err);
                    reject(err);
                },
            );
        });
    }
    onStartDiscovery() {
        return new Promise<void>((resolve, reject) => {
            if (!this.isStartAdapter) {
                this.log('开启搜索失败，当前适配器没有启动');
                reject(0);
                return;
            }
            if (this.isStartDiscovering) {
                this.log('开启搜索失败，当前已在搜索');
                reject(1);
                return;
            }
            Taro.startBluetoothDevicesDiscovery({
                allowDuplicatesKey: true,
                services: ['FFE0', 'FFE5'],
            }).then(
                () => {
                    this.log('开启搜索成功');
                    this.isStartDiscovering = true;
                    resolve();
                },
                err => {
                    this.log('开启搜索失败');
                    reject(err);
                },
            );
        });
    }
    onCloseDiscovery() {
        return new Promise<void>((resolve, reject) => {
            if (!this.isStartAdapter) {
                this.log('关闭搜索失败，当前适配器没有启动');
                reject(0);
                return;
            }
            if (!this.isStartDiscovering) {
                this.log('关闭搜索失败，当前已关闭');
                reject(1);
                return;
            }
            Taro.stopBluetoothDevicesDiscovery().then(
                () => {
                    this.log('关闭搜索成功');
                    this.isStartDiscovering = false;
                    resolve();
                },
                err => {
                    this.log('关闭录制失败', err);
                    reject(err);
                },
            );
        });
    }
    getDevice() {
        return new Promise((resolve, reject) => {
            Taro.getBluetoothDevices().then(
                res => {
                    this.log('获取设备', res);
                    const n = res.devices.length;
                    const ans: Taro.getBluetoothDevices.SuccessCallbackResultBlueToothDevice[] = [];
                    for (let i = 0; i < n; i++) {
                        const device = res.devices[i];
                        if (device.name !== BLE.DEVICE_NAME) continue;
                        console.log(`设备${i}`, res.devices[i]);
                        ans.push(res.devices[i]);
                    }
                    resolve(ans);
                },
                err => {
                    this.log('获取设备错误', err);
                    reject(err);
                },
            );
        });
    }
    getConnectedDevice() {
        return new Promise((resolve, reject) => {
            Taro.getConnectedBluetoothDevices({ services: [] }).then(
                res => {
                    this.log('获取已连接设备成功', res);
                    resolve(res);
                },
                err => {
                    this.log('获取已连接设备失败', err);
                    reject(err);
                },
            );
        });
    }
    onConnectDevice() {
        return new Promise((resolve, reject) => {
            Taro.onBluetoothDeviceFound(res => {
                const deviceId = res.devices[0].deviceId;
                this.deviceId = deviceId;
                Taro.createBLEConnection({ deviceId }).then(
                    () => {
                        this.log('连接设备成功', deviceId);
                        resolve(deviceId);
                    },
                    err => {
                        this.log('连接设备失败', err);
                        reject(err);
                    },
                );
            });
        });
    }
    getService() {
        return new Promise((resolve, reject) => {
            if (this.deviceId === null) {
                this.log('获取服务失败, 没有链接设备');
                reject(0);
                return;
            }
            Taro.getBLEDeviceServices({ deviceId: this.deviceId }).then(
                res => {
                    this.log('获取服务成功', res.services);
                    for (const service of res.services) {
                        if (service.uuid === BLE.SERVICE_R) {
                            this.log('获取serviceId', service);
                            this.serviceId_r = service.uuid;
                        } else if (service.uuid === BLE.SERVICE_W) {
                            this.log('获取serviceId', service);
                            this.serviceId_w = service.uuid;
                        }
                    }
                    resolve({ r: this.serviceId_r, w: this.serviceId_w });
                },
                err => {
                    this.log('获取服务失败', err);
                    reject(err);
                },
            );
        });
    }
    getCharacteristics() {
        return new Promise((resolve, reject) => {
            if (!this.deviceId) {
                this.log('无法获取特征值，无连接设备');
                reject(0);
            }
        }).then(() =>
            Promise.allSettled([
                new Promise((resolve, reject) => {
                    if (!this.serviceId_r) {
                        this.log('无法可读服务Id');
                        reject(0);
                        return;
                    }
                    Taro.getBLEDeviceCharacteristics({
                        deviceId: this.deviceId!,
                        serviceId: this.serviceId_r,
                    }).then(res => {
                        this.log('获取可读特征值', res.characteristics);
                        this.characteristicId_r = res.characteristics[0].uuid;
                        resolve(this.characteristicId_r);
                    });
                }),
                new Promise((resolve, reject) => {
                    if (!this.serviceId_w) {
                        this.log('无法可写服务Id');
                        reject(0);
                        return;
                    }
                    Taro.getBLEDeviceCharacteristics({
                        deviceId: this.deviceId!,
                        serviceId: this.serviceId_w,
                    }).then(res => {
                        this.log('获取可写特征值', res.characteristics);
                        this.characteristicId_w = res.characteristics[0].uuid;
                        resolve(this.characteristicId_w);
                    });
                }),
            ]),
        );
    }
    onRead() {
        return new Promise((resolve, reject) => {
            if (!this.deviceId || !this.serviceId_r || !this.characteristicId_r) {
                let err: string[] = ['开启通知失败'];
                if (!this.deviceId) err.push('无设备Id');
                if (!this.serviceId_r) err.push('无可读服务');
                if (!this.characteristicId_r) err.push('无可读特征值');
                this.log(err.join(','));
                reject(0);
                return;
            }
            Taro.readBLECharacteristicValue({
                deviceId: this.deviceId,
                serviceId: this.serviceId_r,
                characteristicId: this.characteristicId_r,
            }).then(
                res => {
                    this.log('读取特征值成功', res);
                    resolve(res);
                },
                err => {
                    this.log('读取特征值失败', err);
                },
            );
        });
    }
    onNotify() {
        return new Promise((resolve, reject) => {
            if (!this.deviceId || !this.serviceId_r || !this.characteristicId_r) {
                let err: string[] = ['开启通知失败'];
                if (!this.deviceId) err.push('无设备Id');
                if (!this.serviceId_r) err.push('无可读服务');
                if (!this.characteristicId_r) err.push('无可读特征值');
                this.log(err.join(','));
                reject(0);
                return;
            }
            Taro.notifyBLECharacteristicValueChange({
                state: true,
                deviceId: this.deviceId,
                serviceId: this.serviceId_r,
                characteristicId: this.characteristicId_r,
            }).then(
                res => {
                    this.log('开启通知成功', res);
                    resolve(res);
                },
                err => {
                    this.log('开启通知失败', err);
                    reject(err);
                },
            );
            this.onListenCharacteristicValueChange(str => {
                console.log('通知后监听变化', str);
            });
        });
    }
    stringToBuffer(str: string) {
        const arr: string[] = [];
        for (let i = 0; i < str.length; i += 2) {
            arr.push(str.substring(i, i + 2));
        }
        return new Uint8Array(
            arr
                .join(',')
                .match(/[\da-f]{2}/gi)!
                .map(h => parseInt(h, 16)),
        ).buffer;
    }
    onWrite(msg: string) {
        return new Promise((resolve, reject) => {
            if (!this.deviceId || !this.serviceId_w || !this.characteristicId_w) {
                let err: string[] = ['开启通知失败'];
                if (!this.deviceId) err.push('无设备Id');
                if (!this.serviceId_w) err.push('无可写服务');
                if (!this.characteristicId_w) err.push('无可写特征值');
                this.log(err.join(','));
                reject(0);
                return;
            }
            console.log('写入数据', msg);
            const buffer = this.stringToBuffer(msg);
            Taro.writeBLECharacteristicValue({
                deviceId: this.deviceId,
                serviceId: this.serviceId_w,
                characteristicId: this.characteristicId_w,
                value: buffer,
            }).then(
                res => {
                    this.log('写入数据成功', res);
                    resolve(res);
                    this.onListenCharacteristicValueChange(str => {
                        console.log('写入后监听变化', str);
                        const device = new Device(str);
                        device.print();
                        if (device.sync) {
                            this.onWrite(BLE.W_SYNC);
                        }
                    });
                },
                err => {
                    this.log('写入数据失败', err);
                    reject(err);
                },
            );
        });
    }
}
class Device {
    /** 当前电量 */
    battery: number;
    /** 当前次数 */
    cnt: number;
    /** 预设次数 */
    cntMax: number;
    /** 运行时间 */
    time: number;
    /** 预设时间 */
    timeMax: number;
    /** 绊绳次数 */
    stumbleCnt: number;
    /** 连续个数 */
    continueCnt: number;
    /** 当前转态 */
    state: number;
    /** 重量 */
    weight: number;
    /** 卡路里 */
    calories: number;
    /** 同步标记 */
    sync: boolean;
    constructor(code: string) {
        this.sync = parseInt(code.substring(6, 8), 16) == 1;
        this.battery = parseInt(code.substring(6, 8), 16);
        this.cnt = parseInt(code.substring(8, 12), 16);
        this.cntMax = parseInt(code.substring(12, 16), 16);
        this.time = parseInt(code.substring(16, 20), 16);
        this.timeMax = parseInt(code.substring(20, 24), 16);
        this.stumbleCnt = parseInt(code.substring(24, 26), 16);
        this.continueCnt = parseInt(code.substring(26, 30), 16);
        this.state = parseInt(code.substring(30, 32), 16);
        this.weight = parseInt(code.substring(32, 34), 16);
        this.calories = parseInt(code.substring(34, 38), 16);
    }

    print() {
        const strArr: string[] = ['====【Device Print】===='];
        const list: [string, number | boolean][] = [
            ['同步标记', this.sync],
            ['当前电量', this.battery],
            ['当前次数', this.cnt],
            ['预设次数', this.cntMax],
            ['运行时间', this.time],
            ['预设时间', this.timeMax],
            ['绊绳次数', this.stumbleCnt],
            ['连续个数', this.continueCnt],
            ['当前转态', this.state],
            ['重量', this.weight],
            ['卡路里', this.calories],
        ];
        for (const [name, value] of list) {
            strArr.push(`${name.padEnd(5, ' ')} : ${value}`);
        }
        console.log(strArr.join('\n'));
    }
}
