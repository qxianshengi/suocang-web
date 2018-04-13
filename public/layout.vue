<template>
    <div>
        <div class="app-header">
            <div class="layout">
             <div class='infoshow'>
                <Row type='flex' justify='center' class='code-row-bg'  >
                     <Col span='4' class='yellowcolor'> &nbsp;&nbsp;DCR开盘价&nbsp; 500</Col>
                     <Col span='4' class='yellowcolor'>&nbsp;&nbsp; 场外价格&nbsp; {{outprice}}</Col>
                     <Col span='4' class='yellowcolor'>&nbsp;&nbsp;平台价格&nbsp; {{inprice}}</Col>
                     <Col span='4' class='yellowcolor'>&nbsp;&nbsp;DCR/BTC&nbsp; {{dbprice}}</Col>
                     <Col span='4' class='yellowcolor'>&nbsp;&nbsp;&nbsp;日期 :{{date}}</Col>
                </Row>
             </div>

                <div class="layout-header">
                    <div class="ww">
                        <Row type="flex" justify="center" align="middle" class="code-row-bg">
                            <Col span="2" class="logobox">
                                <a href="#"><img src="../assets/img/logo.png" /></a>
                            </Col>
                            <Col span="19" class="navbox">
                                <Row type="flex" justify="start" class="code-row-bg">
                                    <Menu mode="horizontal" theme="light" :active-name="activeNav">
                                        <MenuItem name="1">
                                            <router-link to="/index">{{$t("nav.homePage")}}</router-link>
                                        </MenuItem>
                                         <MenuItem name="7">
                                            <router-link to="/notice">{{$t("nav.advertise")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="2">
                                            <router-link to="/tradingcenter">交换中心</router-link>
                                        </MenuItem>
                                        <MenuItem name="4">
                                            <router-link to="/moneymanagem/assets">资产中心</router-link>
                                        </MenuItem>
                                         <MenuItem name="8">
                                            <router-link to="/moneymanagem/withdraw">提币</router-link>
                                        </MenuItem>
                                        <MenuItem name="6">
                                            <router-link to="/membercenter/safe">{{$t("nav.userCenter")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="3">
                                            <router-link to="/ordermanagement/myorder">{{$t("nav.orderCenter")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="5">
                                            <router-link to="/suocang">{{$t("nav.certifiedBusiness")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="9">
                                            <router-link to="/customerservice">售后服务</router-link>
                                        </MenuItem>
                                    </Menu>
                                </Row>
                            </Col>
                             <Col span="3">
                               <div class="layout-ceiling-main profile">
                                  <div class="profile" v-if="isLogin">
                                     <div>
                                            <span>{{member.data.username}}</span>
                                            <span class="logout" @click="logout" style="cursor:pointer">[{{$t("header.logout")}}]</span>
                                        </div>
                                 </div>
                                  <div class="acolor" v-else>
                                    <router-link to="/loginReal">{{$t("header.login")}}</router-link>
                                    <span>&nbsp;&nbsp;</span>
                                    <router-link to="/register">{{$t("header.reg")}}</router-link>
                                 </div>
                                </div>
                             </Col>
                           <!-- <Col span="4" class="rightBtn">
                            <router-link to="/editad">
                                <Button class="adv" type="primary" size="large">
                                    {{$t("nav.advertise")}}
                                </Button>
                            </router-link>
                            </Col> -->
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-content">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </div>

        <div class="floats">

            <Script src="https://qiyukf.com/script/a8ce131a51445a0baaf2cacfd9a500a4.js"></Script>
            <BackTop :height="0" :bottom="200">
                <div class="top" style='z-index:200;' id="navhader">
                        <Row type="flex" justify="end" class="code-row-bg">
                            <Col span="24" class='navhover' ><router-link to="/converter">兑换器</router-link></Col>
                            <Col span="24" style='background:#fff'><router-link to="/converter"><img src="../assets/img/x1.png" /></router-link> </Col>
                        </Row>
                        <Row type="flex" justify="end" class="code-row-bg">
                             <Col span="24" class='navhover'><router-link to="/withfriend">团队</router-link></Col>
                            <Col span="24" style='background:#fff'><router-link to="/withfriend"><img src="../assets/img/x2.png" /></router-link> </Col>
                        </Row>
                        <Row type="flex" justify="end" class="code-row-bg converter">
                            <Col span="24" class='navhover'><router-link to="/advance">赎回</router-link></Col>
                            <Col span="24" style='background:#fff'><router-link to="/advance"><img src="../assets/img/x3.png" /></router-link> </Col>
                        </Row>
                        <Row type="flex" justify="end" class="code-row-bg">
                            <Col span="24"  class='navhover'>返回顶部</Col>
                            <Col span="24" style='background:#fff'><img src="../assets/img/x4.png" /></Col>
                        </Row>
                </div>
            </BackTop>
        </div>
        <div class="footer">
            <div class="footer_box">
                   <Row type="flex" justify="start" class="code-row-bg">
                        <Col span="5" >
                           <span  style='color:#fff;font-size:40px'>Decred</span>
                           <Row type="flex" justify="center" class="code-row-bg">
                               <Col span="20" style='color:#fff;font-size:18px' >
                                   丹嵎电商 <br />
                                   荣誉出品
                               </Col>
                            </Row>
                        </Col>
                        <Col span="6" offset="6" class='wihtecolor'>
                             <Row type="flex" justify="center" class="code-row-bg">
                                <Col span="10" >
                                   <Row type="flex" justify="center" class="code-row-bg" >
                                    <Col span="24" class='ul_header'>
                                         <a href="/#/question" target="_blank">{{$t("footer.commonProblem")}}</a>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                          <a href="/#/agreement" target="_blank">{{$t("footer.usageAgreement")}}</a>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                           <a href="/#/rate" target="_blank">{{$t("footer.rateDescription")}}</a>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                           <a href="mailto:support@huobi.pro" target="_blank">{{$t("footer.mailbox")}}</a>
                                    </Col>
                                </Row>
                                </Col>
                                <Col span="10">
                                      <Row type="flex" justify="center" class="code-row-bg" >
                                    <Col span="24" class='ul_header'>
                                         <a href="" target="_blank">联系我们</a>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                         <router-link to=''>联系我们</router-link>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                           <a href="/#/rate" target="_blank">联系我们</a>
                                    </Col>
                                    <Col span="24" class='ul_padding'>
                                           <a href="mailto:support@huobi.pro" target="_blank">联系我们</a>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="4" offset="1"  class='ul_header'>
                            <Row type="flex" justify="start" class="code-row-bg">
                             <Col span='20' style='text-align:left'>{{$t("footer.contact")}}</Col>
                           </Row>
                           <Row type="flex" justify="start" class="code-row-bg" style='margin-top:8px'>
                             <Col span='5'><img src="../assets/img/facebook.png" /></Col>
                             <Col span='5'><img src="../assets/img/weixin.png" /></Col>
                             <Col span='5'><img src="../assets/img/weibo.png" /></Col>
                             <Col span='5'><img src="../assets/img/twitter.png" /></Col>
                           </Row>
                        </Col>

                    </Row>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
              dbprice:'',
              date:'',
              outprice:'',
              inprice:''
        }
    },
    computed: {
        'activeNav': function() {
            return this.$store.state.activeNav;
        },
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        }
    },
    created: function() {
       this.init();
       this.getprice();
    },
    methods: {
          getprice(){
                  this.$http.get(this.host+'/uc/dcr-price').then(res=>{
                     // console.log(res)

                     this.dbprice=res.body.data.todayBtc;
                     this.inprice=res.body.data.todayIn;
                     this.outprice=res.body.data.todayOut
                })
                },
        init() {
            this.$store.commit('navigate','1');
            this.$store.commit('recoveryMember');
             var day1 = new Date();
             day1.setTime(day1.getTime());
             this.btcanddcr=(this.btcprice)/(this.drcprice);
             var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
             this.date=s1;
           // this.checkLogin();

        },
        logout() {
            this.$http.get(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;

                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit('setMember',null);
                    location.href = "/";
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        checkLogin() {
            this.$http.post(this.host + '/uc/check/login', {}).then(response => {
                var result = response.body;
                if(result.code == 0 && result.data == false){
                   this.$store.commit('setMember',null);
                }
            });
        }

    }
}
</script>
<style>

/*common 颜色修改*/
.acolor{ color:#fb9f1a}
.yellowcolor{ color:yellow}
.redcolor{ color:#d64937}
.layout-ceiling-main a {
    color: #fc9b18;
    font-size: 16px;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
    color: #fb9f1a;
    border-bottom: 2px solid #fb9f1a;
}
.navhover{ position:absolute; width:60px; height:60px; line-height:100px;color:#b40617;left:60px;z-index: 800}
.navhover a{ color:#b40617}

.withecolor{ color:#fff}
.publered{ background:#b40617;color:#fff;border:#b40617;}
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* floats */
.floats .top{

    cursor:pointer;
    height:242px;
    font-size:11px;
    color:#b6b6b6;
    text-align:center;
}
.top .ivu-col-span-24{width:60px;height:60px;border:1px solid #ccc;}
.floats .top img{
    padding:14px 12px 8px;
}
#YSF-CUSTOM-ENTRY-1 {
    width:60px !important;
    border-radius: 2px !important;
}

#YSF-BTN-HOLDER {
    position: fixed;
    max-width: 60px !important;
    max-height: 120px;
    bottom: 150px !important;
    display:none
}
#YSF-BTN-HOLDER img {
    margin-left:15px !important;
}

.margin10{margin-top:10px;text-align:left}
.navbox .ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
    padding: 0 !important;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
    color: #fb9f1a;
    border-bottom: 2px solid #fb9f1a;
}

.infoshow{width:100%;height:40px; padding:10px;background:#b40617;color:#fff;text-align:center;font-size:14px;cursor:default;}
.recharge span,
.recharge a {
    display: block;
}

.navbox .ivu-menu-horizontal.ivu-menu-light:after {
    background: #fff;
}

.margin20{margin-top:20px}


.font_left{ text-align:left}
/* header */

.adv a {
    color: #fff;
}

.logobox {
    text-align: left !important;
}

.rightBtn {
    text-align: right !important;
}

.ratio {
    float: left;
    color: #f3f7fa;
}

.ratio span {
    margin-right: 20px;
    font-size: 14px;
}

.navbox a {
    color: #0c214e;
    font-size: 18px;
    margin: 26px;
}

.logobox {
    height: 100px;
    padding-top: 18px;
}

.ww {
    width: 98%;
    margin: 0 auto;
    min-width: 1200px;
}

.ivu-col {
    text-align: center;
}

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;

}

.layout-logo {
    width: 150px;
    height: 50px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
    text-align: center;
}

.layout-header {
    height: 100px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.margin20{margin-top:18px}



/* footer */

.footer {
    width: 100%;
    position: static;
    left: 0px;
    bottom: 0px;
    background:#010101;
}
.footer_box{ padding:30px 10px}
.ul_header{ font-size:17px; color:#808080;padding-top:20px}
.ul_padding{ margin-top:8px;color:#fff;font-size:14px}
.wihtecolor a{color:#fff}
</style>

