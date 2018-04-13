<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <div class="col-xs-12 rightarea-con">
                    <div class="form-group">
                        <span>
                            起止时间 ：
                        </span>
                        <DatePicker type="date"></DatePicker>
                        <span>
                            至
                        </span>
                        <DatePicker type="date"></DatePicker>
                        <span>
                            操作类型 ：
                        </span>
                        <Select v-model="recordValue" style="width:200px">
                            <Option v-for="item in recordType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button type="primary" style="padding: 6px 50px;margin-left:10px;">搜索</Button>
                    </div>
                    <div class="order-table">
                        <Table stripe :columns="tableColumnsRecord" :data="tableRecord"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :pageSize="pageSize" :current="page+1" @on-change="changePage"></Page>
                            </div>
                        </div>
                    </div>
                </div>
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
            ordKeyword: '',
            recordValue: '',
            recordType: [
                {
                    value: '充值',
                    label: '充值'
                },
                {
                    value: '提现',
                    label: '提现'
                },
                {
                    value: '转账',
                    label: '转账'
                }
            ],
            pageSize:10,
            page:0,
            total:0,
            tableRecord: [

            ],
        }
    },
    created:function(){
       // this.getList(this.page);
    },
    methods: {
        changePage() {
            console.log(this.tradeWay)
        },
        getList(pageNo) {
            //获取tableRecord
            let params = {}
            params['pageNo'] = pageNo;
            params['pageSize'] = this.pageSize;
            this.$http.post(this.host + '/uc/asset/transaction/all', params).then(response => {
                var resp = response.body;
                if (resp.content) {
                    this.tableRecord = resp.content
                    this.total = resp.totalElements
                    this.loading = false
                    this.page = resp.number;
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
    },
    computed: {
        tableColumnsRecord() {
            let columns = [];
            columns.push({
                // title: this.$t('交易时间'),
                title: '交易时间',
                align: 'center',
                key: 'createTime',
            });
            columns.push({
                title: '类型',
                key: 'type',
                align: 'center',
                render:function(h,params){
                    if(params.row.type == 0){
                        return '充值';
                    }
                    else if(params.row.type == 1){
                        return '提现';
                    }else{
                        return '转账';
                    }
                }
            });
            columns.push({
                title: '数量',
                key: 'amount',
                align: 'center',
            });
            columns.push({
                title: '手续费',
                key: 'amount',
                align: 'center',
            });
            columns.push({
                title: '状态',
                key: 'status',
                align: 'center',
                render:(h,params)=>{
                    return '已完成'
                }
            });
            return columns;
        }
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
    color: #8994A3;
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
