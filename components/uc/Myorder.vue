<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear">
                <div class="order_box">
                    <Tabs value="name1" @on-click="showItem">
                        <TabPane label="所有订单" name="name1">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrder" :data="tableOrder"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="dataCount" :current="1" @on-change="changePage" :page-size="pageSize" show-total></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="已完成" name="name2">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrder" :data="completedOrder"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="completedCount" :current="1" @on-change="completedChangePage" :page-size="pageSize" show-total></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="已取消" name="name3">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrder" :data="canceledOrder"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="canceledCount" :current="1" @on-change="canceledChangePage" :page-size="pageSize" show-total></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="未付款" name="name4">
                            <div class="order-table">
                                <Table stripe :columns="tableColumnsOrder" :data="nonpaymentOrder"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="nonpaymentCount" :current="1" @on-change="nonpaymentChangePage" :page-size="pageSize" show-total></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <Input v-model="ordKeyword" slot="extra" @on-change="handleSearch" icon="ios-search" placeholder="输入订单编号开始搜索" style="width: 250px;margin-right: 20px;"></Input>
                    </Tabs>

                </div>

            </div>
        </div>
    <Modal
        v-model="modal1"
        title="上传付款截图"
         @on-ok="sendfu">
         <input type="hidden" name="imgPreview" :value="imgPreview" />
        <img id="frontCardImg" :src="frontCardImg">
        <div class="acc_sc">
            <Upload ref="upload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
            </Upload>
        </div>
    </Modal>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
             modal1:false,
             imgPreview:'',
             userid:'',
            ordKeyword: '',
            choseBtn: 0,
            whichItem: 1,
            tableOrder: [],
            tableOrder2: [],
            
            completedOrder:[],
            canceledOrder:[],
            nonpaymentOrder:[],

            initTable1: [],
            initTable2: [],
            ajaxtableOrder: [],
            ajaxtableOrder2: [],
            // 初始化信息总条数
            dataCount: 0,
            dataCount2: 0,
            completedCount:0,
            canceledCount:0,
            nonpaymentCount:0,
            // 每页显示多少条
            pageSize: 10,
            pageNo:1,
            frontCardImg:'',
            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',
        }
    },
    methods: {


     frontHandleSuccess (res, file) {
            this.frontCardImg=this.imgPreview=res.data;
        },
     sendfu(){
              if(this.imgPreview==''){
                this.$Message.error('请上传照片');
                return false
              }
              else{
               let param = {}
                       //暂定一个
                param['idCardFront']=this.imgPreview
                this.$http.post(this.host + '/uc/approve/real/name', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('照片上传成功');
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
               }
                  },

      init() {
            // this.$store.state.HeaderActiveName = '4';
            this.$store.commit('navigate','4');
            if (localStorage.TOKEN == 'null' && localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
            else{
                this.$http.get(this.host2+'/otc/order/self').then(res=>{
                    this.tableOrder=res.body.data.list;
                    this.dataCount=res.body.data.totalNumber;

                    console.log(res)

                })
                this.$http.get(this.host2+'/otc/order/self?status=COMPLETED').then(res=>{
                    this.completedOrder=res.body.data.list;
                    this.completedCount=res.body.data.totalNumber;      
                })
                this.$http.get(this.host2+'/otc/order/self?status=CANCELLED').then(res=>{
                    this.nonpaymentOrder=res.body.data.list;
                    this.nonpaymentCount=res.body.data.totalNumber;      
                })
            }
        },
        // 获取历史记录信息
        handleListApproveHistory() {

        },
        changePage(pageNo) {
               this.pageNo=pageNo;
                  this.$http.get(this.host2+'/otc/order/self?pageNo='+this.pageNo).then(res=>{
                       this.tableOrder=res.body.data.list;
                       this.dataCount=res.body.data.totalNumber;
                    })     

        },
        completedChangePage(pageNo){
            this.pageNo=pageNo;
                  this.$http.get(this.host2+'/otc/order/self?status=COMPLETED&pageNo='+this.pageNo).then(res=>{
                       this.completedOrder=res.body.data.list;
                        this.completedCount=res.body.data.totalNumber; 
                    })   
        },
        canceledChangePage(pageNo){
            this.pageNo=pageNo;
                  this.$http.get(this.host2+'/otc/order/self?status=CANCELLED&pageNo='+this.pageNo).then(res=>{
                       this.canceledOrder=res.body.data.list;
                        this.canceledCount=res.body.data.totalNumber;
                    })   
        },
        nonpaymentChangePage(pageNo){
            this.pageNo=pageNo;
                  this.$http.get(this.host2+'/otc/order/self?status=NONPAYMENT&pageNo='+this.pageNo).then(res=>{
                       this.nonpaymentOrder=res.body.data.list;
                        this.nonpaymentCount=res.body.data.totalNumber;
                    })   
        },
        // getOrder(status, pageNo, pageSize) {
        //     let params = {}
        //     params['status'] = status
        //     params['pageNo'] = pageNo;
        //     params['pageSize'] = pageSize
        //     this.$http.post(this.host + '/otc/order/self', params).then(response => {
        //         var resp = response.body;
        //         if (resp.code == 0 && resp.data.content) {
        //             this.tableOrder = resp.data.content
        //             this.dataCount = resp.data.totalElement
                  
        //         }else {
        //             this.$Message.error(resp.message);
        //         }
        //         this.loading = false
        //     })

        // },

        search(data, argumentObj) {
        },
        handleSearch() {

        },
        onsuccess(res){
                   this.$Message.success(res);
        },
        sendfu(){

        },
        showItem(name) {
            // if (name == 'name1') {
            //     this.whichItem = 1
            // }
            // else if (name == 'name3') {
            //     this.whichItem = 3
            // }
            // else if (name == 'name4') {
            //     this.whichItem = 0
            // }

            // this.changePage(0)

        }

    },
    created() {

       // this.changePage(0);
       this.init();
    },
    mounted() {

    },
    computed: {
        tableColumnsOrder() {
            let columns = [];
            let self = this;
            columns.push({
                title: '订单号',
                key: 'orderSn'
            });
            columns.push({
                title: '买方',
                key: 'customerMobilePhone',
                width:'120px',
                align:'center'
            });
            columns.push({
                title: '数量(DRC)',
                key: 'number',
                align: 'center',
                width:'100'
            });
            columns.push({
                title: '单价(CNY)',
                key: 'price',
                align: 'center',
            });
             columns.push({
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

            });
            columns.push({
                title: '创建时间',
                key: 'createTime',
                align: 'center',
            });
            columns.push({
                title: '卖方',
                key: 'mobilePhone',
                width:'120px',
                align: 'center'
            });
             columns.push({
                title: '支付宝',
                key: 'alipay',
                align: 'center',
                render:(h,params)=>{
                       const row=params.row;
                       if(row.alipay!=null){
                           const aliNo=row.alipay.aliNo;
                           return h('span',{},aliNo)
                       }
                }
            });
             columns.push({
                title: '微信号',
                key: 'wechatPay',
                align: 'center',
                render:(h,params)=>{
                    if(params.row.wechatPay!=null){
                      const weixin=params.row.wechatPay.wechat
                      return h('span',{},weixin)
                    }
                }
            });
            return columns;
        },
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
    padding-top: 30px;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #fb9f1a solid 1px;
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
    color: #fb9f1a;
    background: #fb9f1a;
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
    border-left: 5px solid #fb9f1a;
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
    color: #fb9f1a;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fb9f1a;
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
    background-color: #fb9f1a;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #fb9f1a;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fb9f1a;
    color: #fb9f1a;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fb9f1a;
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
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.order_box {
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
