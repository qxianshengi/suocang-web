<style scoped>
    .wrapContentPic{
        min-width: 1200px;
        margin:100px auto;
    }

    .wrapContentPic h5{
        font-size: 18px;
        font-weight: normal;
        margin-top:36px;
        color:#333333;
    }
    .wrapContentPic .contentPic{
        width:30%;
        text-align:center
    }
    .wrapContentWord{
        width: 88%;
        height: 98px;
        border: 1px solid #eae9ee;
        margin:100px auto;
        font-size:18px;
        color: #a0a0a0;
        padding:20px 0;
    }

    .wrapContentWord p{
        text-align:center;
    }

</style>

<template>
    <div>
        <Row type="flex" justify="center" align="middle">
            <Card>
                <div class="wrapContentPic">
                    <Row type="flex" justify="center">
                        <div v-if="$store.state.currentStep == 2" class="contentPic">
                            <img src="../assets/img/certifiedBusiness/audit.png" alt="">
                            <h5>您已提交认证申请，审核中...</h5>
                        </div>
                        <div v-else class="contentPic">
                            <img src="../assets/img/certifiedBusiness/pass.png" alt="">
                            <h5>恭喜！您的审核已通过</h5>
                        </div>
                    </Row>
                </div>
                <div class="wrapContentWord" v-show="$store.state.currentStep == 2">
                    <Row type="flex" justify="center">
                        <div>
                            <p>您已提交申请，请确认已将相关资料发送至指定邮箱，工作人员将于3个工作日内通过审核，</p>
                            <p>审核通过后保证金将划转至您的保证金账户。</p>
                        </div>
                    </Row>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    methods: {
    },
    created () {

    }
};
</script>
