<template>
 <div class='noticedetail'>
      <div class='context'>
           <h2 style='font-weight:400;color:#000'>{{contextdata.title}}</h2>
           <div style='margin-top:8px;font-size:18px;text-indent:0.5em' v-html="deatail">
           </div>
      </div>
 </div>
</template>
<style scoped>
.noticedetail{ padding:20px 20px;padding-bottom:650px;background:#e0e0e0}
.context{ background:#f9f9f9}
.context h2{ text-align:center;font-size:20px; font0-weight:400;padding:8px}
</style>
<script>
 export default{
    data(){
      return{
         contextdata:[],
         deatail:''
      }
    },
    methods:{
    context(){
        let needid=this.$route.query.id;
       this.$http.get(this.host +'/uc/announcement/'+needid).then(res=>{
        this.contextdata=res.data.data;
        this.deatail=res.data.data.content
       })
     }
    },
  created(){
    this.context();
     }
 }
</script>