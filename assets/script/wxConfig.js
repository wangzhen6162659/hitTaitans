// // var url = "http://wzroom.cn/api/admin/public/getWxConfig?url=wzroom.cn";
// // var xhr = new XMLHttpRequest();
// // xhr.onreadystatechange = function () {
// //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
// //         var data = JSON.parse(xhr.response);

// //     }
// // };
// // xhr.open("GET", url, true);
// // xhr.send();
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad() {
        var wx = window.wx;
        var data = {
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: ''
        }
        console.log("test wx api:", wx)
        wx.config({
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
                'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'uploadImage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        // wx.ready(function () {
        //     var shareContent = {
        //         title: '', // 分享标题
        //         link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //         imgUrl: '', // 分享图标
        //         desc: '', // 分享描述
        //         success: function () { },
        //         cancel: function () { }
        //     }

        //     function _shareCfuc() {
        //         wx.onMenuShareTimeline(shareContent);
        //         wx.onMenuShareAppMessage(shareContent);
        //     }
        //     _shareCfuc();
        // });

    }
})