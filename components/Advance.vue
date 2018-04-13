<template>
  <div style='padding:20px 30px;background:#802323'>
    <Row class='header'>
        <Col span="4"><h4><span style='color:#fb9f1a;font-size:30px'>丨</span>提前赎回</h4></Col>
    </Row>
     <Row type="flex" justify="start" class="code-row-bg" style='margin-top:20px;padding-bottom:50px'>
        <Col span='5' offset='2' style='background:green;height:150px; margin-top:80px;border-radius:8px'>
             <Row type='flex' justify='center' class='code-row-bg withecolor'>
                    <Col span='24' style='padding-top:15px'>赎回本金:{{suocangdata.amount}}</Col>
                    <Col span='24'>赎回每日利息:</Col>
                    <Col span='24'>赎回每日佣金:{{suocangdata.dayEarnings}}</Col>
                    <Col span='24'>赎回累计利息:{{suocangdata.expectEarnings}}</Col>
                    <Col span='24'>赎回累计佣金:</Col>
             </Row>
        </CoL>
        <Col span='5' offset='3' class='pline'>
             <p>锁仓单号 : {{suocangdata.id}}</p>
              <p>锁仓日 : {{suocangdata.startTime}}</p>
              <p>锁仓时间 :
                     <span v-if="suocangdata.timeType=='ONE_MONTH'">一个月</span>
                     <span v-else-if="suocangdata.timeType=='TWO_MONTH'">两个月</span>
                     <span v-else-if="suocangdata.timeType=='THREE_MONTH'">三个月</span>
              </p>
              <p>锁仓资金 : {{suocangdata.amount}}DCR

              </p>
              <p>累计收益 : {{suocangdata.expectEarnings}}DCR</p>
              <p>赎回扣除 : {{suocangdata.deduction}}DCR(30%的租赁费,30%的佣金,30%的本金)</p>
              <p>赎回到账本金: <span style='color:#fff'>{{parseFloat(suocangdata.amount*0.7).toFixed(2)}}DCR</span></p>
               <Button class='suocangbutton' long @click="getback">申请提前赎回</Button>
        </Col>
     </Row>
  </div>
</template>
<style scoped>
.header{background:#fff;border-radius:5px}
.withecolor .ivu-col-span-24{color:#fff;font-size:15px;text-align:left;text-indent:1rem}
h4{font-size:18px;font-weight:400;text-align:left}
.header.ivu-col-span-8{padding:8px}
.notice_main{ margin-top:12px;background:#fff;font-size:16px;text-indent:1rem}
.ul_list{padding:8px 8px;border-bottom:1px solid #ddd;cursor:pointer;}
.ul_list a{color:#4d4d4d;font-size:15px}
.pline p{ padding:8px;font-size:15px;display:block;width:400px;text-align:left;color:#fff}
.suocangbutton{  color: #fff;background-color: #643818;border-color: #8c8c8c;margin-top:20px;}
</style>
<script>
 export default{
     data(){
        return{
           suocangdata:{
              order:'sc19804',
              time:'2018-3-10',
              mouth:'3',
              day:'5',
              money:'200',
              pro:'12',
              deduction:'',
              end:'140'
           }
        }
     },
     methods:{
       getinfo(){
          let id=this.$route.query.suocangid;
          this.$http.get(this.host+'/uc/regular-basis/'+id).then(res=>{

               this.suocangdata=res.body.data;
               console.log(this.suocangdata);
          })
       },
       getback(){
           let id=this.$route.query.suocangid;
           this.$http.patch(this.host+'/uc/regular-basis/'+id+'/advance-get-back').then(res=>{
               console.log(res)

                if( res.body.code=='0'){
                     this.$Message.success('提前赎回成功成功');
                }
                else{
                    this.$Message.error(res.body.message);
                }
           })
       }
     },
     created(){
        this. getinfo();
     }
 }
</script>