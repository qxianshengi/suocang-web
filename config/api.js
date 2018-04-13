export default {
    common:{
        area:'/uc/support/country'
    },
    uc: { //会员中心接口
        login: '/uc/login',
        register: '/uc/register',
        wallet: '/uc/asset/wallet/',
        captcha:'/uc/start/captcha'
    },
     announcement:{//公告接口
        announdetal:'/uc/announcement/id?='
     }
     ,
    market: { //币币交易行情接口
        ws: '/market/market-ws',
        thumb: '/market/symbol-thumb',
        thumbTrend:'/market/symbol-thumb-trend',
        plate: '/market/exchange-plate', //主动查询的盘口信息
        trade: '/market/latest-trade', //主动查询的实时成交信息
        symbolInfo:'/market/symbol-info'
    },
    exchange: { //币币交易委托提交与查询接口
        orderAdd: '/exchange/order/add', //提交订单接口
        current: '/exchange/order/current', //当前委托接口
        history: '/exchange/order/history', //历史委托接口
        detail: '/exchange/order/detail/', //详细订单接口
        favorFind: '/exchange/favor/find', //查询自选
        favorAdd: '/exchange/favor/add', //添加自选
        favorDelete: '/exchange/favor/delete', //删除自选
        orderCancel: '/exchange/order/cancel' //取消委托
    },
    otc: {
        advertiseExcellent:'/otc/advertise/excellent',//优质广告
        coin:'/otc/coin/all',//查询支持的币种
        advertise:'/otc/advertise/page-by-unit',//获取广告
        createAd:'/otc/advertise/create',//创建广告
        adDetail:'/otc/advertise/detail'
    }
}