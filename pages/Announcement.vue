<template>
  <div style='padding:20px 30px;background:#95ccc2'>
    <Row class='header'>
        <Col span="4"><h4><span style='color:#fb9f1a;font-size:30px'>丨</span>公告</h4></Col>
    </Row>
    <Row class='notice_main'>
             <p style='border-bottom:1px solid #ddd;padding:8px'>列表</p>
             <Col span="24">
                  <!-- 循环链接-->
                   <div class='ul_list'>
                          <router-link :to="{path:'noticedetail',query:{id:msg.id}}" v-for="msg in announcement" style='padding:2px 0px 2px 0px'>
                         <Row>
                             <Col span="8" style='text-align:left;padding:4px 0px 4px 0px'>{{msg.title}}</Col>
                             <Col span="4" offset="12" style='padding:4px 0px 4px 0px'>{{msg.createTime}}</Col>
                          </Row>
                        </router-link>
                   </div>
             </Col>
    </Row>
      <Page :total="parseInt(datalength)" style='margin-top:20px;' :current="current"   @on-change="changePage" show-elevator></Page>
      <div style='margin-top:10px;position:relative;width:100%;height:80px;background:#b40617;text-align:center'>
                  <div span="24" class='animatess' >平台2018年3月22号 开放注册、锁仓</div>
      </div>
      <div style='position:relative;width:100%;height:50px;background:#b40617;'>
                  <div span="24" class='animate' >帮您拥抱区块链、实现财富增值</div>
     </div>
  </div>
</template>
<style scoped>
.header{background:#fff;border-radius:5px}
h4{font-size:20px;font-weight:400;text-align:left}
.header.ivu-col-span-8{padding:8px}
.notice_main{ margin-top:12px;background:#fff;font-size:16px;text-indent:1rem}
.ul_list{padding:8px 8px;border-bottom:1px solid #ddd;cursor:pointer;}
.ul_list a{color:#4d4d4d;font-size:15px}
.animatess{color:yellow;font-size:20px;margin:0 auto;line-height:80px;animation:mymove 5s ; -webkit-animation:mymove 5s infinite;  }
.animate{color:#fff;font-size:28px;position:absolute;left:0;line-height:50px;animation:mymoves 10s ; -webkit-animation:mymoves 10s infinite; }
@keyframes mymoves
{
  0% {left:0px;}
  50% {left:700px;}
  100% {left:0px;}
}

@-webkit-keyframes mymoves /* Safari and Chrome */
{
  0% {left:0px;}
  50% {left:700px;}
  100% {left:0px;}
}

@keyframes mymove
{
  0% {font-size:20px;}
  50% {font-size:28px;}
  100% {font-size:20px;}
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
          announcement:[],
          datalength:'',
           current:1,
           current:1,
          pageIndex:1
      }
    },
    methods: {
              changePage(pageIndex){
                this.pageIndex = pageIndex;
                this.$http.get(this.host +'/uc/announcement/page/').then(res=>{
                  this.announcement=res.data.data;
                })
            },
            init(){
                this.$http.get(this.host +'/uc/announcement/').then(res=>{
                    this.announcement=res.data.data;
                    console.log(res)

                   this.datalength=res.data.data.totalNumber;
                      })
                }
    },
    created(){
         this.init();
    }
 }
</script>