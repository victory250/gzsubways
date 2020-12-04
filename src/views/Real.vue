<template>
    <div class="Real">
        <van-nav-bar
        title="客流实况"
        left-text="返回"
        left-arrow
        @click-left="back"
        class="nav-bar"
        />
        <iframe class="realbox" src="http://ydyc.gzmtr.cn:13050/indexNotBrowser.html#/mobile?s=wechat" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        name:"Real",
        data(){
            return{

            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
.Real{
    height: 100%;
}
.realbox{
    height: calc(100% - 50px);
    width: 100%;
}
.nav-bar{
  // margin-bottom: 30px;
  width: 100%;
  background-color: #C9072C;
    color: white;
}
/deep/.van-nav-bar__text{
      color: white;
}
/deep/ .van-icon{
    color: white;
}
/deep/ .van-nav-bar__title{
  color: white;
  font-weight: 600;
}

</style>