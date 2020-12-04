<template>
    <div class="Make">
        <van-nav-bar
        title="博物馆预约"
        left-text="返回"
        left-arrow
        @click-left="back"
        class="nav-bar"
        />
        <van-swipe class="swipe" :autoplay="5000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
 
          </van-swipe-item>
          
        </van-swipe>
        <div class="data">
            <div class="date" @click="cdate">参观日期<span>{{this.date}}</span></div>
            <van-calendar   v-model="dateshow" @confirm="onConfirm" />
            <div class="time" @click="ctime">参观时间<span>{{this.currentTime}}</span></div>
            <van-datetime-picker
                v-if="ctimeshow"
                v-model="currentTime"
                type="time"
                title="选择时间"
                :min-hour="10"
                :max-hour="20"
                @confirm="ctimeo"
            />
            <div class="num" @click="cnum">参观人数<span>{{this.num}}</span></div>
            <van-picker
            v-if="numshow"
            title="数量"
            show-toolbar
            :columns="columns"
            @confirm="cnumo"
            />
        </div>
        <button class="makebut" @click="Success">立刻预约</button>
    </div>
</template>

<script>
    export default {
        name:"Make",
        
        data(){
            return{
                
                images: [
                // 'https://img.zcool.cn/community/0115e558983a01a8012060c81e43fd.jpg@1280w_1l_2o_100sh.jpg',
                // 'http://img.zcool.cn/community/01c45258983a00a801219c774c8671.jpg@1280w_1l_2o_100sh.png',
                // 'https://img.zcool.cn/community/01909258983dc0a8012060c8f1d2a8.jpg@1280w_1l_2o_100sh.jpg',

                require('../assets/images/bwg.jpg'),
                require('../assets/images/bwg-2.jpeg'),
                require('../assets/images/bwg-3.jpeg'),
                ],
                date: '',
                dateshow: false,
                currentTime: '12:00',
                ctimeshow:false,
                columns: ['1', '2', '3'],
                num:"1",
                numshow:false
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            }, 
            cdate(){
                this.dateshow = !this.dateshow
            },
            formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
            this.dateshow = false;
            this.date = this.formatDate(date);
            },
            ctime(){
                this.ctimeshow = true
            },
            ctimeo(){
                this.ctimeshow = false
            },
            cnum(){
                this.numshow = true;
            },
            cnumo(value, index) {
                // console.log(value);
                // this.num = value;
                this.numshow = false;
                this.num = value;
            },
            Success(){
                if (this.date == "") {
                    return this.$toast('请选择日期');
                }else if(this.currentTime == ""){
                    return this.$toast('请选择参观时间');
                }else if(this.num =='' ){
                    return this.$toast('请选择参观人数');
                }
                this.$dialog.alert({
                  title: '预约成功',

                    message: `您已成功预约参馆<br>日期:${this.date} 时间:${this.currentTime} 人数:${this.num}`,
                });
            }

        }
    }
</script>

<style lang="less" scoped>
.Make{
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
.swipe{

  margin: 0 auto;
  width: 100%;
  height: 180px;
//   border-radius: 20px;
}
.swipe img{
  background-color: red;
  width: 100%;
  height: 100%;
}
.data{
    margin: 10px auto;
    padding: 20px;
    width: 80%;
    // background-color: yellow;
    box-sizing: border-box;
    border: 3px solid #000;
    border-radius: 10px;
}
.date{
    font-size: 20px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    width: 100%;
    text-align: left;
    border-bottom: 2px solid #000;
}
.date span{
    float: right;
}
.time{
    font-size: 20px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    width: 100%;
    text-align: left;
    border-bottom: 2px solid #000;
}
.time span{
    float: right;
}
.num{
    font-size: 20px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    width: 100%;
    text-align: left;
    border-bottom: 2px solid #000;
}
.num span{
    float: right;
}
.makebut{
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 20px;
    width: 80%;
    height: 40px;
    background-color: yellow;
}
</style>