const getPermission = ({ code, name }) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting[code] === false) {
          wx.showModal({
            title: `获取${name}失败`,
            content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
            confirmText: '去设置',
            confirmColor: '#FA550F',
            cancelColor: '取消',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settinRes) {
                    if (settinRes.authSetting[code] === true) {
                      resolve();
                    } else {
                      console.warn('用户未打开权限', name, code);
                      reject();
                    }
                  },
                });
              } else {
                reject();
              }
            },
            fail() {
              reject();
            },
          });
        } else {
          // getSetting 仅返回已申请过的权限，所以档权限为true或者undefined的时候都是直接放行
          // 权限为undefined意味着未申请过权限，小程序会自动弹框提示授权
          resolve();
        }
      },
      fail() {
        reject();
      },
    });
  });
};

module.exports = {
  getPermission,
};
