<template>
    <div class="nav-right tradeCenter">
        <section class="trade-group merchant-top">
            <!-- <i class="merchant-icon tips"></i>
            <span class="tips-word">广告中心</span> -->
            <!-- <a href="/user/merchants">申请为认证商家&gt;&gt;</a> -->
            <CheckboxGroup v-model="listSelect" style="margin-left:60px;color:#7a7a7a;">
                <Checkbox label="">
                    <span style="font-size:16px;">仅显示</span>
                    <span style="color:#b3d5fa;font-size:16px;">  认证商家？</span>
                </Checkbox>
                <Checkbox label="仅显示在线" style="font-size:16px;">
                </Checkbox>
            </CheckboxGroup>
        </section>
        <section class="list-content">
            <!--列表表格-->
            <div>
                <div class="table-responsive list-table" justify="center" align="middle" style="margin-top:10px;overflow: hidden;">
                    <Table stripe highlight-row :size="tableSize" :data="tableAdv" :columns="tableColumnsAdv" :loading="loading"></Table>
                </div>
                <div style="margin-top: 66px;overflow: hidden">
                    <Page :total="dataCount" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            showBorder: false,
            showStripe: true,
            showHeader: true,
            showIndex: false,
            showCheckbox: false,
            fixedHeader: false,
            loading: true,
            dataCount: 10,
            tableSize: 'large',
            // --
            tableAdv: [

            ],
            listSelect:[],
        }
    },
    computed: {
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        },
        'coin':function(){
            return this.$route.params[0];
        },
        tableColumnsAdv() {
            let columns = [];
            let self = this;
            columns.push(
                {
                    title: '商家',
                    key: 'memberName',
                    // width: 200,
                    align: 'center',
                    ellipsis: true,
                    render: function(h, params) {
                        let memberName=params.row.memberName.trim();//去掉前后空格
                        return h('div', [
                            h('div', {
                                attrs: {
                                    class: 'user-face user-avatar-public'
                                },

                            }, [
                                h('span', {
                                    attrs: {
                                        class: 'user-avatar-in'
                                    },
                                }, memberName.slice(0, 1)),
                                ]),
                            h('p', [
                                h('a', {
                                    style: {
                                        cursor: 'pointer',
                                        color:'#0d2251',
                                        fontSize:'14px'
                                    },
                                    class: {
                                        // renzhengA: params.row.renzheng
                                    },
                                    on: {
                                        click: function() {
                                            if (self.isLogin) {
                                                self.$router.push('/checkuser?id=' + params.row.memberName);
                                            } else {
                                                self.$router.push('/login');
                                            }
                                        }
                                    }
                                }, params.row.memberName),
                                h('div', {
                                    class: {
                                        // renzheng: params.row.renzheng
                                    }
                                }, ''),
                            ])
                        ]);
                    }
                });
            columns.push({
                title: '近30日成交',
                key: 'transactions',
                align: 'center'
            });
            columns.push({
                title: '支付方式',
                key: 'payMode',
                align: 'center',
                render (h, params) {
                    const row = params.row;
                    let payMode = row.payMode.split(',');
                    let payBeChoose=[];
                    payMode.map((s,index)=>{
                        if(s=="支付宝"){
                            payBeChoose.push(h('Avatar', {
                                attrs: {
                                    src: require('../assets/img/alipay.png'),
                                    class:'payMode-margin'
                                },
                            }))
                        };
                        if(s=="微信"){
                            payBeChoose.push(h('img', {
                                attrs: {
                                    src: require('../assets/img/wechat.png'),
                                    class:'payMode-margin'
                                },
                            }))
                        };
                        if(s=="银联"){
                            payBeChoose.push(h('img', {
                                attrs: {
                                    src: require('../assets/img/bankcard.png'),
                                    class:'payMode-margin'
                                },
                            }))
                        }
                    });
                    return payBeChoose;
                }

            });
            columns.push({
                title: '数量',
                key: 'remainAmount',
                align: 'center',
            });
            columns.push({
                title: '价格/币',
                key: 'price',
                align: 'center',
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'buyPrice'
                            },
                        }, params.row.price+'CNY'),
                        h('p', {
                            attrs: {
                                class: 'limitPrice'
                            },
                        }, params.row.minLimit+'-'+params.row.maxLimit+'CNY'),
                    ]);
                },
            });
            columns.push({
                title: '操作',
                key: 'buyBtn',
                align: 'center',
                render: function(h, params) {
                    // var defaultStyle = {//默认颜色，买入的颜色
                    //     background:'#f85117',
                    //     marginRight: '8px',
                    //     width: '160px',
                    //     height:'40px'
                    // };
                    // var defaultAction="买入";
                    // if(params.row.advertiseType == 0){
                    //     defaultStyle =  {//卖出的颜色
                    //         background:'#25a842',
                    //         marginRight: '8px',
                    //         width: '160px',
                    //         height:'40px'
                    //     };
                    //     defaultAction = "卖出";
                    // }
                    return h('p', [
                        h('Button', {
                            style: {//卖出的颜色
                                background:'#25a842',
                                marginRight: '8px',
                                width: '120px',
                                height:'40px'
                            }
                        }, [
                            h('a', {
                                style: {
                                    fontSize:'16px',
                                    color: '#fff'
                                },
                                on: {
                                    click: function() {
                                        if (!self.$store.getters.isLogin) {
                                            self.$router.push('/login');
                                        } else if (!self.$store.getters.member) {
                                            self.$Message.error('请先进行实名认证');
                                            setTimeout(() => {
                                                self.$router.push('/membercenter/safe');
                                            }, 2000)
                                        } else {
                                            self.$router.push('/tradeInfoSell?tradeId=' + params.row.advertiseId);
                                        }

                                    }
                                }
                            }, '卖出')
                        ])
                     ]);
                }
            });

            return columns;
        }
    },
    watch:{
        'coin':function(){
            this.reloadAd();
        }
    },
    methods: {
        getAd(pageNo,advertiseType) {
            //获取广告
            let params = {};
            params['pageNo'] = pageNo;
            params['pageSize'] = 10;
            params['advertiseType'] = advertiseType;
            params['unit'] = this.coin;
            this.$http.post(this.host + this.api.otc.advertise, params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableAdv = resp.data.context;
                    this.dataCount = resp.data.totalElement
                } else {
                    this.$Message.error(resp.message);
                }
                this.loading = false
            })
        },
        changePage(page){
            console.log("changePage:page="+page+",tab="+this.tabPage);
        },
        reloadAd(){
            this.getAd(1,0);
        }
    },
    created() {
        this.reloadAd();
    }
}
</script>
<style >
.payMode-margin{
  margin-right:8px;
}

.buyPrice {
  font-size: 16px;
  font-weight: bolder;
  color: #0c2150;
}

.tradeCenter button span,
.tradeCenter button a,
.tradeCenter button a:hover {
    display: block;
    color: white;
}

.tradeCenter .ivu-poptip-popper button span {
    display: block;
    color: inherit;
}

#carousel {
    margin-bottom: 40px;
}

#List {
    background-color: #f7f7fa;
    width: 1200px;
}

#List .nav-right {
    color: #26264c;
    padding-right: 0 !important;
    padding-left: 15px;
}

#List .nav-right .bread {
    font-size: 16px;
}

#List .nav-right .bread a {
    color: #e24a64;
    display: inline-block;
    padding-left: 1rem;
    cursor: pointer;
}

#List .nav-right .list-content {
    color: #0d214e;
    height:500px;
    padding: 10px;
}

#List .nav-right .list-content .list-title {
    box-shadow: 0 4px 0 0 rgba(69, 112, 128, .06);
    -webkit-box-shadow: 0 4px 0 0 rgba(69, 112, 128, .06);
    z-index: 1;
    position: relative;
}

#List .nav-right .list-content .list-title .search {
    background-color: #fff;
    height: 40px;
    padding: 6px 12px;
}

#List .nav-right .list-content .list-title .search .dropdown-box {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
}

#List .nav-right .list-content .list-title .search .dropdown-box .select-menu {
    border: transparent;
    outline: none;
    background-color: transparent;
}

#List .nav-right .list-content .list-title .search .dropdown-box .select-items {
    width: 25%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.nav .open>a,
.nav .open>a:hover,
.nav .open>a:focus {
    background: transparent;
}

#List .nav-right .list-content .list-title .search-btn {
    background-color: #c5cdd7;
    display: flex;
    justify-content: center;
    border-radius: 0 4px 4px 0;
}

#List .nav-right .list-content .list-title .search-btn span {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
}

#List .nav-right .list-content .list-title .search-btn em {
    height: 36px;
    line-height: 36px;
    margin-left: 6px;
    font-style: normal;
}

/* #List .nav-right .list-content .list-table table {
    table-layout: fixed;
}

#List .nav-right .list-content .list-table tr:nth-of-type(even) {
    background-color: #fff;
}

#List .nav-right .list-content .list-table tr>td {
    vertical-align: middle;
    line-height: normal;
    width: 25%;
}

#List .nav-right .list-content .list-table .table>tbody>tr>td {
    border-top: 1px solid transparent;
    text-align: left;
    height: 75px;
} */

/* #List .nav-right .list-content .list-table .user-name {
    display: flex;
    justify-content: flex-start;
    padding-left: 5%;
} */

#List .nav-right .list-content .list-table .user-name .user-icon {
    background: #00b5f6;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
}

#List .nav-right .list-content .list-table .user-name .user-icon span {
    font-size: 20px;
    color: white;
    align-self: center;
}

#List .nav-right .list-content .list-table .user-name .user-info {
    margin-left: 5%;
    width: 100px;
    word-wrap: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#List .nav-right .list-content .list-table .user-name .user-info p {
    height: 16px;
    margin: 0 0 3px;
}

#List .nav-right .list-content .list-table .user-name .user-info .merchant {
    height: 17px;
    width: 67px;
    display: inline-block;
    /* background: url("../../images/comm/merchant-flag.png") no-repeat; */
}

#List .nav-right .list-content .list-table .price p {
    font-size: 16px;
    font-weight: bolder;
    color: #444f71;
}

#List .nav-right .list-content .list-table .price h5 {
    font-size: 12px;
    color: #8994a3;
    margin-top: 0;
}

#List .nav-right .list-content .list-table .Btn a {
    border-radius: 6px;
    background-color: transparent;
    color: #e24a64;
    display: inline-block;
    padding: 6px;
    width: 100px;
    text-align: center;
    text-decoration: none;
}

#List .nav-right .list-content .list-table .Btn .sell {
    background-color: #0db124;
    color: #fff;
}

#List .nav-right .list-content .list-table .Btn .buy {
    background-color: #ed7325;
    color: #fff;
}

#List .nav-right .list-content .pagelist {
    display: flex;
    justify-content: flex-end;
}

#List .nav-right .list-content .pagelist ul {
    list-style: none;
}

#List .nav-right .list-content .pagelist ul li {
    display: inline-block;
    background-color: #ebeff5;
    height: 32px;
    width: 32px;
    text-align: center;
    line-height: 32px;
    border: 1px solid #c5cdd7;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 2px;
}

#List .nav-right .list-content .pagelist ul li:hover {
    background-color: #c5cdd7;
}

#List .nav-right .list-content .pagelist ul li a {
    color: #26264c;
}

#List .header-search {
    width: 100%;
}

#List .select-items select {
    width: initial;
}

#List .list-payMethod {
    width: 80%;
    display: inline-block;
    word-break: keep-all;
}

.select-items .form-control {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.nav-pills .dropdown a {
    color: #555555 !important;
}

.has-success .control-label {
    color: #26264c !important;
}

.merchant-top {
    height: 84px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    color: #0d214e;
}

.merchant-item {
    padding: 20px 15px 20px 15px;
    background: #fff;
    width: 31%;
    float: left;
    margin: 0 1%;
}

.merchant-item.center {
    margin: 0 1.5%;
}

.merchant-item .item-hd {
    /* background: url("../../images/trade/merchant_item_split.png") left bottom no-repeat; */
    padding-bottom: 20px;
    display: flex;
    align-items: center;
}

.merchant-item .item-hd .item-face {
    width: 42px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    border-radius: 42px;
    -webkit-border-radius: 42px;
    color: #fff;
    background: #00b5f6;
}

.merchant-item .item-hd .item-name {
    padding: 0 10px;
}

.merchant-item .item-hd .item-name p {
    margin-bottom: 0;
}

.merchant-item .item-hd .item-name p:first-child {
    color: #0d214e;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.merchant-item .item-hd .item-name p:last-child {
    color: #5c68a6;
    font-size: 12px;
}

.merchant-item .text-right {
    display: flex;
    justify-content: flex-end;
}

.merchant-item .text-right .online-status-box {
    color: #18b111;
    display: flex;
}

.merchant-item .item-hd .item-pay {
    flex-grow: 2;
    text-align: right;
}

.merchant-item .item-hd .item-pay .states {
    height: 17px;
    width: 67px;
    display: inline-block;
}

.merchant-item .item-hd .item-pay .states.merchant {
    background: url("../assets/img/renzheng.png") no-repeat;
    background-size: 100% 100%;
}

.merchant-item .item-hd .item-pay p {
    font-size: 12px;
    color: #ed7325;
    margin-bottom: 5px;
}

.merchant-item .item-bd {
    padding-top: 10px;
}

.merchant-item .item-bd .price {
    font-size: 14px;
    color: #3e435e;
    font-weight: bold;
}

.merchant-item .item-bd .price span {
    font-size: 12px;
}

.merchant-item .item-bd .limit {
    color: #636981;
    font-size: 12px;
    padding-bottom: 15px;
}

.merchant-item .item-bd .btn {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    padding: 0 12px;
    border-radius: 6px;
    -webkit-border-radius: 6px;
}

.merchant-item .item-bd .btn-buy {
    background: #ed7325;
}

.merchant-item .item-bd .btn-sell {
    background: #0db124;
}

.merchant-items {
    margin-bottom: 40px;
}

.carousel-indicators li {
    width: 30px;
    height: 5px;
    border-radius: 5px;
    -webkit-border-radius: 3px;
    border: none;
    background: #d4d6e1;
}

.carousel-indicators .active {
    width: 30px;
    height: 5px;
    border-radius: 5px;
    -webkit-border-radius: 3px;
    border: none;
    background: #7f8bc6;
    margin: 1px;
}

.carousel-indicators {
    bottom: -30px;
}

.m-intro {
    width: 33.33%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.m-intro p {
    color: #474e72;
    font-weight: bold;
    font-size: 14px;
}

.m-subtitle {
    line-height: 40px;
    padding-left: 20px;
    background: #f7f7fa;
    color: #636981;
    font-size: 12px;
}

.m-data-lf {
    width: 20%;
    float: left;
    display: flex;
    align-items: center;
}

.m-data-cn {
    width: 45%;
    float: left;
    display: flex;
    align-items: center;
}

.m-data-rf {
    width: 35%;
    float: left;
    display: flex;
    align-items: center;
}

.online-status-box {
    height: 20px;
}

.headerimg {
    color: rgb(245, 106, 0);
    background-color: rgb(253, 227, 207);
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
}

.headerimg~p {
    display: inline-block;
}

.price {
    font-size: 16px;
    font-weight: bolder;
    color: #444f71;
}

.price2 {
    font-size: 12px;
    color: #8994a3;
    margin-top: 0;
}

.renzheng {
    height: 17px;
    width: 67px;
    display: inline-block;
    background: url("../assets/img/renzheng.png") no-repeat;
    background-size: 100% 100%;
    transform: translateY(-10px);
    display: block;
}

.renzhengA {
    transform: translateY(-10px);
    display: block;
}

.tjbtn {
    width: 80%;
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
    background: #49a5f6;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
}

.ivu-table-cell .user-avatar-public {
    width: 42% !important;
    display: inline-block;
    margin: 20px 14px 10px 0;
    vertical-align: middle;
}

.ivu-table-cell .user-avatar-public>.user-avatar-in {
    transform: translate(4px, 5px);
}

.ivu-table-cell .user-avatar-public~p {
    width: 60%;
    display: inline-block;
}

</style>
