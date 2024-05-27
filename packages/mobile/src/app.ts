import Taro from "@tarojs/taro";
import { Component, PropsWithChildren } from "react";
import "./app.scss";

class App extends Component<PropsWithChildren> {
  componentDidMount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError(err) {
    Taro.showToast({
      title: `程序出错，请联系管理员。`,
      icon: "none",
    });
    console.error(err);
  }
  onLaunch() {
    console.log("小程序加载成功");
  }
  checkUpdate() {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log("onCheckForUpdate", res);
    });
    updateManager.onUpdateReady((res) => {
      console.log("onUpdateReady", res);
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
      }).then((res) => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      });
    });
    updateManager.onUpdateFailed((res) => {
      console.log("onUpdateFailed", res);
      // 新的版本下载失败
      Taro.showToast({
        title: "更新失败",
        icon: "error",
      });
    });
  }
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
