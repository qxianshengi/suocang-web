<template>
  <div>
       <div class="bg">
         <div class='bg_ul'>
             <Row type="flex" justify="center" class="code-row-bg">
                 <Col span='6' style='background:#fff;padding-bottom:25px;border-radius:5px'>
                     <Row type="flex" justify="center" class="code-row-bg">
                        <Col span='16' style='margin-top:35px; height:70px;' >
                                 <img src="../../assets/img/online.png" alt="" />
                        </Col>
                        <Col span='16' style='font-size:26px; color:#000;margin-top:10px;'>在线客服</Col>
                        <Col span='16' style='font-size:15px; color:#848484;margin-top:8px;'>9:00~18:00 随时恭候 <br /> 专业客服为您解答疑惑</Col>
                        <Col span='16' style='margin-top:8px'> <Button @click="modeshow">在线客服</Button></Col>
                     </Row>
                 </Col>
                 <Col span='6' offset='2' style='background:#fff;padding-bottom:25px;border-radius:5px'>
                      <Row type="flex" justify="center" class="code-row-bg">
                        <Col span='16' style='margin-top:35px; height:70px;' >
                                 <img src="../../assets/img/help.png" alt="" />
                        </Col>
                        <Col span='16' style='font-size:26px; color:#000;margin-top:10px;'>新手帮助</Col>
                        <Col span='16' style='font-size:15px; color:#848484;margin-top:8px;'>查看新手教程 <br /> 为交易保驾护航</Col>
                        <Col span='16' style='margin-top:8px'> <Button> <router-link to="newhelp">新手帮助</router-link></Button></Col>
                     </Row>
                 </Col>
                 <Col span='6' offset='2' style='background:#fff;padding-bottom:25px;border-radius:5px'>
                   <a target="_blank" href="tencent://message/?uin=2114895295&Site=http://vps.shuidazhe.com&Menu=yes">
                        <Row type="flex" justify="center" class="code-row-bg">
                        <Col span='16' style='margin-top:35px; height:70px;' >
                                 <img src="../../assets/img/qqserve.png" alt="" />
                        </Col>
                        <Col span='16' style='font-size:26px; color:#000;margin-top:10px;'>QQ客服</Col>
                        <Col span='16' style='font-size:15px; color:#848484;margin-top:8px;'>QQ客服18:00~24:00 <br /> 随你为您提供专业服务</Col>
                        <Col span='16' style='margin-top:8px'> <Button><a target="_blank" >QQ客服</a></Button></Col>
                     </Row>
                    </a>
                 </Col>
             </Row>
         </div>
          <Modal
        v-model="modal1"
        title="客服电话">
        <h2>xxx-xxx-xxxx</h2>
    </Modal>
      </div>
      <div class='problems'>
            <Row type="flex" justify="start" class="code-row-bg">
                <Col span="4" style='text-align:left;font-size:17px'><p>常见问题</p></Col>
            </Row>
            <Row type="flex" justify="start" class="code-row-bg" style='margin-top:15px'>
                <Col span="6" class='txt'><p>人民币到账</p></Col>
                <Col span="6" offset='2' class='txt'><p>转入/转出虚拟币</p></Col>
                <Col span="6" offset='2' class='txt'><p>虚拟币交易</p></Col>
            </Row>
            <Row type="flex" justify="start" class="code-row-bg" style='margin-top:10px'>
                <Col span="6" class='pro_li'><p>账户封号</p></Col>
                <Col span="6" offset='2' class='pro_li'><p>转入未到账</p></Col>
                <Col span="6" offset='2' class='pro_li'><p>挂单未成交</p></Col>
            </Row>
             <Row type="flex" justify="start" class="code-row-bg" style='margin-top:10px'>
                <Col span="6" class='pro_li'><p>到账失败</p></Col>
                <Col span="6" offset='2' class='pro_li'><p>转出未到账</p></Col>
                <Col span="6" offset='2' class='pro_li'><p>挂单未成交</p></Col>
            </Row>
             <Row type="flex" justify="start" class="code-row-bg" style='margin-top:10px'>
                <Col span="6" class='pro_li'><p>未到账</p></Col>
            </Row>
      </div>
  </div>
</template>
<style scoped>
.txt{text-align:left;color:blue;font-size:17px}
.pro_li{ text-align:left;color:blue;font-size:15px}
.bg{ width:100%;height:600px; background:url(../../assets/img/customerservice.png) center center;overflow:hidden;}
.bg_ul{ width:1000px; height:320px;margin:150px auto;}
.problems{ width:900px;margin:0 auto;margin-top:80px;height:300px;padding-bottom:50px}
</style>
<script>
 export default{
    data(){
           return{
            modal1:false,
           }
         },
         methods:{
         modeshow(){
             this.modal1=true;
         }
         }
 }
</script>