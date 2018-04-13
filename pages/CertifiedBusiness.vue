<template>
 <div class='suocang'>
    <div class='suotitle'>
       <Row class='titile_border'>
        <Col span="10" ><h4><span class='spanline'>丨</span> 收益明细</h4></Col>
        <Col span="10" offset="4"><h4><span class='spanline'>丨</span> 资金明细</h4></Col>
      </Row>
      <Row >
        <Col span="10" class='suotitle'>
              <Row type="flex" justify="start" class="code-row-bg">
                <Col span="8">今日收益: <span style='color:#fb9f1a'>{{shouyi}} &nbsp;&nbsp; DRC</span></Col>
                <Col span="8"  offset="4">累计收益: <span style='color:#fb9f1a'>{{leijishouyi}} &nbsp;&nbsp; DRC</span></Col>
              </Row>
        </Col>
        <Col span="10" offset="4" class='suotitle'>
            <Row type="flex" justify="start" class="code-row-bg">
              <Col span="8">总额: <span style='color:#fb9f1a'>{{(userpricebalance+froprice)}} &nbsp;&nbsp; DRC</span></Col>
              <Col span="8" >可用: <span style='color:#fb9f1a'>{{userpricebalance}} &nbsp;&nbsp; DRC</span></Col>
              <Col span="8" >冻结: <span style='color:#fb9f1a'>{{froprice}} &nbsp;&nbsp; DRC</span></Col>
             </Row>
        </Col>
      </Row>
    </div>

    <!--第二部分-->
    <div class='suocangmain'>
           <Row type="flex" justify="start" class="code-row-bg">
            <Col span="24">
                 <Row class='title_noborder'>
                    <Col span="10" ><span class='spanline'>丨</span> 申请锁仓</Col>
                  </Row>
            </Col>
          </Row>
           <Row type="flex" justify="start" class="code-row-bg">
            <Col span="6" offset='2' style='margin-top:135px;background:#03798a;height:200px' >
                    <Row type="flex" justify="center" class="code-row-bg">
                      <Col span="16"><h3 style='line-height:60px;font-size:20px;font-weight:400;color:#fff'>可提前一个月申请赎回</h3></Col>
                      <Col span="16" style='margin-top:50px;'>
                            <Button disabled style='background:#603912;border:#603912' long> <router-link to="/advance"><span style='color:#fff' @click="backsend">赎回(慎用)</span></router-link></Button>
                      </Col>
                  </Row>
            </Col>
            <Col span="8" style='margin-top:55px'>
                <Row>
                         <Form :model="formCustom"  :label-width="95">
                                <FormItem label="充值金额锁仓">
                                  <Input type="text" v-model="formCustom.recharge"></Input>
                                </FormItem>
                                <FormItem label="到期本金锁仓">
                                  <Input type="text" v-model="formCustom.balance"></Input>
                                </FormItem>
                                <FormItem label="签到锁仓">
                                  <Input type="text" v-model="formCustom.signBalance"></Input>
                                </FormItem>
                                <FormItem label="佣金锁仓">
                                  <Input type="text" v-model="formCustom.brokerageBalance"></Input>
                                </FormItem>
                                <FormItem label="租赁锁仓">
                                  <Input type="text" v-model="formCustom.leaseBalance"></Input>
                                </FormItem>

                                 <Button type="error" @click="allcompute" >查看锁仓总金额</Button>
                                 <Button type="ghost" style="margin-left: 8px">{{allmoney}}</Button>

                                <FormItem label="锁仓时间">
                                <RadioGroup v-model="formCustom.type" >
                                    <Radio label="ONE_MONTH">30天( 0.8 % )</Radio>
                                    <Radio label="TWO_MONTH">60天( 1 % )</Radio>
                                    <Radio label="THREE_MONTH">90天( 1.2 % )</Radio>
                                </RadioGroup>
                                </FormItem>
                                <FormItem>
                                    <Button type='error' style='background:#b40617;border:#b40617' @click="handleSubmit('formCustom')" long :disabled='clickon'>一键锁仓</Button>
                                </FormItem>
                            </Form>
                </Row>
            </Col>

          </Row>
    </div>
    <!--锁仓记录-->
        <div class='suocangmain'>
           <Row type="flex" justify="start" class="code-row-bg" style='background:#b40617;margin-top:20px'>
            <Col span="24">
                 <Row class='title_noborder'>
                    <Col span="9"  style='color:yellow;text-align:left'><span class='spanline'>丨</span> 锁仓记录</Col>
                    <Col span="15"  style='color:yellow;font-size:20px;text-align:center'><span class='spanline'>丨</span>踏 上 数 字 货 币 的 列 车 &nbsp; &nbsp; &nbsp;成 就 个 人 财 富 梦 想 !</Col>
                  </Row>
            </Col>
          </Row>
        <Table border :columns="columns1" :data="suocangdata" class='center_th' style="text-align:center"></Table>
      </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
     data(){
       return{
        allmoney:'',
         data1:[],
         shouyi:'',
         zongeprice:'',
         froprice:'',
         userpricebalance:'',
         userprice:[],
         clickon:false,
         leijishouyi:'',
         formCustom:{
                    type: 'ONE_MONTH',
                    recharge: '',
                    balance:'',
                    signBalance:'',
                    brokerageBalance:'',
                    leaseBalance:''

                },
         columns1:[
                  {
                        title: '锁仓单号',
                        key: 'id',
                        width:100
                    },
                    {
                        title: '锁仓时间',
                        key: 'startTime'
                    },
                    {
                        title: '到期时间',
                        key: 'endTime'
                    },
                    {
                        title: '锁仓资金(DCR)',
                        key: 'amount'
                    },
                    {
                        title: '预计收益',
                        key: 'expectEarnings'
                    },
                    {
                        title: '类型',
                        key: 'timeType',
                      render: (h, params) => {
                            const row=params.row;
                            let timeType=row.timeType;
                          if(timeType=='ONE_MONTH'){
                              const   timeType=row.timeType='30天'
                                 }
                          else if(timeType=='TWO_MONTH'){
                               const   timeType=row.timeType='60天'
                           }
                            else if(timeType=='THREE_MONTH'){
                               const   timeType=row.timeType='90天'
                           }

                            return h('span', {
                            },timeType);
                        }
                    },
                    {
                        title: '累计收益',
                        key: 'addUpEarnings'
                    },

                    {
                        title: '状态',
                        key: 'statue',
                       render: (h, params) => {
                            const row=params.row;
                            let statue=row.statue;
                          if(statue=='UNDERWAY'){
                              const   statue=row.statue='进行中'
                                 }
                          else if(statue=='COMPLETE'){
                               const   statue=row.statue='完成'
                           }
                            else if(statue=='AHEAD_OF_TIME_APPLY'){
                               const   statue=row.statue='提前索回申请中'
                           }
                            else if(statue=='AHEAD_OF_TIME_COMPLETE'){
                               const   statue=row.statue='提前索回完成'
                           }
                          return h('span', {
                            },statue);
                        }
                    },
                    {
                        title: '操作',
                        key: 'xx',
                         width:120,
                        render: (h, params) => {
                         const row=params.row;
                         let statue=row.statue;
                          if(statue=='提前索回申请中'){
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
                                   let query = {suocangid: params.row.id };
                                    this.$router.push({
                                        name: 'advance',
                                        query:query
                                    });
                                        }
                                    }
                                }, '赎回')
                            ]);
                          }
                          else{

                          }
                        }
                    }
         ],
         suocangdata:[]
       }
     },

    methods: {
       allcompute(){
           var arr=[];
             if(this.formCustom.recharge!=null){
                    arr.push(this.formCustom.recharge)
              }
              if(this.formCustom.balance!=null){
                    arr.push(this.formCustom.balance)
              }
              if(this.formCustom.signBalance!=null){
                    arr.push(this.formCustom.signBalance)
              }
              if(this.formCustom.brokerageBalance!=null){
                    arr.push(this.formCustom.brokerageBalance)
              }
               if(this.formCustom.leaseBalance!=null){
                    arr.push(this.formCustom.leaseBalance)
              }
              var sum=0;
             for (var i=0,len=arr.length; i<len; i++)
                {
                  sum+=Number(arr[i]);
                }
             this.allmoney=sum;
    },
      getprice(){
                  this.$http.get(this.host+'/uc/dcr-price').then(res=>{
                     this.dbprice=res.body.data.todayBtc;
                     this.inprice=res.body.data.todayIn;
                     this.outprice=res.body.data.todayOut
                })
                },
          info(){
                 this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
                   console.log(res);
                   this.userprice=res.body.data[1];
                            })
                },
       handleSubmit(){
             if(this.formCustom.capital==''){
               return this.$Message.error('填写锁仓数量');
             }
             else{
                let _data={type:this.formCustom.type,
                recharge:this.formCustom.recharge,
                balance:this.formCustom.balance,
                signBalance:this.formCustom.signBalance,
                leaseBalance:this.formCustom.leaseBalance}
             this.$http.post(this.host+'/uc/regular-basis',_data).then(res=>{
               //    console.log(res);
               if(res.body.code=='0'){
                        this.$Message.success('锁仓成功');
                         this.clickon=true;
                              this.suocangrecord();
                    }
                 else{
                      this.$Message.error(res.body.message);
                   }
                             })
                     }
                },
                 suocangrecord(){
                             this.$http.get(this.host+"/uc/regular-basis/page").then( res=>{
                                         this.suocangdata=res.data.data.list;
                             })
                 },
                backsend(){

                   //  this.$router.push({name: 'advance' });
                },
         init() {
            // this.$store.state.HeaderActiveName = '6';
            this.$store.commit('navigate','5');
            if (localStorage.TOKEN == 'null' && localStorage.MEMBER == 'null') {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
            this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
                let passdata=res.data.data[1];
                this.froprice=passdata.frozenBalance;
                this.userpricebalance=(passdata.brokerageBalance)+(passdata.leaseBalance)+(passdata.signBalance)+(passdata.balance);
                this.zongeprice=(passdata.recharge)+ this.userpricebalance;
                this.leijishouyi=passdata.cumulativeIncome;
            })
        }, getMember() {
            //获取个人安全信息
            this.$http.get(this.host + '/uc/member/loginInfo').then(response => {
                var resp = response.body;

                if (resp.code == 0) {
                  this.shouyi=resp.data.yesterdayEarnings
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }
      },
   computed:{
         allsuocang:function(){
         /*+(this.formCustom.signBalance)+(this.formCustom.brokerageBalance)+(this.formCustom.leaseBalance);*/
         return   parseInt(this.formCustom.recharge) + parseInt(this.formCustom.balance) + parseInt(this.formCustom.signBalance) + parseInt(this.formCustom.brokerageBalance) + parseInt(this.formCustom.leaseBalance);
     }
     },
    created: function() {
       this.init();
       this.info();
      this.getMember();
       this.suocangrecord();
       this.getprice();
    }
};
</script>
<style scoped>
.suocang{ padding:20px 20px;background:#e0e0e0;}
.titile_border h4{font-size:16px}
.suotitle{background:#fff;padding:12px }
.suotitle .ivu-col-span-8{text-align:left;padding:2px 2px;font-size:14px;color:#959595}
.suotitle .ivu-col-span-6{text-align:left;padding:2px 2px;font-size:14px;color:#959595}
.spanline{ color:#fb9f1a;font-size:23px}
.titile_border .ivu-col-span-10{ border-bottom:1px solid #ddd;text-align:left;padding:2px 2px}
.title_noborder{ border-bottom:none;padding:10px;border-bottom:1px solid #ddd;}
.title_noborder .ivu-col-span-10{text-align:left;font-size:15px}
.suocangmain{ margin-top:8px;background:#fff}
.center_th .ivu-table th{text-align:center}
</style>
