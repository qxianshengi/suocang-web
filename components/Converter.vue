<template>
  <div style='padding:20px 30px;background:#f9f9f9'>
    <Row class='header'>
        <Col span="4"><h4><span style='color:#fb9f1a;font-size:25px'>丨</span>Decred在线转换器</h4></Col>
    </Row>
    <Row class='notice_main'>
      <Col span="2"><img src="../assets/img/BTC1.png" /></Col>
      <Col span="2" class="ted">Bitcon</Col>
      <Col span="8" class="ted">
          <div >账户余额 : <span style='color:#fb9f1a'>{{balance}} BTC</span>
          </div>

      </Col>
    </Row>
    <Row class='padding'>
       <Col span="20" class="ted" style='font-size:13px'> 请在下栏填入你想转换金额</Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg padding2">
         <Col span="8">
              <Row type="flex" justify="center" class="code-row-bg">
                    <Col span='20' class='bigsize'>Bitcon ( BTC ) </Col>
                    <Col span='20' class='bigsize margin10'>  <Input v-model="value1" placeholder="btc"  style="width: 300px">  <span slot="append">BTC</span></Input></Col>
                    <Col span='20' class='dddcolor margin10'>1BTC = {{dcrmoney}} DCR</Col>
              </Row>
         </Col>
         <Col span="2">
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col span='20' class='bigsize'>&nbsp;</Col>
                    <Col span='20' class='bigsize margin10'><img src="../assets/img/arrow.png" alt="" /></Col>
              </Row>
         </Col>
         <Col span="8">
               <Row type="flex" justify="center" class="code-row-bg">
                    <Col span='20' class='bigsize'>Decred ( DCR ) </Col>
                    <Col span='20' class='bigsize margin10'>  <Input v-model="value2" placeholder="dcr" style="width: 300px" readonly>  <span slot="append">DCR</span></Input></Col>
                    <Col span='20' class='dddcolor margin10'>charge: <span>{{exchangerate}}</span>%</Col>
              </Row>
         </Col>
    </Row>
    <Row  type="flex" justify="center" class="code-row-bg padding" >
       <Col span="12" style='padding-top:30px'>  <Button type="primary" long @click="exchange">兑换</Button></Col>

    </Row>
  </div>
</template>
<style scoped>
.header{background:#fff;border-radius:5px}
h4{font-size:16px;font-weight:400;text-align:left}
.header.ivu-col-span-8{padding:8px}
.notice_main{ margin-top:12px;background:#fff;font-size:16px;text-indent:1rem}
.ul_list{padding:8px 8px;border-bottom:1px solid #ddd;cursor:pointer;}
.ul_list a{color:#4d4d4d;font-size:15px}
.ted{color:#848484;font-size:15px;line-height:2.8;text-align:left;text-indent:1rem}
.padding{ padding-top:15px}
.padding2{margin-top:25px}
.bigsize{ font-size:16px;color:#000;text-align:left;margin-top:5px}
.dddcolor{ color:#848484;font-size:14px;text-align:left}
</style>
<script>
 export default{
     data(){
        return{
          exchangerate:'3',
          dcrmoney:'',
          dcrtime:'2018-3-13 13:59:20',
          balance:'',
          value1:''
        }
     },
      computed:{
      value2:function(){
             return  this.value1*this.dcrmoney*0.97;
                         }
      },
     created:function(){
      this.init();
     },
     methods:{
         exchange(){
                this.$http.patch(this.host+'/uc/asset/wallet/exchange',{amount:this.value1}).then(res=>{
                  if(res.body.code=='0'){
                      this.$Message.success('兑换成功');
                  }
                  else{
                     this.$Message.error(res.body.message)
                  }
                              })
                    },
         init() {
                this.$http.get(this.host+'/uc/dcr-price').then(res=>{
                       let passa=parseFloat(res.body.data.todayBtc);
                         this.dcrmoney=(1/passa);
                })
               }
             }
 }
</script>
