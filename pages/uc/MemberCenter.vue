<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List" style='background:blue'>
                <Row>
                    <Col span="3" style='margin-left:12px'>
                     <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <!-- <i class="lefticon icon6"></i> -->
                               用户中心
                            </span>
                            <li class="">
                                <router-link to="/membercenter/safe">个人资料</router-link>
                            </li>
                            <li class="">
                                <router-link to="/membercenter/account">收款设置</router-link>
                            </li>

                        </ul>
                     </div>
                     <div class="ul_ol">
                        <ul style='color:yellow;background:#b40617;width:100%;height:155px;padding-top:8px'>
                            <li style='font-size:16px; line-height:30px;'>
                              信用等级与提现时间
                            </li>
                            <li>
                             <i> <img src="../../assets/img/1.png" alt="" /></i>
                             一级会员 每日可提
                            </li>
                            <li>
                             <i> <img src="../../assets/img/2.png" alt="" /></i>
                             二级会员 两日可提
                            </li>
                            <li>
                             <i> <img src="../../assets/img/2.png" alt="" /></i>
                             三级会员 三日可提
                            </li>
                            <li>
                             <i> <img src="../../assets/img/2.png" alt="" /></i>
                             四级会员 四日可提
                            </li>

                        </ul>
                     </div>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
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

        }
    },
    created: function() {
        //this.init();

    },
    methods: {
        init() {

            // this.$store.state.HeaderActiveName = '6';
            this.$store.commit('navigate','6');
            if (localStorage.TOKEN == 'null' && localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        },
    },
}
</script>
<style>
.ul_ol li{ margin-top:5px}
.ul_ol li img{ vertical-align:middle;}
.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #fb9f1a !important;
}

.icon6 {
    background: url('../../assets/img/membericon1.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    background: #eee;
    min-height: 650px;
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
    padding: 20px 15px;
}

.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
}

.nav>li {
    line-height: 50px;
}

.leftmenu .nav-stacked {
    background: #fff;
}

.leftmenu .leftmenu-title {
    line-height: 55px;
    font-size: 17px;
    background: 0 0;
    color: #0B0D1B;
    display: block;
}

.leftmenu .nav>li>a {
    display: block;
    color: #000;
    font-size: 14px;
}

.leftmenu .nav-pills>li.active>a,
.leftmenu .nav>li>a:hover,
.nav-pills>li.active>a:focus,
.nav-pills>li.active>a:hover {
    background: #ebeff5;
    color: #fb9f1a;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}

.leftmenu .lefticon {
    width: 26px;
    height: 26px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
}
</style>

