<template>
    <div class="Service">
        <van-nav-bar
        title="爱心服务"
        left-text="返回"
        left-arrow
        @click-left="back"
        class="nav-bar"
        />
        <div class="box-1">出行关爱</div>
        <div class="box-2">如您有轮椅、盲人、孕妇或其他出行需要帮助的朋友，请填写登记表或拨打广州地铁服务热线96891，我们将与您联系。</div>
        <div class="box-3">
            <div class="reg" v-for="(item,index) in reg" :key="index">
                <span>{{item.name}}:</span>
                <input type="text" v-model="item.value">
            </div>
        </div>
        <button @click="Submit">提交</button>
    </div>

</template>

<script>
    export default {
        name:"Service",
                
        data(){
            return{
                reg:[
                    {
                        name:"乘车时间",
                        value:""
                    },
                                        {
                        name:"人数",
                        value:""
                    },
                                        {
                        name:"进站车站",
                        value:""
                    },
                                        {
                        name:"出站车站",
                        value:""
                    },
                                        {
                        name:"联系人",
                        value:""
                    },
                                        {
                        name:"联系电话",
                        value:""
                    }
                ]

            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }, 
            Submit(){
                let reg = this.reg
                for (let i = 0; i < reg.length; i++) {
                    if (reg[i].value == "") {
                        return this.$toast(`请填写${reg[i].name}`);
                    }
                    
                };
                this.$dialog.alert({
                  title: '提交成功',

                    message: `您已成功登记关爱表<br>我们将在${reg[0].value}前联系您，请您保持通讯畅通`,
                });
            }
        }
    }
</script>

<style lang="less" scoped>
.Service{
    width: 100%;
    height: 100%;
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
.box-1{
    height: 30px;
    color: white;
    line-height: 30px;
    font-weight: 600;
    font-size: 18px;
    background-color:#005AFF;
}
.box-2{
    padding: 10px;
    color: red;
    font-weight: 600;
    font-size: 12px;
    text-align: left;
}
.box-3{
    box-sizing: border-box;
    // padding: 0 10px;
    margin: 0 10px;
    width: calc(100% - 20px);
    background-color: white;
    overflow: hidden;
    border-radius: 10px;
}
.reg{
    padding: 10px 10px;
    box-sizing: border-box;
    height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
}
.box-3 span{
    height: 20px;
    font-size: 14px;
    letter-spacing: 5px;
    float: left;
    font-weight: bolder;
    color: #005AFF;
}
.box-3 input{
    box-sizing: border-box;
    width: 250px;
    height: 20px;
    float: right;
    border: none;

}
button{

    margin-top: 20px;
    border: none;
    border-radius: 15px;
    height: 30px;
    width: 150px;
    background-color: #005AFF;
    color: white;
}
</style>