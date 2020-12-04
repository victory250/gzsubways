<template>
  <div class="qr">
    <van-nav-bar title="乘车码" class="nav-bar" safe-area-inset-top >
      <template #right>
        <van-icon name="question-o" size="18" color=" white"/>
      </template>
    </van-nav-bar>


    <div class="box-1" v-if="isshow" >
      <div class="LOGO" v-if="!QRshow"><img src="../assets/images/qr-gzdt.gif" alt="">
        <button class="but-1" @click="qrshow();sxqr()">扫码进/出站</button>
      </div>
      <div class="QR" v-if="QRshow">
        请刷码进站
        <img :src="this.qrsrc" alt="">
        <!-- <img src="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture" alt=""> -->
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>

        </ul>
        <li class="left-li"></li>
        <li class="right-li"></li>
        <li class="top-li"></li>
        <li class="bottom-li"></li>
        <div class="QR-bottom">
          <span class="QR-bottom-1" @click="out">无法出站？</span>
          <span class="QR-bottom-2"><img src="../assets/images/QR-wx.png">微信支付</span>
          <span class="QR-bottom-3" @click="sxqr()"><van-icon name="replay" />刷新乘车码</span>
        </div>
      </div>

      <div class="Content">
        <div class="Choose">
          <span><img src="../assets/images/icon-QR-1.png" alt=""> <br> 查记录/发票</span>
          <span @click="gosubway"><img src="../assets/images/icon-QR-2.png" alt=""> <br> 线网图</span>
          <span><img src="../assets/images/icon-QR-3.png" alt=""> <br> 其它渠道</span>
          <span><img src="../assets/images/icon-QR-4.png" alt=""> <br> 扫卡绑定</span>
        </div>
        <van-swipe class="swipe" :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
 
          </van-swipe-item>
          
        </van-swipe>
      </div>
      
    </div>
    <!-- 未登录 -->
    <div class="box-2" v-if="!isshow">
      <div class="LOGO"><img src="../assets/images/QR-over.png" alt="">
        <div class="good">
          <span><van-icon name="good-job-o" size="40px" /> <br> 告别零钱</span>
          <span><van-icon name="good-job-o" size="40px" /> <br> 无需购票</span>
          <span><van-icon name="good-job-o" size="40px" /> <br> 全线可用</span>
        </div>
      </div>
      <button class="but-1" @click="goLogin">立即开通</button>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'QR',
    // components: {
    //   [Dialog.Component.name]: Dialog.Component,
    // },
    
    data() {
      return {
        // isshow:true,
        isshow:true,

        QRshow:false,

        qrsrc:"",

        images: [
          // 'https://img.zcool.cn/community/0115e558983a01a8012060c81e43fd.jpg@1280w_1l_2o_100sh.jpg',
          // 'http://img.zcool.cn/community/01c45258983a00a801219c774c8671.jpg@1280w_1l_2o_100sh.png',
          // 'https://img.zcool.cn/community/01909258983dc0a8012060c8f1d2a8.jpg@1280w_1l_2o_100sh.jpg',

          require('../assets/images/QR-swipe-1.png'),
          require('../assets/images/QR-swipe-2.jpg'),
          require('../assets/images/QR-swipe-3.jpg'),
        ],

      }
    },




    methods: {
      goLogin(){
            this.$router.push({ name: "Login" });
      },
      qrshow(){
        this.QRshow=true;
      },
      out(){
        this.$dialog.confirm({
          // title: '标题',
          message: '您本次车程无进闸信息，需补录进闸车站后方可出闸。如有疑问，请咨询车站工作人员',
          confirmButtonText:'补录进闸车站',
          confirmButtoncolor:'red',
          cancelButtonText:'关闭'
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      },
      sxqr(){
        console.log("刷新");
        this.qrsrc = require("../assets/images/QR-over.png");
        // this.qrsrc = "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture";
        this.axios({
          method: "GET",
          url: "https://v1.alapi.cn/api/acg",
          // url:"https://v1.alapi.cn/api/bing",
          // url:"https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture",
          // url:"http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          // url:"https://uploadbeta.com/api/pictures/random/?key=%E6%8E%A8%E5%A5%B3%E9%83%8E",
          // url:"https://bing.ioliu.cn/v1/rand?type=json",
          // url:"https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          params: {
            // type:"json"
            format:"json",
          }
        })
          .then((result) => {
          this.$toast.clear();
          console.log("result ==> ", result);
          // console.log(result.config.url);
          this.qrsrc = result.data.data.url;
          // this.qrsrc = result.config.url;
          // console.log(this.qrsrc);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
      },
        gosubway(){
        // console.log();
        this.$router.push({name:"Subway"})
      }
    },



    beforeCreate() {
        //获取token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面

          this.$toast("请先登录");
          // return this.$router.push({ name: "Login" });
          this.isshow=false;
        };
        this.axios({
          method: "GET",
          url: "http://www.kangliuyong.com:10002/findMy",
          params: {
            appkey: this.appkey,
            tokenString,
          }
        })
          .then((result) => {
          this.$toast.clear();
          console.log("shopbag result ==> ", result);
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$toast("请先登录");
            // this.$router.push({ name: "Login" });
            this.isshow=false;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },


  }
</script>
<style lang="less" scoped>

.qr{
  background-color: white;
  // height: 620px;
  height: 100%;
  position: relative;
  // padding-top: 30px;
  // position: absolute;
}
.LOGO{
  // height: 200px;
  // margin-top: 52px;
  padding: 60px;
  // width: 100%;
  // background-color: rosybrown;
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
.box-1{
  padding-top: 30px;
  height: calc(100% - 46px);
  position: relative;
  box-sizing: border-box;
}
.but-1{
  font-size: 16px;
  width: 240px;
  height: 40px;
  border-radius: 20px;
  background-color:  #C9072C;
  color: white;
  border: none;
  margin-top: 50px;
}
.Content{
  width: 100%;
  // position: relative;
  position:absolute;
  bottom: 0px;
  // margin-top: 50px;
  // height: 300px;
}
.Choose{
  width: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  padding: 20px;
  box-sizing: border-box;

}
.Choose img{
  width: 40px;
  height: 40px;

}
.Choose span{
  float: left;
  // display: flex;
  flex: 1;
}
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
.swipe{

  margin: 0 auto;
  width: 90%;
  height: 140px;
  border-radius: 20px;
}
.swipe img{
  background-color: red;
  width: 100%;
  height: 100%;
}
/deep/ .van-swipe__indicators{
  top:10px;

}
/deep/ .van-swipe__indicator{
  width: 15px;
  height: 6px;
  border-radius: 3px;
  background-color: #bbb;
}
/deep/ .van-swipe__indicator--active{
  background-color:  #39a9ed;
  
}
.box-2 .LOGO{
  margin: 0;
  text-align: center;
}
.box-2 .LOGO img{
  // display: block;
  width: 200px;
}
.box-2 .LOGO .good{
  display: flex;
}

.box-2 .LOGO .good span{
  height: 80px;
  width: 90px;
  font-size: 8px;
  transform: scale(0.7);
  float: left;
  flex: 1;
  border-radius: 50%;
  background-color: rgb(255, 225, 225);

}
.box-2{
  height: 600px;
}
.QR img{
    width: 200px;
  height: 200px;
}
.QR ul{
  // overflow: hidden;
  display: block;
  padding: 0 16px;

}
.QR ul li{
  margin: 0 10px;
  float: left;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  // background-color:white;
  background-color: transparent;
  box-shadow: 0px 0px 3px 1px rgb(202, 201, 201) inset;
}

.QR{

  padding-top: 20px;
  color: #C9072C;
  margin: 0 auto;
  // margin-top: 30px;
  width: 230px;
  height: 280px;
  background-color: white;
  box-shadow: 0px 0px 3px 1px rgb(202, 201, 201) ;
  position: relative;
}
.left-li{
  position: absolute;
  left: -7px;
  list-style: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color:white;
  box-shadow: -5px 0px 5px -5px rgb(202, 201, 201) inset;

}
.right-li{
  position: absolute;
  right: -7px;
  list-style: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color:white;
  box-shadow: 5px 0px 5px -5px rgb(202, 201, 201) inset;
}
.top-li{
  position: absolute;
  top:-20px;
  left: 50%-10px;
  right: 0;
  list-style: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color:white;
  box-shadow: 0px -5px 5px -3px rgb(202, 201, 201) inset;
}
.bottom-li{
  position: absolute;
  bottom:-20px;
  left: 50%-10px;
  right: 0;
  list-style: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color:white;
  box-shadow: 0px 5px 5px -3px rgb(202, 201, 201) inset;
}
.QR-bottom-1{
  width: 80px;
  color: #000;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: bolder;
}
.QR-bottom-2 img{
  width: 15px;
  height: 15px;
  margin-bottom:-3px;
}
.QR-bottom-2{

  color: #000;
  float: left;
  margin-left: 5px;
  font-weight: bolder;
}
.QR-bottom-3{
  color: #C9072C;
  float: right;
  margin-right: 5px;
  font-weight: bolder;
}
</style>