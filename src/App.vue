<template>
    <div id="app">
    <!-- <button @click="goPage({name: 'Login'})">登录</button> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {

      //跳转路由
      goPage(o) {
        
        this.$router.push(o);
      } 
    }
  }
</script>

<style lang="less">
  body, html{
    // background-color: #f7f7f7;
    background-color: #eee;
    height: 100%;
    width: 100%;
    // overflow: hidden;
    padding: 0;
    margin: 0;
  }
  .main{
    height: calc(100% - 50px);
    box-sizing: border-box;
  }
      .main>:first-child{
      height: 100%;
      position: relative;
    }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}


</style>
