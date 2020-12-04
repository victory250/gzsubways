<template>
  <div class="my">
    <van-nav-bar class="nav-bar" safe-area-inset-top>
      <template #right>
        <van-icon name="setting-o" size="18" color="white" />
      </template>
    </van-nav-bar>
    <div class="my-box1" v-if="isshowlogin">
      <img src="../assets/images/my.png" alt="" />
      <button class="but" @click="goLogin">登录/注册</button>
    </div>
    <div class="my-box2" v-if="!isshowlogin">
      <img src="../assets/images/my.png" alt="" />
      <span class="phone">{{this.phone}}</span>
      <div class="Integral">
        <span>积分:0</span>
        <span>积分规则</span>
      </div>
    </div>
    <div class="box2-2" v-if="!isshowlogin">
      <div class="vip" v-for="item in vipData" :key="item.index">
          <span>{{item.num}}</span>
          <span>{{item.name}}</span>
      </div>
    </div>
    <div class="my-box3">
      <van-cell :to="item.to" v-for="item in listData" :key="item.index">
        <span>
          <img :src="item.imgsrc" alt="" />
          {{item.name}}
        </span>
      </van-cell>
    </div>
    <div class="my-box4">
      <img src="../assets/images/MY-gzdt.png" alt="">
      <span>版本:4.8.5(217)</span>
      <span>(57392)</span>
    </div>
    <!-- <button @click="ceshi">测试</button> -->
  </div>
</template>

<script>
export default {
  name: "my",

  data() {
    return {
      isshowlogin:false,
      phone:"",

      listData:[
        {
          name:"联系我们",
          imgsrc: require('../assets/images/MY-1.png'),
          to:"MY"
        },
        {
          name:"用户协议及隐私协议",
          imgsrc: require('../assets/images/MY-2.png'),
          to:"my"
        },
        {
          name:"推荐给朋友",
          imgsrc: require('../assets/images/MY-3.png'),
          to:"my"
        },
        {
          name:"服务质量调研",
          imgsrc: require('../assets/images/MY-4.png'),
          to:"my"
        },
      ],
      vipData:[
        {
          name:"卡券",
          num:0
        },
        {
          name:"会员活动",
          num:0
        },
        {
          name:"消息",
          num:0
        },
      ]
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login" });
    },
          },

    beforeCreate() {
        //获取token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面

          this.$toast("请先登录");
          // return this.$router.push({ name: "Login" });
          this.isshowlogin=true;
        };
        this.axios({
          method: "GET",
          url: "http://www.kangliuyong.com:10002/findAccountInfo",
          params: {
            appkey: this.appkey,
            tokenString,
          }
        })
          .then((result) => {
          this.$toast.clear();
          if (result.data.code == 700) {
            this.isshowlogin=true;
            return this.$toast("请先登录");   
          }
          let phone = result.data.result[0].phone;
          this.phone=phone.substr(0, 3) + '****' + phone.substr(phone.length - 4);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });

 
    }
};
</script>
<style lang="less" scoped>
.my {
  background-color: #eee;
}
/deep/ .van-nav-bar {
  width: 100%;
  background-color: #C9072C;
}
.my-box1, .my-box2{
  box-sizing: border-box;
  background-color: #C9072C;
  height: 100px;
  padding: 20px;
}
.my-box1 img,.my-box2 img {
  display: block;
  float: left;
  margin-right: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.my-box1 .but{
  margin-top: 13px;
  display: block;
  color: white;
  background-color: transparent;
  height: 25px;
  width: 80px;
  border: 2px solid white;
  border-radius: 5px;
}
.my-box2{
  position: relative;
}
.phone{
  color: white;
  float: left;
  line-height: 50px;
}
.Integral{
  color: white;
  position: absolute;
  bottom: 10px;
  right: 5px;
}
.Integral span{
  margin: 0 5px;
}
.box2-2{
  overflow: hidden;
  padding: 10px;
  width: 100%;
  background-color: white;
  display: flex;
  box-sizing: border-box;
}
.box2-2 .vip{
  flex: 1;
  float: left;
  border-right: 1px solid #aaa;
}
.box2-2 .vip:last-child{
  border-right:none
}
.box2-2 .vip span{
  display: block;
  height: 20px;
}
.my-box3 {
}
.my-box3 img {
  height: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
.my-box4{
  margin-top: 20px;
  width: 100%;
}
.my-box4 img{
  height: 30px;
  // width: 100px;
}
.my-box4 span{
  display: block;
}
</style>