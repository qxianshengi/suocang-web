<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List" style='background:#b40617;'>
                <Row>
                    <Col span="4" style='margin-left:8px'>
                        <div class="leftmenu">
                            <ul class="nav nav-pills nav-stacked">
                                <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1" style="font-weight:bold">
                                    钱包地址
                                </span>
                                <li class="">
                                    <router-link to="/moneymanagem/assets">个人资产</router-link>
                                </li>
                                <li class="">
                                    <router-link to="/moneymanagem/record">账单明细</router-link>
                                </li>
                                <li class="">
                                    <router-link to="/moneymanagem/recharge">充值</router-link>
                                </li>
                                <li class="">
                                    <router-link to="/moneymanagem/withdraw">提币</router-link>
                                </li>
                            </ul>
                        </div>
                        <div style='width:300px;height:120px;background:#b40617;color:yellow;text-align:left;font-size:12px;line-height:30px'>
                                <p>您的BTC地址:<br />{{btcdata.address}}</p>
                                <p>您的DCR地址:<br />{{dcrdata.address}}</p>
                        </div>
                    </Col>
                    <Col span="19"  style='margin-left:20px'>
                    <router-view></router-view>
                    <p style="padding-left:25px;color:yellow;font-size:28px;">请牢记您的BTC唯一充值地址: {{btcdata.address}}</p>
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
               btcdata:[],
               dcrdata:[]
        }
    },
    methods: {
        getmoneyaddress(){
            this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
          //  console.log(res)
           this.btcdata=res.data.data[0];
           this.dcrdata=res.data.data[1];
                            })
        },

        init() {
            if (localStorage.TOKEN == 'null' && localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        }
    },
    created: function() {
            this.getmoneyaddress();

    },
}
</script>
<style>
.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #fb9f1a !important;
}

.icon4 {
    background: url('../../assets/img/moneyicon1.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon5 {
    background: url('../../assets/img/moneyicon2.png') no-repeat 0 0;
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

</style>

