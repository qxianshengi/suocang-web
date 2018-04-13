<template>
     <div>
        <Button type="primary">{{time | change}}</Button>
     </div>
</template>

<script>
let flag = false;
    export default {
        data () {
            return {
                time : '点击获取',
            }
        },
        props : {
            start : {
                type : Boolean
            }
        },
        watch : {
            start (value,oldvalue) {
                if(value == true){
                    this.countDown()
                }
            }
        },
        methods: {
            countDown () {
                this.time = 60;
                let time = setInterval(()=>{
                    this.time --
                    if(this.time == 0){
                        this.$emit('countDown')
                        this.time = '点击获取'
                        flag = true
                        clearInterval(time)
                    }
                },1000)
            }
        },
        filters : {
            change (value) {
               if(!value) return ""
               if(!isNaN(value)){
                   if(flag == true){
                       return `重新发送${value}S`
                   }
                   return value+'S'
               }else{
                   return value
               }
            }
        }

    }
</script>