
/*<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <div class="contbox">
                    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
                        <div class="send-box">
                            <div class="title-box">
                                <i class="merchant-icon tips"></i>
                                <h6 class="titles">创建一个广告</h6>
                                <p>如果您经常进行交易，您可以创建自己的交易广告。如果您只是偶尔交易，我们建议您直接搜索
                                    <router-link to="/tradingcenter/coinBTCbuy">交易广告</router-link>
                                    。
                                </p>
                                <!-- <p>创建一则交易广告是
                                    <a>免费的</a>。</p>
                                <p>若您想直接编辑已创建的广告，请查看
                                    <router-link to="/ordermanagement/myad">我的广告</router-link>
                                    。
                                </p> -->
                            </div>
                            <!--  -->
                            <div class="formbox send-form">
                                <Form ref="form" :model="form" :rules="ruleValidate" :label-width="110">
                                    <FormItem label="我想要" prop="advertiseType">
                                        <RadioGroup v-model="form.advertiseType">
                                            <Radio label="1" :disabled='isId'>在线出售</Radio>
                                            <Radio label="0" :disabled='isId'>在线购买</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="交易币种" prop="coin">
                                        <Select v-model="form.coin" :disabled='isId'>
                                            <Option v-for="item in coinList" :value="item.id" :key="item.id">{{item.unit}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="国家" prop="country">
                                        <Select v-model="form.country" @on-change="onAreaChange">
                                            <Option v-for="area in areas" :value="area.zhName" :key="area.zhName">{{area.zhName}}</Option>
                                        </Select>
                                    </FormItem>
                                    <!-- 1 -->
                                    <FormItem label="货币" prop="rmb">
                                        <Input v-model="form.rmb" disabled placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="固定价格">
                                        <i-switch v-model="form.fixed" size="large">
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                    <p class="msg" v-show="form.fixed">启用后，您的币价不会随市场波动，价格不变。</p>
                                    <FormItem label="溢价" prop="premisePrice" v-show="!form.fixed" class="ivu-form-item-required">
                                        <Input v-model="form.premisePrice" placeholder="请设置您的溢价">
                                        <span slot="append">%</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="固定价格" prop="fixedPrice" v-show="form.fixed" class="ivu-form-item-required">
                                        <Input v-model="form.fixedPrice" placeholder="请输入您的交易价格">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <!-- 1 -->
                                    <p class="msg">市场参考价格：
                                        <span class="cankao">{{cankao}}</span>
                                    </p>
                                    <p class="msg" v-show="!form.fixed">溢价是指高于当前市场价格多少百分比进行{{wantstyle}}。</p>
                                    <div class="ivu-form-item">
                                        <label class="ivu-form-item-label" style="width: 90px;">交易价格</label>
                                        <div class="ivu-form-item-content" style="margin-left: 90px;">
                                            <div class="ivu-input-wrapper ivu-input-type" id="price">
                                                {{price}}
                                            </div>
                                        </div>
                                    </div>
                                    <p class="msg">计价公式：（Bitstamp+Bitfinex+Coinbase）/ 3 *{{gongshi.toFixed(4) }}</p>
                                    <FormItem :label="wantstyle+'数量'" prop="number">
                                        <Input v-model="form.number" :placeholder="'请输入您要'+wantstyle+'的数量'"></Input>
                                    </FormItem>
                                    <FormItem label="付款期限" prop="timeLimit">
                                        <Input v-model="form.timeLimit" :placeholder="'请输入您的交易期限('+wantTime+'分钟)'">
                                        <span slot="append">分钟</span>
                                        </Input>
                                    </FormItem>
                                    <p class="msg">要求对方在多少时间内完成支付，超时未支付的订单将被系统自动取消</p>

                                    <router-link to="/membercenter/account" style="padding-left: 90px;">【提示】可前往个人中心绑定/增加支付方式</router-link>
                                    <FormItem label="付款方式" prop="payMode">
                                        <Select v-model="form.payMode" multiple style="width:100%">
                                            <Option v-for="item in payModeList" :value="item.value" :key="item.value" :disabled="item.isOpen">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>

                                    <FormItem label="最小交易额" prop="minLimit">
                                        <Input v-model="form.minLimit" placeholder="请输入您的最小交易额">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="最大交易额" prop="maxLimit">
                                        <Input v-model="form.maxLimit" placeholder="请输入您的最大交易额">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="备注信息" prop="remark">
                                        <Input v-model="form.remark" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="可以内备注信息里填写您的特殊要求，例如：对买方的要求，在线时间等。"></Input>
                                    </FormItem>
                                    <FormItem label="开启自动回复">
                                        <i-switch v-model="form.autoReply" size="large">
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                    <p class="msg">启用后，用户通过此广告向您发起交易时，系统自动将您选择的自动回复用语发送给对方。</p>
                                    <FormItem label="自动回复" prop="autodesc" v-show="form.autoReply">
                                        <Input v-model="form.autodesc" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="在接收订单后，自动回复给买家的信息，例如：收款方式、收款账号等。"></Input>
                                    </FormItem>
                                    <FormItem label="资金密码" prop="priceW">
                                        <Input v-model="form.priceW" placeholder="请输入您的资金密码" type="password"></Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" long @click="handleSubmit('form')" :disabled="disAllowBtn">发布广告</Button>
                                        <!-- <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">Reset</Button> -->
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        var that = this;
        const numberCheck = (rule, value, callback) => {
            if (value === '' || value == 0) {
                callback(new Error('请输入正确数字'));
            } else if (Number.isNaN(Number(value))) {
                callback(new Error('请输入正确数字'));
            } else if (value > 100) {
                callback(new Error('请输入正确数字'));
            } else {
                callback();
            }
        };
        const premisePriceCheck = (rule, value, callback) => {
            if (that.form.fixed == false) {
                if (!value || value == 0) {
                    return callback(new Error('溢价值为0-20'));
                } else if (Number.isNaN(Number(value))) {
                    callback(new Error(''));
                } else if (value < 0 || value > 20) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const fixedPCheck = (rule, value, callback) => {
            if (that.form.fixed == true) {
                if (value === '') {
                    callback(new Error('请输入正确数字'));
                } else if (!/^\d+$/.test(value)) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const maxCheck = (rule, value, callback) => {
            let priceNow = (that.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0;
            priceNow = priceNow * that.form.number;
            if (!value || value == 0) {
                return callback(new Error('请输入您的最大交易额！'));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error('请输入整数'));
            } else if (value < parseInt(that.form.minLimit)) {
                callback(new Error('最大交易额必须大于最小交易额！'));
            } else if (value > priceNow) {
                callback(new Error('最大交易额不能超过您的卖出总金额' + priceNow + 'CNY！'));
            } else {
                callback();
            }
        };
        const minCheck = (rule, value, callback) => {
            if (!value || value == 0) {
                return callback(new Error('请输入您的最小交易额！'));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error('请输入整数'));
            } else if (value < 100) {
                callback(new Error('最小交易额必须大于等于100！'));
            }
            if (that.form.maxLimit && that.form.maxLimit != 0 && value > (that.form.maxLimit - 0)) {
                // console.log(this.form.maxLimit)
                callback(new Error('最小交易额必须小于最大交易额'));
            } else {
                callback();
            }
        };
        //    期限
        const timeLimitCheck = (rule, value, callback) => {
            //数字
            if (value === '' || !/^\d+$/.test(value)) {
                callback(new Error('请输入正确数字'));
            }
            //出售
            if (that.form.advertiseType == 1) {
                if (value < 15 || value > 120) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            }
            //买入
            if (that.form.advertiseType == 0) {
                if (value < 10 || value > 30) {
                    callback(new Error('请输入正确数字'));
                }
                else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            isId: false,
            disAllowBtn: false,
            //币种列表
            coinList: [],
            //账户余额
            balance: 100,
            //参考价
            cankao: '',
            price: '',
            gongshi: 1,
            wantstyle: '卖出',
            wantTime: '15-120',
            areas:[],
            form: {
                advertiseType: '1',
                coin: '1',
                country: '',
                rmb: '',
                fixed: false,
                premisePrice: '',
                fixedPrice: '',
                number: '',
                timeLimit: '',
                payMode: [],
                minLimit: '',
                maxLimit: '',
                autoReply: false,
                remark: '',
                priceW: '',
                autoword: '',
            },
            ruleValidate: {
                advertiseType: [
                    { required: true, trigger: 'change' }
                ],
                coin: [
                    { required: true, message: '请输入币种', trigger: 'change' }
                ],
                country: [
                    { required: true, message: '请输入正确选项', trigger: 'change' }
                ],
                rmb: [
                    { required: true, message: '请输入正确选项', trigger: 'change' }
                ],
                premisePrice: [
                    { validator: premisePriceCheck, message: '溢价值为0-20，且不能为0', trigger: 'blur' }
                ],
                fixedPrice: [
                    { validator: fixedPCheck, message: '请输入正确固定价格', trigger: 'blur' }
                ],
                number: [
                    { required: true, validator: numberCheck, message: '请输入正确数字，并且最大交易数量不超过100币', trigger: 'blur' }
                ],
                timeLimit: [
                    { required: true, validator: timeLimitCheck, message: '请输入正确交易限期', trigger: 'blur' },
                ],
                payMode: [
                    { required: true, type: 'array', min: 1, message: '请选择交易方式', trigger: 'change' },
                ],
                minLimit: [
                    { required: true, validator: minCheck, trigger: 'blur' }
                ],
                maxLimit: [
                    { required: true, validator: maxCheck, trigger: 'blur' }
                ],
                priceW: [
                    { required: true, message: '请输入资金密码', trigger: 'blur' }
                ],
            },
            payModeList: [
                {
                    value: '支付宝',
                    label: '支付宝',
                    isOpen: true,
                },
                {
                    value: '微信',
                    label: '微信',
                    isOpen: true,
                },
                {
                    value: '银联',
                    label: '银联',
                    isOpen: true,
                },
            ]
        }
    },
    methods: {
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
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.disAllowBtn = true
                    //创建
                    var params = {};
                    params['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0;
                    params['advertiseType'] = this.form.advertiseType;
                    params['coin.id'] = this.form.coin;
                    params['minLimit'] = this.form.minLimit;
                    params['maxLimit'] = this.form.maxLimit;
                    params['timeLimit'] = this.form.timeLimit;
                    params['country'] = this.form.country;
                    if (this.form.fixed == true) {
                        params['priceType'] = 0;
                    } else if (this.form.fixed == false) {
                        params['priceType'] = 1;
                    }
                    params['premiseRate'] = this.form.premisePrice;
                    params['remark'] = this.form.remark;
                    params['number'] = this.form.number;
                    params['pay'] = this.form.payMode;
                    params['jyPassword'] = this.form.priceW;
                    if (this.form.autoReply == true) {
                        params['auto'] = 0;
                    } else if (this.form.autoReply == false) {
                        params['auto'] = 1;
                    }
                    params['autoword'] = this.form.autoword;

                    //修改
                    var isIdparams = {}
                    isIdparams['id'] = this.$route.query.id;
                    isIdparams['advertiseType'] = this.form.advertiseType;
                    isIdparams['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0;
                    isIdparams['coin.id'] = this.form.coin;
                    isIdparams['minLimit'] = this.form.minLimit;
                    isIdparams['maxLimit'] = this.form.maxLimit;
                    isIdparams['timeLimit'] = this.form.timeLimit;
                    isIdparams['country'] = this.form.country;
                    if (this.form.fixed == true) {
                        isIdparams['priceType'] = 0;
                    } else if (this.form.fixed == false) {
                        isIdparams['priceType'] = 1;
                    }
                    isIdparams['premiseRate'] = this.form.premisePrice;
                    isIdparams['remark'] = this.form.remark;
                    isIdparams['number'] = this.form.number;
                    isIdparams['pay'] = this.form.payMode;
                    isIdparams['jyPassword'] = this.form.priceW;
                    if (this.form.autoReply == true) {
                        isIdparams['auto'] = 0;
                    } else if (this.form.autoReply == false) {
                        isIdparams['auto'] = 1;
                    }
                    isIdparams['autoword'] = this.form.autoword;
                    if (this.isId) {
                        this.$http.post(this.host + '/otc/advertise/update', isIdparams).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success(resp.message);
                                var that = this;
                                setTimeout(() => {
                                    that.$router.push('/ordermanagement/myad');
                                }, 3000)
                            } else {
                                this.$Message.error(resp.message);
                            }
                            //  this.disAllowBtn=false
                        })
                    } else {
                        //创建
                        this.$http.post(this.host + this.api.otc.createAd, params).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success(resp.message);
                                var that = this;
                                setTimeout(() => {
                                    that.$router.push('/ordermanagement/myad');
                                }, 3000)
                            } else {
                                this.$Message.error(resp.message);
                            }
                            // this.disAllowBtn=false
                        })
                    }

                } else {
                    this.$Message.error('提交失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        onAreaChange(value){
            for(var i=0;i<this.areas.length;i++){
                if(this.areas[i].zhName == value){
                    this.form.rmb = this.areas[i].localCurrency;
                }
            }
        },
        findCoin(coinId) {
            for (let i = 0; i < this.coinList.length; i++) {
                if (this.coinList[i].id == coinId) {
                    return this.coinList[i].unit
                }
            }
        },
        getAreas(){
            this.$http.post(this.host + this.api.common.area).then(response => {
                var resp = response.body;
                this.areas = resp.data;
                this.form.country = this.areas[0].zhName;
                this.form.rmb = this.areas[0].localCurrency;
            });
        },
        getMember() {
            //获取个人安全信息
            let self = this
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    if (resp.data.realName == null || resp.data.realName == "") {
                        this.$Message.success('请先进行实名等一系列认证');
                        self.$router.push('/membercenter/safe');
                    } else if (resp.data.phoneVerified == 0) {
                        this.$Message.success('请先进行手机等一系列认证');
                        self.$router.push('/membercenter/safe');
                    } else if (resp.data.fundsVerified == 0) {
                        this.$Message.success('请先进行资金密码等一系列认证');
                        self.$router.push('/membercenter/safe');
                    } else {
                        this.getAccount()
                    }
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getAccount() {
            //获取个人账户信息
            let self = this
            this.$http.post(this.host + '/uc/approve/account/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    if (resp.data.bankVerified == 0 && resp.data.aliVerified == 0 && resp.data.wechatVerified == 0) {
                        this.$Message.success('请至少绑定一种支付方式');
                        self.$router.push('/membercenter/account');
                    }
                    if (resp.data.aliVerified == 1) {
                        this.payModeList[0].isOpen = false
                    }
                    if (resp.data.wechatVerified == 1) {
                        this.payModeList[1].isOpen = false
                    }
                    if (resp.data.bankVerified == 1) {
                        this.payModeList[2].isOpen = false
                    }
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.msg = resp.message
                    this.$Message.error(resp.message);
                }
            })
        },
    },
    mounted() {
    },
    computed: {
        wantHistory() {
            return this.form.advertiseType
        },
        premisePriceHistory() {
            return this.form.premisePrice
        },
        fixedPriceHistory() {
            return this.form.fixedPrice
        },
    },
    watch: {
        wantHistory(newValue, oldValue) {
            if (newValue == '1') {
                this.wantstyle = '卖出';
                this.wantTime = '15-120';
            } else {
                this.wantstyle = '买入';
                this.wantTime = '10-30';
            }
        },
        premisePriceHistory(newValue, oldValue) {
            let lv = (1 + newValue / 100).toFixed(4);
            let cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0

            // this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            this.price = this.round(this.mul(cankoNew, lv), 2).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            this.gongshi = (1 + newValue / 100);
        },
        fixedPriceHistory(newValue, oldValue) {
            this.price = (newValue - 0).toLocaleString();
        },

    },
    created() {
        this.getMember();
        this.getAreas();
        let lv = (1 + this.form.premisePrice / 100).toFixed(4);
        //获取币种
        this.$http.post(this.host + '/otc/coin/all').then(response => {
            var resp = response.body;
            if (resp.code == 0) {
                console.log(resp.data[0].marketPrice)
                this.coinList = resp.data;
                this.cankao = resp.data[0].marketPrice + ''
                let cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
                this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            } else {
                this.$Message.error(resp.message);
            }
        })
        //查看id修改广告
        if (this.$route.query.id) {
            this.isId = true
            this.$http.post(this.host + this.api.otc.adDetail, { id: this.$route.query.id }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.form.coin = resp.data.coinId + ''
                    this.form.country = resp.data.country.zhName
                    this.cankao = resp.data.marketPrice + ''
                    if (resp.data.priceType == 0) {
                        this.form.fixed = true
                        this.form.fixedPrice = resp.data.price
                    } else if (resp.data.priceType == 1) {
                        this.form.fixed = false
                    }
                    this.price = resp.data.price
                    this.form.advertiseType = resp.data.advertiseType + ''
                    this.form.minLimit = resp.data.minLimit
                    this.form.maxLimit = resp.data.maxLimit
                    this.form.remark = resp.data.remark
                    this.form.timeLimit = resp.data.timeLimit
                    this.form.premisePrice = resp.data.premiseRate
                    this.form.payMode = (resp.data.payMode + '').split(",")
                    // console.log(this.form.payMode)
                    this.form.number = resp.data.number
                    if (resp.data.auto == 0) {
                        this.form.autoReply = true
                    } else if (resp.data.auto == 1) {
                        this.form.autoReply = false
                    }
                    this.form.autoword = resp.data.autoword
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }


    },
}
</script>

<style scoped>
.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
}

.cankao {
    color: #e24a64;
}

#price {
    font-size: 16px;
    color: #e24a64;
}

.send-box .send-form .msg {
    padding-left: 90px;
    margin-bottom: 10px;
    position: relative;
    top: -4px;
}

.formbox {
    width: 50%;
    padding-top: 30px;
}

.send-box {
    background-color: #fff;
    color: #9194a5;
    padding:16px;
}

.send-box .title-box {
    border-bottom: 6px solid #f9f9fb;
    width: 100%;
    padding-bottom: 30px;
}

.send-box .title-box .titles {
    font-size: 16px;
    font-weight: normal;
    color: #242a4a;
    margin-bottom: 15px;
    flex-grow: 2;
    display:inline-block;
}

.send-box .title-box p {
    line-height: 2;
}

.send-box .title-box p a {
    color: #15b3f0;
}







































































































/* common */

.contbox {
    padding-bottom: 30px;
}

.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #00b5f6 !important;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    background: #eee;
    min-height: 750px;
}

.container {
    padding-top: 30px;
    margin: 0 auto;
}

.contbox {
    background: #fff;
}







































































































/* cont */
</style>


*/