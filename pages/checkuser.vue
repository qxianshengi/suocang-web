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
                                        <span class="online-status-box user-states ">
                                            <span class="circles"></span>
                                        </span>
                                    </div>
                                    <div class="user-name">
                                    </div>
                                </div>
                                <span class="ml10">{{user.username}}</span>
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
                                <p v-if="user.realVerified==1">
                                    <i class="iconfont icon-renzheng111"></i>
                                    <span class="">身份证已认证</span>
                                </p>
                                <p v-else>
                                    <i class="iconfont icon-renzheng"></i>
                                    <span class="unmarket">身份证未认证</span>
                                </p>
                            </div>
                        </div>    
                    </Col>
                    <Col span="20">
                        <div class="right-safe">
                            <div class="trade-right-box">
                                <div class="trade-price">
                                    <Row class="tit">
                                        <Col span="6">语言: 中文</Col>
                                        <Col span="6">注册时间: {{user.createTime}}</Col>
                                        <Col span="6">累计交易次数: {{user.transactions}}</Col>
                                    </Row>
                                </div>
                            </div>
                            <div class="trade-operation">
                                <div class="trade-group merchant-top">
                                    <i class="merchant-icon tips"></i>
                                    <span class="tips-word">{{user.username}}的交易信息</span>
                                </div>
                            </div>
                            <div class="demo-tabs-style1 tabbox">
                                <Tabs value="name1">
                                    <TabPane label="在线出售" name="name1">
                                        <div class="order-table">
                                            <Table stripe :columns="tableColumnsOrderSell" :data="tableOrderSell" :loading="loading"></Table>
                                        </div>
                                    </TabPane>
                                    <TabPane label="在线购买" name="name2">
                                        <div class="order-table">
                                            <Table stripe :columns="tableColumnsOrderBuy" :data="tableOrderBuy" :loading="loading"></Table>
                                        </div>
                                    </TabPane>
                                </Tabs>
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
            loading: true,
            hasRealName: false,
            usernameS: '',
            user: {
                username: '',
                email: true,
                mobileNo: false,
                idCard: true,
            },
            tableOrderSell: [],
            tableOrderBuy: [],
        }
    },
    created() {
        this.getAdv()
    },
    computed: {
        tableColumnsOrderSell() {
            let self = this;
            let columns = [];
            columns.push({
                title: '币种',
                key: 'unit',
                align: 'center',
            });
            columns.push({
                title: '地区',
                key: '',
                align: 'center',
            });
            columns.push({
                title: '付款方式',
                key: 'payMode',
                align: 'center',
            });
            columns.push({
                title: '创建于',
                key: 'createTime',
                width: 160,
                align: 'center',
            });
            // columns.push({
            //     title: '数量',
            //     key: 'remainAmount',
            //     align: 'center',
            // });
            columns.push({
                title: '价格/BTC',
                key: 'price',
                width: 170,
                align: 'center',
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'price'
                            },
                        }, params.row.price + 'CNY'),
                        h('p', {
                            attrs: {
                                class: 'price2'
                            },
                        }, params.row.minLimit + '-' + params.row.maxLimit + 'CNY'),
                    ]);
                },
            });
            columns.push({
                title: '操作',
                key: 'buyBtn',
                align: 'center',
                render: function(h, params) {
                    return h('p', [
                        h('a', {
                            on: {
                                click: function() {
                                    if (!self.$store.getters.isLogin) {
                                        self.$router.push('/login');
                                    } else if (!self.$store.getters.member) {
                                        self.$Message.error('请先进行实名认证');
                                        setTimeout(() => {
                                            self.$router.push('/membercenter/safe');
                                        }, 2000)
                                    } else {
                                        self.$router.push('/tradeInfoBuy?tradeId=' + params.row.advertiseId);
                                    }
                                }
                            },
                            style: {
                                color: '#fff'
                            },
                        }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        long: true,
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width: '80%'
                                    },

                                }, '购买')
                            ]),
                    ]);
                }
            });

            return columns;
        },
        tableColumnsOrderBuy() {
            let self = this;
            let columns = [];
            columns.push({
                title: '币种',
                key: 'unit',
                align: 'center',
            });
            columns.push({
                title: '地区',
                key: '',
                align: 'center',
            });
            columns.push({
                title: '付款方式',
                key: 'payMode',
                align: 'center',
            });
            columns.push({
                title: '创建于',
                key: 'createTime',
                width: 160,
                align: 'center',
            });
            // columns.push({
            //     title: '数量',
            //     key: 'remainAmount',
            //     align: 'center',
            // });
            columns.push({
                title: '价格/BTC',
                key: 'price',
                width: 170,
                align: 'center',
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'price'
                            },
                        }, params.row.price + 'CNY'),
                        h('p', {
                            attrs: {
                                class: 'price2'
                            },
                        }, params.row.minLimit + '-' + params.row.maxLimit + 'CNY'),
                    ]);
                },
            });
            columns.push({
                title: '操作',
                key: 'buyBtn',
                align: 'center',
                render: function(h, params) {
                    return h('p', [
                        h('a', {
                            on: {
                                click: function() {
                                    if (!self.$store.getters.isLogin) {
                                        self.$router.push('/login');

                                    } else if (!self.$store.getters.member) {
                                        self.$Message.error('请先进行实名认证');
                                        setTimeout(() => {
                                            self.$router.push('/membercenter/safe');
                                        }, 2000)
                                    } else {
                                        self.$router.push('/tradeInfoSell?tradeId=' + params.row.advertiseId);
                                    }
                                }
                            },
                            style: {
                                color: '#fff'
                            },
                        }, [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        long: true,
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width: '80%'
                                    },

                                }, '出售')
                            ]),
                    ]);
                }
            });

            return columns;
        }

    },
    methods: {
        changePage() {
            console.log(1)
        },
        getAdv() {
            //获取个人账户信息
            this.$http.post(this.host + '/otc/advertise/member', { 'name': this.$route.query.id }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.loading = false
                    this.tableOrderBuy = resp.data.buy
                    this.tableOrderSell = resp.data.sell
                    this.user = resp.data
                    this.usernameS = (this.user.username + '').replace(/^\s+|\s+$/g, "").slice(0, 1)
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }
    }
}
</script>

<style scoped>
/* right */

.tabbox {
    margin-left: 20px;
    background: #fff;
    padding: 20px 15px;
}

.merchant-top {
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    color: #0d214e;
    margin-left: 20px;
}

.merchant-icon {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
    display: inline-block;
    margin-left: 4px;
}

.tips-word {
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    text-align: left;
    font-size: 14px;
}

.tit div {
    color: #a2a2a2;
}

.trade-right-box {
    margin-left: 20px;
    text-align: left;
}

.trade-right-box .trade-price {
    padding: 15px 0;
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

.trade-right-box .trade-operation .trade-price-input .price-input-list {
    border: 1px solid #c5cdd7;
    width: 45%;
}

.trade-right-box .trade-operation .trade-price-input .price-input-list .coin-name {
    background-color: #ebeff5;
    display: inline-block;
    padding: 10px 22px;
    font-size: 18px;
    color: #0d214e;
    border-right: 1px solid #c5cdd7;
}

.trade-right-box .trade-operation .trade-price-input .price-input-list>input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 10px;
    display: inline-block;
    width: 75%;
}

.trade-right-box .trade-operation .trade-price-input .exchange {
    width: 10%;
    text-align: center;
    font-size: 24px;
}

.trade-right-box .trade-operation .trade-price-input .price-input-list {
    border: 1px solid #c5cdd7;
    width: 45%;
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
    background-color: #ee6543;
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


