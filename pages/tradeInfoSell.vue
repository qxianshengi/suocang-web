<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                        <div class="leftmenu left-box">
                            <div class="user-info">
                                <div class="avatar-box">
                                    <div class="user-face user-avatar-public">
                                        <span class="user-avatar-in">{{usernameS}}</span>
                                        <!-- <span class="online-status-box user-states ">
                                                <span class="circles"></span>
                                            </span> -->
                                    </div>
                                    <div class="user-name">
                                    </div>
                                </div>
                                <span class="ml10"  style="width: 105px;">{{user.username}}</span>
                            </div>
                            <div class="deal-market-info">
                                <p v-if="user.emailVerified==1">
                                    <i class="iconfont icon-youxiang111"></i>
                                    <span class="unmarket">邮件已认证</span>
                                </p>
                                <p v-else>
                                    <i class="iconfont icon-youxiang"></i>
                                    <span class="unmarket">邮件未认证</span>
                                </p>
                                <p v-if="user.phoneVerified==1">
                                    <i class="iconfont icon-dianhua111"></i>
                                    <span class="">手机号码已认证</span>
                                </p>
                                <p v-else>
                                    <i class="iconfont icon-dianhua"></i>
                                    <span class="">手机号码未认证</span>
                                </p>
                                <p v-if="user.idCardVerified==1">
                                    <i class="iconfont icon-renzheng111"></i>
                                    <span class="">身份证已认证</span>
                                </p>
                                <p v-else>
                                    <i class="iconfont icon-renzheng"></i>
                                    <span class="unmarket">身份证未认证</span>
                                </p>
                            </div>
                            <div class="deal-user-trade-info">
                                <p>交易次数：
                                    <em class="trade-times">{{user.transactions}}</em>
                                </p>  
                            </div>
                        </div>
                    </Col>
                    <Col span="20">
                        <div class="right-safe">
                            <div class="trade-right-box">
                                <div class="trade-price">
                                    <p>
                                        <label>价格</label>
                                        <span>{{user.price}} CNY / {{user.unit}}</span>
                                    </p>
                                    <p>
                                        <label>数量</label>
                                        <span>{{user.number}}&nbsp;{{user.unit}}</span>
                                    </p>
                                    <p>
                                        <label>付款方式</label>
                                        <span>{{user.payMode}}</span>
                                    </p>
                                    <p>
                                        <label>交易限额</label>
                                        <span>{{user.minLimit}} - {{user.maxLimit}} CNY</span>
                                    </p>
                                    <p>
                                        <label>所在地</label>
                                        <span>中国</span>
                                    </p>
                                    <p>
                                        <label>交易期限</label>
                                        <span>{{user.timeLimit}}分钟</span>
                                    </p>
                                </div>
                                <div class="trade-operation">
                                    <div class="trade-price-input">
                                        <p class="price-input-list">
                                            <Poptip trigger="focus" :content="text1" style="width: 100%;">
                                                <Input @on-change="transform1" v-model="buyPrice" size="large" placeholder="请输入金额" style="width: 450px">
                                                <span slot="prepend">CNY</span>
                                                </Input>
                                            </Poptip>

                                        </p>
                                        <span class="exchange1">
                                            <Icon type="arrow-swap"></Icon>
                                        </span>
                                        <p class="price-input-list">
                                            <Poptip trigger="focus" :content="text2" style="width: 100%;">
                                                <Input @on-change="transform2" v-model="nuyNum" size="large" placeholder="请输入数量" style="width: 450px" readonly>
                                                <span slot="prepend">{{user.unit}}</span>
                                                </Input>
                                            </Poptip>
                                        </p>
                                    </div>
                                    <textarea v-model="remark" type="text" placeholder="告诉他您的要求~" class="text-inputs"></textarea>
                                    <div class="price-box">
                                        <p class="show-price">
                                            <em>{{type}}:</em>
                                            <span>&nbsp;&nbsp;{{buyPrice}} CNY / {{nuyNum}} {{user.unit}}</span>
                                        </p>
                                        <button class="btn-trade-in" @click="submit" :disabled="btnDisabled">{{btnType}}</button>
                                    </div>
                                </div>
                                <div class="trade-remark">
                                    <h5 class="titles">
                                        <span>地平线的备注信息</span>
                                    </h5>
                                    <p class="content">
                                        {{user.remark}}
                                    </p>
                                    <h5 class="titles">
                                        <span>交易须知</span>
                                    </h5>
                                    <div class="content">
                                        <p>在您发起交易请求后，数字货币被锁定在托管中，受到平台保护。 如果您是卖家，发起交易请求后，您可通过充值并等待买家付款。买家在付款时限内进行付款。您在收到付款后应放行处于托管中的数字货币。</p>
                                        <p>交易前请阅读《平台网络服务条款》以及常见问题、交易指南等帮助文档。</p>
                                        <p>当心骗子！交易前请检查该用户收到的评价，并对新近创建的账户多加留意。</p>
                                        <p>请注意，四舍五入和价格的波动可能会影响最终成交的数字货币数额。您输入的固定数额决定最后数额，数字货币金额将在请求发布的同一时间由即时的汇率算出。</p>
                                        <p>托管服务保护网上交易的买卖双方。在发生争议的情况下，我们将评估所提供的所有信息，并将托管的数字货币放行给其合法所有者。</p>
                                    </div>
                                </div>
                                <div class="modal">
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            usernameS: '',
            text1: '',
            text2: '',
            btnDisabled: false,
            submitBtn: false,
            btnType: '',
            type: '',
            remark: '',
            user: {},
            // price: '',
            buyPrice: '',
            nuyNum: 0,
            minLimit: 100,
            maxLimit: 1000,
            // number:0.6,
            advertiseType: 1,
        }
    },
    methods: {
        update() {
            // this.price = '100';
            // this.user.advertiseType=1
        },
        transform1() {
            if (!Number.isNaN(Number(this.buyPrice))) {
                this.nuyNum = this.round(this.div(this.buyPrice, this.priceNow), 8)
                if (/^\d+(\.\d{1,2})?$/.test(this.buyPrice)) {
                    this.submitBtn = true
                } else {
                    this.submitBtn = false
                    this.text1 = '最多输入2位小数'
                }
            } else {
                this.text1 = '下单金额为' + this.user.minLimit + '~' + this.user.maxLimit
                this.submitBtn = false
                return false
            }
        },
        transform2() {
            if (!Number.isNaN(Number(this.nuyNum))) {
                console.log(1)
                this.buyPrice = this.round(this.mul(this.nuyNum, this.priceNow), 2)
                if (this.nuyNum < this.user.number) {
                    console.log(2)
                    if (/^\d+(\.\d{1,8})?$/.test(this.nuyNum)) {
                        console.log(this.nuyNum + '--3')
                        this.submitBtn = true
                    } else {
                        console.log(this.nuyNum + '---4')
                        this.submitBtn = false
                        this.text2 = '最多输入8位小数'
                    }
                } else {
                    console.log(5)
                    this.submitBtn = false
                    return false
                }

            } else {
                console.log(6)
                this.text2 = '下单数量为' + this.minNum + '~' + this.user.number
                this.submitBtn = false
                return false
            }
        },
        getIdAdv() {
            //获取id广告信息
            this.$http.post(this.host + '/otc/order/pre', { 'id': this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.user = resp.data
                    this.text1 = '下单金额为' + this.user.minLimit + '~' + this.user.maxLimit
                    this.text2 = '下单数量为' + this.minNum + '~' + this.user.number
                    // console.log(this.user)
                    // if (this.user.advertiseType == 1) {
                        // this.btnType = '确认买入'
                        // this.type = '买入'
                    // } else if (this.user.advertiseType == 0) {
                        this.btnType = '确认卖出'
                        this.type = '卖出'
                    // }
                    this.usernameS = (this.user.username + '').replace(/^\s+|\s+$/g, "").slice(0, 1)
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        submit() {
            if (this.submitBtn) {
                this.btnDisabled = true
                
                    let param = {}
                    param['id'] = this.$route.query.tradeId
                    param['coinId'] = this.user.otcCoinId
                    param['price'] = this.user.price
                    param['money'] = this.buyPrice
                    param['amount'] = this.nuyNum
                    param['remark'] = this.remark
                    this.$http.post(this.host + '/otc/order/sell', param).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            let self = this
                            setTimeout(() => {
                                self.$router.push('/chat?tradeId=' + resp.data);
                            }, 2000)
                        } else if (resp.code == 4000 || resp.code == 3000) {
                            this.$Message.error('请先登录');
                            this.$router.push('/login');
                        } else {
                            this.$Message.error(resp.message);
                        }
                    })
                    // this.btnDisabled = false
                
            } else {
                this.$Message.error('请按要求填写订单');
            }

        },
        mul(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) { }
            try {
                c += e.split(".")[1].length;
            } catch (f) { }
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        div(a, b) {
            var c, d, e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) { }
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) { }
            return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
    },
    created() {
        // console.log(this.$route.query)
        // console.log(this.div(121.03, 121.03) + '--00--')
        // this.update()
        this.getIdAdv();
        this.$store.commit('navigate','2');


    },
    computed: {
        priceNow: function() {
            return (this.user.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0;
        },
        minNum: function() {
            return 0
        },
        maxNum: function() {
            return this.maxLimit / this.priceNow
        }
    }
}
</script>

<style scoped>
/* right */
.trade-right-box .trade-operation .trade-price-input .exchange1 {
    width: 10%;
    text-align: center;
    font-size: 24px;
}

.trade-right-box {
    margin-left: 20px;
    text-align: left;
}

.trade-right-box .trade-price {
    padding: 36px;
    background-color: white;
    border: 1px solid #ebeff5;
    margin-bottom: 20px;
}

.trade-right-box .trade-price p {
    color: #0d214e;
    font-size: 14px;
    line-height: 2.8;
}

.trade-right-box .trade-price p label {
    min-width: 80px;
    display: inline-block;
}

.trade-right-box .trade-price p span {
    margin-left: 15%;
    display: inline-block;
}

.trade-right-box .trade-operation {
    padding: 20px;
    background-color: white;
    border: 1px solid #ebeff5;
    margin-bottom: 20px;
}

.trade-right-box .trade-operation .trade-price-input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
}



/* .trade-right-box .trade-operation .trade-price-input .price-input-list {
    border: 1px solid #c5cdd7;
    width: 45%;
} */

/* .trade-right-box .trade-operation .trade-price-input .price-input-list .coin-name {
    background-color: #ebeff5;
    display: inline-block;
    padding: 10px 22px;
    font-size: 18px;
    color: #0d214e;
    border-right: 1px solid #c5cdd7;
}

.trade-right-box .trade-operation .trade-price-input .price-input-list input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 10px;
    display: inline-block;
    width: 300px;
} */

.boxinput .ivu-input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 10px;
    display: inline-block;
    width: 300px;
}

.trade-right-box .trade-operation .trade-price-input .exchange {
    width: 10%;
    text-align: center;
    font-size: 24px;
}


.trade-right-box .trade-operation .text-inputs {
    background-color: white;
    border: 1px solid #c5cdd7;
    outline: none;
    display: block;
    height: 100px;
    width: 100%;
    resize: none;
    padding: 20px;
    margin-bottom: 20px;
}

.trade-right-box .trade-operation .price-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.trade-right-box .trade-operation .price-box .show-price {
    border: 1px solid #c5cdd7;
    width: 80%;
    height: 58px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 10px;
}

.trade-right-box .trade-operation .price-box .show-price em {
    font-style: normal;
    font-size: 14px;
    color: #0d214e;
}

.trade-right-box .trade-operation .price-box .show-price span {
    font-size: 18px;
    color: #ee6543;
    font-weight: bolder;
}

.trade-right-box .trade-operation .price-box .btn-trade-in {
    outline: medium;
    border: 0;
    color: white;
    padding: 20px 26px;
    background-color: #25a842;
    cursor: pointer;
    width: 20%;
    text-align: center;
}

.trade-right-box .trade-remark {
    background-color: white;
    border: 1px solid #ebeff5;
    padding: 30px 36px;
    margin-bottom: 30px;
}

.trade-right-box .trade-remark .titles {
    margin-bottom: 15px;
}

.trade-right-box .trade-remark .titles span {
    font-size: 16px;
    color: #0d214e;
    padding-right: 30px;
}

.trade-right-box .trade-remark .content {
    margin-bottom: 30px;
    font-size: 14px;
    color: #8994a3;
    line-height: 1.8;
}











/* -- */

.icon1 {
    background: url('../assets/img/btc.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon2 {
    background: url('../assets/img/usdt.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.content-wrap {
    background: #eee;
    min-height: 750px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}











/* left */

.leftmenu {
    margin-bottom: 60px;
    background: #fff;
    position: relative;
    min-height: 1px;
    padding: 50px 15px 50px 25px;
}

.left-box .user-info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ebeff5;
}

.avatar-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.user-avatar-public {
    background: #fff;
    height: 65px;
    width: 65px;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, .24);
    position: relative;
}

.user-avatar-public>.user-avatar-in,
.user-avatar-public {
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.user-avatar-public>.user-avatar-in {
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #00b5f6;
    height: 60px;
    width: 60px;
    color: #fff;
}

.left-box span.ml10 {
    color: #0d214e;
    margin-left: 10px;
}

.left-box .deal-market-info {
    padding: 20px 0;
    border-bottom: 1px dashed #ebeff5;
}

.left-box .deal-market-info p {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    color: #0d214e;
}

.iconfont {
    font-family: iconfont!important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.left-box .deal-market-info p .iconfont {
    margin-right: 20px;
    font-size: 20px;
}

.left-box .deal-market-info p .iconfont:before {
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    display: inline-block;
    content: '';
}

.icon-youxiang:before {
    background-image: url(../assets/img/t1-1.png);
}

.icon-youxiang111:before {
    background-image: url(../assets/img/t1-2.png);
}

.icon-dianhua:before {
    background-image: url(../assets/img/t2-1.png);
}

.icon-dianhua111:before {
    background-image: url(../assets/img/t2-2.png);
}

.icon-renzheng:before {
    background-image: url(../assets/img/t3-1.png);
}

.icon-renzheng111:before {
    background-image: url(../assets/img/t3-2.png);
}

.left-box .deal-user-trade-info {
    padding-top: 20px;
    color: #8994a3;
}

.left-box .deal-user-trade-info p {
    margin-bottom: 6px;
}

.left-box .deal-user-trade-info p em {
    font-style: normal;
    color: #0d214e;
}
</style>


