<template>
  <div class="nav">
    <!-- @click="a" -->
    <!-- <iframe class="box" :src="this.srr"></iframe> -->
    <iframe class="box" :src="this.src" v-if="!this.src ==''"> </iframe>
    <div v-if="this.src ==''" id="container" class="box mymap"></div>
    <div class="box-so">
      <van-cell-group>
        <van-field
          v-model="value"
          left-icon="location-o"
          placeholder="请输入目的地"
          class="ipt"

        />
        <button class="but" @click="so">点击查找</button>
                <!-- <button class="but" @click="getLocation">点找</button> -->
      </van-cell-group>
    </div>
    <!-- <van-cell is-link title="基础用法" @click="show = true" /> -->
    <van-action-sheet
      v-model="show"
      :actions="this.resultdata"
      cancel-text="取消"
      description="请选择目的地"

      @cancel="onCancel"
      @select="onSelect"

    />
  </div>
</template>

<script>
export default {
  name: "Nav",

  data() {
    return {
      key: "404c83a5cd61f7e1982881d9e0ad1981",
      keywords: "广州塔",
      // srr: "113.481488,23.990464",
      value: "",
      // ss:"",
      // src:"//uri.amap.com/navigation?from='',startpoint&to='',endpoint&mode=bus&policy=1&src=mypage&coordinate=gaode&callnative=0",
      // src:"//m.amap.com/navi/?start=''&dest="+ this.srr +"&destName=广州&naviBy=bus&key=834315e774200bbe8dcecba076abb705	",
      // src:"//m.amap.com/navi/?dest=''&destName=''&hideRouteIcon=1&key=834315e774200bbe8dcecba076abb705",
      src:'',

      show: false,

      resultdata: [
        {

          name: "111",
        },
      ],
    };
  },
      mounted(){
       this.loadmap();     //加载地图和相关组件
    },
  methods: {
    so() {
      console.log("111");
      this.keywords = this.value
      this.axios({
        //请求类型
        method: "GET",

        url: "https://restapi.amap.com/v3/place/text?parameters",

        params: {
          key: this.key,
          keywords: this.keywords,
          offset: 5,
        },
      })
        .then((result) => {
          this.$toast.clear();

          console.log("result ==> ", result);
          console.log(result.data.pois);
          console.log(result.data.pois.name);
          console.log(result.data.pois.location);
          console.log(result.data.pois.address);
          if (result.data.count == 0) {
              this.$toast("当前关键词未查找到相关位置");
              return
          }
          this.resultdata = result.data.pois;

          for (let i = 0; i < result.data.pois.length; i++) {
            result.data.pois[i].subname = result.data.pois[i].address;
            console.log(result.data.pois[i].subname);
          }
          this.show = true;
        })
        .catch((err) => {
          this.$toast.clear();

          console.log("err ==> ", err);
        });
        
    },
    
      loadmap(){
        var map = new AMap.Map('container', {
          // center: [],//中心点坐标
          resizeEnable: true,
          zoom: 12,

        });

      },



    onCancel() {

      this.show = false;

      this.$toast("取消");
    },

    onSelect(item) {

      this.show = false;

      this.$toast(item.name);
      console.log(item.location);
      // 131 113.429823,23.132870
      this.src = "//m.amap.com/navi/?start=113.429823,23.132870&dest="+item.location +"&destName=''&naviBy=bus&key=834315e774200bbe8dcecba076abb705";
    },

  },

  // beforeCreate() {
  //   this.srr = "113.324553,23.106414";
    // this.resultdata = [
    //   {
    //     address: "阅江西路222号",
    //     adname: "海珠区",
    //     location: "113.324553,23.106414",
    //     name: "广州塔",
    //   },
    // ];
    // this.axios({
    //     method: "GET",

    //     url: "https://restapi.amap.com/v3/ip?parameters",

    //     params: {
    //       key: this.key,
    //       keywords: this.keywords,
    //       offset: 5,
    //     },    
    //   })
  // },
};
</script>

<style lang="less" scoped>
.nav{
  height: 100%;
}
.box {
  height: calc(100% - 120px);

  width: 100%;
  // background-color: yellow;
  overflow: hidden;
  border: none;
}
.box-so{
  height: 120px;
  width: 100%;
  padding-top: 10px;
  background-color: white;
}
.but{
  height: 30px;
  border-radius: 15px;
  border: none;
  width: 50%;
  background-color: #C9072C;
  color: white;
}
.ipt{
  width: 50%;
margin: 0 auto;
}
</style>