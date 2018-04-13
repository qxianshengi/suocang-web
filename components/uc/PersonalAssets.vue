<template>
 <div class="nav-right">
      <div class='myassets'>
           <Row>
              <Col span='4'>总资产</Col>
           </Row>
      </div>
      <Row type="flex" justify="center" class="code-row-bg dars">
          <Col span='20'>
          <!--循环数据-->
            <Row type="flex" justify="start" class="code-row-bg dars">
                  <Col span="4">币种名称</Col>
                  <Col span="4">剩余资产</Col>
                  <Col span="4">充值资产</Col>
                  <Col span="4">兑换资产</Col>
                  <Col span="8">操作</Col>
             </Row>
            <div>
                <Row type="flex" justify="start" class="code-row-bg" style='padding-top:10px'>
                  <Col span="4">BTC</Col>
                  <Col span="4">{{btcdata.balance}}</Col>
                  <Col span="4">{{btcdata.recharge}}</Col>
                  <Col span="4">0</Col>
                  <Col span="8">
                        <Row type="flex" justify="start" class="code-row-bg">
                              <Col span="12"><router-link to="/moneymanagem/recharge"> 充币 </router-link></Col>
                              <Col span="12"><router-link to="/converter"> 兑换 </router-link></Col>
                         </Row>
                  </Col>
              </Row>

            </div>
             <Row type="flex" justify="start" class="code-row-bg dars" style='margin-top:25px;border-top:2px solid #ccc'>
                  <Col span="4">币种名称</Col>
                  <Col span="4">佣金余额</Col>
                  <Col span="4">租赁余额</Col>
                  <Col span="4">冻结余额</Col>
                  <Col span="4">总金额</Col>
                  <Col span="4">&nbsp;</Col>
             </Row>
            <div>
                <Row type="flex" justify="start" class="code-row-bg" style='padding-top:10px'>
                  <Col span="4">DCR</Col>
                  <Col span="4">{{dcrdata.brokerageBalance}}</Col>
                  <Col span="4">{{dcrdata.leaseBalance}}</Col>
                  <Col span="4">{{dcrdata.frozenBalance}}</Col>
                  <Col span="4"> {{zongBalance}}</Col>
                  <Col span="4">

                  </Col>
              </Row>

            </div>
            <Row type="flex" justify="start" class="code-row-bg dars" style='margin-top:25px'>
                  <Col span="4">到期本金</Col>
                  <Col span="4">充值金额</Col>
                  <Col span="4">可用余额</Col>
                  <Col span="4">签到余额</Col>
                  <Col span="8">操作</Col>
             </Row>
            <div>
                <Row type="flex" justify="start" class="code-row-bg" style='padding-top:10px'>
                  <Col span="4">{{dcrdata.balance}}</Col>
                  <Col span="4">{{dcrdata.recharge}}</Col>
                  <Col span="4">{{userbalance}}</Col>
                  <Col span="4">{{dcrdata.signBalance}}</Col>
                  <Col span="8">
                        <Row type="flex" justify="start" class="code-row-bg">
                              <Col span="8"><router-link to="/moneymanagem/recharge"> 充币 </router-link></Col>
                              <Col span="8"><router-link to="/moneymanagem/withdraw"> 提币 </router-link></Col>
                              <Col span="8"><router-link to="/converter"> 兑换 </router-link></Col>
                         </Row>
                  </Col>
              </Row>
            </div>
              <div style='margin-top:10px;position:relative;width:100%;height:50px;background:#b40617;'>
                  <div span="24" class='animates' >财富从锁仓开始</div>
             </div>
          </Col>
      </Row>
 </div>
</template>

<style>
.nav-right{background:#fff;margin-left: 25px;padding-bottom:25px}
.myassets{padding: 0 15px}
.dars{ padding-top:15px;font-size:15px;color:#000000;}
.myassets .ivu-col-span-4{ padding:8px;color:#fb9f1a;border-bottom:2px solid #fb9f1a;font-size:15px}
.animates{color:yellow;font-size:28px;position:absolute;left:0;line-height:50px;animation:mymove 10s ; -webkit-animation:mymove 10s infinite; }
@keyframes mymove
{
  0% {left:0px;}
  50% {left:400px;}
  100% {left:0px;}
}

@-webkit-keyframes mymove /* Safari and Chrome */
{
  0% {left:0px;}
  50% {left:400px;}
  100% {left:0px;}
}
</style>
<script>
 export default{
    data(){
      return{
         btcdata:[],
         dcrdata:[],
         zongBalance:'',
         userbalance:''
      }
    },

   methods:{
        info(){
           this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
                   console.log(res)
                   this.dcrdata=res.data.data[1];
                   this.btcdata=res.data.data[0];
                   this.userbalance=(this.dcrdata.brokerageBalance)+(this.dcrdata.leaseBalance)+(this.dcrdata.signBalance)+(this.dcrdata.balance);
                   this.zongBalance=(this.dcrdata.recharge)+(this.userbalance)+(this.dcrdata.frozenBalance);
                            })
        },
          init(){
                if (localStorage.MEMBER == 'null'&& localStorage.MEMBER == 'null') {
                    this.$Message.error('请先登录');
                      this.$router.push('/login');
                }
                else{
                  this.info();
                }
          }
   },
    created() {
        this.init();
       }
 }
</script>
