<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record account-box">
                <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                <div class="message" v-if="this.changeActive==0">
                    <p class="tips">以下网址是您对外界进行推广的地址，您可以通过朋友、QQ、微信、微博、博客、论坛或者自己的网站进行推广，所有通过该地址访问过来的人，注册后就都属于您的用户，而当这些用户在本站提交策略时，您就可以赚取佣金了，详细的推广情况可到访问记录里查看。</p>
                    <div class="inner-box deposit-address">
                        <p class="describe">您的推广链接</p>
                        <div class="title">
                            <Input v-model="qrcode.value" readonly style="width: 600px" size="large"></Input>
                            <a v-clipboard:copy="qrcode.value" v-clipboard:success="onCopy" v-clipboard:error="onError" href="javascript:;" id="copyBtn" class="link-copy"><Button type="primary" style="width:120px">复制</Button></a>
                        </div>
                    </div>
                </div>
                <div class="message" v-else-if="this.changeActive==1">
                    <Table stripe :columns="tablePromoteFriends" :data="dataPromoteFriends" :loading="loading"></Table>
                </div>
                <div class="message" v-else>
                    <Col span="12" class="commission">
                        <p>当前佣金：<span><strong>{{currentCommission}}</strong>元</span></p>
                    </Col>
                    <Col span="12" class="commission">
                        <p>当前佣金：<span>管理费的<strong>{{commissionPaying}}</strong></span></p>
                    </Col>
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
            buttonLists:[
                {
                    "text":"推广链接"
                },
                {
                    "text":"推广好友"
                },
                {
                    "text":"我的佣金"
                }
            ],
            currentCommission:'0.00',
            commissionPaying:'6%',
            changeActive:0,
            qrcode: {
                value: '',
                size: 200,
            },
            loading: true,
            tablePromoteFriends:[
                {
                    title: '用户名',
                    key: 'address',
                    align: 'center',
                },
                {
                    title: '当前交易',
                    key: 'address',
                    align: 'center',
                },
                {
                    title: '注册时间',
                    key: 'address',
                    align: 'center',
                }
            ],
            dataPromoteFriends:[],
        }
    },
    methods: {
        getList() {
            this.loading=false;
        },
        actives(index){
            this.changeActive=index;
        },
        qrcodeM(){
            this.qrcode.value="http://www.feichangcl.com/？agent=6026"
        },
        onCopy(e) {
            this.$Message.success('复制成功！' + e.text);
        },
        onError(e) {
            this.$Message.error('复制失败！请手动复制');
        },

    },
    created() {
        this.actives(this.changeActive);
        this.qrcodeM();
        this.getList();
    },
    computed: {
    }
}
</script>
<style scoped>
.nav-right {
    width: 1000px;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}
.nav-right .btStyle{
    width: 174px;
    height: 42px;
    font-size: 1.125em;
    color: #a2a0a1;
    background:#fff;
    margin: 50px 0;
}
.nav-right .active{
    background: #49a6f6;
    color: #fff;
}
.rightarea .message{
    width:96%;
    margin:0 auto;
    font-size:16px;
    color:#636363;
    padding-bottom:140px;
}
.nav-right .message .tips{
    text-align:left;
    padding-bottom:50px;
    border-bottom:1px dashed #e9e9e9;
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
.message .title .copy {
    user-select: text;
}
.message .title {
    float:left;
    margin:46px 0 0px 0;
}
.message .inner-box {
    display: table-cell;
    width: 100%;
}
.message a.link-copy {
    margin-left: 10px;
}
.message .describe{
    float:left;
    margin:52px 36px 0 0;
}
.message .commission{
    padding-bottom:50px;
    border-bottom:1px dashed #e9e9e9;
}
.message .commission span{
    color:#ff3533;
}
.message .commission strong{
    font-size:26px;
}
</style>
