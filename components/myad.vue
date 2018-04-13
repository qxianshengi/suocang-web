<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear">

                <div class="order-table">
                    <Table stripe :columns="tableColumnsAdv" :data="tableAdv" ></Table>
                </div>

            </div>
            <!--<Upload action="http:www.luckynewplan.com:6013/uc/upload/oss/image">
                <Button type="ghost" icon="ios-cloud-upload-outline" :on-success='sendimg'>Upload files</Button>
         </Upload>
         <img :src="imgurl" alt="" />-->
        </div>
        <Modal
        v-model="modal1"
        title="确认付款"
        @on-ok="okfukuang">
           <p>点击确认 付款</p>
    </Modal>
    <Modal
        v-model="modal2"
        title="取消订单"
        @on-ok="cancelldingdan">
       <p>点击确认 取消订单</p>
    </Modal>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        let self = this;
        return {
            dataCount: 0,
            tableAdv: [],
            imgurl:'',
            modal1:false,
            modal2:false,
            orderid:'',
            tableColumnsAdv: [
                {
                    title: '订单编号',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '买方广告ID',
                    key: 'buyAdvertiseId',
                    align: 'center'
                },
                {
                    title: '卖方广告ID',
                    key: 'sellAdvertiseId',
                    align: 'center',
                },

                {
                    title: '卖家昵称',
                    key: 'memberName',
                    align: 'center',
                },
                {
                    title: '买家昵称',
                    key: 'customerName',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    render: (h, params) => {
                        let text = ''
                        if (params.row.status == 'NONPAYMENT') {
                            text = '待付款'
                        } else if (params.row.status == 'COMPLETED') {
                            text = '已完成'
                        }
                         else if (params.row.status == 'APPEAL') {
                            text = '申诉中'
                        }
                         else if (params.row.status == 'PAID') {
                            text = '已付款'
                        }
                        else if (params.row.status == 'CANCELLED') {
                            text = '已取消'
                        }
                        return h('div', [
                            h('p', text),
                        ]);
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: '180',
                    align: 'center',
                },
                    {
                        title: '操作',
                        key: 'xx',
                         width:160,
                        render: (h, params) => {
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1=true;
                                             this.orderid=params.row.id;
                                        }
                                    }
                                }, '付款'),
                                   h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                              this.orderid=params.row.id;
                                              this.modal2=true;
                                        }
                                    }
                                }, '取消')
                            ]);
                          }


                    }
            ],
        }
    },
    methods: {
        remove(index) {
            this.tableAdv.splice(index, 1);
        },
        changePage() {
            console.log(this.tradeWay)
        },
        sendimg(res,file){
            this.imgurl=res.data;
        },
        okfukuang(){
         let _fukuangdata={
            paymentScreensho:'',
            orderId:this.orderid
         }
            this.$http.patch(this.host2+'/otc/order/buy/confirm',_fukuangdata).then(res=>{
                 if(res.body.code=='0'){
                     this.$Message.success(res.body.message);
                         this.getAd();
                 }
                else{
                     this.$Message.error(res.body.message)
                 }
            })
        },
        cancelldingdan(){
               this.$http.post(this.host2+'/otc/order/'+ this.orderid+'/cancel').then(res=>{
                 if(res.body.code=='0'){
                     this.$Message.success(res.body.message);
                         this.getAd();
                 }
                else{
                     this.$Message.error(res.body.message)
                 }
            })
        },
        getAd() {
            //获取个人广告
            this.$http.get(this.host2+'/otc/order/pending-payment-self').then(response => {
                var resp = response.body;
                console.log(resp);
                if (resp.code == 0) {
                    this.tableAdv = resp.data.list;
                    this.dataCount = resp.data.length

                } else {
                    this.$Message.error(resp.message);
                }
            })
        }

    },
    computed: {

    },
    created() {
        this.getAd()
    }
}
</script>
<style scoped>
.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
    padding: 20px 0;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;
    padding-bottom: 125px;
}

.rightarea .trade-process {
    line-height: 30px;
    padding: 0 15px;
    background: #f1f1f1;
    display: inline-block;
    position: relative;
    margin-right: 20px;
}

.rightarea .trade-process.active {
    color: #eb6f6c;
    background: #f9f5eb;
}

.rightarea .trade-process .icon {
    background: #fff;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
}

.rightarea .trade-process .arrow {
    position: absolute;
    top: 10px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
    border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
    border: none;
}

.rightarea .rightarea-tabs li>a {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-right: 0;
    font-size: 14px;
    color: #646464;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
    width: 125px;
    height: 40px;
    position: relative;
    margin: -1px 0 0 -1px;
    border: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #da2e22;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fdfaf3;
    color: #9e9e9e;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fdfaf3;
    line-height: 40px;
    margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
    font-size: 16px;
}

.rightarea .recordtitle {
    cursor: pointer;
}

.nav-right {
    width: 98%;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.order_box {
    width: 100%;
    background: #fff;
    height: 56px;
    line-height: 56px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccf2ff;
    position: relative;
    text-align: left;
}

.order_box a {
    color: #0B0D1B;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 54px;
    display: inline-block;
}

.order_box .active {
    border-bottom: 2px solid #00b5f6;
}

.order_box .search {
    position: absolute;
    width: 300px;
    height: 32px;
    top: 12px;
    right: 0;
    display: flex;
    /* border: #c5cdd7 solid 1px; */
}
</style>
/*
,
                    render: (h, params) => {
                        let text = ''
                        if (params.row.advertiseType == 0) {
                            text = '在线购买'
                        } else if (params.row.advertiseType == 1) {
                            text = '在线出售'
                        }
                        return h('div', [
                            h('p', text),
                        ]);
                    }
 */