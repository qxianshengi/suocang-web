<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                资产中心
                            </span>
                            <li class="">
                                <router-link to="/moneymanagem/index">个人资产</router-link>
                            </li>
                            <li class="">
                                <router-link to="/moneymanagem/record">账单明细</router-link>
                            </li>
                            <li class="">
                                <router-link to="/moneymanagem/recharge">充值</router-link>
                            </li>
                            <li class="">
                                <router-link to="/moneymanagem/withdraw">提现</router-link>
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
    methods: {
        init() {
            // this.$store.state.HeaderActiveName = '4';
            this.$store.commit('navigate','4');
            if (localStorage.TOKEN == 'null' && localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        },
    },
    created: function() {
        this.init();
    },
}
</script>
<style>
.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #00b5f6 !important;
}

.icon4 {
    background: url('../assets/img/moneyicon1.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon5 {
    background: url('../assets/img/moneyicon2.png') no-repeat 0 0;
    background-size: 100% 100%;
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
    font-size: 16px;
    background: 0 0;
    color: #0B0D1B;
    /*border-top: #f1f1f1 solid 1px;
	border-bottom: #f1f1f1 solid 1px;*/
    display: block;
    /* cursor: pointer; */
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
    color: #00b5f6;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}

/* .leftmenu .lefticon {
    width: 26px;
    height: 26px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
} */
</style>

