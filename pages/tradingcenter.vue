<template>
    <div class="backgrounds">
       <div class='main'>
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24" style='height:45px;border-top:3px solid #303242;border-bottom:3px solid #303242;'>
                <Row type="flex" justify="start" class="code-row-bg">
                        <Col span='8' class='border_right'>
                          <Row type="flex" justify="center" class="code-row-bg">
                              <Col span='4'><router-link to="/mytransaction">我的交换</router-link></Col>
                              <Col span='5'>&nbsp;</Col>
                              <Col span='9'>可用DCR :{{dcr}}</Col>
                              <Col span='5' ><router-link to="/moneymanagem/recharge" style='color:#d64937'>充币</router-link></Col>
                          </Row>
                        </Col>

                </Row>
                </Col>
            </Row>
             <Row type="flex" justify="start" class="code-row-bg margin10">
                <Col span="7">
                    <Row type="flex" justify="start" class="code-row-bg" style="border-bottom:1px solid #303242">
                           <Col span='24' class='input'>买入DCR</Col>
                    </Row>
                    <Row type="flex" justify="start" class="code-row-bg">
                           <Col span='24' class='input'>今日买价&nbsp;&nbsp;&nbsp; <span style='color:#ef5c68'>{{newprice}}</span>DCR/CNY</Col>
                    </Row>
                      <Row type="flex" justify="start" class="code-row-bg">
                           <Col span='24' class='input margin20'>
                                   <Input v-model='newprice' placeholder="买入价格 DCR/CNY" style="width: 300px" readonly></Input>
                           </Col>
                           <Col span='24' class='input margin20'>
                                   <Input v-model="buydata.amount" placeholder="买入数量 DCR" style="width: 300px"></Input>
                           </Col>
                           <Col span='24' class='input margin20'>
                                  总 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价 &nbsp;{{amountprice}}CNY/DCR
                           </Col>
                           <Col span='24' class='input' style='margin-top:32px'>
                                 买入DCR不限制次数
                           </Col>
                           <Col span='20' class='input margin20'>
                                  <Button type="error" long @click="buy">买入</Button>
                           </Col>
                     </Row>
                </Col>

                <Col span="7" offset="1">
                    <Row type="flex" justify="start" class="code-row-bg" style="border-bottom:1px solid #303242">
                           <Col span='24' class='input'>卖出DCR</Col>
                    </Row>
                    <Row type="flex" justify="start" class="code-row-bg">
                           <Col span='24' class='input'>今日卖价&nbsp;&nbsp;&nbsp; <span style='color:#ef5c68'>{{newprice}}</span>DCR/CNY</Col>
                    </Row>
                      <Row type="flex" justify="start" class="code-row-bg">
                           <Col span='24' class='input margin20'>
                                  <Select v-model="jydata.moneytype" clearable style="width:200px">
                                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                           </Col>
                           <Col span='24' class='input margin20'>
                                   <Input  v-model="newprice"  placeholder="卖入价格 DCR/CNY" style="width: 300px" readonly></Input>
                           </Col>
                           <Col span='24' class='input margin20'>
                                   <Input v-model="jydata.amount" placeholder="卖出数量 DCR" style="width: 300px"></Input>
                           </Col>
                           <Col span='24' class='input margin20'>
                                  总 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价 &nbsp; {{allprice}}  CNY/DCR(已扣除10%手续费)
                           </Col>
                           <Col span='20' class='input margin20'>
                                  <Button type="success" long @click="sell">卖出</Button>
                           </Col>
                     </Row>
                </Col>
                <Col span="7" offset="1">
                         <Row type="flex" justify="start" class="code-row-bg" style="border-bottom:1px solid #303242">
                           <Col span='24' class='input'>今日成交价&nbsp;&nbsp;&nbsp; <span style='color:#ef5c68'>{{newprice}}</span>DCR/CNY <span style='float:right;margin-right:15px;color:#b40617'>挂单</span></Col>
                         </Row>
                         <Row type="flex" justify="start" class="code-row-bg  input" >
                           <Col span='6' >档位</Col>
                           <Col span='6' >价格(CNY)</Col>
                           <Col span='6'>数量(DCR)</Col>
                           <Col span='6'>成交额(CNY)</Col>
                         </Row>
                         <div style='height:300px;'>
                            <Row type="flex" justify="start" class="code-row-bg  input" v-for="data in guadandata" >
                               <Col span='6'>
                                <div>
                                   <span v-if="data.advertiseType=='BUY'" style='color:#b40617'>买入</span>
                                   <span v-else style='color:#19be6b'>卖出</span>
                                </div>
                               </Col>
                               <Col span='6'>{{data.price}}</Col>
                               <Col span='6'>{{data.remainAmount}}</Col>
                               <Col span='6'>
                                   <div>
                                        <span v-if="data.advertiseType=='BUY'">
                                                {{data.price*data.remainAmount}}
                                        </span>
                                        <span v-else>
                                                  {{data.price*data.remainAmount}}
                                        </span>
                                   </div>
                               </Col>
                           </Row>
                         </div>
                </Col>
            </Row>
       </div>
       <div style="height:400px;">
        <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="24" style='height:25px;border-top:3px solid #303242;'>
                    </Col>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="24" style='height:25px;border-bottom:1px solid #303242;text-align:left;color:#fff;font-size:14px;padding:0 15px'>最新成交纪录
                    </Col>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg" style='padding-bottom:30px'>
                <Col span="24" style='height:25px;'>
                <Row  type="flex" justify="center" class="code-row-bg margin10">
                        <Col span='4'>时间</Col>
                        <Col span='5'>成交价</Col>
                        <Col span='5'>成交量</Col>
                        <Col span='5'>卖方</Col>
                        <Col span='5'>买方</Col>
                </Row>
                <div style='height:300px;'>
                            <Row type="flex" justify="start" class="code-row-bg  input" v-for="data in orderdata" >
                                <Col span='4'>{{data.createTime}}</Col>
                                <Col span='5'>{{data.price}}</Col>
                                <Col span='5'>{{data.number}}</Col>
                                <Col span='5'>{{data.memberName}}</Col>
                                <Col span='5'>{{data.customerName}}</Col>
                            </Row>
                </div>
            </Col>
        </Row>
    </div>
       <Modal
        v-model="modal1"
        title="交易选择"
        @on-ok="ok">
        <Form :model="jydata" :label-width="80">
           <FormItem label="交易方式">
            <Select v-model="jydata.type">
                <Option value="SELL">卖出</Option>
            </Select>
           </FormItem>
           <FormItem label="支付方式">
            <CheckboxGroup v-model="jydata.pay">
                <Checkbox label="支付宝">支付宝</Checkbox>
                <Checkbox label="微信">微信</Checkbox>
                <Checkbox label="银行卡">银行卡</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="交易密码">
            <Input v-model="jydata.password" placeholder="..." type="password"></Input>
           </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="modal2"
        title="交易选择"
        @on-ok="okbuy">
        <Form :model="buydata" :label-width="80">
           <FormItem label="交易方式">
            <Select v-model="buydata.type">
                <Option value="BUY">买入</Option>
            </Select>
           </FormItem>
           <FormItem label="支付方式">
            <CheckboxGroup v-model="buydata.pay">
                <Checkbox label="支付宝">支付宝</Checkbox>
                <Checkbox label="微信">微信</Checkbox>
                <Checkbox label="银行卡">银行卡</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="交易密码">
            <Input v-model="buydata.password" placeholder="..." type="password"></Input>
           </FormItem>
        </Form>
    </Modal>
    </div>
</template>
<script>

export default {
      data(){
       return{
           dcr:'',
           newprice:'',
           buyamout:'',
           modal1:false,
           modal2:false,
           buyprice:'',
           guadandata:[],
           orderdata:[],
           sellprice:'',
           jydata:{
                   type:'SELL',
                   amount:'',
                   pay:[],
                   moneytype:'',
                   password:''
                   },
           buydata:{
                   type:'BUY',
                   amount:'',
                   pay:[],
                   moneytype:'',
                   password:''
                   },
           sellamout:'',
            cityList: [
                    {
                        value: 'CAPITAL',
                        label: '到期本金'
                    },
                    {
                        value: 'LEASE',
                        label: '租赁'
                    },
                    {
                        value: 'BROKERAGE',
                        label: '佣金'
                    },
                    {
                        value: 'SIGN',
                        label: '签到'
                    }
                ],
                model8: ''
       }
    },
    computed:{
       allprice:function(){
           return  parseFloat(this.newprice*this.jydata.amount).toFixed(2);
                         },
       amountprice:function(){
           return  this.newprice*this.buydata.amount;
                              }
    },
    created: function() {
       this.getprice();
       this. getwallet();
      this. getadvertiseall();
      this.getorderlately();
    },
    methods:{
        getadvertiseall(){
               this.$http.get(this.host2+'/otc/advertise/all?pageSize=9').then(res=>{
             this.guadandata=res.body.data.list;
                   })
        },
        getorderlately(){
               this.$http.get(this.host2+'/otc/order/all/lately').then(res=>{
                this.orderdata=res.body.data.list;
                   })
        },
     getprice(){
                 this.$http.get(this.host+'/uc/dcr-price').then(res=>{
                     this.newprice=res.body.data.todayIn;

                })
                },
        getwallet(){
                this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
                   let passdata=res.data.data[1];
                   this.dcr=(passdata.brokerageBalance)+(passdata.leaseBalance)+(passdata.signBalance)+(passdata.balance);
                            })

        }        ,
         sell(){
              this.modal1=true;
              },
         ok(){
           let _data={
                  price:this.newprice,
                  advertiseType:this.jydata.type,
                  number:this.jydata.amount,
                  pay:this.jydata.pay,
                  jyPassword:this.jydata.password,
                  sourceOfMoney:this.jydata.moneytype
                      }

          this.$http.post('http://www.luckynewplan.com:6102/otc/advertise/create',_data).then(res=>{
               console.log(res)
              if(res.body.code=='0'){
                 this.$Message.success('操作成功');
              }
              else{
                  this.$Message.error(res.body.message);
              }
          })
          },

         buy(){
            this.modal2=true;
             },
          okbuy(){
                 let _data={
                  price:this.newprice,
                  advertiseType:this.buydata.type,
                  number:this.buydata.amount,
                  pay:this.buydata.pay,
                  jyPassword:this.buydata.password
                      }
          this.$http.post('http://www.luckynewplan.com:6102/otc/advertise/create',_data).then(res=>{
              if(res.body.code=='0'){
                 this.$Message.success('操作成功');
              }
              else{
                  this.$Message.error(res.body.message);
              }
          })
          }
    }
}　
</script>
<style>
.ivu-menu-vertical .ivu-menu-item-group-title{
    padding-left: 0px;
}
</style>
<style scoped>
.input{ padding-top:12px;text-align:left;color:#c4c4c5;font-size:14px}
.backgrounds{width:100%;height:100%;background:#18202a;}
.main{padding:20px 20px; height:450px}
.input .ivu-col-span-6{text-align:left}
.ffffont{ color:#fff}
.shoudara .ivu-col-span-6{text-align:left;font-size:14px;padding-top:1px}
.border_right{border-right:3px solid #303242;margin-top:10px;font-size:15px;color:#fff}
</style>

