<template>
  <el-footer>
     <span>©2018-2019 杭州知筑信息技术有限公司 All Rights Reserved.浙ICP备140559689-1</span>
     <img :src="imgSrc" alt="">
  </el-footer>
</template>
<script>
export default {
  data() {
    return {
      imgSrc:require('../../assets/images/bdtj.png')
    };
  }
}
</script>
<style scoped>
.el-footer{
  width: 100%;
  background:rgba(235,235,235,1);
  color: #959595;
  font-size: 14px;
  line-height: 60px;
  position: absolute;
  bottom: 0;
  z-index: 99999;
}
.el-footer img {
    margin-left:10px;
}
</style>
