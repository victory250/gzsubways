<template>
  <div class="login">
    <div class="LOGO"><img src="../assets/images/gzdt.png" alt=""></div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.phone"
        name="手机号"
        left-icon="contact"
        placeholder="手机号"
        class="logoinput"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        left-icon="contact"
        placeholder="密码"
        class="logoinput"
      />
      <div style="padding: 5px 18px;margin-bottom: 30px">
        <span class="way-left">短信验证码登录</span>
        <span class="way-right">忘记密码</span>
      </div>
      <div style="margin: 16px;" >
        <van-button class="logobutton" round block type="info" native-type="submit" @click="login">
          登录
        </van-button>
          <van-button class="logobutton" round block type="info" native-type="submit" @click="goreg">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="Fast">
        <van-divider  :style="{color: '#bbb', borderColor: '#bbb', padding: '0 16px' }">快捷方式登录</van-divider>
        <div >
          <span class="fast-left"> <img src="../assets/images/zfb.png" alt=""> <br> 支付宝登录</span>
          <span class="fast-right"> <img src="../assets/images/wx.png" alt=""> <br> 微信登录</span>
        </div>
    </div>
    <van-popup
      v-model="isshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%'}"
    >
      <span class="reg-title">注册</span>

        <van-form @submit="onSubmit">
          <van-field
            v-model="userRegisterInfo.phone"
            name="手机号"
            left-icon="contact"
            placeholder="请输入手机号"
            class="logoinput"
          />
          <van-field
            v-model="userRegisterInfo.password"
            type="password"
            name="密码"
            left-icon="contact"
            placeholder="请输入密码"
            class="logoinput"
          />
          <div style="margin: 16px;" >

              <van-button class="logobutton" round block type="info" native-type="submit" @click="register">
              注册
            </van-button>
          </div>
        </van-form>
    </van-popup>
  </div>
</template>

<script>

  import {validForm} from '../assets/js/validForm'



  export default {
    name: 'Login',
      data() {
        return {
          userInfo: {
            phone: '',
            password: ''
          },
          isshow:false,
                  //用户注册信息
          userRegisterInfo: {
            phone: '',
            password: '',
            nickName: '广州地铁'
          }
        };
        
      },
      methods: {
        onSubmit(values) {
          console.log('submit', values);
          
        },
        goreg(){
          this.isshow=true;
        },

              //注册
      register() {
        //构造表单验证信息
        console.log(this.userRegisterInfo);
        let o = {
          phone: {
            value: this.userRegisterInfo.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.userRegisterInfo.password,
            errorMsg: '密码格式不正确',
            reg: /^[A-Za-z]\w{5,15}$/
          },
          nickName: {
            value: this.userRegisterInfo.nickName,
            errorMsg: '昵称格式不正确',
            reg: /^[\w\u4e00-\u9fa5]{1,10}$/
          },
        };

        let isPass = validForm.valid(o);

        if (isPass) {

          console.log('this.appkey ==> ', this.appkey);

          //赋值用户注册信息
          let userInfo = Object.assign({}, this.userRegisterInfo);
          userInfo.appkey = this.appkey;
          console.log('userInfo ==> ', userInfo);
          console.log('this.userRegisterInfo ==> ', this.userRegisterInfo);
 

           //启动加载提示
          this.$toast.loading({
            //文本提示
            message: '加载中...',
            //禁止穿透点击
            forbidClick: true,
            //提示时间, 0: 没有时间限制
            duration: 0
          });


          //发起注册请求
          this.axios({
            //请求类型
            method: 'POST',
            //请求路径
            url: 'http://www.kangliuyong.com:10002/register',

            //POST请求参数, object
            data: userInfo

          }).then(result => {
            console.log('result ==> ', result);

            if (result.data.code == 100) {

              this.isshow = false;
              this.$toast.clear();
              this.$toast(result.data.msg);
            } else {
              //如果注册失败，手机被注册了
              this.$toast(result.data.msg);
            }

          }).catch(err => {
            this.$toast.clear();
            console.log('err ==> ', err);
          })

        }
      },

      //登录
      login() {
        //构造表单验证信息
        let o = {
          phone: {
            value: this.userInfo.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.userInfo.password,
            errorMsg: '密码格式不正确',
            reg: /^[A-Za-z]\w{5,15}$/
          }
        };

        let isPass = validForm.valid(o);
        if (isPass) {
          //发起登录请求
          //复制用户注册信息
          let userInfo = Object.assign({}, this.userInfo);
          userInfo.appkey = this.appkey;

          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          });

          //发起注册请求
          this.axios({
            //请求类型
            method: 'POST',
            //请求路径
            url: 'http://www.kangliuyong.com:10002/login',

            //POST请求参数, object
            data: userInfo

          }).then(result => {
            this.$toast.clear();

            console.log('result ==> ', result);

            if (result.data.code == 200) {
              //登录成功
              //保存token, 以便后面验证登录
              localStorage.setItem('__tk', result.data.token);
              this.$toast(result.data.msg);
              //其他操作
              return this.$router.push({ name: "QR" });
            } else {
              this.$toast(result.data.msg);
            }

          }).catch(err => {
            this.$toast.clear();

            console.log('err ==> ', err);
          })        


        }
      },


      },
  }
</script>

<style lang="less" scoped>
  .LOGO{
    


  }

  .logoinput{
    background-color: #eee;
    width: 344px;
    margin: 5px auto;
    border-radius: 20px;
  }
  .logobutton{
    background-color:#C9072C;
    border: none;
    margin: 5px 0;
  }
  .way-left{
    float: left;
    color:#C9072C;
  }
  .way-right{
    float: right;
    color: #BDBDBD;
  }
  .Fast{
    margin-top: 80px;
  }
  .fast-left{
    margin: 0 20px;
    display: inline-block;
    
  }
  .fast-right{
    margin: 0 20px;
    display: inline-block;

  }
  .reg-title{
    display: block;
    padding: 15px;
    font-size: 18px;
    margin-bottom: 30px;
  }
</style>