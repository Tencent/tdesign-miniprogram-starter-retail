import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
});
