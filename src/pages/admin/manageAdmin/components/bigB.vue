<template>
  <div class="adminList">
    <ul class="top">
      <li class="left">大B平台列表</li>
      <li class="right" @click="addBigb">新建大B平台</li>
    </ul>
    <el-table :data="pageData" highlight-current-row :header-cell-style="headerClassFn" style="width: 100%;border:1px solid rgba(229, 229, 228, 1);margin-top:20px;text-agline">
        <el-table-column type="index" label="序号" width="80">
            <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="systembName" label="平台名称" width="160"></el-table-column>
      <el-table-column prop="systembDomain" label="平台域名" width="160"></el-table-column>
      <el-table-column prop="systembIndustry" label="所属行业"></el-table-column>
      <el-table-column prop="systembCompany" label="归属公司"></el-table-column>
      <el-table-column prop="provinceName" label="所在地区"></el-table-column>
      <el-table-column prop="managerName" label="负责人"></el-table-column>
      <el-table-column prop="managerTel" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template slot-scope="scope">
          <span class="creatTime">{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUsername" label="创建人"></el-table-column>
      <el-table-column prop="subjectType" label="操作" width="280">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            @click="changeInfo(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe60d;</i>编辑
          </el-button>
          <el-button
            size="small"
            @click="schoolDelete(scope.$index, scope.row)"
            class="iconfont-color-blue iconfont-color-red"
          >
            <i class="iconfont">&#xe600;</i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
       <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default{
  components: {},
  data () {
    return {
      loading: false,
      total:0,
      currentPage: 1,
      pageSize: 10,
      pageData:[]
    }
  },
  methods:{
    addBigb(){
        this.$router.push({
            path: '/manageAdmin/addbigb'
        })
    },
    headerClassFn(row, column, rowIndex, columnIndex){
      return "color:#434343;font-size:12px;text-algin:center;background:rgba(245,245,245,1);"
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSystembList +
            `?pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then(res => {
          if (res.status === 200) {
            this.pageData = res.body.data;
            this.total = res.body.totalCount;
          } else if (res.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.data.errorMessage);
          }
          this.loading = false;
        });
    },
    changeInfo(index,row){
        this.$router.push({
          path: '/manageAdmin/editbigb',
          query:{systemId: row.systembId}
        })
    },
    schoolDelete(index,row){
        let that = this;
        this.$confirm('您确定删除此平台，删除后平台所有数据将同步删除。', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           Vue.http.headers.common["userToken"] = getCookie("userToken");
           that.$http
            .post(
              that.global.deleteSystembById,
              { systemId: row.systembId },
              { emulateJSON: true }
            )
            .then(
              res => {
                 that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
               that.loadData()
              },
              err => {
              }
            );
      
        }).catch(() => {
        });
    }
  },
  created(){
      this.loadData()
  }
}
</script>
<style scoped lang="less">
    .adminList{
        padding-bottom: 80px;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            li.left {
            font-size: 14px;
            color: #434343;
            font-weight: bold;
            }
            li.right {
            width: 120px;
            font-size: 16px;
            color: #fff;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: rgba(0, 144, 255, 1);
            border-radius: 2px;
            cursor: pointer;
            }
        }
        .el-pagination {
            margin-top: 20px;
            text-align: right;
        }
    }
</style>
