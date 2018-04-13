<template>
 <div style='padding:20px 30px;background:#f9f9f9;'>
    <Row class='header'>
        <Col span="4"><h4><span style='color:#fb9f1a;font-size:25px'>丨</span>团队收益</h4></Col>
    </Row>
    <Row type="flex" justify="start" class="code-row-bg margin20">
        <Col span="5" offset="1">
             <Row type="flex" justify="start" class="code-row-bg font_left">
                   <Col span='15' class='colorsezi'>{{todayBrokerageBalance}}DCR</Col>
                   <Col span='15' class='normsize'>今日佣金(DCR)</Col>
             </Row>
        </Col>
        <Col span="5">
             <Row type="flex" justify="start" class="code-row-bg font_left">
                   <Col span='15' class='colorsezi'>{{totalBrokerageBalance}}DCR</Col>
                   <Col span='15' class='normsize'>累计佣金(DCR)</Col>
             </Row>
        </Col>
        <Col span="6">
           <!--- <Row type="flex" justify="start" class="code-row-bg font_left">
                   <Col span='15'>viser饼状图（VISER）</Col>
             </Row>-->
        </Col>
    </Row>
     <Row class='header' style='margin-top:30px'>
        <Col span="4"><h5><span style='color:#fb9f1a;font-size:25px;'>丨</span >我的邀请</h5></Col>
    </Row>
    <Row type="flex" justify="start" class="code-row-bg" style='margin-top:10px'>
        <Col span="24" style='color:#848484;font-size:13px;'>温馨提示:可以复制下面的链接向好友推荐，可以通过QQ、微信、Email、Msn等工具传递信息。邀请的好友通过下面的地址，进入我们的网站，进行注册登录</Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg" style='margin-top:25px'>
        <Col span="6" style='color:#848484;font-size:13px;line-height:2.8'>我的邀请链接: {{url}}</Col>
        <Col span="3"><Button type="primary"
                      v-clipboard:copy="url"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError">  复制</Button>
        </Col>
         <Col span="6" style='color:#000000;font-size:13px;line-height:2.8'>我的邀请码: {{withcode}}</Col>
    </Row>
    <Row class='header' style='margin-top:30px'>
        <Col span="4"><h5><span style='color:#fb9f1a;font-size:25px;'>丨</span >我的团队(一级客户)</h5></Col>
    </Row>
    <Row  style='margin-top:30px' type="flex" justify="center" class="code-row-bg header">
        <Col span="20">
                <Table :columns="columns1" :data="data1" border></Table>
        </Col>
    </Row>
    <Row class='header' style='margin-top:30px'>
        <Col span="4"><h5><span style='color:#fb9f1a;font-size:25px;'>丨</span >我的团队(二级客户)</h5></Col>
    </Row>
    <Row  style='margin-top:30px' type="flex" justify="center" class="code-row-bg header">
        <Col span="20">
                <Table :columns="columns1" :data="data2" border></Table>
        </Col>
    </Row>
  </div>
</template>
<style scoped>
h4{ font-size:17px}
h5{ font-size:15px}
.colorsezi{ color:#fb9f1a;font-size:22px}
.normsize{ color:#848484;font-size:15px}

</style>
<script type="text/javascript">
  export default{
     data(){
        return{
                  url:'',
                  withcode:'',
                  todayBrokerageBalance:'',
                  totalBrokerageBalance:'',
                      columns1: [
                    {
                        title: '昵称',
                        key: 'username'
                    },{
                        title: '真实姓名',
                        key: 'realName'
                    },
                    {
                        title: '手机',
                        key: 'mobilePhone'
                    },
                    {
                        title: '邀请码',
                        key: 'promotionCode'
                    },
                    {
                        title: '注册时间',
                        key: 'registrationTime'
                    }
                ],
                data1:[],
                data2:[]
        }
     },
      created:function(){
          this.init();
     },
     methods:{
              onCopy: function (e) {
                this.$Message.success('复制成功 ' + ' '+e.text);
                },
              onError: function (e) {
               alert('Failed to copy texts')
                                    },
              init(){
              let usepass=JSON.parse(localStorage.getItem("MEMBER"));
              console.log(usepass)
                      if(usepass=='null'){
                           this.$Message.error('请先登录');
                            this.$router.push('/login');
                      }

                      else{
                        this.url='http://www.luckynewplan.com/#/register?code='+usepass.data.promotionCode;
                        this.withcode=usepass.data.promotionCode;

                        this.todayBrokerageBalance=JSON.parse(localStorage.MEMBER).data.yesterdayEarnings;
                       
                        this.$http.get(this.host+'/uc/asset/wallet').then(res=>{
                            var resp=res.body.data;
                            for(var i=0;i<resp.length;i++){
                                if(resp[i].coin.unit=='DCR'){
                                    this.totalBrokerageBalance=resp[i].cumulativeIncome;
                                }
                            }
                        })

                        this.$http.get(this.host+'/uc/member/team').then(res=>{
                            var resp=res.body.data;
                            for(var i=0;i<resp.one.length;i++){
                                if(resp.one[i].status==0){
                                    this.data1.push(resp.one[i]);
                                }
                            }
                        });
                         this.$http.get(this.host+'/uc/member/team').then(res=>{
                            var resp=res.body.data;
                            for(var i=0;i<resp.two.length;i++){
                                if(resp.two[i].status==0){
                                    this.data2.push(resp.two[i]);
                                }
                            }
                        })
                        
                        }


              }
     }
  }
</script>