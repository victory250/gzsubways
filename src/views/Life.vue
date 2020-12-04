<template>
  <div class="life">
    <van-nav-bar title="轻生活" class="nav-bar" safe-area-inset-top >
    </van-nav-bar>
    <van-grid :column-num="3">
      <van-grid-item @click="lyzx(item.ty)" :icon="item.img" :text="item.text" v-for="item in nav" :key="item.index"/>
    </van-grid>
    <div class="Content">
      <div class="con" v-for="item in newslist" :key="item.index" @click="Check(item.url)">
        <!-- <img :src="item.picUrl" alt=""> -->
        <!-- <div class="con-2"> -->
          <div class="title">{{item.title}}</div>
          <span class="ctime">{{item.ctime}}</span>
        <!-- </div> -->
      </div>
      <van-popup closeable v-model="isshow" position="bottom" :style="{ height: '100%' }">
        <iframe class="conbox" :src="this.src"> </iframe>
      </van-popup>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  export default {
    name:"life",
    data(){
      return{
        isshow:false,
        src:"",
        nav:[

          {
            text:'文化旅游',
            img:require('../assets/images/life-1.png'),
            ty:"travel"
          },
          {
            text:'娱乐新闻',
            img:require('../assets/images/life-2.png'),
            ty:"huabian"
          },
          {
            text:'更多',
            img:'ellipsis',
            ty:"gd"
          },
        ],
        newslist:[]
      }
    },
    methods:{
      lyzx(ty){
        let url ="";
          if (ty == "travel") {
            url = "http://api.tianapi.com/travel/index"
          }else if(ty == "huabian"){
            url = "http://api.tianapi.com/huabian/index"
          }else if(ty == "gd"){
            return this.$toast('暂无更多');
          }
        this.axios({
          method: "GET",
          url: url,
          // url: "http://api.tianapi.com/travel/index",
          // url:"http://api.tianapi.com/qiwen/index",
          // url:"http://api.tianapi.com/huabian/index",

          params: {
            key: "c97e90681734b6533b7848de008f31c9",
            num: 10,
            viewid:3270,
          }
        })
          .then((result) => {
          this.$toast.clear();
          console.log("result ==> ", result);
          console.log(result.data.newslist);
          
          console.log(result.data.newslist[0].url);
          // console.log(result.data.newslist[0].url.load('p-detail.html'));
          this.newslist = result.data.newslist
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
      },
      Check(src){
        console.log(src);
        this.isshow = true;
        this.src = src
      }
    }
  }
</script>
<style lang="less" scoped>
.life{
  height: 100%;
}
.nav-bar{
  width: 100%;
  background-color: #C9072C;

}
/deep/ .van-nav-bar__title{
  color: white;
  font-weight: 600;
}
.nav-img{
  // position: relative;
  // left: 0;
  display: block;
  float: left;
  width: 20px;
  height: 20px;
}
.Content{
  // height: 100%;
  padding-bottom: 50px;
}
.con{
  box-sizing: border-box;
  margin: 15px 0;
  width: 100%;
  padding: 10px;
  background-color: white;
  overflow: hidden;

}
.con img{
  display: block;
  height: 80px;
  width: 80px;
  background-color: aqua;
  float: left;
  margin-right: 10px;
}
// .con-2{
//   float: left;
//   position: relative;

// }

.title{
  font-size: 20px;
  width: calc(100% - 90px);
  text-align: left;

}
.ctime{

  float: right;

}
.conbox{
  width: 100%;
  height: calc(100% - 40px);
  border: none;
  margin-top: 40px;
  // padding-top: -40px;
}
</style>