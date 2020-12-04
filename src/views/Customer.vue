<template>
    <div class="Customer">
        <van-nav-bar
        title="客服"
        left-text="返回"
        left-arrow
        @click-left="back"
        class="nav-bar"
        />
        <div class="dh">
            <div class="dh-item" v-for="item in kfdata" :key="item.index">
                <span class="dh-time">{{item.time}}</span>
                <div class="dh-my">
                    <span>{{item.my}}</span>
                    <van-icon class="my-icon" name="smile" size="40" />
                </div>
                <div class="dh-you">
                    <van-icon class="you-icon" name="service" size="30" />
                    <span>{{item.you}}</span>
                </div>
            </div>
        </div>
        <div class="inbox"><input type="text" v-model="question"><button @click="kf">发送</button></div>
    </div>
</template>

<script>
    export default {
        name:"Customer",
        data(){
            return{
                question:"",
                kfdata:[]
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }, 

            kf(){
                let kfd = {};
                kfd.my = this.question;

                var date = new Date();
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds(); 
                console.log(Y+M+D+h+m+s);
                let time =  Y+M+D+h+m+s;

                kfd.time = time

                this.axios({
                    method: "GET",
                    url: "http://api.tianapi.com/txapi/robot/index",
                    params: {
                        key: "c97e90681734b6533b7848de008f31c9",
                        question:this.question
                    }
                    })
                    .then((result) => {
                    this.$toast.clear();
                    console.log("result ==> ", result.data.newslist[0].reply);
                    kfd.you = result.data.newslist[0].reply
                    console.log(kfd);
                    this.kfdata.push(kfd);
                    this.question = ""
                    })
                    .catch((err) => {
                    this.$toast.clear();
                    console.log("err ==> ", err);
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
.Customer{
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
.inbox{
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 40px;
    background-color: #fafafa;
    position: absolute;
    bottom: 0;
}
.inbox input{
    border: none;
    border-radius: 5px;
    height: 20px;
    width: 280px;
}
.inbox button{
    margin-left: 10px;
    height: 20px;
    width: 50px;
}
.dh{
    margin: 5px 0;
    padding: 5px 10px;
}
.dh-time{
    margin: 5px 0;
    height: 20px;
    line-height: 20px;
    padding: 3px 5px;
    border-radius: 10px;
    background-color: #ccc;

}
.dh-my{
    margin: 5px 0;
    text-align: right;
    overflow: hidden;
}
.dh-my span{
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 10px;
    color: white;
    background-color: #C9072C;
    display: inline-block;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
}
.my-icon{
    display: inline-block;
    vertical-align:middle;
    color: #C9072C;
    width: 40px;
    height: 40px;
}
.dh-you{
    margin: 5px 0;
    text-align: left;

}
.dh-you span{
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 10px;
    background-color: white;
    display: inline-block;
    font-size: 18px;
    line-height: 40px;
    // height: 40px;
}
.you-icon{
    margin-right: 5px;
    vertical-align:middle;
    border-radius: 50%;
    // color:#005AFF;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #005aff;
}
</style>