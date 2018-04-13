<template>
     <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content">
                <Card :bordered="false" class="conBox">
                <div class="form-box" style='position:relative'>
                      <div style='position:absolute;width:30px; height:30px;top:0px;right:0px;border-radius:50%;border:2px solid #ccc;text-align: center;'>
                                <router-link to="/index" style="font-size:20px;line-height:30px">X</router-link>
                      </div>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="85" >
                        <FormItem style="text-align:center;">
                            <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" style='border:none' :class="{active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </FormItem>
                        <FormItem prop="username" label="用户名">
                            <Input type="text" v-model="formInline.username" placeholder="用户名">
                            </Input>
                        </FormItem>

                        <FormItem prop="user" :label="key">
                            <Input type="text" style="width:100%" v-model="formInline.user" :placeholder="key" size="large">
                                <Select v-model="formInline.userN" slot="prepend" style="width: 110px" v-show="key==='手机号'">
                                    <Option value="0086">+86</Option>

                                </Select>
                            </Input>
                        </FormItem>
                        <FormItem prop="code" v-show="showCode" label="短信验证码">
                            <Input style="width:100%" type="text" size="large" v-model="formInline.code" placeholder="短信验证码">
                                <!-- <span slot="append" id="sendCode" @click="sendCode()"><a>发送验证码</a></span> -->
                                <Button slot="append" @click="sendCode()" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            </Input>
                            <!-- <input id="sendCode" @click="sendCode()" type="Button" value="发送验证码">
                            </input> -->
                        </FormItem>
                        <FormItem prop="password" label="登录密码">
                            <Input type="password" v-model="formInline.password" placeholder="登录密码(8位)" :maxlength="passlength" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="repassword" label="确认密码">
                            <Input type="password" v-model="formInline.repassword" placeholder="确认密码" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="share" label="邀请码">
                            <Input type="text" v-model="formInline.share" placeholder="邀请码" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="checkbox" style="float:right;">
                            <Checkbox v-model="formInline.checkbox" label="我已阅读并同意" @on-change="changeCheckbox" style="color:#979797;font-size:16px;">我已阅读并同意</Checkbox>
                            <a href="#" target="_blank" style="color:#fb9f1a;font-size:16px;" >《用户协议》</a>
                        </FormItem>
                        <Button style="width:100%;padding-top:12px" type="warning" size="large" :disabled="buttondis" long @click="handleSubmit('formInline')">注册</Button>
                        <div class="forget-control">
                            <p>已有账号？请</p>
                            <router-link to="/login"><a href="#" class="acolor">点击登录&gt;&gt;</a></router-link>
                        </div>
                    </Form>
                </div>
            </Card>
         </Col>
        </div>
    </div>
</template>
<script>
export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if(this.changeActive==0){
                    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(value==''){
                        callback(new Error('请输入手机号'))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error('手机号码格式不正确,请重新输入'));
                    }else{
                        callback();
                    }
                }else{
                    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                    if(value==''){
                        callback(new Error('请输入邮箱'))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error('邮箱格式不正确,请重新输入'));
                    }else{
                        callback();
                    }
                }
            };
            const validateRepassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入确认密码'));
                    } else if (value !== this.formInline.password) {
                        callback(new Error('两次密码输入不一致!'));
                    } else {
                        callback();
                    }
            };
            return {
                buttonLists:[
                    {
                        "text":"手机号注册"
                    }
                ],
                changeActive:0,
                showCode:true,
                passlength:8,
                buttondis:false,
                hasGetIdentifyCode: false,  // 是否点了获取验证码
                canGetIdentifyCode: false,  // 是否可点获取验证码
                gettingIdentifyCodeBtnContent: '发送验证码',  // “获取验证码”按钮的文字
                checkbox:false,
                formInline: {
                    username:'',
                    userN: '0086',
                    user: '',
                    code:'',
                    share:'',
                    password: '',
                    repassword:'',
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', min: 3, max: 15, message: '用户名长度不能少于3位,多于15位', trigger: 'blur' }
                    ],
                    select: [
                        { required: true, message: '请选择国家', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, validator: validateUser, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { type: 'string', min: 8, message: '密码长度8位', trigger: 'blur' }
                    ],
                    repassword: [
                        { required: true, validator: validateRepassword, trigger: 'blur' }
                    ],
                    share: [
                        { required: true, message: '输入邀请码', trigger: 'blur' }
                    ]
                },
                key:'',
                // code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
　　　　　　 }
        },
        
        created:function(){
            this.withurl();
            this.actives(this.changeActive);
        },
        methods: {
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.showCode=true;
                    this.key='手机号';
                    this.ruleInline.code=[{ required: true, message: '请输入短信验证码', trigger: 'blur' }];

                }else{
                    this.showCode=false;
                    this.key='邮箱';
                    this.ruleInline.code=[];
                }
            },
             withurl(){
                 if(this.$router.currentRoute.query.code!='undefined'){
                     this.formInline.share=this.$router.currentRoute.query.code;
                 }  
             },
            changeCheckbox(checkbox){
                this.checkbox=!this.checkbox;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.checkbox==true){
                            if(this.changeActive==1){
                             /* 多余的邮箱注册！   var params={};
                                params['email']=this.formInline.user;
                                params['password']=this.formInline.repassword;
                                params['username']=this.formInline.username;
                                params['country']=this.formInline.select;

                                this.$http.post(this.host+'/uc/register/email',params).then(response => {
                                    var resp=response.body;
                                    if(resp.code==0){
                                        this.$Notice.success({
                                            title: '温馨提示',
                                            desc: resp.message
                                        });
                                        var that=this;
                                        setTimeout(() => {
                                            that.$router.push('login');
                                        },3000)
                                    }else{
                                        this.$Notice.error({
                                            title: '温馨提示',
                                            desc: resp.message
                                        });
                                    }
                                })*/
                            }else{
                                var params={};
                                params['phone']=this.formInline.user;
                                params['username']=this.formInline.username;
                                params['password']=this.formInline.repassword;
                                params['code']=this.formInline.code;
                                params['promotion']=this.formInline.share;

                                this.$http.post(this.host+'/uc/register/phone',params).then(response => {
                                    var resp=response.body;
                                     this.buttondis=true;
                                    if(resp.code==0){
                                        this.$Notice.success({
                                            title: '温馨提示',
                                            desc: resp.message
                                        });
                                        var that=this;
                                        setTimeout(() => {
                                            that.$router.push('/');
                                        },1000)
                                    }else{
                                         this.buttondis=false;
                                        this.$Notice.error({
                                            title: '温馨提示',
                                            desc: resp.message
                                        });
                                    }
                                })
                            }
                        }else{
                            this.$Notice.error({
                                title: '温馨提示',
                                desc: '请点击同意'
                            });
                        }

                    } else {

                    }
                })
            },
            sendCode(){
                this.hasGetIdentifyCode = true;
                var mobilePhone=this.formInline.user;
                if(mobilePhone==""){
                    this.$Notice.error({
                        title: '温馨提示',
                        desc: '请输入手机号'
                    });
                    return;
                }else{
                    this.canGetIdentifyCode = true;
                    let countdown = 60;
                    let timer = setInterval(() => {
                        if (countdown >= 0) {
                            this.gettingIdentifyCodeBtnContent = countdown + '秒后重试';
                            countdown -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '发送验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.$http.post(this.host+'/uc/mobile/code',{phone:mobilePhone}).then(response => {
                            var resp=response.body;
                            if(resp.code==0){
                                this.$Notice.success({
                                    title: '温馨提示',
                                    desc: resp.message
                                });
                            }else{
                                clearInterval(timer);
                                this.gettingIdentifyCodeBtnContent = '发送验证码';
                                this.canGetIdentifyCode = false;
                                this.$Notice.error({
                                    title: '温馨提示',
                                    desc: resp.message
                                });
                            }
                    })

                }

            }
        }
    }
</script>
<style scoped>
.ivu-btn:hover{ border:1px solid #fb9f1a;}

input { outline:none;}

.login {
    width: 100%;
    height: 100%;
    background:url(../../assets/img/login/login_background.png) no-repeat center;
    background-size: cover;
}
.login-content {
    width: 756px;
    padding: 60px 0;
    margin: 0 auto;
}
.login-title {
    text-align: center;
    margin-top: 24px;
    font-size: 2.25em;
    color: #48a5f5;
    font-weight: normal;
}
.login-content .conBox{
    height:620px;
}
.form-box {
    padding: 10px 70px;
}
.form-box .btStyle{
    width: 100%;
    height: 42px;
    margin-right:90px !important;
    font-size: 1.125em;
    margin-bottom: 24px;
}

.form-box .active{
    background: #fb9f1a;
    color: #fff;
}

.form-box .forget-control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    font-size: 16px;
}
.ivu-btn.active, .ivu-btn:active{ border-color:none !important}
</style>