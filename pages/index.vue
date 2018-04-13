<template>
   <div>
      <div class='titls'>
                 <Row type="flex" justify="end" class="code-row-bg routerlink">
                       <Col span='24'><router-link to="/converter">兑换器</router-link></Col>
                       <Col span='24'><router-link to="/withfriend">我的团队</router-link></Col>
                       <Col span='24'><router-link to="/advance">提前赎回</router-link></Col>
                 </Row>
              </div>
        <div id="fullpage">
            <div class="section" id="page1">
                 <img src="../assets/img/index1.png"  width="100%" height="100%"/>
                 <div class='page1text' style='top:10%'>
                    <span class='blueline'></span>
                    <p style='padding-top:15px'>中国币民安全的租赁与交换平台</p>
                 </div>
                 <div class='page1text' style='top:30%;width:400px;height:400px;left:70%'>
                            <div class="box" id="clock">
                            <!-- 原点 -->
                            <div class="origin"></div>
                            <!-- 时钟数 -->
                            <div class="dot_box">
                                <div class="dot">6</div>
                                <div class="dot">5</div>
                                <div class="dot">4</div>
                                <div class="dot">3</div>
                                <div class="dot">2</div>
                                <div class="dot">1</div>
                                <div class="dot">12</div>
                                <div class="dot">11</div>
                                <div class="dot">10</div>
                                <div class="dot">9</div>
                                <div class="dot">8</div>
                                <div class="dot">7</div>
                            </div>
                            <!-- 时、分、秒针 -->
                            <div class="clock_line hour_line" id="hour_line"></div>
                            <div class="clock_line minute_line" id="minute_line"></div>
                            <div class="clock_line second_line" id="second_line"></div>
                            <!-- 日期 -->
                            <div class="date_info" id="date_info" style='display:none'></div>
                            <!-- 时间 -->
                            <div class="time_info" >
                                <div class="time" id="hour_time"></div>
                                <div class="time" id="minute_time"></div>
                                <div class="time" id="second_time"></div>
                            </div>
                        </div>
                 </div>
            </div>
            <div class="section" id="page2">
               <img src="../assets/img/index2.png"  width="100%" height="100%"/>
                 <div class='page1text page2text' style='top:15%'>
                    <span class='blueline orangeline'></span>
                    <p style='padding-top:15px;color:red'>DRCRED-民主祥和之币</p>
                 </div>
                 <div class='page1text' style='top:5%;left:90%;width:61px; height:61px;border-radius:2px'>
                     <img src="../assets/img/logo.png" alt="" />
                 </div>
                  <div class='page1text'  style='top:72%;height:60px; width:600px;left:350px;color:red'>
                      锁仓30天 每天0.8%的回报
                  </div>
                  <div class='page1text'  style='top:80%;height:60px; width:600px;left:500px;color:red'>
                      锁仓60天 每天1%的回报
                  </div>
                  <div class='page1text'  style='top:88%;height:60px; width:600px;left:600px;color:red'>
                      锁仓90天 每天1.2%的回报
                  </div>
            </div>
            <div class="section" id="page3">
                 <img src="../assets/img/index3.png"  width="100%" height="100%"/>
                 <div class='page1text page3text'>
                    <span class='blueline'></span>
                    <p style='padding-top:15px'>DRCRED币总量为2100万,目前开采出596万个,采用先进的POW+POS混合机制,没有扩容争议</p>
                 </div>
                  <div class='page1text' style='top:10%;left:4%;width:61px; background:#fff;height:61px;border-radius:2px'>
                     <img src="../assets/img/logo.png" alt="" />
                 </div>
            </div>

        </div>
        <div id="nav">
            <ul>
                <li><a @click="goAnchor('#page1')"></a></li>
                <li><a @click="goAnchor('#page2')"></a></li>
                <li><a @click="goAnchor('#page3')"></a></li>
            </ul>
        </div>
    </div>
</template>
<script>

var $=require('jquery');

export default {
    data(){
        return {

            symbol:''
        }
    },
    created:function(){
        this.init();
        require(["../assets/js/index.js"],function(e){
            e.scrollFunction();
        });
        require(["../assets/js/time.js"],function(e){
            e.showtime();
        });

    },
    mounted:function(){

    },

    methods:{
        init(){
        },


        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector);
            $('html,body').animate({scrollTop: anchor.offsetTop}, 1000);
            //document.documentElement.scrollTop = anchor.offsetTop;
        }

    }

}
</script>
<style>
.titls{ position:fixed;width:100px; height:150px;z-index:5000;top:300px;left:20px}
.routerlink .ivu-col-span-24{ padding:10px;font-size:20px}
.routerlink .ivu-col-span-24 a{color:red;}
    #fullpage{
        background:#040417;
    }
    .section{
        height:640px;
        text-align:center;
        color:#fff;
    }
    #nav{
        position:fixed;
        right:10%;
        top:50%;
        z-index:100;
    }
    #nav ul li {
        display: block;
        width: 120px;
        height: 25px;
        margin: 7px;
        position:relative;
        padding-right:20px;
        text-align:right;
        color:#fff;
    }

    #nav ul li a{
        top: 2px;
        right: 2px;
        width: 8px;
        height: 8px;
        background:#ddd;
        position: absolute;
        z-index: 5000;
        border-radius:4px;
    }
    #nav ul li a:hover,#nav ul li a.active{
        top: 0;
        right: -3px;
        width:18px;
        height:18px;
        border-radius:9px;
        background:#fb9f1a;
        position: absolute;
        z-index: 1;
    }
    #page1{position:relative;}
    .page1text{ position:absolute;left:53%;width:500px; height:150px;top:35%;font-size:35px;text-align:left;margin-left:-250px}
    .page2text{ left:15%}
    .page3text{ left:50%;font-size:30px;color:#fff}
    #page2{position:relative;}
    .blueline{ display:block; width:50px;;height:3px;border-bottom:3px solid #2aa1fc;font-size:25px}
    .orangeline{ border-bottom:3px solid #f97c04;}
    #page3{
        position:relative;
        color:#979797;

    }

    @-webkit-keyframes fadeinB {
        0% {
            top:50% ;
            opacity:0;
            }
        100% {
            top:30%;
            opacity:1;
            }
    }
    @keyframes fadeinB {
         0% {
            top:50% ;
            opacity:0;
            }
        100% {
            top:30%;
            opacity:1;
            }
    }
    @-webkit-keyframes fadeinA {
        0% {
            top:60% ;
            opacity:0;
            }
        100% {
            top:40%;
            opacity:1;
            }
    }
    @keyframes fadeinA {
        0% {
            top:60% ;
            opacity:0;
            }
        100% {
            top:40%;
            opacity:1;
            }
    }
    .box{ width: 400px; height: 400px; border:4px solid #8bf2f1;margin:30px auto; border-radius: 50%;
        box-shadow: 0px 0px 20px 3px #444 inset; position: relative;}
    /*原点*/
    .origin{ width: 20px; height: 20px; border-radius: 50%; background: #ff0000; top:190px; left: 190px; position: absolute;}
    /* 指针 */
    .clock_line{ position: absolute;position:absolute;z-index:20;}
    .hour_line{width:100px;height:4px;top:198px;left:200px;background-color:#000;border-radius:2px;
        transform-origin:0 50%;box-shadow:1px -3px 8px 3px #aaa;}
    .minute_line{width:130px;height:2px;top:199px;left:190px;background-color:#000;
        transform-origin:7.692% 50%;box-shadow:1px -3px 8px 1px #aaa;}
    .second_line{width:170px;height:1px;top:199.5px;left:180px;background-color:#f60;
        transform-origin:11.765% 50%;box-shadow:1px -3px 7px 1px #bbb;}

    .dot_box{width: inherit; height: inherit;}
    /*时钟数*/
    .dot{ width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 15px; position: absolute;}
    .clock-scale{width:195px;height:2px;transform-origin:0% 50%;z-index:7;
      position:absolute;top:199px;left:200px;}
    .scale-show{ width:12px;height:2px;background-color:#555;float:left;}
    .scale-hidden{width:183px;height:2px;float:left;}
    /*日期*/
    .date_info{width:160px;height:28px;
        line-height:28px;text-align:center;position:absolute;top:230px;left:120px;z-index:11;color:#555;}
    .time_info{ width: 105px; height: 35px; line-height: 35px;text-align:center;position:absolute;top:270px;left:150px;z-index:11;color:yellow; background: #b40617; }
    .time{ width: 35px ;height:35px; float: left; color: #fff; font-size: 15px;}
     #minute_time{border-left:1px solid #fff;border-right:1px solid #fff;}

</style>