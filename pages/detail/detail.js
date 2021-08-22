const app = getApp();

function requestPromise(url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success(res) {
                resolve(res);
            },
            fail() {
                wx.showToast({
                    title: '呜呜呜～ 服务器跑丢了！',
                    icon: 'error'
                }, 2000)
            }
        })
    })
}

Page({
    data: {
        currentSign: {},
        detail: {},
        basicInfo: [],
        signLuck: {},
    },
    onLoad(option) {
        let that = this;
        let currentSign = app.globalData.signs.find(sign => sign.name === option.signName);
        this.setData({
            currentSign
        })
        wx.showLoading({
            title: '加载中...',
        })
        const requestSignDetail = requestPromise('http://apis.juhe.cn/fapig/constellation/query', {key: 'f69da25f12d3035890a0ea985070b581', keyword: option.signName});
        const requestSignLuck = requestPromise('http://web.juhe.cn:8080/constellation/getAll', {key: '79aad7e8d87d05a1c535fbe9bfa53427', type: 'today', consName: option.signName});
        Promise.all([requestSignDetail, requestSignLuck]).then((resArray) => {
            const signDetail = resArray[0].data.result;
            const signLuck = resArray[1].data;
            that.basicInfo = [
                {
                    keyName: '特点',
                    value: signDetail.zxtd
                },
                {
                    keyName: '掌管宫位',
                    value: signDetail.zggw
                },
                {
                    keyName: '阴阳性',
                    value: signDetail.yysx
                },
                {
                    keyName: '最大特征',
                    value: signDetail.zdtz
                },
                {
                    keyName: '主管星',
                    value: signDetail.zgxx
                },
                {
                    keyName: '颜色',
                    value: signDetail.xyys
                }
            ]
            that.setData({
                detail: signDetail,
                basicInfo: that.basicInfo,
                signLuck
            })
            wx.hideLoading();
        })
    }
 });
