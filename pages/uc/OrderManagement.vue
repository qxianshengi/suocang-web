<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List" style='background:#e24329'>
                <Row>
                    <Col span="4" style='margin-left:8px'>
                    <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <!-- <i class="lefticon icon3"></i> -->
                                订单中心
                            </span>
                            <li class="">
                                <router-link to="/ordermanagement/myorder">我的订单</router-link>
                            </li>
                            <li class="">
                                <router-link to="/ordermanagement/myad">买家待付款</router-link>
                            </li>
                            <li class="">
                                <router-link to="/ordermanagement/confirm">卖家确认放币</router-link>
                            </li>

                        </ul>
                    </div>
                    </Col>
                    <Col span="19">
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
    created() {
        this.init();
    },
    methods: {
        init() {
            // this.$store.state.HeaderActiveName = '3';
            this.$store.commit('navigate','3');
            if (localStorage.MEMBER == 'null'&& localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        }
    }
}
</script>
<style>
.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #fb9f1a !important;
}

.icon3 {
    background: url('../../assets/img/ordericon.png') no-repeat 0 0;
    background-size: 100% 100%;
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
    min-height: 400px;
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
    color: #fb9f1a;
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

