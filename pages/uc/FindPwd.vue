<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content">
            <Card :bordered="false">
                <div class="form-box">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="108">
                        <FormItem style="text-align:center;">
                            <ButtonGroup>
                                <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                            </ButtonGroup>
                        </FormItem>
                        <FormItem prop="user" :label="key">
                            <Input type="text" v-model="formInline.user" :placeholder="key" size="large">

                            </Input>
                        </FormItem>
                        <FormItem prop="code" :label="code">
                            <Input style="width:68%" type="text" v-model="formInline.code" :placeholder="code" size="large">

                            </Input>
                            <input id="sendCode" @click="sendCode()" type="Button" value="发送验证码">

                            </input>
                        </FormItem>
                        <FormItem prop="password" label="请输入新密码">
                            <Input type="password" v-model="formInline.password" placeholder="请输入新密码" size="large">

                            </Input>
                        </FormItem>
                        <FormItem prop="repassword" label="请再次确认密码">
                            <Input type="password" v-model="formInline.repassword" placeholder="请再次确认密码" size="large">

                            </Input>
                        </FormItem>
                        <Button style="width:100%;" type="primary" size="large" long @click="savedata">保存</Button>
                        <div class="forget-control">
                            <p>已有账号？请</p>
                            <router-link to="login"><a href="#" class="register">点击登录&gt;&gt;</a></router-link>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
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
                        "text":"重置手机密码"
                    }

                ],
                changeActive:0,
                countdown:60,
                formInline: {
                    user: '',
                    code:'',
                    password: '',
                    repassword:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validateRepassword, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ]
                },
                key:'',
                code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
　　　　　　 }
        },
        created:function(){
            this.init();
            this.actives(this.changeActive);
        },
        methods: {
            init(){
                this.$store.state.HeaderActiveName='1-4';
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.key='手机号';
                    this.code='短信验证码';
                    this.ruleInline.user[0].message='请输入手机号';
                    this.ruleInline.code[0].message='请输入短信验证码';
                }else{
                    this.key='邮箱';
                    this.code='邮箱验证码';
                    this.ruleInline.user[0].message='请输入邮箱';
                    this.ruleInline.code[0].message='请输入邮箱验证码';
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('重置密码成功');
                    } else {

                    }
                })
            },
            settime(){
                var obj=document.getElementById('sendCode');
                if(this.countdown == 0) {
                    obj.removeAttribute("disabled");
                    obj.value = "发送验证码";
                    this.countdown = 60;
                    return;
                } else {
                    obj.setAttribute("disabled", true);
                    obj.value = this.countdown;
                    this.countdown--;
                }
                var that=this;
                setTimeout(function() {
                    that.settime()
                }, 1000)

            },
             savedata(){
                 let _data={
                      account:this.formInline.user,
                      code:this.formInline.code,
                      password:this.formInline.repassword
                 }
                     this.$http.post(this.host+'/uc/member/reset/login/password',_data).then(res=>{
                         console.log(res)
                         if(res.body.code=='0'){
                           this.$Message.success(res.body.message);
                           this.$router.push({name:'logins'})
                         }
                         else{
                             this.$Message.error(res.body.message)
                         }
                     })
                 },
            sendCode(){
                this.settime();
                var mobilePhone=this.formInline.user;
                this.$http.post(this.host+'/uc/mobile/reset/code',{account:mobilePhone}).then(response => {
                        var resp=response.body;

                        if(resp.code==0){
                          this.$Notice.success({
                            title: '温馨提示',
                            desc: '请注意查收短信'
                        });
                        }else{
                            this.countdown=0;
                            this.$Notice.error({
                                title: '温馨提示',
                                desc: resp.message
                            });
                        }
                })
            }
        }
    }
</script>
<style>
/*  */
.form-box .btStyle{
    width: 174px;
    height: 42px;
    font-size: 1.125em;
    color: #88befa;
    background:#fff;
    margin-bottom: 24px;
}
.form-box .active{
    background: #0199ef;
    color: #fff;
}
#sendCode {
    position: absolute;
    border: 0;
    top: 0;
    right: 0;
    width: 30%;
    height:100%;
    color: #D5851D;
    cursor: pointer;
}

.login {
    width: 100%;
    height: 100%;
    background:url(../../assets/img/login/login_background.png) no-repeat center;
    background-size: cover;
}

.login-content {
    width: 756px;
    padding: 70px 0;
    margin: 0 auto;
}

.login-title {
    text-align: center;
    margin-top: 24px;
    font-size: 2.25em;
    color: #48a5f5;
    font-weight: normal;
}

.form-box {
    /* width: 756px;
    height: 560px; */
    /* margin: 0 auto;
    background: #fff; */
    padding: 50px 70px;
}

/* .form-box .formInput{
    width: 486px;
}
.form-box .ivu-form-item-error-tip{
    float: right;
} */
.form-box .ivu-form-item {
    /* margin-bottom: 12px;实际 */
    /* margin-bottom: 20px;
    vertical-align: top; */
    /* zoom: 1; */
}

.form-box .dv_handler_ok_bg{
    background:#66cc66;
    border-radius:4px !important;
}

.form-box .forgetCode{
    font-size:16px;
    color:#78b8f6;
    float: right;
    margin-bottom: 20px;
}

.form-box .forget-control {
    margin-top: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    font-size: 16px;
}

</style>
