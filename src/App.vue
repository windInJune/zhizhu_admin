<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /*width:1200px;*/
}
.el-button--primary {
    color: #FFF;
    background-color: #0090ff;
    border-color: #0090ff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #0090ff;
}
.admin .el-input__inner{padding-left:30px}
.adminList .el-table th{text-align:center;}
.adminList .el-table td{text-align:center;}
</style>
