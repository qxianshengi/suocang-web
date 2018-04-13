<template>
    <div style='padding:20px 20px 140px 20px '>
         <Table :columns="columns1" :data="data1"></Table>

     <Modal
        v-model="modal6"
        title="撤回广告"
        @on-ok="asyncOK">
        <p>点击确认 撤回广告</p>
    </Modal>
   </div>
</template>
<script>
    export default {
        data () {
            return {
            modal6:false,
            backid:'',
                columns1: [
                    {
                        title: '买卖方式',
                        key: 'advertiseType',
                        render: (h, params) => {
                            let text = ''
                            if (params.row.advertiseType == 'BUY') {
                                text = '买入'
                            } else {
                                text = '卖出'
                            }
                            return h('div', [
                                h('p', text),
                            ]);
                        }
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '数量',
                        key: 'number'
                    },{
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        render: (h, params) => {
                            let status = ''
                            if (params.row.status == '0') {
                                status = '上架'
                            } else if(params.row.status == '1'){
                                status = '下架'
                            }
                            else if(params.row.status == '2'){
                                status = '关闭'
                            }
                            return h('div', [
                                h('p', status),
                            ]);
                        }

                    },
                    {
                        title: '操作',
                        key: 'xx',
                        width:120,
                        render: (h, params) => {
                         const row=params.row;
                         let status=row.status;
                          if(status!='2'){
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
                                        this.modal6=true;
                                        }
                                    }
                                }, '删除')
                            ]);
                          }
                          else{

                          }
                        }
                    }
                ],
                data1: [

                ]
            }
        },
         created: function() {
               this.getinfo();
         } ,
          methods:{
            getinfo(){
              this.$http.get(this.host2+'/otc/advertise/page').then(res=>{
                 console.log(res);
                this.data1=res.body.data.list;
              })
            },
            asyncOK(){
                        this.$http.post(this.host2+'/otc/advertise/delete?id='+this.backid).then(res=>{
                                  if(res.body.code=='0'){
                                      this.$Message.success(res.body.message);
                                       this.getinfo();
                                    }
                                    else{
                                       this.$Message.error(res.body.message)
                                    }
                          })
            }
          }
    }
</script>