<template>
    <div class="subway">
        <van-nav-bar
        title="线网图"
        left-text="返回"
        left-arrow
        @click-left="back"
        class="nav-bar"
        />
        <div id="mysubway"></div> 
    </div>
</template>

<script>
    export default {
        name:"subway",
        data(){
            return {

            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            },      
            //创建地铁图
            loadmap(){
                // console.log(getCityList(callback));
                var mysubway = subway("mysubway", {
                    easy: 1,
                    adcode: 4401,

                });
                // var traffic = new AMap.TileLayer.Traffic({
                // 'autoRefresh': true,     //是否自动刷新，默认为false
                // 'interval': 180,         //刷新间隔，默认180s
                // });

                // mysubway.add(traffic);
                // var map = new AMap.Map('container', {
                //   resizeEnable: true,
                //   zoom: 12
                // })

            },
        },
            mounted(){
                 this.loadmap();  
            }
    }
</script>

<style lang="less" scoped>
.subway{
    height: 100%;
    width: 100%;
}
#mysubway{
    height: calc(100% - 50px);
    width: 100%;
    z-index: 0;
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