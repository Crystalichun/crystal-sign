const app = getApp();

Page({
    data: {
        name: '李智粉',
        now: app.globalData.now
    },
    handlerButton(event) {
        const that = this;
        wx.showModal({
            title:'操作确认',
            content: '你确认要修改姓名吗？',
            success(res) {
                if(res.confirm) {
                    if(that.name === '乔治'){
                        that.name = '李智粉'
                    } else {
                        that.name = '乔治'
                    }
                    that.setData({
                        name: that.name
                    },function (){
                        wx.showToast({
                            title:'操作完成',
                            duration: 700
                        })
                    })
                } else if (res.cancel) {
                    console.log('操作取消')
                }
            }
        })
    }
});
