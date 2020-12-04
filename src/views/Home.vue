<template>
  <div class="home">
    <van-nav-bar class="nav-bar" title="广州地铁" @click-right="gox('Customer')">
      <template #right>
        <van-icon name="service-o" size="18" color="white" />
      </template>
      <template #left>
        <van-icon name="plus" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-grid class="grid" :column-num="2" >
      <van-grid-item class="grid-item"  :icon="this.home1" text="线网图" @click="gox('Subway')" />
      <van-grid-item class="grid-item"  :icon="this.home2" text="乘车码" @click="gox('QR')" />
    </van-grid>
    <div class="content">
      <div class="con-1">
        <div class="con-1item" v-for="item in con1" :key="item.index" @click="gox(item.to)">
          <van-icon size="50" :name="item.img" /> <br>
          <span>{{item.text}}</span>
        </div>
      </div>
      <div class="con-2">
        <span class="con-2title">地铁资讯</span>
        <div class="con-2con" >
          <div class="con-2con-title" @click="zx">复工安全出行 这些变化请注意</div>
          <span class="con-2con-time" >2020-11-19</span>
        </div>
          <van-popup closeable v-model="zxshow" position="bottom" :style="{ height: '100%' }">
            <iframe class="conbox" src="http://appmsg.gzmtr.cn/DNSFile/newshtml/721fcbe2-2236-46a6-a0a8-a74736014832.html" frameborder="0"></iframe>
          </van-popup>
      </div>      
      <div class="con-3">
        <span class="con-3title">轻生活</span>
        <div class="con-3con" >
          <div class="con-3item" v-for="item in newslist" :key="item.index" @click="Check(item.url)">
            <!-- <img :src="item.picUrl" alt=""> -->
            <!-- <div class="con-2"> -->
              <div class="con-3itemtitle">{{item.title}}</div>

              <span class="con-3itemctime">{{item.ctime}}</span>
            <!-- </div> -->
          </div>
          <van-popup closeable v-model="isshow" position="bottom" :style="{ height: '100%' }">
            <iframe class="conbox" :src="this.src"> </iframe>
          </van-popup>
        </div>
      </div>
    </div>
    <!-- <button id="metro" @click="a">1111</button> -->
    <!-- <iframe class="ssbox" src="http://ydyc.gzmtr.cn:19090/pcindex.html#/"></iframe> -->
    <!-- <iframe class="ssbox" src="http://appmsg.gzmtr.cn/DNSFile/newshtml/721fcbe2-2236-46a6-a0a8-a74736014832.html" frameborder="0"></iframe> -->

    <!-- <div id="container" class="mymap"></div> -->
  </div>
</template>

<script>


  export default {
    name: "Home",

  
    data() {
      return {
          isshow:false,
          zxshow:false,
          src:"",
          home1:require('../assets/images/home-1.png'),
          home2:require('../assets/images/home-2.png'),
          
          con1:[

            {
              text:'客流实况',
              img:require('../assets/images/life-1.png'),
              ty:"travel",
              to:"Real"
            },
            {
              text:'博物馆预约',
              img:require('../assets/images/life-2.png'),
              ty:"huabian",
              to:"Make"
            },
            {
              text:'爱心服务',
              img:require('../assets/images/life-2.png'),
              ty:"huabian",
              to:"Service"
            },
            {
              text:'智慧客服',
              img:'ellipsis',
              ty:"gd",
              to:"Customer"
            },
          ],
          newslist:[]
        }
    },

      methods: {
      a(){
        this.axios({

          // url: "https://v1.alapi.cn/api/acg",
          // url:"https://v1.alapi.cn/api/bing",
          url:"https://apppax.gzmtr.cn/app/news/getdetail",
          // url:"http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          // url:"https://uploadbeta.com/api/pictures/random/?key=%E6%8E%A8%E5%A5%B3%E9%83%8E",
          // url:"https://bing.ioliu.cn/v1/rand?type=json",
          // url:"https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
                data: {
                  newsid: "721fcbe2-2236-46a6-a0a8-a74736014832"}, //接口请求的参数

                // 可选参数
                method: "POST",
                timeout: 20000
        })
          .then((result) => {
          this.$toast.clear();
          console.log("result ==> ", result);

        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
      },
      b(){
        this.axios({
          method: "GET",
          url: "http://api.tianapi.com/areanews/index",
          // url: "http://api.tianapi.com/travel/index",
          // url:"http://api.tianapi.com/qiwen/index",
          // url:"http://api.tianapi.com/huabian/index",

          params: {
            key: "c97e90681734b6533b7848de008f31c9",
            areaname:"广东"
          }
        })
          .then((result) => {
          this.$toast.clear();

          // console.log(result.data.newslist[0].url.load('p-detail.html'));
          this.newslist = result.data.newslist;

        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
      },

      zx(){
        this.zxshow = true
      },
      Check(src){
        console.log(src);
        this.isshow = true;
        this.src = src
      },

      gox(to){
        console.log(to);
        this.$router.push({name:to})
      }
      
    },
    mounted(){
      //  this.loadmap();     //加载地图和相关组件

        this.b()
        // this.axios({
        //   method: "GET",
        //   url: url,
        //   // url: "http://api.tianapi.com/travel/index",
        //   // url:"http://api.tianapi.com/qiwen/index",
        //   // url:"http://api.tianapi.com/huabian/index",

        //   params: {
        //     key: "c97e90681734b6533b7848de008f31c9",
        //     num: 10,
        //     viewid:3270,
        //   }
        // })
        //   .then((result) => {
        //   this.$toast.clear();
        //   console.log("result ==> ", result);
        //   console.log(result.data.newslist);
          
        //   console.log(result.data.newslist[0].url);
        //   // console.log(result.data.newslist[0].url.load('p-detail.html'));
        //   this.newslist = result.data.newslist
        // })
        // .catch((err) => {
        //   this.$toast.clear();
        //   console.log("err ==> ", err);
        // });
    },
}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  // overflow: hidden;

}
.nav-bar{
  // margin-bottom: 30px;
  width: 100%;
  background-color: #C9072C;

}
/deep/ .van-nav-bar__title{
  color: white;
  font-weight: 600;
}
   .mymap{
      width: 300px;
      height: 300px;
    }
#mysubway{
  z-index: 0;
  height: 90%;
}
/deep/ .grid{
  // background-color: #C9072C;
  height: 110px;
  z-index: 1;
}
/deep/ .van-grid-item__content{
  background-color: #C9072C;
  border: none;
  padding-bottom: 30px;

}
/deep/ .van-grid-item__text{
  color: white;
}
.content{
  position: relative;
  z-index: 1;
  // display: none;
  // height: 300px;
  background-color:#eee;
  margin-top: -20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}
.con-1{
  width: 100%;
  background-color: white;
  // overflow: hidden;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
}
.con-1item{
  flex: 1;
}
.con-2{
  margin-top: 10px;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.con-2title{
  padding-left: 5px;
  // float: left;
  display: block;
  text-align: left;
  border-left: 2px solid #c9072c;
}
.con-2con{
  text-align: left;
  height: 50px;
  margin: 20px 0;
  font-size: 20px;
  display: block;
  // width: 100%;

}
.con-2con-time{
  font-size: 12px;
  float: right;
}
.con-3{
  margin-top: 10px;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  // overflow: hidden;

}
.con-3title{
  padding-left: 5px;
  // float: left;
  display: block;
  text-align: left;
  border-left: 2px solid #c9072c;
}
.con-3con{
  // background-color: #eee;
  // text-align: left;
  margin: 20px 0;
  font-size: 20px;
  // display: block;
  // width: 100%;

}
.con-3item{
  display: block;
  box-sizing: border-box;
  margin: 15px 0;
  width: 100%;
  padding: 10px;
  background-color:white;
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


.con-3itemtitle{
  font-size: 20px;
  // width: calc(100% - 90px);
  width: 100%;
  text-align: left;

}
.con-3itemctime{
  font-size: 12px;
  float: right;

}
.ssbox{
  width: 100%;
  // height: 80%;
}
.ssbox #navBar{
  background-color: #C9072C;
  display: none;
}
.conbox{
  width: 100%;
  height: calc(100% - 40px);
  border: none;
  margin-top: 40px;
  // padding-top: -40px;
}
</style>

