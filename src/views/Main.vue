<template>
  <div class="main">

    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>

    <van-tabbar v-model="activeName"  inactive-color="#707070" active-color="#C9072C" route>
      
      <van-tabbar-item :class="item.name" :icon="item.icon" v-for="(item, index) in tabbarData" :key="index" :name="item.name" replace :to="item.path">
        <span>{{item.title}}</span>
        <!-- 具有插槽作用域的插槽 -->
        <template #icon="props">
          <img :src="props.active ? item.activeImg : item.inactiveImg" />
        </template>
        
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  export default {
    name: 'Main',
    data() {
      return {

        //激活标签的名称
        activeName: 'Home',

        tabbarData: [
          {
            title: '首页',
            icon: 'home-o',

            //标签名称、路由名称
            name: 'Home',

            path: '/main/home',

            
            inactiveImg: require('../assets/images/icon-gzdt.png'),
            activeImg: require('../assets/images/icon-gzdt-O.png')

          },
            {
            title: '出行导航',
            icon: 'home-o',

            //标签名称、路由名称
            name: 'Nav',

            path: '/main/nav',

            
            inactiveImg: require('../assets/images/icon-dt.png'),
            activeImg: require('../assets/images/icon-dt-O.png')

          },
                      {
            title: '乘车码',
            icon: 'home-o',

            //标签名称、路由名称
            name: 'Qr',

            path: '/main/qr',

            
            inactiveImg: require('../assets/images/icon-qr.png'),
            activeImg: require('../assets/images/icon-qr.png')

          },
            {
            title: '轻生活',
            icon: 'home-o',

            //标签名称、路由名称
            name: 'Life',

            path: '/main/life',

            
            inactiveImg: require('../assets/images/icon-dh.png'),
            activeImg: require('../assets/images/icon-dh-O.png')

          },
            {
            title: '个人中心',
            icon: 'home-o',

            //标签名称、路由名称
            name: 'MY',

            path: '/main/mY',

            
            inactiveImg: require('../assets/images/icon-my.png'),
            activeImg: require('../assets/images/icon-my-O.png')

          },

        ]
      };
    },

    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .main{
    // padding-bottom: 50px;
  }

.Qr img{
    z-index: 9;
    width: 40px;
    height: 40px;
    background-color: white;
    border: 5px solid white;
    border-radius: 50%;
    margin-top: -30px;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border:none; 
}
</style>