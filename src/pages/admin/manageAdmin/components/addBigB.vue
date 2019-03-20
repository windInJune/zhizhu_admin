<template>
  <div class="adminList">
    <ul class="top">
      <li class="left">
        <span @click="$router.go(-1)">大B平台列表</span>
        <i class="el-icon-caret-right"></i> 新建大B平台
      </li>
    </ul>
    <div class="detailBox">
      <h2>新建大B平台</h2>
      <el-form
        :model="addBigBForm"
        :rules="rules"
        ref="addBigBForms"
        class="addBigBForm"
        label-width="100px"
      >
        <el-form-item prop="systembName" label="平台名称：">
          <el-input placeholder="不长于20字" :maxlength="20" v-model="addBigBForm.systembName"></el-input>
        </el-form-item>
        <el-form-item prop="systembDomain" label="平台域名：">
          <el-input placeholder="http://wah.zzypt.com" v-model="addBigBForm.systembDomain"></el-input>
        </el-form-item>
        <el-form-item prop="systembIndustry" label="所属行业：">
          <el-input placeholder="不长于20字" :maxlength="20" v-model="addBigBForm.systembIndustry"></el-input>
        </el-form-item>
        <el-form-item prop="systembCompany" label="归属公司：">
          <el-input placeholder="不长于20字" :maxlength="20" v-model="addBigBForm.systembCompany"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" prop="areas">
          <div class="identity">
            <el-select
              v-model.trim="province"
              :placeholder="editorProvince"
              @change="provincesChoose"
            >
              <el-option
                v-for="(item,index) in allCity"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <el-select v-model.trim="city" :placeholder="editorCity" @change="citiesChoose">
              <el-option
                v-for="(item,index) in cities.child"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
            <el-select v-model.trim="area" :placeholder="editorArea" @change="areasChoose">
              <el-option
                v-for="(key,value) in areas.child"
                :key="value"
                :label="key"
                :value="value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item  label="详细地址：">
          <el-input placeholder="不长于30字" :maxlength="30" v-model="addBigBForm.adress"></el-input>
        </el-form-item>
        <el-form-item prop="managerName"  label="负责人：">
          <el-input placeholder="不长于6字" :maxlength="6" v-model="addBigBForm.managerName"></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="手机号："
        >
          <el-input v-model="addBigBForm.phone" :minlength="11" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱："
          :rules="[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ]"
        >
          <el-input v-model="addBigBForm.email"></el-input>
        </el-form-item>
        <el-form-item  label="平台简介：">
          <el-input  type="textarea" :rows="2" placeholder="不长于800字" :maxlength="800" v-model="addBigBForm.introduction"></el-input>
        </el-form-item>
        <el-form-item  label="备注：">
          <el-input type="textarea" :rows="2" placeholder="不长于200字" :maxlength="200" v-model="addBigBForm.remarks"></el-input>
        </el-form-item>
        <div class="buttonBox">
            <el-button type="primary" @click="submitForm('addBigBForms')">创建</el-button>
            <el-button @click="resetForm('addBigBForms')">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import allCites from "../../../../static/mock/city.json";
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default {
  components: {},
  data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var checkAreas = (rule, value, callback) => {
         if(this.myProvince == "" || this.myCity == "" || this.myArea==""){
            return callback(new Error('！请选择公司所在地区'));
         }else{
           callback();
         }
      }
    return {
      addBigBForm: {
        systembName: "",
        systembDomain: "",
        systembIndustry: "",
        systembCompany: "",
        adress:"",
        managerName:"",
        email:"",
        phone:"",
        introduction:"",
        remarks:""
      },
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
      rules: {
        systembName: [
          { required: true, message: "！请输入平台名称", trigger: "blur" },
          { min: 1, max: 20, message: "！请输入平台名称", trigger: "blur" }
        ],
        systembIndustry: [
          { required: true, message: "！请输入平台所属行业", trigger: "blur" },
          { min: 1, max: 20, message: "！请输入平台所属行业", trigger: "blur" }
        ],
        systembCompany: [
          { required: true, message: "！请输入平台归属公司", trigger: "blur" },
          { min: 1, max: 20, message: "！请输入平台归属公司", trigger: "blur" }
        ],
        systembDomain: [
          { required: true, message: "！请输入平台域名", trigger: "blur" }
        ],
        managerName:[
            { required: true, message: "！请输入平台负责人", trigger: "blur" },
          { min: 1, max: 6, message: "！请输入平台负责人", trigger: "blur" }
        ],
        areas: [
          { required: true, validator: checkAreas,message: "！请选择公司所在地区" }
        ],
        phone:[
          {required: true,validator: checkPhone, message: '！请输入正确的手机号码'}
        ]
      }
    };
  },
  created() {
    this.allCity = allCites;
  },
  methods: {
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
    submitForm(formName) {
        this.$refs[formName].validate(res => {
          if(res){
            Vue.http.headers.common["userToken"] = getCookie("userToken");
            this.$http
              .post(
                this.global.insertSystemb,
                {
                  systembName: this.addBigBForm.systembName,
                  systembDomain: this.addBigBForm.systembDomain,
                  systembIndustry: this.addBigBForm.systembIndustry,
                  schoolSection: this.addBigBForm.schoolSection,
                  systembCompany: this.addBigBForm.systembCompany,
                  provinceId:this.province,
                  provinceName: this.myProvince,
                  cityId: this.city,
                  cityName: this.myCity,
                  areaId: this.area,
                  areaName: this.myArea,
                  managerName: this.addBigBForm.managerName,
                  managerTel: this.addBigBForm.phone,
                  bIntroduction: this.addBigBForm.introduction,
                  bMark: this.addBigBForm.remarks,
                  bAddress: this.addBigBForm.adress,
                  bEmail: this.addBigBForm.email
                },
                { emulateJSON: true }
              )
              .then(res => {
                if (res.body.status === 200) {
                  this.$message('大B平台添加成功');
                  this.$refs[formName].resetFields();
                  this.$router.push({ path: "/manageAdmin/bigb" });
                } else if (res.status === 511) {
                  this.$router.push({ path: "/" });
                } else {
                  alert(res.body.errorMessage);
                }
              });
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.go(-1);
      }
  }
};
</script>
<style scoped lang="less">
.adminList {
  padding-bottom: 80px;
  .top {
    display: flex;
    height: 36px;
    line-height: 36px;
    justify-content: space-between;
    align-items: center;
    li.left {
      font-size: 14px;
      color: #434343;
      font-weight: bold;
      span {
        cursor: pointer;
      }
    }
  }
  .detailBox {
    margin-top: 20px;
    width: 800px;
    height: auto;
    padding: 30px;
    border: 1px solid rgba(229, 229, 228, 1);
    h2 {
      height: 40px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: rgba(67, 67, 67, 1);
      line-height: 40px;
      text-align: left;
      margin-bottom: 20px;
    }
    .identity {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .buttonBox{
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-left: 100px;
      .save{
        width:120px;
        height:36px;
        line-height: 36px;
        border:1px solid rgba(0,144,255,1);
        border-radius:2px;
        background: rgba(0,144,255,1);
        color: #fff;
        
      }
      .cannal{
        width:120px;
        height:36px;
        margin-left: 30px;
        cursor: pointer;
        line-height: 36px;
        border-radius:2px;
        color: rgba(0,144,255,1);
        background:rgba(255,255,255,1);
        border:1px solid rgba(229, 229, 228, 1)
      }
    }
  }
}
</style>