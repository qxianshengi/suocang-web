<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content" style='padding-top:108px'>
            <Card :bordered="false" class="conBox">
                <h5 class="login-title">{{$t("login.Welcomelanding")}}</h5>
                <div class="form-box">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="50" id="my-form">
                        <FormItem prop="user" label="账号">
                            <Input type="text" v-model="formInline.user" placeholder="请输入邮箱或手机" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="password" label="密码">
                            <Input type="password" v-model="formInline.password" placeholder="请输入密码" size="large">
                            </Input>
                        </FormItem>

                        <p id="notice" class="hide">请先完成验证</p>
                        <router-link to="/findPwd" class="forgetCode acolor">
                            忘记密码？
                        </router-link>
                        <Button type="warning" @click.prevent="handleSubmit('formInline')" long size="large">立即登录</Button>
                        <div class="forget-control">
                            <p>没有账号？请</p>
                            <router-link to="register"><a href="#" class="acolor">点击注册&gt;&gt;</a></router-link>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
        <Modal
        v-model="modal1"
        title="问题回答"
        @on-ok="ok('formInline')">
             <h4>{{$t("login.questionfirst")}}</h4><br />
             <Input  v-model='questionfirst' placeholder="Enter ..."></Input>
             <h4 style='padding-top:15px'>{{$t("login.questionsecond")}}</h4> <br />
             <Input  v-model='questionsecond' placeholder="Enter ..."></Input>
    </Modal>
    </div>
</template>
<script>
import gtInit from '../../assets/js/gt.js';
import $ from 'jquery';
export default {
    components:{

    },
    data() {
        return {
            _captchaResult:null,
            questionfirst:'',
            questionsecond:'',
            modal1:false,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入帐号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不小于6字节', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loginshow(){
          this.ishow=true;
        },

        ok(formInline){
               if(this.questionfirst!='民主祥和'&&this.questionsecond!='2100万'){
                      this.$Message.error('抱歉！问题回答错误');
               }
               else{
                     var result = this._captchaResult;
                this.$refs[formInline].validate((valid) => {
                    if (valid) {
                        var params = {
                            'username':this.formInline.user,
                            'password':this.formInline.password,
                          //  'geetest_challenge': result.geetest_challenge,
                          //  'geetest_validate': result.geetest_validate,
                          //  'geetest_seccode': result.geetest_seccode
                        };
                        this.$http.post('http://www.luckynewplan.com:6103/uc/login', params).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success('登录成功');
                                this.$store.commit('setMember',response.body);
                                // this.$store.commit('setToken',resp.data.token);
                                // localStorage.setItem('MEMBER', JSON.stringify(resp.data));
                                //localStorage.setItem('TOKEN', resp.data.token);
                                // ..
                                this.$store.state.username = JSON.parse(localStorage.getItem("MEMBER")).username;
                                if (JSON.parse(localStorage.getItem("MEMBER")).realName || localStorage.getItem("realName")) {
                                    // this.$store.getters.member = true;
                                    // console.log(this.$store.getters.member + 'lll')
                                }
                                this.$router.push({name:'safes'});

                            } else {
                                this.$Message.error(resp.message);
                            }
                        })
                    } else {
                        // this.$Message.error('登录失败!');
                    }
                })

               }
        }
         ,
        handleSubmit() {
          this.modal1=true;
        }
    },
    created :function() {
       // this.initGtCaptcha();
    }
}
</script>
<style scoped>
/* 验证码 */
#captcha {
    width: 530px;
    display: inline-block;
}
.show {
    display: block;
}
.hide {
    display: none;
}
#notice {
    color: red;
}
label {
    vertical-align: top;
    line-height: 50px !important;
    display: inline-block;
    width: 50px;
    text-align: center;
    font-size:12px;
}
#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
/*  */
.login {
    width: 100%;
    height:750px;
    background:url(../../assets/img/login/login_background.png) no-repeat center;
    background-size:cover;
    background-position:center;
    position:relative;
}
.login_div{ position:absolute; width:600px; height:190px; top:15%;left:50%;margin-left:-300px; }
.login_div_top{width:600px;background:url(../../assets/img/login/login_1.png) no-repeat center;background-size: 100%;width:600px; height:150px}
.login_div_a{ width:200px;height:40px;float:left;background:#fd930b;margin-left:75px;border-radius:8px;color:#fff;text-align:center; font-size:16px;line-height:40px;cursor:pointer;}
.login_div_b{ margin-left:50px;border:2px solid #fefeff;background:none}
.login-content {
    width: 756px;
    padding:0;
    margin: 0 auto;
}
.login-content .conBox{
    height:550px;
}
.login-title {
    text-align: center;
    margin-top: 24px;
    font-size: 2.25em;
    color: #555555;
    font-weight: normal;
}
.ivu-btn.active, .ivu-btn:active{ border-color:none}
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