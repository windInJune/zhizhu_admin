<template>
  <div class="adminList">
    <ul class="top">
      <li class="left">机构列表</li>
      <!-- <li class="right" @click="dialogOpen">新建机构</li> -->
    </ul>
    <div class="checkBox">
        <el-select v-model="platform" @change="selectChange" placeholder="请选择管理平台">
          <el-option   v-for="(item,index) in platformlist"
              :key="index"
              :label="item.systembName"
              :value="item.systembId"></el-option>
        </el-select>
    </div>
    <!-- 表单信息 -->
    <el-table :data="pageData" highlight-current-row :header-cell-style="headerClassFn"  style="width: 100%;border:1px solid rgba(229, 229, 228, 1)">
         <el-table-column type="index" label="序号">
            <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="schoolName" label="机构名称" ></el-table-column>
      <el-table-column prop="schoolId" label="机构ID"></el-table-column>
      <el-table-column prop="systembName" label="所属大B平台" width="140"></el-table-column>
      <el-table-column prop="schoolType" label="类型">
        <template slot-scope="scope">
          <span v-show="scope.row.schoolType == 1">公立</span>
          <span v-show="scope.row.schoolType == 2">私立</span>
          <span v-show="scope.row.schoolType == 3">公私合作</span>
          <span v-show="scope.row.schoolType == 4">其它</span>
        </template>
      </el-table-column>
      <el-table-column prop="schoolSection" label="学段">
        <template slot-scope="scope">
          <span v-show="scope.row.schoolSection == 1">小学</span>
          <span v-show="scope.row.schoolSection == 2">初中</span>
          <span v-show="scope.row.schoolSection == 3">高中</span>
          <span v-show="scope.row.schoolSection == 4">完全中学</span>
          <span v-show="scope.row.schoolSection == 5">九年一贯制</span>
          <span v-show="scope.row.schoolSection == 6">十二年一贯制</span>
          <span v-show="scope.row.schoolSection == 7">中专</span>
          <span v-show="scope.row.schoolSection == 8">高职</span>
          <span v-show="scope.row.schoolSection == 9">大专</span>
          <span v-show="scope.row.schoolSection == 10">大学</span>
          <span v-show="scope.row.schoolSection == 11">企业培训</span>
          <span v-show="scope.row.schoolSection == 12">其它</span>
        </template>
      </el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="managerName" label="负责人"></el-table-column>
      <el-table-column prop="zhiNumber" label="知号"></el-table-column>
      <el-table-column prop="managerTel" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
      <el-table-column prop="createUsername" label="创建人"></el-table-column>
      <el-table-column prop="isDisable" label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.isDisable == 1" class="yellow">未激活</span>
          <span v-show="scope.row.isDisable == 0" class="green">已激活</span>
        </template>
      </el-table-column>
      <el-table-column prop="subjectType" label="操作" width="210">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            @click="schoolInfo(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe602;</i>总览
          </el-button>
          <el-button
            size="small"
            @click="changeInfo(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe60d;</i>查看详情
          </el-button>
          <!-- <el-button
            size="small"
            @click="schoolDelete(scope.$index, scope.row)"
            v-show="scope.row.isDisable == 1"
            class="iconfont-color-blue iconfont-color-red"
          >
            <i class="iconfont">&#xe600;</i>删除
          </el-button>
          <el-button
            size="small"
            v-show="scope.row.isDisable == 0"
            class="iconfont-color-blue iconfont-color-black"
          >
            <i class="iconfont">&#xe600;</i>删除
          </el-button> -->
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
    <!-- 新增机构 -->
    <el-dialog
      :title="this.dialogTittle"
      :visible.sync="addUser"
      width="800px"
      top="2vh"
      class="detailDialog"
    >
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构名称">
          <span class="must">*</span>
          <el-input
            disabled
            type="text"
            v-model.trim="schoolName"
            placeholder="不超过20字"
            @change="shcoolNamePattern"
          ></el-input>
          <span class="wrongTips" v-show="this.schoolNameTips">{{this.schoolNameTips}}</span>
        </el-form-item>
        <el-form-item label="所属大B平台" style="text-align:left">
        <el-select v-model="platformold" @change="selectChangeset" placeholder="请选择管理平台">
          <el-option disabled   v-for="(item,index) in platformlistold"
              :key="index"
              :label="item.systembName"
              :value="item.systembId"></el-option>
        </el-select>
        </el-form-item>
        <!-- 机构类型 -->
        <el-form-item label="机构类型">
          <span class="must">*</span>
          <div class="identity">
            <el-radio-group v-model.trim="schoolType" disabled>
              <el-radio :label="1">公立</el-radio>
              <el-radio :label="2">私立</el-radio>
              <el-radio :label="3">公私合作</el-radio>
              <el-radio :label="4">其它</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <!-- 机构学段 -->
        <el-form-item label="机构学段">
          <span class="must">*</span>
          <div class="identity level">
            <el-radio-group v-model.trim="schoolSection" style="display:flex;flex-wrap:wrap" disabled>
              <el-radio :label="1">小学</el-radio>
              <el-radio :label="2">初中</el-radio>
              <el-radio :label="3">高中</el-radio>
              <el-radio :label="4">完全中学</el-radio>
              <el-radio :label="5">九年一贯制</el-radio>
              <el-radio :label="6">十二年一贯制</el-radio>
              <el-radio :label="7">中专</el-radio>
              <el-radio :label="8">高职</el-radio>
              <el-radio :label="9">大专</el-radio>
              <el-radio :label="10">大学</el-radio>
              <el-radio :label="11">企业培训</el-radio>
              <el-radio :label="12">其它</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <!-- 所在地区 -->
        <el-form-item label="所在地区" class="area">
          <span class="must">*</span>
          <div class="identity">
            <el-select
              v-model.trim="province"
              :placeholder="editorProvince"
              @change="provincesChoose()"
              disabled
            >
              <el-option
                v-for="(item,index) in allCity"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <el-select v-model.trim="city" :placeholder="editorCity" @change="citiesChoose" disabled>
              <el-option
                v-for="(item,index) in cities.child"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <el-select v-model.trim="area" :placeholder="editorArea" @change="areasChoose" disabled>
              <el-option
                v-for="(key,value) in areas.child"
                :key="value"
                :label="key"
                :value="value"
              ></el-option>
            </el-select>
          </div>
          <span class="wrongTips" v-show="this.areaTips">{{this.areaTips}}</span>
        </el-form-item>
        <!-- 详细地址等 -->
        <el-form-item label="详细地址">
          <el-input
            disabled
            type="text"
            v-model.trim="schoolAdress"
            placeholder="不超过30字"
            @change="schoolAdressPattern"
          ></el-input>
          <span class="wrongTips" v-show="this.schoolAdressTips">{{this.schoolAdressTips}}</span>
        </el-form-item>
        <el-form-item label="负责人">
          <span class="must2">*</span>
          <el-input
            disabled
            type="text"
            v-model.trim="managerName"
            placeholder="不超过6字"
            @change="managerNamePattern"
          ></el-input>
          <span class="wrongTips" v-show="this.managerNameTips">{{this.managerNameTips}}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span class="must2">*</span>
          <el-input
            disabled
            type="text"
            v-model.trim="managerTel"
            placeholder="请输入您的手机号"
            @change="managerTelPattern"
          ></el-input>
          <span class="wrongTips" v-show="this.managerTelTips">{{this.managerTelTips}}</span>
        </el-form-item>
        <el-form-item label="机构邮箱">
          <el-input
            type="text"
            disabled
            v-model.trim="schoolEmail"
            placeholder="请输入您的邮箱"
            @change="schoolEmailPattern"
          ></el-input>
          <span class="wrongTips" v-show="this.schoolEmailTips">{{this.schoolEmailTips}}</span>
        </el-form-item>
        <el-form-item label="机构简介">
          <el-input type="textarea" v-model.trim="introduction" placeholder="不超过800字" disabled></el-input>
          <span class="wrongTips" v-show="this.introductionTips">{{this.introductionTips}}</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model.trim="schoolMark" placeholder="不超过200字" disabled></el-input>
          <span class="wrongTips" v-show="this.schoolMarkTips">{{this.schoolMarkTips}}</span>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="addUser = false">取 消</el-button>
      </span> -->
    </el-dialog>
    <!-- 数据总览 -->
    <el-dialog title="数据总览" :visible.sync="dialogInfo" width="30%" class="dialogInfo">
      <ul class="alertUl">
        <li>开通用户总数：
          <span>{{dataScreen.userTotalCount}}</span>
        </li>
        <li>激活用户总数：
          <span>{{dataScreen.activeUserTotalCount}}</span>
        </li>
        <li>开通学员人数：
          <span>{{dataScreen.customUserTotalCount}}</span>
        </li>
        <li>激活学员人数：
          <span>{{dataScreen.activeCustomUserTotalCount}}</span>
        </li>
        <li>开通管理员人数：
          <span>{{dataScreen.adminUserTotalCount}}</span>
        </li>
        <li>激活管理员人数：
          <span>{{dataScreen.activeAdminUserTotalCount}}</span>
        </li>
        <li>IBOX台数：
          <span>{{dataScreen.iboxCount}}</span>
        </li>
        <li>魔方任务数：
          <span>{{dataScreen.taskCount}}</span>
        </li>
      </ul>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo = false">取 消</el-button>
        <el-button type="primary" @click="dialogInfo = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
import allCites from "../../../../static/mock/city.json";
export default {
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      loading: false,
      addUser: false,
      dialogTittle: "新建机构",
      schoolId: "",
      schoolName: "",
      schoolType: 1,
      schoolSection: 1,
      schoolAdress: "",
      schoolEmail: "",
      managerName: "",
      managerTel: "",
      introduction: "",
      schoolMark: "",
      editorProvince: "省",
      editorCity: "市",
      editorArea: "区/县",
      province: "",
      city: "",
      area: "",
      cities: "",
      areas: "",
      myProvince: "",
      myCity: "",
      myArea: "",
      allCity: "",
      schoolNameTips: "",
      schoolAdressTips: "",
      managerNameTips: "",
      managerTelTips: "",
      schoolEmailTips: "",
      introductionTips: "",
      schoolMarkTips: "",
      areaTips: "",
      editSchool: false,
      dialogInfo: false,
      dataScreen: "",
      platform:"全部大B平台",
      palatformId:-1,
      platformlist:[],

      platformlistold:[],
      platformold:"",
      platformoldId:null //编辑里面的平台选择id
    };
  },
  methods: {
    selectChangeset(val){
      this.platformoldId = val
    },
    selectChange(val){
      this.palatformId = val
      this.currentPage = 1
      this.loadData(val)
    },
    // 处理页号改变
    headerClassFn(row, column, rowIndex, columnIndex){
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;"
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData(this.palatformId);
    },
    // 加载分页数据
    loadData(systembId) {
      this.loading = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSchoolList +
            `?userType=2&systembId=${systembId}&pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then(res => {
          if (res.data.status === 200) {
            this.pageData = res.data.resultObject.data;
            this.currentPage = res.data.resultObject.currentPage;
            this.total = res.data.resultObject.totalCount;
            this.pageSize = res.data.resultObject.pageSize;
            const { items, currentPage } = res.data.resultObject;
          } else if (res.data.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.data.errorMessage);
          }
          this.loading = false;
        });
    },
    // 新增机构dialog打开
    dialogOpen() {
      this.dialogTittle = "新建机构";
      this.schoolNameTips = "";
      this.schoolAdressTips = "";
      this.managerNameTips = "";
      this.managerTelTips = "";
      this.schoolEmailTips = "";
      this.introductionTips = "";
      this.schoolMarkTips = "";
      this.areaTips = "";
      this.resets();
      this.addUser = true;
    },
    shcoolNamePattern() {
      let schoolNamePattern = /^.{1,20}$/;
      if (schoolNamePattern.test(this.schoolName) == false) {
        this.schoolNameTips = "请按要求输入机构名字";
      } else {
        this.schoolNameTips = "";
      }
    },
    schoolAdressPattern() {
      let addressPattern = /^.{1,30}$/;
      if (addressPattern.test(this.schoolAdress) == false) {
        this.schoolAdressTips = "请按要求输入地址";
      } else {
        this.schoolAdressTips = "";
      }
    },
    managerNamePattern() {
      let managePatter = /^([A-z]{1,12}|[\u4e00-\u9fa5]{1,6})$/;
      if (managePatter.test(this.managerName) == false) {
        this.managerNameTips = "请按要求输入名字";
      } else {
        this.managerNameTips = "";
      }
    },
    managerTelPattern() {
      let phonePatter = /^1[34578]\d{9}$/;
      if (phonePatter.test(this.managerTel) == false) {
        this.managerTelTips = "请按要求输入电话号码";
      } else {
        this.managerTelTips = "";
      }
    },
    schoolEmailPattern() {
      let emailPatter = /^$|^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (emailPatter.test(this.schoolEmail) == false) {
        this.schoolEmailTips = "请按要求输入邮箱";
      } else {
        this.schoolEmailTips = "";
      }
    },
    // 新增机构
    addUsers() {
      let schoolNamePattern = /^.{0,20}$/;
      let addressPattern = /^.{0,30}$/;
      let managePatter = /^([A-z]{1,12}|[\u4e00-\u9fa5]{1,6})$/;
      let phonePatter = /^1[34578]\d{9}$/;
      let emailPatter = /^$|^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      let introductionPatter = /^.{0,1600}$/;
      let schoolMarkPatter = /^.{0,400}$/;
      if (schoolNamePattern.test(this.schoolName) == false) {
        this.schoolNameTips = "请按要求输入机构名字";
      } else {
        this.schoolNameTips = "";
      }
      if (addressPattern.test(this.schoolAdress) == false) {
        this.schoolAdressTips = "请按要求输入地址";
      } else {
        this.schoolAdressTips = "";
      }
      if (managePatter.test(this.managerName) == false) {
        this.managerNameTips = "请按要求输入名字";
      } else {
        this.managerNameTips = "";
      }
      if (phonePatter.test(this.managerTel) == false) {
        this.managerTelTips = "请按要求输入手机号码";
      } else {
        this.managerTelTips = "";
      }
      if (emailPatter.test(this.schoolEmail) == false) {
        this.schoolEmailTips = "请按要求输入邮箱";
      } else {
        this.schoolEmailTips = "";
      }
      if (introductionPatter.test(this.introduction) == false) {
        this.introductionTips = "请按要求输入介绍";
      } else {
        this.introductionTips = "";
      }
      if (schoolMarkPatter.test(this.schoolMark) == false) {
        this.schoolMarkTips = "请按要求输入备注";
      } else {
        this.schoolMarkTips = "";
      }
      if (!this.province && !this.city && !this.area) {
        this.areaTips = "请选择地区";
      } else {
        this.areaTips = "";
      }
      if(!this.platformoldId){
         this.$message({
          message: '请选择管理平台',
          type: 'warning'
        });
        return
      }
      if (
        !this.schoolNameTips &&
        !this.schoolAdressTips &&
        !this.managerNameTips &&
        !this.managerTelTips &&
        !this.schoolEmailTips &&
        !this.introductionTips &&
        !this.schoolMarkTips &&
        this.province &&
        this.city &&
        this.area
      ) {
        this.addUser = false;
        this.loading = true;
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        let schoolApi = this.global.insertSchool;
        if (this.editSchool) {
          schoolApi = this.global.editSchool;
        }
        this.$http
          .post(
            schoolApi,
            {
              schoolId: this.schoolId,
              schoolName: this.schoolName,
              schoolType: this.schoolType,
              schoolSection: this.schoolSection,
              provinceId: this.province,
              provinceName: this.myProvince,
              cityId: this.city,
              cityName: this.myCity,
              areaId: this.area,
              areaName: this.myArea,
              schoolAdress: this.schoolAdress,
              schoolEmail: this.schoolEmail,
              introduction: this.introduction,
              schoolMark: this.schoolMark,
              managerName: this.managerName,
              managerTel: this.managerTel,
              systembId:this.platformoldId
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              if (res.body.status == 512) {
                this.$notify({
                  title: "警告",
                  message: res.body.errorMessage,
                  type: "warning"
                });
              } else if (res.body.status == 200) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
              }
              this.loadData(this.palatformId);
              this.resets();
            },
            err => {
              console.log(err);
            }
          );
        this.loading = false;
      }
    },
    // 删除机构
    schoolDelete(index, row) {
      this.$confirm("您确定要删除此机构？", "删除机构", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteSchool,
              { schoolId: row.schoolId },
              { emulateJSON: true }
            )
            .then(
              res => {
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除机构成功",
                    type: "success"
                  });
                }
                this.loadData(this.palatformId);
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 数据总览
    schoolInfo(index, row) {
      this.dialogInfo = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getDataStatistics + "?schoolId=" + row.schoolId)
        .then(
          res => {
            this.dataScreen = res.data.resultObject;
          },
          err => {
            console.log(err);
          }
        );
    },
    // 修改信息
    changeInfo(index, row) {
      this.dialogTittle = "机构详情";
      this.platformoldId=row.systembId;
      this.platformold=row.systembName;
      this.schoolId = row.schoolId;
      this.schoolNameTips = "";
      this.schoolAdressTips = "";
      this.managerNameTips = "";
      this.managerTelTips = "";
      this.schoolEmailTips = "";
      this.introductionTips = "";
      this.schoolMarkTips = "";
      this.areaTips = "";
      this.addUser = true;
      this.editSchool = true;
      this.schoolName = row.schoolName;
      this.schoolType = Number(row.schoolType);
      this.schoolSection = Number(row.schoolSection);
      this.province = row.provinceId;
      this.myProvince = row.provinceName;
      this.city = row.cityId;
      this.myCity = row.cityName;
      this.area = row.areaId;
      this.myArea = row.areaName;
      /* label上的名字显示 */
      this.allCity = allCites;
      var pr = row.provinceId;
      var ci = row.cityId;
      var ar = row.areaId;
      this.editorProvince = this.allCity[pr].name;
      this.editorCity = this.allCity[pr].child[ci].name;
      this.editorArea = this.allCity[pr].child[ci].child[ar];
      /* 默认的联级选择 */
      this.myProvince = this.allCity[pr].name;
      this.cities = this.allCity[pr];
      this.areas = this.cities.child[ci];

      this.schoolAdress = row.schoolAdress;
      this.schoolEmail = row.schoolEmail;
      this.introduction = row.introduction;
      this.schoolMark = row.schoolMark;
      this.managerName = row.managerName;
      this.managerTel = row.managerTel;

    },
    //地区选择
    provincesChoose() {
      /* 省的编号 + 省的名字 */
      this.myProvince = this.allCity[this.province].name;
      /* 该省的下级 */
      this.cities = this.allCity[this.province];
    },
    citiesChoose() {
      /* 城市的编号 + 城市的名字 */
      this.myCity = this.cities.child[this.city].name;
      /* 该城市的下级 */
      this.areas = this.cities.child[this.city];
    },
    areasChoose() {
      /* 区的编号 + 区的名字 */
      this.myArea = this.areas.child[this.area];
    },
    resets() {
        (this.editSchool = false),
        (this.platformoldId = null),
        (this.schoolId = ""),
        (this.schoolName = ""),
        (this.schoolType = 1),
        (this.schoolSection = 1),
        (this.schoolAdress = ""),
        (this.schoolEmail = ""),
        (this.managerName = ""),
        (this.managerTel = ""),
        (this.introduction = ""),
        (this.schoolMark = ""),
        (this.editorProvince = "省"),
        (this.editorCity = "市"),
        (this.editorArea = "区/县"),
        (this.province = ""),
        (this.city = ""),
        (this.area = ""),
        (this.provinces = ""),
        (this.cities = ""),
        (this.areas = ""),
        (this.myProvince = ""),
        (this.myCity = ""),
        (this.myArea = "");
    }
  },
  created() {
    this.allCity = allCites;
    this.loadData(-1);
    Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getSystembs)
        .then(res => {
          if (res.body.status === 200) {
            this.platformlistold = res.body.resultObject;
            this.platformlist = [{systembId: -1,systembName: "全部大B平台"},...res.body.resultObject] 
          } else if (res.body.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.body.errorMessage);
          }
        });
  }
};
</script>
<style scoped lang="less">
.adminList {
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
  .el-table {
    margin-top: 15px;
    border-radius: 5px;
  }
  .demo-ruleForm {
    padding-right: 50px;
  }
  .creatTime {
    width: 80px;
    height: 16px;
    display: inline-block;
    overflow: hidden;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .identity {
    text-align: left;
  }
  .wrongTips {
    display: inline-block;
    text-align: left;
    color: #f56c6c;
    width: 100%;
  }
  .must {
    color: red;
    position: absolute;
    left: -77px;
    top: 0;
  }
  .must2 {
    color: red;
    position: absolute;
    left: -62px;
    top: 0;
  }
  .level {
    .el-radio + .el-radio {
      margin-left: 0;
    }
    .el-radio {
      width: 100px !important;
      margin-top: 15px;
    }
  }
  .dialogInfo {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: -20px;
      padding: 0 10px;
    }
    li {
      width: 50%;
      text-align: left;
      height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #0090ff;
        font-weight: bolder;
        margin-right: 20px;
      }
    }
  }
  .area {
    text-align: center !important;
    .el-select {
      width: 160px;
      margin-right: 20px;
    }
  }
  .green {
    color: #30B44F;
  }
  .el-table{
    font-size: 12px;
  }
  .iconfont-color-blue{
    font-size: 12px;
  }
  }
  .checkBox{
    text-align: left;
    margin:10px 0;
  }
</style>
