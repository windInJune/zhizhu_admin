<template>
	<div class="uselist">
		<p>
			<el-button class="searchs_btn"   @click="search()">查找</el-button>
			<el-input class="titinp" v-model="userName" placeholder="请输入姓名查找"></el-input>
		</p>
		<el-table
		    :data="tableData"
		    highlight-current-row :header-cell-style="headerClassFn" style="width: 100%;border:1px solid rgba(229, 229, 228, 1)">
		    <el-table-column
		      type="index"
		      label="序号"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      show-overflow-tooltip
		      prop="userName"
		      label="姓名">
		        <!-- <template slot-scope="scope">
			        <span>{{scope.row.userName || '--'}}</span>
			    </template> -->
		    </el-table-column>
		    <el-table-column
		      show-overflow-tooltip
		      prop="gradeName"
		      label="年级">
		        <!-- <template slot-scope="scope">
			        <span>{{scope.row.userZhinum || '--'}}</span>
			    </template> -->
		    </el-table-column>
		    <el-table-column
		      show-overflow-tooltip
		      prop="className"
		      label="班级">
		        <!-- <template slot-scope="scope">
			        <span>{{scope.row.userSex || '--'}}</span>
			    </template> -->
		    </el-table-column>
		    <el-table-column
		      show-overflow-tooltip
		      width="320"
		      label="时间">
		        <template slot-scope="scope">
			        <span>{{scope.row.startTime*1000 | totimestr}}/{{scope.row.endTime*1000 | totimestr}}</span>
			    </template>
		    </el-table-column> 
		    <el-table-column
		      show-overflow-tooltip
		      prop="time"
		      label="持续时长">
		        <template slot-scope="scope">
			        <span>{{scope.row.time | settimems}}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      show-overflow-tooltip
		      label="操作">
		        <template slot-scope="scope">
			        <span class="cur" style="color:#0090ff;" @click="seeplayback(scope.row)">查看录像</span>
			    </template>
		    </el-table-column>
		</el-table>
		<div class="block">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="pageObj.pageNum"
			      :page-sizes="[10, 20, 50, 100]"
			      :page-size="pageObj.pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
			</div>
	</div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
// import {getUserRecord} from '../../service/service.js';
export default{
	name:"uselist",
	data(){
		return{
			tableData:[],
			pageObj:{
				pageNum:1,
				pageSize:10
			},
			total:1,
			userName:'',
		}
	},
	components:{
      // Navrouter
    },
	created(){
		
	},
	mounted(){
		this.search();
	},
	methods:{
		headerClassFn(row, column, rowIndex, columnIndex){
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;"
    },
		search(){
			let obj={
				searchText:this.userName,
				iboxId:this.$route.query.iboxId
			}
			Object.assign(obj,this.pageObj);
			 Vue.http.headers.common["userToken"] = getCookie("userToken");
    	this.$http
      .get(this.global.getUserRecord + `?pageNum=${this.pageObj.pageNum}&pageSize=${this.pageObj.pageSize}&searchText=${this.userName}&iboxId=${this.$route.query.iboxId}`)
      .then(res => {
        if (res.body.status === 200) {
          	this.tableData=res.body.resultObject.data;
						this.total=res.body.resultObject.totalCount;
        } else if (res.body.status === 511) {
          this.$router.push({ path: "/" });
        } else {
          alert(res.body.errorMessage);
        }
        this.loading = false;
      });
		},
		handleSizeChange(val){
	   		this.pageObj['pageSize']=val;
	   		this.search();
	   	},
	   	handleCurrentChange(val){
	   		this.pageObj['pageNum']=val;
	   		this.search();
	   	},
	   	seeplayback(obj){
	   		this.$emit('seeplack',obj)
	   	}
	}	
}

</script>
<style scoped lang="less">
.el-pagination{
	margin: 20px 0;
	text-align: right;
}
.uselist{
	margin:10px;
	padding-bottom:10px;
	p{
		display: flex;
		align-items: center;
		 flex-direction:row-reverse;
		.searchs_btn{
			padding: 0;
		}
	}
}
</style>
<style lang="less">
.uselist{
	.titinp{
		width:360px;
		margin:10px;
	}
	.titsear{
		width:80px;
	}
}
</style>


