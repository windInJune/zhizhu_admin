<template>
  <div class="admin">
    <canvas id="canvas"></canvas>
    <el-container style="">
      <el-header>
        <div class="container">
          <img src="../../assets/images/logo.png">
        </div>
      </el-header>
      <el-main>
        <div class="container">
          <el-form>
            <h2>登录</h2>
            <i class="iconfont user">&#xe638;</i>
            <i class="iconfont pass">&#xe6c5;</i>
            <span class="wrongTips">{{wringTips}}</span>
            <el-input type="text" placeholder="请输入用户名" v-model="user" inputPattern='/^[\u4e00-\u9fa5]{1,6}$/'></el-input>
            <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form>
        </div>
      </el-main>
      <Footer/>
    </el-container>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from 'vue'
import $ from 'jquery'
import {setCookie, getCookie} from '../../assets/js/cookie.js'
import Footer from '../common/footer.vue'
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Footer
  },
  name: 'admin',
  data () {
    return {
      userToken: '',
      userName: '',
      sex: '',
      user: '',
      password: '',
      userToken: '',
      wringTips: ''
    }
  },
    computed: {
    ...mapState(["userdata","username"])
  },
  methods: {
    ...mapMutations(["USERINFO","USERNAME","USERIMG"]),
    login () {
       this.$http.post(this.global.userlogin, {userLoginname: this.user,userPwd: this.password},{emulateJSON: true})
          .then((res) => {
            if (res.data.status === 200) {
                this.USERINFO(res.data.resultObject);
                this.USERNAME(res.data.resultObject.userName);
                if(res.data.resultObject.userPhoto){
                  this.USERIMG('http://172.16.1.207:8005/'+res.data.resultObject.userPhoto);
                }else{
                  this.USERIMG("");
                }
                setCookie('userToken', res.data.resultObject.userToken, 1000 * 60)
                this.userToken = res.data.resultObject.userToken
                this.userName = res.data.resultObject.userName
                this.sex = res.data.resultObject.userSex
                localStorage.setItem('userName',res.data.resultObject.userName)
                // localStorage.setItem('userImg','http://172.16.1.207:8005/'+res.data.resultObject.userPhoto)
                localStorage.setItem('systemName',res.data.resultObject.userLoginname)
                localStorage.setItem('userId',res.data.resultObject.userId)
                localStorage.setItem('sex',this.sex)
                localStorage.setItem('userType',res.data.resultObject.userType)
                if(res.data.resultObject.userType == '1'){
                  this.$router.push({path: '/superAdmin',query:{userToken: getCookie('userToken')}})
                } else if(res.data.resultObject.userType == '2'){
                  this.$message.error('不是此平台账号！');
                }else if(res.data.resultObject.userType == '0'){
                  this.$router.push({path:'/manageAdmin',query:{userToken: getCookie('userToken')}})
                }
              } else if(res.data.status == 512){
                this.wringTips = res.data.errorMessage
              }
              else {
                console.log('wrong')
              }
          },(err) => {
            console.log(err)
          })
      }
  },
  mounted(){
    //宇宙特效
    "use strict";
    var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight,

      hue = 217,
      stars = [],
      count = 0,
      maxStars = 1300;//星星数量

    var canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
      //星星移动范围，值越大范围越小，
    }

    var Star = function() {

      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8;
      //星星大小
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      //星星移动速度
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.5; //尾巴
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      };

      window.requestAnimationFrame(animation);
    }

    animation();
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/styles/common.less';
.el-input__inner{padding-left:30px}
.admin{
  height:100%;position:relative;overflow-y:hidden;
  .el-container{
    height:100%;position:absolute;top:0;left:0;width:100%;
    .el-header{
      line-height:60px;height:60px;text-align:left;box-shadow: 0 0 8px #b4b4b4;background-color:#66b1ff;
      img{margin-right:15px;}
      span{font-size:16px;color:#fff;position:relative;margin-left:15px;}
      span:before{content:'';position:absolute;top:-5px;left:-15px;width:2px;height:25px;background-color:#fff;}
    }
    .el-main{
      .container{position:relative;height:100%;}
      .el-form{
        width:340px;height:290px;position:absolute;right:0;top:150px;box-shadow: 0 0 28px #b4b4b4;padding:30px;border-radius:5px;background-color:#fff;opacity:0.75;
        .wrongTips{position:absolute;text-align:left;color:#f56c6c;width:100%;font-size:16px;}
        .el-input{margin-top:30px;}
        .user{position: absolute;left: 40px;z-index: 9;top: 101px;color:rgb(170,170,170);}
        .pass{position: absolute;left: 40px;z-index: 9;top: 171px;color:rgb(170,170,170);}
        .el-button{width:100%;margin-top:30px;letter-spacing:20px;text-align:center;}
      }
    }
  }
}
</style>
