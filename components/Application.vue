<template>
    <div>
        <Row type="flex" justify="center" align="middle">
            <Card>
                <div class="wrapContentPic">
                    <Row type="flex" justify="space-around">
                        <Col span="8" class="bot_item">
                            <img src="../assets/img/certifiedBusiness/booth.png" alt="">
                            <h5>专属展位</h5>
                        </Col>
                        <Col span="8" class="bot_item">
                            <img src="../assets/img/certifiedBusiness/one.png" alt="">
                            <h5>一对一服务</h5>
                        </Col>
                        <Col span="8" class="bot_item">
                            <img src="../assets/img/certifiedBusiness/lower_fees.png" alt="">
                            <h5>更低手续费</h5>
                        </Col>
                    </Row>
                </div>
                <div class="wrapContentWord">
                    <Row type="flex" justify="center">
                        <div>
                            请将如下材料用邮件发送至<a>abcde@abcd.com</a>,我们将尽快对您的申请进行审核。
                        </div>
                    </Row>
                </div>
                <div class="wrapContentChoose">
                    <Row type="flex" justify="space-around">
                        <Col span="8" class="bot_item">
                            <ul>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">手机</li>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">微信</li>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">QQ</li>
                            </ul>
                        </Col>
                        <Col span="8" class="bot_item">
                            <ul>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">个人资产情况</li>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">是否从事过数字资产的场外交易</li>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">是否有相应的风控策略</li>
                            </ul>
                        </Col>
                        <Col span="8" class="bot_item">
                            <ul>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">身份证正反面照片</li>
                                <li><img src="../assets/img/certifiedBusiness/yes.png" alt="">用户手持身份证照片</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div class="wrapContentBtn">
                    <Row type="flex" justify="center">
                        <div>
                            <Checkbox v-model="checkbox" size="large" @on-change="changeCheckbox" class="checkboxWord">
                                <router-link target="_blank" to="/certifiedAgreement">我已阅读《认证商家协议》</router-link>
                            </Checkbox>
                        </div>
                    </Row>
                    <Row type="flex" justify="center">
                        <div>
                            <Button @click="handleSubmit" style="width:600px;height:50px;font-size:18px;" type="primary" long size="large">确认申请</Button>
                        </div>
                    </Row>
                </div>
            </Card>
        </Row>
    </div>
</template>
<style scoped>
    .wrapContentPic{
        min-width: 1200px;
        margin:0 auto;
    }

    .wrapContentPic h5{
        font-size: 20px;
        margin-top: 36px;
        font-weight: normal;
    }

    .wrapContentPic .bot_item{
        margin-top: 98px;
        margin-bottom: 84px;
    }

    .wrapContentWord{
        width: 88%;
        height: 98px;
        border: 1px solid #eae9ee;
        margin:0 auto;
        font-size:16px;
        color: #0c0e1b;
        padding:40px 30px;
    }

    .wrapContentWord a{
        color: #058ddb;
    }

    .wrapContentChoose{
        margin: 50px 0 174px;
    }

    .wrapContentChoose ul{
        text-align:left;
        margin-left: 148px;
    }

    .wrapContentBtn .checkboxWord{
        color:#068edc;
        font-size: 16px;
        margin-bottom: 42px;
        text-decoration:underline;
    }
    .wrapContentBtn{
        margin-bottom: 120px;
    }
</style>
<script>
export default {
    data () {
        return {
            checkbox: false
        };
    },
    methods: {
        changeCheckbox(){
            console.log(this.checkbox);
        },
        handleSubmit(){
             if (this.checkbox==true) {
                this.$http.get(this.host + '/uc/approve/certified/business/apply')
                .then(response => {
                    console.log(response);
                    var resp = response.body;
                    if (resp.code == 0) {
                        // this.currentStep = 2;
                        this.$router.push('/certifiedBusiness/applicationStatus');
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }else{
                this.$Notice.error({
                    title: '温馨提示',
                    desc: '请点击我已阅读'
                });
            };
        }
    },
    mounted () {
    }
};
</script>
