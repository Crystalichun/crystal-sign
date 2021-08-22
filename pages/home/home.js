const app = getApp();

Page({
    data: {
        username: '小仙女',
        signs: app.globalData.signs
    },
    handleClick(event) {
        const signName = event.currentTarget?.dataset?.name;
        wx.navigateTo({
            url: '../detail/detail?signName=' +  signName
        })
    },
    onLoad() {
        const that = this;
        wx.getSetting({
            success (res) {
                if(res.authSetting["scope.userInfo"]){
                    wx.getUserInfo({
                        success: function(res) {
                            let userInfo = res.userInfo;
                            let nickName = userInfo.nickName;
                            that.setData({
                                username: nickName
                            });
                        }
                    })
                }
            }
        })
    }
});
