<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <div class="contbox">
                    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
                        <div class="bill_box rightarea padding-right-clear record">
                            <section class="trade-group merchant-top">
                                <i class="merchant-icon tips"></i>
                                <h2 class="tips-word">提现地址管理</h2>
                            </section>
                            <section>
                                <div class="table-inner action-box open">
                                    <div class="action-inner">
                                        <div class="inner-left">
                                            <p class="describe">币种</p>
                                            <Select v-model="coinType" style="width:100px;margin-top: 10px;" size="large">
                                                <Option v-for="item in coinList" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
                                        </div>
                                        <div class="inner-box deposit-address mt25">
                                            <p class="describe">提币地址</p>
                                            <div class="title">
                                                <Input v-model="withdrawAddr" style="width: 90%;margin-top:10px;" size="large"></Input>
                                            </div>
                                        </div>
                                        <div class="mt25">
                                            <p class="describe">备注</p>
                                            <div class="title">
                                                <Input v-model="remark" style="width:100%;margin-top:10px;" size="large"></Input>
                                            </div>
                                        </div>
                                        <div class="btnbox">
                                            <Button id="addrSubmit" @click='addAddr' size="large" type="primary" style="height:36px;margin-top:10px;width:270px">添加</Button>
                                        </div>
                                    </div>
                                    <div class="action-content">
                                        <div class="action-body">
                                            <p class="acb-p1 describe">提现列表</p>
                                            <div class="order-table">
                                                <Table stripe :columns="tableColumnsRecharge" :data="dataRecharge"></Table>
                                                <div style="margin: 10px;overflow: hidden">
                                                    <div style="float: right;">
                                                        <Page :total="dataCount" :current="1" @on-change="changePage" :loading="loading"></Page>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- model -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#0096ed;text-align:center">
                <Icon type="email"></Icon>
                <span>安全验证</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidateAddr" :model="formValidateAddr" :rules="ruleValidate" :label-width="85">
                    <!-- 手机号 -->
                    <FormItem label="手机号" prop="mobileNo" v-show="validPhone">
                        <Input disabled size="large" v-model="formValidateAddr.mobileNo"></Input>
                    </FormItem>
                    <!-- 手机验证码 -->
                    <FormItem label="手机验证码" prop="vailCode2" v-show="validPhone">
                        <Input v-model="formValidateAddr.vailCode2" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(2)" :disabled="disbtn">
                                <span v-if="sendMsgDisabled2">{{time2+'秒'}}</span>
                                <span v-if="!sendMsgDisabled2">点击获取</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                    <!-- 邮箱 -->
                    <FormItem label="邮箱" prop="email" v-show="validEmail">
                        <Input disabled v-model="formValidateAddr.email" size="large"></Input>
                    </FormItem>
                    <!-- 邮箱验证码 -->
                    <FormItem label="邮箱验证码" prop="vailCode1" v-show="validEmail">
                        <Input v-model="formValidateAddr.vailCode1" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(1)" :disabled="disbtn">
                                <span v-if="sendMsgDisabled1">{{time1+'秒'}}</span>
                                <span v-if="!sendMsgDisabled1">点击获取</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formValidateAddr')">保 存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

export default {
    components: {
    },

    data() {
        return {
            disbtn: false,
            dataCount: 10,
            loading: true,
            //else
            sendMsgDisabled1: false,
            sendMsgDisabled2: false,
            time1: 60, // 发送验证码倒计时
            time2: 60, // 发送验证码倒计时
            modal2: false,
            modal_loading: false,
            withdrawAddr: '',
            remark: '',
            coinType: '',
            validEmail: false,
            validPhone: false,
            coinList: [
            ],
            tableColumnsRecharge: [
                {
                    title: '币种',
                    key: 'unit',
                    align: 'center',
                },
                {
                    title: '提币地址',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '备注',
                    align: 'center',
                    key: 'remark'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.del(params.row.id)
                                        this.getList(0, 10)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataRecharge: [
            ],
            formValidateAddr: {
                mobileNo: '',
                vailCode2: '',
                email: '',
                vailCode1: '',
            },
            ruleValidate: {
                mobileNo: [
                    { required: this.validPhone, message: '手机号不正确', trigger: 'blur' }
                ],
                vailCode2: [
                    { required: this.validPhone, message: '验证码不正确', trigger: 'change' }
                ],
                email: [
                    { required: this.validEmail, type: 'email', message: '邮箱不正确', trigger: 'blur' },
                ],
                vailCode1: [
                    { required: this.validEmail, message: '验证码不正确', trigger: 'change' }
                ],

            },
        }
    },
    created() {
        this.getMember()
        this.getList(0, 10)
        this.coinType = this.$route.query.name
        this.getCoin()
    },
    methods: {
        getMember() {
            //获取个人安全信息
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    if (resp.data.mobilePhone) {
                        this.formValidateAddr.mobileNo = resp.data.mobilePhone
                        this.validPhone = true;
                        this.validEmail = false;
                    } else {
                        this.formValidateAddr.email = resp.data.email
                        this.validPhone = false;
                        this.validEmail = true;
                    }
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getCoin() {
            //币种
            this.$http.post(this.host + '/uc/withdraw/support/coin').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.coinList.push(resp.data[i]);
                    }
                }else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getList(pageNo, pageSize) {
            //获取地址
            let params = {}
            params['pageNo'] = pageNo
            params['pageSize'] = pageSize
            this.$http.post(this.host + '/uc/withdraw/address/page', params).then(response => {
                var resp = response.body;
                if (resp.code == 0 && resp.data.content) {
                    this.dataRecharge = resp.data.content;
                    this.dataCount = resp.data.totalElement
                }else {
                    this.$Message.error(resp.message);
                }
                this.loading = false
            })
        },
        remove(index) {
            this.dataRecharge.splice(index, 1);
        },
        send(index) {
            let me = this;
            this.disbtn = true
            if (index == 1) {
                if (this.formValidateAddr.email) {
                    //获取邮箱code
                    this.$http.post(this.host + '/uc/add/address/code').then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            me.sendMsgDisabled1 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time1--) <= 0) {
                                    me.time1 = 60;
                                    me.sendMsgDisabled1 = false;
                                    window.clearInterval(interval);
                                    this.disbtn=false
                                }
                            }, 1000);
                        } else if (resp.code == 4000 || resp.code == 3000) {
                            this.$Message.success('请先登录');
                            this.$router.push('/login');
                            this.disbtn=false
                        } else {
                            this.$Message.error(resp.message);
                            this.disbtn=false
                        }
                    })
                } else {
                    this.$refs.formValidateAddr.validateField('email');
                    this.disbtn=false
                }
            } else if (index == 2) {
                if (this.formValidateAddr.mobileNo) {
                    //获取手机code
                    this.$http.post(this.host + '/uc/mobile/add/address/code').then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            this.$Message.success(resp.message);
                            me.sendMsgDisabled2 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time2--) <= 0) {
                                    me.time2 = 60;
                                    me.sendMsgDisabled2 = false;
                                    window.clearInterval(interval);
                                    this.disbtn=false
                                }
                            }, 1000);
                        } else if (resp.code == 4000 || resp.code == 3000) {
                            this.$Message.success('请先登录');
                            this.$router.push('/login');
                            this.disbtn=false
                        } else {
                            this.$Message.error(resp.message);
                            this.disbtn=false
                        }
                    })

                } else {
                    this.$refs.formValidateAddr.validateField('mobileNo');
                    this.disbtn=false
                }

            }
        },
        addAddr() {
            if (!this.coinType) {
                this.$Message.warning('请选择币种');
            } else if (!this.withdrawAddr) {
                this.$Message.warning('请输入提币地址');
            } else if (!this.remark) {
                this.$Message.warning('请输入备注');
            }
            else if (this.coinType && this.remark && this.withdrawAddr) {
                this.modal2 = true;
            }
        },
        changePage(index) {
            this.getList(index, 10, this.coinType)
        },
        del(id) {
            //获取
            let params = {}
            params['id'] = id
            this.$http.post(this.host + '/uc/withdraw/address/delete', params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }
                this.loading = false
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit(name)
                } else {
                    this.$Message.error('保存失败!');
                }
            })
        },
        submit(name) {
            let param = {}
            param['address'] = this.withdrawAddr
            param['unit'] = this.coinType
            if (this.validPhone) {
                param['aims'] = this.formValidateAddr.mobileNo
                param['code'] = this.formValidateAddr.vailCode2
            } else {
                param['aims'] = this.formValidateAddr.email
                param['code'] = this.formValidateAddr.vailCode1
            }
            param['remark'] = this.remark

            this.$http.post(this.host + '/uc/withdraw/address/add', param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success('保存成功!');
                    this.getList(0, 10)
                    this.modal2 = false;
                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } else {
                    this.$Message.error(resp.message);
                }

            })

        },

    },
    computed: {

    },
}
</script>

<style scoped>
.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin: 40px 20px;
    background: #1755FD;
    float: left;
}
.btnbox {
    padding: 25px 30px;
    vertical-align: bottom;
    display: table-cell;
    width: 30%;
}

.tips-word {
    float: left;
    margin:40px 0;
}

.action-inner {
    margin-bottom: 20px;
    display: table;
    padding: 0 30px;
    width: 100%;
}


.inner-left {
    display: table-cell;
    width: 15%;
}

.deposit-address {
    width: 45% !important;
}

.mt25 {
    display: table-cell;
    width: 43%;
}

p.describe {
    font-size: 16px;
    font-weight: 600;
}

.action-content {
    padding: 0 30px;
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


