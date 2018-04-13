<template>
    <div class="nav-right padding-right-clear">
        <div class="col-xs-12 padding-right-clear padding-left-clear rightarea user account-box">
            <div class="col-xs-12 rightarea-con">
                <div class="user-top-icon">
                    <div class="user-icons">
                        <div class="user-face user-avatar-public">
                            <span class="user-avatar-in">{{usedata.username}}</span>
                        </div>
                        <div class="user-name" style="line-height:52px">
                            <!-- <span>AppDOUYA</span> -->
                           {{usedata.username}}
                            <!-- <span class="uid">UID: 17095329</span> -->
                        </div>
                    </div>
                    <Row class="user-right">
                        <Col span="3">
                           <Row type="flex" justify="start" class="code-row-bg">
                               <Col span='24'><span style='color:#faae4e;font-size:16px'>1 级</span></Col>
                               <Col span='24'>初始信用等级</Col>
                           </Row>
                        </Col>
                        <Col span="5">
                           <Row type="flex" justify="start" class="code-row-bg">
                               <Col span='24'><span style='color:#faae4e;font-size:16px'>
                               <span v-if="usedata.creditLv=='ONE'">1级</span>
                               <span v-else-if="usedata.creditLv=='TWO'">2级</span>
                               <span v-else-if="usedata.creditLv=='THREE'">3级</span>
                                <span v-else>4级</span>
                               </span></Col>

                               <Col span='24'>目前信用等级</Col>
                           </Row>
                        </Col>
                     <!--   <Col span="5">
                            <Row type="flex" justify="start" class="code-row-bg">
                               <Col span='24'><span style='color:#faae4e;font-size:16px'>13次</span></Col>
                               <Col span='24'>历史锁仓</Col>
                           </Row>
                        </Col>-->
                        <Col span="5">
                          <Row type="flex" justify="start" class="code-row-bg">
                               <Col span='24'><span style='color:#faae4e;font-size:16px'></span>
                               <span v-if="usedata.isfirstSc=='0'" style='color:#faae4e;font-size:16px'>已锁仓</span>
                               <span v-else style='color:#faae4e;font-size:16px'>没有锁仓记录</span>
                               </Col>
                               <Col span='24'>首次锁仓</Col>
                           </Row>
                        </Col>
                        <Col span="5">
                           <Row type="flex" justify="start" class="code-row-bg">
                               <Col span='24'><span style='color:#faae4e;font-size:16px'>{{usedata.signTime*0.01}}</span></Col>
                               <Col span='24'>签到奖励</Col>
                           </Row>
                        </Col>
                        <Col span="4" >
                           <Row type="flex" justify="start" class="code-row-bg">
                                 <Button type="primary" shape="circle" long @click="sign" :disabled="issign">签 &nbsp;&nbsp;&nbsp;到</Button>
                           </Row>
                        </Col>
                    </Row>
                </div>
                <section class="accountContent">
                    <div class="account-in">
                        <!-- 1 -->
                        <!-- <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="person" style="font-size: 18px;color: #fb9f1a;"></Icon>
                                <span class="card-number">昵称</span>
                                <p class="bankInfo" style="color: grey;">
                                    bearbaby
                                </p>
                                <span>已设置</span>
                            </div>
                        </div> -->

                        <!-- 6 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="card" style="font-size: 18px;color: #fb9f1a;"></Icon>
                                <span class="card-number">密保问题</span>
                                <p v-if="usedata.hasAnswer==1" class="bankInfo" style="color: grey;">密保问题已绑定</p>
                                <p v-else class="bankInfo" style="color: grey;">
                                    为保障您的交易安全，请完成密保问题后交易操作！
                                </p>
                                <span v-if="usedata.hasAnswer==1">已绑定</span>

                                <a v-else class="btn" @click="showItem(6)">绑定</a>
                            </div>
                             <div class="account-detail" v-show="choseItem==6">
                                <div class="detail-list">
                                    <Form ref="formValidate8" :model="formValidate8" :rules="ruleValidate" :label-width="120">
                                     <Row type="flex" justify="center" class="code-row-bg">
                                        <Col span='4'>你父亲的姓名？</Col>
                                        <Col span='15'><Input v-model="formValidate8.ques1" style="width: 300px"></Input></Col>
                                     </Row>
                                    <Row type="flex" justify="center" class="code-row-bg" style='padding:15px 0px 15px 0px;'>
                                        <Col span='4'>对你影响最大的人是？</Col>
                                        <Col span='15'><Input  v-model="formValidate8.ques2" style="width: 300px"></Input></Col>
                                     </Row>
                                      <FormItem>
                                    <Button type="primary" @click="includepeople">保 存</Button>
                                       <Button type="ghost" @click="handleReset('formValidate8')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                              
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="ios-telephone" style="font-size: 18px;color: #fb9f1a;"></Icon>
                                <span class="card-number">手机</span>
                                <p  class="bankInfo" style="color: grey;">
                                    {{usedata.mobilePhone}}
                                </p>

                                <span >已绑定</span>

                            </div>
                            <div class="account-detail" v-show="choseItem==3">
                                <div class="detail-list">
                                    <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate" :label-width="120">
                                        <!-- 手机 -->
                                        <FormItem label="手机" prop="mobile">
                                            <Input v-model="formValidate3.mobile" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem label="登录密码" prop="password">
                                            <Input v-model="formValidate3.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode2">
                                            <Input v-model="formValidate3.vailCode2" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(2)" :disabled="sendMsgDisabled2">
                                                    <span v-if="sendMsgDisabled2">{{time2+'秒'}}</span>
                                                    <span v-if="!sendMsgDisabled2">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate3')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate3')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 4 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="locked" style="font-size: 18px;color: #fb9f1a;"></Icon>
                                <span class="card-number">登录密码</span>
                                <p class="bankInfo" style="color: grey;">
                                    登录平台时使用
                                </p>

                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">修改</a>
                                <a class="btn" v-else @click="showItem(4)">修改</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==4">
                                <div class="detail-list">
                                    <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate" :label-width="100">
                                        <!-- oldPw -->
                                        <FormItem label="原登录密码" prop="oldPw">
                                            <Input v-model="formValidate4.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPw -->
                                        <FormItem label="新登录密码" prop="newPw">
                                            <Input v-model="formValidate4.newPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPwConfirm -->
                                        <FormItem label="确认新密码" prop="newPwConfirm">
                                            <Input v-model="formValidate4.newPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode3">
                                            <Input v-model="formValidate4.vailCode3" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(3)" :disabled="sendMsgDisabled3">
                                                    <span v-if="sendMsgDisabled3">{{time3+'秒'}}</span>
                                                    <span v-if="!sendMsgDisabled3">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate4')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate4')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 5 -->




                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="lock-combination" style="font-size: 18px;color: #fb9f1a;"></Icon>
                                <span class="card-number">资金密码</span>
                                <p class="bankInfo" style="color: grey;">
                                    账户资金变动时，需先验证资金密码
                                </p>
                                <a class="btn" v-if="usehasJyPass=='false'" @click="noPhone">设置</a>
                                <a class="btn" v-else @click="showItem(5)">修改</a>
                                <a class="btn" @click="chonogzhimima">重置</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==5">


                                <!-- 设置 -->
                                <div class="detail-list" v-if="usehasJyPass==false">
                                    <Form ref="formValidate7" :model="formValidate7" :rules="ruleValidate" :label-width="100">
                                        <!-- newMPw -->
                                        <FormItem label="资金密码" prop="pw7">
                                            <Input v-model="formValidate7.pw7" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem label="确认密码" prop="pw7Confirm">
                                            <Input v-model="formValidate7.pw7Confirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate7')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate7')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>

                                <!-- 修改 -->
                                <div class="detail-list" v-else>
                                    <Form ref="formValidate5" :model="formValidate5" :rules="ruleValidate" :label-width="100">
                                        <!-- oldPw -->
                                        <FormItem label="原资金密码" prop="oldPw">
                                            <Input v-model="formValidate5.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPw -->
                                        <FormItem label="新资金密码" prop="newMPw">
                                            <Input v-model="formValidate5.newMPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem label="确认新密码" prop="newMPwConfirm">
                                            <Input v-model="formValidate5.newMPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->

                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate5')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate5')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </section>
            </div>
        </div>
         <Modal
        v-model="modalchongzhi"
        title="重置资金密码"
        @on-ok="oksendtrue">
         <Form  :model="chongzhidata"  :label-width="120">
                <FormItem>
                    <Button type="info" long @click="chongzhigetcode" :disabled='codeclick'>获取验证码</Button>
                </FormItem>
                 <FormItem label="验证码">
                    <Input v-model="chongzhidata.code"></Input>
                </FormItem>
                 <FormItem label="新的资金密码">
                    <Input v-model="chongzhidata.pass"></Input>
                </FormItem>
         </Form>
      </Modal>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位新登录密码'));
            } else if (value.length<'6') {
                callback(new Error('请输入不小于6位新登录密码'));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('新登录密码不一致'));
            } else if (value.length<'6') {
                callback(new Error('新登录密码不一致'));
            } else if (value !== this.formValidate4.newPw) {
                callback(new Error('两次输入的新登录密码不一致!'));
            } else {
                callback();
            }
        };
        const validateMPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位密码'));
            } else if (value.length<'6') {
                callback(new Error('请输入不小于6位密码'));
            } else {
                callback();
            }
        };
        const validateMPassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不一致'));
            } else if (value.length<'6') {
                callback(new Error('密码不一致'));
            } else if (value !== this.formValidate5.newMPw) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };
        const validatepw7 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位密码'));
            } else if (value.length<'6') {
                callback(new Error('请输入不小于6位密码'));
            } else {
                callback();
            }
        };
        const validatepw7check = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不一致'));
            } else if (value.length<'6') {
                callback(new Error('密码不一致'));
            } else if (value !== this.formValidate7.pw7) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };
        return {
        usehasJyPass:'',
            imgPreview:'',
            codeclick:false,
            imgNext:'',
            imgLast:'',
            usernameS:'',
            issign:false,
            frontCardImg:require('../../assets/img/frontCardImg.png'),
            backCardImg:require('../../assets/img/backCardImg.png'),
            handCardImg:require('../../assets/img/HandCardImg.png'),

            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',
            usedata:[],
            user: {
            },
            choseItem: 0,
            modalchongzhi:false,
            chongzhidata:{
               code:'',
               pass:''
            },
            accountValue: '1',
            formValidate2: {
                mail: '',
                vailCode1: '',
                password: '',

            },
            formValidate8:{
                  ques1:'',
                  ques2:''
            },
            formValidate3: {
                mobile: '',
                vailCode2: '',
                password: '',
            },
            formValidate4: {
                oldPw: '',
                newPw: '',
                newPwConfirm: '',
                vailCode3: '',
            },
            formValidate5: {
                oldPw: '',
                newMPw: '',
                newMPwConfirm: '',
                vailCode5: '',
            },

            formValidate7: {
                pw7: '',
                pw7Confirm: '',
                vailCode:''
            },

            ruleValidate: {
                mail: [
                    { required: true, type: 'email', message: '请输入邮箱号', trigger: 'blur' },
                ],
                vailCode1: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                vailCode2: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                vailCode3: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                ],
                oldPw: [
                    { required: true, type: 'string', min: 6, message: '请输入原密码', trigger: 'blur' }
                ],
                newPw: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                newPwConfirm: [
                    { required: true, type: 'string', min: 6, message: '新登录密码不一致', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' },

                ],
                newMPw: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                    { validator: validateMPass, trigger: 'blur' },
                ],
                newMPwConfirm: [
                    { required: true, type: 'string', min: 6, message: '密码不一致', trigger: 'blur' },
                    { validator: validateMPassCheck, trigger: 'blur' },

                ],
                pw7: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                    { validator: validatepw7, trigger: 'blur' },
                ],
                pw7Confirm: [
                    { required: true, type: 'string', min: 6, message: '密码不一致', trigger: 'blur' },
                    { validator: validatepw7check, trigger: 'blur' },

                ],
                vailCode5: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                idCard: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],

            },
            time1: 60, // 发送验证码倒计时
            time2: 60, // 发送验证码倒计时
            time3: 60, // 发送验证码倒计时
            time5: 60, // 发送验证码倒计时
            sendMsgDisabled1: false,
            sendMsgDisabled2: false,
            sendMsgDisabled3: false,
            sendMsgDisabled5: false,

        }
    },
    methods: {
        frontHandleSuccess (res, file) {
            this.frontCardImg=this.imgPreview=res.data;
        },
        backHandleSuccess (res, file) {
            this.backCardImg=this.imgNext=res.data;
        },
        handHandleSuccess (res, file) {
            this.handCardImg=this.imgLast=res.data;
        },

        noPhone() {
            this.$Message.info('请先绑定手机!');
        },
       chongzhigetcode(){
              this.$http.post(this.host+'/uc/mobile/transaction/code').then(res=>{
                      this.codeclick=true;
                        if(res.body.code=='0'){
                            this.$Message.success('发送成功')
                        }
                        else{
                          this.$Message.error('发送失败')
                        }
              })
       },
       oksendtrue(){
              let _mimadata={
                     phoneCode:this.chongzhidata.code,
                     jyPassword:this.chongzhidata.pass
               }
              this.$http.post(this.host+'/uc/member/update/jyPassword',_mimadata).then(res=>{
                            console.log(res)

                       if(res.body.code=='0'){
                             this.$Message.success(res.body.message);

                       }
                       else{
                           this.$Message.error(res.body.message)
                       }
              })
       },
        chonogzhimima(){
               this.modalchongzhi=true;
        },
        renderPw() {
            this.$Modal.confirm({
                title: '重置资金密码',
                onOk: () => {
                    this.$Message.info('Clicked ok');
                },
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        }
                    })
                }
            })
        },
        submit(name) {
            //实名认证

            //邮箱认证
     /*       if (name == 'formValidate2') {
                let param = {}
                param['email'] = this.formValidate2.mail
                param['code'] = this.formValidate2.vailCode1
                param['password'] = this.formValidate2.password
                console.log(param);

                this.$http.post(this.host + '/uc/approve/bind/email', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember()
                        this.choseItem = 0
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }*/
            //手机认证
            if (name == 'formValidate3') {
                let param = {}
                param['phone'] = this.formValidate3.mobile
                param['code'] = this.formValidate3.vailCode2
                param['password'] = this.formValidate3.password
                this.$http.post(this.host + '/uc/approve/bind/phone', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember()
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //登录密码
            if (name == 'formValidate4') {
                let param = {}
                param['pwd'] = this.formValidate4.oldPw
                param['newpwd'] = this.formValidate4.newPw
                param['phoneCode'] = this.formValidate4.vailCode3
                this.$http.post(this.host + '/uc/mobile/updatePwd', param).then(response => {
                    var resp = response.body;
                    console.log(resp)
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember();
                        this.choseItem = 0
                        localStorage.removeItem('MEMBER');
                        localStorage.removeItem('TOKEN');
                        this.$store.state.showLogout = true;
                        this.$store.getters.isLogin = false;
                        let self = this
                        setTimeout(() => {
                            self.$router.push('/login');
                        }, 2000)
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //修改资金密码
            if (name == 'formValidate5') {
                let param = {}
                param['oldPassword'] = this.formValidate5.oldPw
                param['newPassword'] = this.formValidate5.newMPw
                this.$http.post(this.host + '/uc/approve/reset/transaction/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember();
                        this.choseItem = 0
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //设置资金密码
            if (name == 'formValidate7') {
                let param = {}
                param['jyPassword'] = this.formValidate7.pw7;
                this.$http.patch(this.host + '/uc/approve/transaction/password', param).then(response => {
                    var resp = response.body;
                    console.log(resp)

                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember();
                        this.choseItem = 0
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }

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
        includepeople(){
                   if(this.formValidate8.ques1!=""&&this.formValidate8.ques2!=""){

                         let _data={
                         fatherName:this.formValidate8.ques1 ,
                         influencePeople:this.formValidate8.ques2
                        }
                       this.$http.patch(this.host+'/uc/member/setting-question',_data).then(res=>{
                                this.$Message.success('设置成功!');
                                // this.getMember();
                                location.reload();
                       })
                   }
                   else{
                      this.$Message.error('请完整填写信息');
                   }
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        showItem(index) {
            this.choseItem = index;
        },
        send(index) {
            let me = this;
            if (index == 1) {
                if (this.formValidate2.mail) {
                    //获取邮箱code
                    this.$http.post(this.host + '/uc/bind/email/code', { 'email': this.formValidate2.mail }).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled1 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time1--) <= 0) {
                                    me.time1 = 60;
                                    me.sendMsgDisabled1 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }else {
                            this.$Message.error(resp.message);
                        }
                    })
                } else {
                    this.$refs.formValidate2.validateField('mail');
                }
            } else if (index == 2) {
                if (this.formValidate3.mobile) {
                    //获取手机code
                    this.$http.post(this.host + '/uc/mobile/bind/code', { 'phone': this.formValidate3.mobile }).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled2 = true;
                            let interval = window.setInterval(function() {
                                if ((me.time2--) <= 0) {
                                    me.time2 = 60;
                                    me.sendMsgDisabled2 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }else {
                            this.$Message.error(resp.message);
                        }
                    })

                } else {
                    this.$refs.formValidate3.validateField('mobile');
                }

            } else if (index == 3) {
                //登录密码获取手机code
                this.$http.post(this.host + '/uc/mobile/update/password/code', ).then(response => {
                    var resp = response.body;

                    if (resp.code == 0) {
                        me.sendMsgDisabled3 = true;
                         this.$Message.success('发送成功');
                        let interval = window.setInterval(function() {
                            if ((me.time3--) <= 0) {
                                me.time3 = 60;
                                me.sendMsgDisabled3 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            } else if (index == 5) {
                //资金密码获取手机code
                this.$http.post(this.host + '/uc/mobile/transaction/code', ).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        me.sendMsgDisabled5 = true;
                        this.$Message.success(resp.message);
                        let interval = window.setInterval(function() {
                            if ((me.time5--) <= 0) {
                                me.time5 = 60;
                                me.sendMsgDisabled5 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        this.$Message.error(resp.message);
                    }
                })

            }
        },
        sign(){
             this.$http.post(this.host+'/uc/member/qian-dao').then(res=>{
                 if(res.body.code=='0'){
                   this.$Message.success('签到成功');
                   this.getMember();
                   this.issign=true;
                 }
                 else{
                    this.$Message.error(res.body.message);
                 }
         })
        }
        ,
        getMember() {
            //获取个人安全信息
            this.$http.get(this.host + '/uc/member/loginInfo').then(response => {
                var resp = response.body;
                 console.log(resp)
                if (resp.code == 0) {
                    this.usedata = resp.data;
                    this.usehasJyPass= this.usedata.hasJyPass;
                    //this.usernameS = (this.user.username + '').slice(0, 1)
                    // this.dataCount = resp.data.length
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        init() {
            this.$store.commit('navigate','6');
              if (localStorage.MEMBER == 'null'&& localStorage.MEMBER == 'null') {
                  this.$Message.error('请先登录');
                    this.$router.push('/login');
              }
              else{
                 let usepass=JSON.parse(localStorage.getItem("MEMBER"));
              //获取用户信息;
               this.usedata=usepass.data;


              }
        }

    },
    computed: {
        'member': function() {
            return this.$store.getters.member;
        },
    },
    mounted(){

    },
    created() {
       this.init();
       this.getMember();
    }
}
</script>
<style scoped>
a{ color:#fb9f1a}
.leftmenu a.router-link-active{     background: #ebeff5;
    color: #fb9f1a !important;}
.account-box .account-in .account-item .account-detail {
    padding: 30px 0;
    background: white;
    margin: 6px 0;
}

.account-box .account-in .account-item .account-detail .detail-list {
    width: 80%;
    margin: 0 auto;
}

.account-box .account-in .account-item .account-detail .detail-list .input-control {
    margin-bottom: 10px;
    height: 45px;
}

.detail-list .input-control .ivu-input-group-prepend {
    width: 63px;
}

.detail-list .input-control .ivu-input {
    height: 45px;
}

.account-box .account-in .account-item {
    margin-bottom: 10px;
}

.account-box .account-in .account-item .account-item-in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px 30px 15px 50px;
    background-color: white;
    -webkit-box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
    box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
    font-size: 14px;
    color: #242a4a;
}

.account-box .account-in .account-item .account-item-in .icons {
    height: 17px;
    width: 17px;
    display: inline-block;
    margin-top: -1px;
    background-size: 100% 100%;
}

.account-box .account-in .account-item .account-item-in .yesImg {
    background-image: url(../../assets/img/overicon.png);
}

.icons.noImg {
    background-image: url(../../assets/img/noicon.png);
}


.account-box .account-in .account-item .account-item-in .card-number {
    width: 142px;
    height: 40px;
    margin-right: 15px;
    border-right: 1px dashed #d0d5de;
    padding: 0 15px;
    line-height: 40px;
    text-align: left;
    display: inline-block;
}

.account-box .account-in .account-item .account-item-in .bankInfo {
    width: 73%;
    text-align: left;
}

.account-box .account-in .account-item .account-item-in .btn {
    padding: 8px 10px;
    cursor: pointer;
}

.tips-g {
    color: #8994a3;
    font-size: 12px;
}

.gr {
    color: #B4B4B4;
}

.m1 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m1.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.m2 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m2.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.m3 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m3.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.itp {
    display: inline-block;
}

.user-right {
    width: 80%;
}

.nav-right {
    padding-left: 15px;
}

.nav-right .padding-right-clear {
    padding-left: 15px;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;

}

.rightarea .trade-process {
    line-height: 30px;
    padding: 0 15px;
    background: #f1f1f1;
    display: inline-block;
    position: relative;
    margin-right: 20px;
}

.rightarea .trade-process.active {
    color: #eb6f6c;
    background: #f9f5eb;
}

.rightarea .trade-process .icon {
    background: #fff;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
}

.rightarea .trade-process .arrow {
    position: absolute;
    top: 10px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
    border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
    border: none;
}

.rightarea .rightarea-tabs li>a {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-right: 0;
    font-size: 14px;
    color: #646464;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
    width: 125px;
    height: 40px;
    position: relative;
    margin: -1px 0 0 -1px;
    border: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #da2e22;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fdfaf3;
    color: #9e9e9e;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fdfaf3;
    line-height: 40px;
    margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
    font-size: 16px;
}

.rightarea .recordtitle {
    cursor: pointer;
}

.user .user-top-icon {
    height: 120px;
    border-bottom: 1px dashed #ebeff5;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 50px;
}

.user .top-icon {
    /* background: url("../../images/user/userplist.png") no-repeat 0 0; */
    width: 75px;
    height: 75px;
    display: inline-block;
}

.user .top-icon.intro {
    background-position: 0 -670px;
}

.user .user-info {
    padding: 0px 10px;
    background-color: #fff;
    color: #0d214e;
}

.user .user-info .user-info-top {
    border-bottom: 1px dashed #ebeff5;
    padding-bottom: 20px;
}

.user .user-info h5 {
    font-size: 18px;
}

.user .user-info h5 .iconfont {
    font-size: 20px;
    color: #e24a64;
    margin-left: 10px;
}

.user-avatar {
    display: flex;
    justify-content: space-between;
}

.user-icons {
    display: flex;
    align-self: center;
    width: 190px;
}

.user-icons .icons-in {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: fb9f1a;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.user-icons .icons-in em {
    color: white;
    font-size: 20px;
    font-style: normal;
}

.user-icons .user-name {
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    flex-direction: column;
}

.user-icons .user-name span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 125px;
    height: 24px;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.user-top-icon .trade-info {
    width: 420px;
    padding-left: 30px;
    display: flex;
}

.user-top-icon .trade-info .item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.user-top-icon .trade-info .item.capital {
    width: 60%;
}

.user-icons .user-name span.uid {
    color: #8994a3;
    font-size: 12px;
}

.circle-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 2px solid #ebeff5;
    margin-left: 14px
}

.circle-info span {
    font-weight: bolder;
}

.circle-info p {
    color: #8994a3;
    margin: 0;
    padding: 0;
}

.circle-info p.count {
    color: #0d214e;
    font-size: 14px;
    font-weight: 600;
}

.user-avatar-public {
    background: #fff;
    border-radius: 50%;
    height: 52px;
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
    position: relative;
}

.user-avatar-public>.user-avatar-in {
    background: #fb9f1a;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
