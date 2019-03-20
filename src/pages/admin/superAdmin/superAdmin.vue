<template>
  <div class="superAdmin">
    <el-container>
      <el-header><adminHeader/></el-header>
      <el-container>
        <el-aside width="200px"><adminNav/></el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
      <Footer/>
    </el-container>
  </div>
</template>
<script>
import adminHeader from '../../common/header.vue'
import adminNav from './components/navLeft.vue'
import Footer from '../../common/footer.vue'
export default{
  components: {
    Footer,
    adminHeader,
    adminNav
  },
  data () {
    return {
      msg: 'admin'
    }
  }
}
</script>
<style scoped lang="less">
  @import '~@/assets/styles/common.less';
  .superAdmin{
    height:100%;overflow:hidden;
    .el-container{height:100%;}
    .el-header{padding:0;}
    .el-aside{width:232px !important;margin-top:1px;height:100%;overflow:hidden;}
  }
</style>
