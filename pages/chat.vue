<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container chat-in-box" id="List">
                <Row class="chat-in">
                    <Col span="4">
                    <div class="leftmenu left-box chat-right">
                        <div class="chat-right-in">
                            <h6>
                                <span v-if="tradeType==0">卖家:</span>
                                <span v-else>买家:</span>
                                <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                            </h6>
                            <h6>
                                <span>交易金额:</span>
                                <span>{{msg.money}}&nbsp;CNY</span>
                            </h6>
                            <div class="mt20" v-if="tradeType==0">
                                <h5>操作提示:</h5>
                                <div>
                                    <p>1、请在规定的时限内按照对方给出的账号完成支付，并在本页面点击“
                                        <em>付款完成</em>”。转账时请在留言中备注好付款参考号。</p>
                                    <p>2、卖方收到款项后会在网站确认收款，系统会自动将您所购买的数字资产发放至您的账户，请注意查收。</p>
                                </div>
                                <span>
                                    <b>注意：</b>
                                </span><br>
                                <span>请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成</span><br>
                            </div>
                            <div class="mt20" v-else>
                                <h5>操作提示:</h5>
                                <div>
                                    <p>1、您所出售的数字资产，已交由平台托管冻结。请在确定收到对方付款后，点击“
                                        <em>确认放行</em>”支付数字资产！</p>
                                    <p>2、请不要相信任何催促放币的理由，确认收到款项后再释放数字资产，避免造成损失！</p>
                                    <p>3、在收到账短信后，请务必登录网上银行或手机银行确认款项是否入账，避免因收到诈骗短信错误释放数字资产！</p>
                                </div>
                                <span>
                                    <b>注意：</b>
                                </span><br>
                                <span>请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成</span><br>
                            </div>
                            <div class="bottom-btn">
                                <div style="padding-top:20px;">
                                    <h6 style="font-weight: 600">订单状态:
                                        <span>{{statusText}}</span>
                                    </h6>
                                    <ButtonGroup v-show="statusBtn==1&&tradeType==0">
                                        <Button type="primary" @click="modal1 = true">付款完成</Button>
                                        <Button @click="modal2 = true">取消交易</Button>
                                    </ButtonGroup>
                                    <ButtonGroup v-show="statusBtn==2&&tradeType==0">
                                        <Button type="primary" @click="modal4 = true">订单申诉</Button>
                                        <Button @click="modal2 = true">取消交易</Button>
                                    </ButtonGroup>
                                    <ButtonGroup v-show="statusBtn==2&&tradeType==1">
                                        <Button type="primary" @click="modal5 = true">确认放行</Button>
                                        <Button @click="modal4 = true">订单申诉</Button>
                                    </ButtonGroup>
                                    <!-- <Button type="primary" v-show="statusBtn==2" @click="modal4 = true" long></Button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col span="20">
                    <div class="rightbox">
                        <Row class="chat-top" type="flex" justify="space-between">
                            <Col span="3" class="order-time">
                            <h5>{{statusText}}</h5>
                            </Col>
                            <Col span="8" class="order-info">
                            <h5>
                                <label class="order-name">订单</label>
                                <span>{{msg.orderSn}}</span>
                            </h5>
                            <p>
                                与
                                <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                                的交易
                            </p>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.price}}</h5>
                            <span>交易价格(CNY)</span>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.amount}}</h5>
                            <span>交易数量({{msg.unit}})</span>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.money}}</h5>
                            <span>交易金额(CNY)</span>
                            </Col>
                        </Row>
                        <Row class="chat-top" type="flex" justify="space-between" v-show="statusBtn!=0">
                            <Col span="8" class="order-info" v-if="bankInfo&&bankInfo!=null">
                            <i class="icons bankfor"></i>
                            <span>{{payInfo.realName}} </span>
                            <p>{{bankInfo.branch}}</p>
                            <p>{{bankInfo.cardNo}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons bankfor"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">用户暂时未添加银行卡卡号</p>
                            </Col>
                            <Col span="8" class="order-info" v-if="alipay&&alipay!=null">
                            <i class="icons alipay"></i>
                            <span>支付宝</span>
                            <pre></pre>
                            <p>{{alipay.aliNo}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons alipay"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">用户暂时未添加支付宝账号</p>
                            </Col>
                            <Col span="8" class="order-info" v-if="wechatPay&&wechatPay!=null">
                            <i class="icons wechat"></i>
                            <span>微信</span>
                            <pre></pre>
                            <p>{{wechatPay.wechat}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons wechat"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">用户暂时未添加微信账号</p>
                            </Col>

                        </Row>
                        <chatline :msg="msg"></chatline>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal v-model="modal1" title="提示" @on-ok="ok1">
            <p style="color:red;font-weight: bold;">您确定已经付款完成吗</p>
        </Modal>
        <Modal v-model="modal2" title="提示" @on-ok="ok2" :loading="isloading">
            <p style="color:red;font-weight: bold;">已付款项并不退还！您确定取消订单吗？</p>
        </Modal>
        <Modal v-model="modal3" title="提示" @on-ok="ok3">
            <p style="color:red;font-weight: bold;">【重复】：已付款项并不退还！您确定取消订单吗？</p>
        </Modal>
        <Modal v-model="modal4" title="提示" @on-ok="ok4">
            <Form :model="formItem" :label-width="80">
                <FormItem label="投诉类型">
                    <Select v-model="formItem.select">
                        <Option value="1">已付款，未收到币</Option>
                        <Option value="2">已付币，未收到款</Option>
                    </Select>
                </FormItem>
                <FormItem label="投诉备注">
                    <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="我要投诉"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal5" title="提示" @on-ok="ok5">
            <p style="color:red;font-weight: bold;">是否确认放币？</p>
        </Modal>
    </div>
</template>
<script>
import chatline from '../components/chatline'
export default {
    components: {
        chatline
    },
    data() {
        return {
            statusBtn: 0,
            tradeType: 0,
            isloading: true,
            payTime: '',
            statusText: '',
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            formItem: {
                select: '',
                remark: ''
            },
            msg: {},
            payInfo: {},
            bankInfo: {},
            alipay: {},
            wechatPay: {},
        }
    },
    created() {
        this.getDetail()

    },
    computed: {
    },
    methods: {
        //让浏览器滚动条保持在最低部
        scrollToBottom: function() {
            // window.scrollTo(0, 900000);
        },
        ok1() {
            this.$http.post(this.host + '/otc/order/pay', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok2() {
            setTimeout(() => {
                this.isloading = false
                this.modal2 = false
                this.modal3 = true
            }, 10000)
        },
        ok3() {
            this.$http.post(this.host + '/otc/order/cancel', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok4() {
            //时间
            if (1 == 1) {
                var params = {};
                params['orderSn'] = this.$route.query.tradeId
                params['remark'] = this.formItem.remark

                this.$http.post(this.host + '/otc/order/appeal', params).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(resp.message);
                        this.getDetail()
                    } else if (resp.code == 4000 || resp.code == 3000) {
                        this.$Message.success('请先登录');
                        this.$router.push('/login');
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
        },
        ok5() {
            this.$http.post(this.host + '/otc/order/release', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getDetail() {
            //获取个人广告
            this.$http.post(this.host + '/otc/order/detail', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.msg = resp.data
                    this.payInfo = this.msg.payInfo
                    if (this.payInfo == null) {
                        this.bankInfo = this.alipay = this.wechatPay == null
                    } else {
                        this.bankInfo = this.msg.payInfo.bankInfo
                        this.alipay = this.msg.payInfo.alipay
                        this.wechatPay = this.msg.payInfo.wechatPay
                    }

                    this.statusBtn = resp.data.status
                    this.tradeType = resp.data.type
                    // this.tradeType = resp.payTime
                    // console.log(this.tradeType)
                    if (resp.data.status == 1) {
                        this.statusText = '等待付款'
                    } else if (resp.data.status == 2) {
                        this.statusText = '等待放行'
                    } else if (resp.data.status == 3) {
                        this.statusText = '已完成'
                    } else if (resp.data.status == 4) {
                        this.statusText = '申诉中'
                    } else if (resp.data.status == 0) {
                        this.statusText = '已取消'
                    }

                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
    }
}
</script>
<style scoped>
/* right */

.rightbox {
    background: #fff;
    margin-left: 20px;
    padding-bottom: 20px;
    margin-bottom: 40px;
}
.chat-top {
    padding: 30px 0;
    font-size: 14px;
}
.order-time h5{
font-size: 16px;
    line-height: 40px;
}

.order-info h5{
    font-weight: 600;
    font-size: 14px;
}
/* chat */


/* left */

.mt20 {
    margin-top: 20px;
}

.leftmenu {
    margin-bottom: 60px;
    background: #fff;
    position: relative;
    min-height: 1px;
    padding: 50px 15px 50px 15px;
    text-align: left;
}

.chat-in-box .chat-in .chat-right .chat-right-in {
    background-color: white;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 {
    font-size: 14px;
    font-weight: 100;
    color: #23294c;
    min-width: 195px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
}

.chat-in-box .chat-in .chat-right .chat-right-in .seller {
    margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 span {
    margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in p {
    color: #333;
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.5;
}

.chat-in-box .chat-in .chat-right .chat-right-in p em {
    color: #f40a0a;
    font-style: normal;
}


/* -- */

.content-wrap {
    background: #eee;
    min-height: 515px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}
</style>

