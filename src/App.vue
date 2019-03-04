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
.admin .el-input__inner{padding-left:30px}
.adminList .el-table th{text-align:center;}
.adminList .el-table td{text-align:center;}
</style>
