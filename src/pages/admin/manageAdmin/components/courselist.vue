<!-- eslint-disable -->
<template>
  <div class="adminList">
    <div class="navBox">
      <div class="scrollLeft" @click="navListScrollLeft">
        <div class="leftfont"></div>
      </div>
         <ul class="navlist" ref="navlist">
            <li
              v-for="(item,index) in platformlistold"
              :class="[item.systembId == systembId?'active':'']"
              :key="index"
              @click="choseSystem(item.systembId)"
            >{{item.systembName}}</li>
          </ul>
      <div class="scrollRight" @click="navListScrollRight">
        <div class="rightfont"></div>
      </div>
    </div>
    <div class="topBox">
      <div class="sectionTitle" style="font-size: 14px;
      color: #434343;">课程列表
        <!-- <i class="el-icon-caret-right"></i> -->
      </div>
      <ul>
        <li class="searchValue">
          <el-input v-model="searchText" placeholder="输入课程名称查询..."></el-input>
        </li>
        <li class="searchButton">
          <div class="searchs_btn" @click="searchSubmit">查找</div>
          <!-- <el-button type="primary" class="search-button" @click="searchSubmit" plain>查找</el-button> -->
        </li>
      </ul>
    </div>

    <div class="content">
      <div>
        <div class="content-left">
          <p class="top" @mouseenter="allShow" @mouseleave="allUshow">
            <span class="iconfont topAdd" v-show="topAddShow" @click="handleChange">&#xe628;</span>
            <span class="iconfont topMin" v-show="!topAddShow" @click="handleChange">&#xe627;</span>
            <span class="all" @click="handleChange">全部学段</span>
            <i class="iconfont addGrade" @click.stop="addGrade" v-show="allShows">添加学段</i>
          </p>
          <!-- <el-collapse v-model="activeNames" @change="handleChange"> -->
          <!-- <el-collapse-item title="全部学段" name="1"> -->
          <div v-show="contentShow">
            <div
              v-for="(item,index) in sectionList"
              :key="index+1"
              @click="getMajoy(item.id,index,item.majoy)"
            >
              <p
                class="sectionTitle"
                @mouseenter="gradeEnter(item.id,index)"
                @mouseleave="gradeleave(item.id,index)"
              >
                <span class="iconfont down" v-show="item.majoy" @click="isShow(item.id,index)">
                  <span>&#xe627;</span>
                  <a class="gradeName">{{item.name}}</a>
                </span>
                <span class="iconfont down" v-show="!item.majoy" @click="isShow(item.id,index)">
                  &#xe628;
                  <a class="gradeName">{{item.name}}</a>
                </span>
                <!-- <a style="opacity:0;">{{item.name}}</a> -->
                <!--
                      <span class="iconfont rename" @click.stop="renameGrade(item.id,item.name)" v-show="iconShow[item.id]">&#xe705;</span>
                      <span class="iconfont add" @click.stop="addClass(item.id)" v-show="iconShow[item.id]">&#xe79c;</span>
                      <span class="iconfont del" @click.stop="delGrade(item.id)" v-show="iconShow[item.id]">&#xe614;</span>
                -->
                <span
                  class="rename more"
                  @click.stop="renameGrade(item.id,item.name)"
                  v-show="iconShow[item.id]"
                >重命名</span>
                <span
                  class="add more"
                  @click.stop="addClass(item.id)"
                  v-show="iconShow[item.id]"
                >添加专业</span>
                <span class="del more" @click.stop="delGrade(item.id)" v-show="iconShow[item.id]">删除</span>
              </p>
              <p
                v-for="(t,i) in item.majoy"
                :key="i"
                @click="chooseMajoy(t.id,item.id)"
                class="classList"
                @mouseenter="classEnter(t.id)"
                @mouseleave="classleave(t.id)"
              >
                <span class="iconfont down2" v-show="item.majoy">&#xe627;</span>
                <span class="content">{{t.name}}</span>
                <!--
                      <span class="iconfont rename" @click.stop="renameClass(t.id,t.name)" v-show="iconShow2[t.id]">&#xe705;</span>
                      <span class="iconfont del" @click.stop="delClass(t.id)" v-show="iconShow2[t.id]">&#xe614;</span>
                -->
                <span
                  class="rename more"
                  @click.stop="renameClass(t.id,t.name)"
                  v-show="iconShow2[t.id]"
                >重命名</span>
                <span class="del more" @click.stop="delClass(t.id)" v-show="iconShow2[t.id]">删除</span>
              </p>
            </div>
          </div>
          <!-- </el-collapse-item> -->
          <!-- </el-collapse> -->
        </div>
      </div>
      <div class="content-right" style="overflow:hidden">
        <div class="statistics">
          当前条件下共有课程
          <span>{{this.total}}</span> 个。
          <div class="addSb" @click="addCourses">＋&nbsp;&nbsp;新增课程</div>
          <!-- <el-button type="success" @click="addCourses">＋&nbsp;&nbsp;新增课程</el-button> -->
        </div>
        <!-- 表单信息 -->
        <el-table
          :data="pageData"
          highlight-current-row
          :header-cell-style="headerClassFn"
          style="width: 100%;border:1px solid rgba(229, 229, 228, 1)"
          v-loading="loading"
        >
          <el-table-column type="index" label="序号" width="80">
            <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
          </el-table-column>
          <el-table-column prop="name" label="课程名称"></el-table-column>
          <el-table-column prop="sectionName" label="学段"></el-table-column>
          <el-table-column prop="professionName" label="专业"></el-table-column>
          <el-table-column prop="taskCount" label="任务数" sortable></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable min-width="140">
            <template slot-scope="scope" class="handle">{{scope.row.createTime | totimestr}}</template>
          </el-table-column>
          <el-table-column prop="subjectType" label="操作" width="300">
            <template slot-scope="scope" class="handle">
              <el-button
                size="small"
                @click="schoolInfo(scope.$index, scope.row)"
                class="iconfont-color-blue"
              >
                <i class="iconfont">&#xe602;</i>详情
              </el-button>
              <el-button
                size="small"
                @click="changeInfo(scope.$index, scope.row)"
                class="iconfont-color-blue"
              >
                <i class="iconfont">&#xe60d;</i>编辑
              </el-button>
              <el-button
                size="small"
                @click="equipDelete(scope.$index, scope.row)"
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
    </div>
    <!-- 新建课程 -->
    <el-dialog
      :title="editTittle"
      :visible.sync="addCourseDialog"
      width="760px"
      :close-on-click-modal="false"
    >
      <el-form :model="courseFrom" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称：" prop="name">
          <span class="must">*</span>
          <el-input
            type="text"
            v-model.trim="courseFrom.name"
            @change="namePattern"
            placeholder="2-16字符"
          ></el-input>
          <span class="wrongTips" v-show="this.courseFrom.nameTips">{{this.courseFrom.nameTips}}</span>
        </el-form-item>
        <el-form-item label="所属学段：" prop="sectionId">
          <span class="must">*</span>
          <el-select
            v-model="courseFrom.sectionId"
            placeholder="请选择学段"
            style="float:left;width:100%;"
            @change="getSectionId()"
          >
            <el-option
              v-for="item in sectionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span
            class="wrongTips"
            v-show="this.courseFrom.sectionIdTips"
          >{{this.courseFrom.sectionIdTips}}</span>
        </el-form-item>
        <el-form-item label="所属专业：" prop="professionId">
          <span class="must">*</span>
          <el-select
            v-model="courseFrom.professionId"
            placeholder="请选择专业"
            style="float:left;width:100%;"
            @change="getProfessionId"
          >
            <el-option
              v-for="item in professionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span
            class="wrongTips"
            v-show="this.courseFrom.professionIdTips"
          >{{this.courseFrom.professionIdTips}}</span>
        </el-form-item>
        <el-form-item label="课程封面：" prop="photo" class="photo">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.1.165/ibox/sysCourse/insertSysCourse"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept="image/png, image/jpeg, image/jpg"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="mtitle" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>温馨提示：
            <br>1、建议上传540*320像素，大小不超过1M，
            <br>格式为JPG、JPEG、PNG的图片；
            <br>2.如果没有上传图片，将采用默认图片。
          </p>
        </el-form-item>
        <el-form-item label="课程简介：" prop="introduction">
          <el-input v-model.trim="courseFrom.introduction" placeholder="不长于500字符" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCourseDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertSysCourse">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增学段  -->
    <el-dialog
      title="新增学段"
      :visible.sync="addGradeDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="grade" placeholder="请输入学段名字"></el-input>
      <span class="wrongTips" v-show="this.submitGradeTips">{{this.submitGradeTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGradeDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitGrade">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重命名学段  -->
    <el-dialog
      title="重命名学段"
      :visible.sync="renameGradeDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="grade" placeholder="请输入学段名字"></el-input>
      <span class="wrongTips" v-show="this.submitGradeTips">{{this.submitGradeTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameGradeDialog = false">取 消</el-button>
        <el-button type="primary" @click="renameGradeSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增班级  -->
    <el-dialog
      title="新增专业"
      :visible.sync="addClassDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="grade" placeholder="请输入专业名字"></el-input>
      <span class="wrongTips" v-show="this.submitGradeTips">{{this.submitGradeTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassDialog = false">取 消</el-button>
        <el-button type="primary" @click="addClassSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重命名班级  -->
    <el-dialog
      title="重命名专业"
      :visible.sync="renameClassDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="grade" placeholder="请输入专业"></el-input>
      <span class="wrongTips" v-show="this.submitGradeTips">{{this.submitGradeTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameClassDialog = false">取 消</el-button>
        <el-button type="primary" @click="renameClassSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 魔方任务  -->
    <el-dialog
      title="课程详情"
      :visible.sync="outerVisible"
      width="1000px"
      class="detaildialog"
      :close-on-click-modal="false"
    >
      <el-dialog
        width="720px"
        :title="mtitle"
        :visible.sync="innerVisible"
        append-to-body
        :close-on-click-modal="false"
      >
        <!-- 添加任务 -->
        <el-form :model="mofangFrom" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="任务名称：" prop="name">
            <span class="must">*</span>
            <el-input
              type="text"
              v-model.trim="mofangFrom.name"
              @change="MnamePattern"
              placeholder="请输入任务名称，长度为2-16字符"
            ></el-input>
            <span class="wrongTips" v-show="this.mofangFrom.nameTips">{{this.mofangFrom.nameTips}}</span>
          </el-form-item>
          <el-form-item label="任务编号：" prop="number">
            <span class="must">*</span>
            <el-input
              type="text"
              v-model.trim="mofangFrom.number"
              @change="MnumberPattern"
              placeholder="请输入任务编号"
            ></el-input>
            <span
              class="wrongTips"
              v-show="this.mofangFrom.numberTips"
            >{{this.mofangFrom.numberTips}}</span>
          </el-form-item>
          <el-form-item label="版本号：" prop="versionNum">
            <span class="must">*</span>
            <el-input
              type="text"
              v-model.trim="mofangFrom.versionNum"
              @change="MversionNumPattern"
              placeholder="输入版本号"
            ></el-input>
            <span
              class="wrongTips"
              v-show="this.mofangFrom.versionNumTips"
            >{{this.mofangFrom.versionNumTips}}</span>
          </el-form-item>
          <el-form-item label="任务类型：" prop="typeList">
            <span class="must">*</span>
            <el-select
              v-model="mofangFrom.type"
              placeholder="请选择任务类型"
              style="float:left;width:100%;"
              @change="MtypePattern"
            >
              <el-option
                v-for="item in mofangFrom.typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="wrongTips" v-show="this.mofangFrom.typeTips">{{this.mofangFrom.typeTips}}</span>
          </el-form-item>
          <el-form-item label="任务类别：" prop="typeList">
            <span class="must">*</span>
            <el-select
              v-model="mofangFrom.mold"
              placeholder="请选择任务类型"
              style="float:left;width:100%;"
              @change="MmoldPattern"
            >
              <el-option
                v-for="item in mofangFrom.moldList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="wrongTips" v-show="this.mofangFrom.moldTips">{{this.mofangFrom.moldTips}}</span>
          </el-form-item>
          <el-form-item label="任务需时：" prop="time">
            <span class="must">*</span>
            <el-input
              type="text"
              v-model.trim="mofangFrom.time"
              @change="MtimePattern"
              placeholder="请输入不大于60整数分钟"
            ></el-input>
            <span class="wrongTips" v-show="this.mofangFrom.timeTips">{{this.mofangFrom.timeTips}}</span>
          </el-form-item>

          <el-form-item label="任务文件：" prop="doc">
            <span class="must">*</span>
            <el-upload
              class="upload-demo"
              action="http://172.16.1.165/ibox/sysCourse/insertSysCourse"
              :on-remove="handleRemoveOne"
              :before-upload="beforeAvatarUpload2"
              :limit="1"
              :file-list="this.mofangFrom.docfile"
              ref="uploadFileOne"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="参数文件：" prop="paramsFile">
            <span class="must">*</span>
            <el-upload
              class="upload-demo"
              action="http://172.16.1.165/ibox/sysCourse/insertSysCourse"
              :on-remove="handleRemoveTwo"
              :before-upload="beforeAvatarUpload3"
              :limit="1"
              ref="uploadFileTwo"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="任务图片：" prop="imgfile" class="mofangPhoto">
            <span class="must">*</span>
            <el-upload
              class="avatar-uploader"
              action="http://172.16.1.165/ibox/sysCourse/insertSysCourse"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              accept="image/png, image/jpeg, image/jpg"
              :before-upload="beforeAvatarUpload1"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>温馨提示：
              <br>1、建议上传540*320像素，大小不超过2M，
              <br>格式为JPG、JPEG、PNG的图片；
              <br>2.如果没有上传图片，将采用默认图片。
            </p>
            <span class="upimg">请点击上传图片</span>
          </el-form-item>
          <el-form-item label="任务简介：" prop="introduction">
            <el-input v-model.trim="mofangFrom.introduction" placeholder="不长于500字符" type="textarea"></el-input>
          </el-form-item>
          <div style="position:absolute;top:50%;left:50%;color:red;" v-show="loadShow">
            文件上传中请稍后
            <i class="el-icon-loading"></i>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMoFangSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <div class="detail-content">
        <div class="detail-left">
          <img :src="detailFrom.photo" v-show="detailFrom.photo">
          <img src="../../../../assets/images/detail.png" v-show="!detailFrom.photo">
        </div>
        <div class="detail-right">
          <h2>{{detailFrom.name}}</h2>
          <p>
            开发者：
            <span>知筑</span>专业：
            <span>{{detailFrom.professionName}}</span>任务数：
            <span>{{detailFrom.taskCount}}</span>
          </p>
          <p class="introduction">
            <span>课程介绍：</span>
            {{detailFrom.introduction}}
          </p>
        </div>
      </div>
      <div class="detail-mofang">
        <h2>
          <span>魔方任务列表</span>
          <el-button type="primary" @click="addmofang">添加任务</el-button>
        </h2>
        <ul>
          <li v-for="(item,index) in BoxtaskList" :key="index">
            <div class="detail-mofang-content">
              <div class="top">
                <img
                  src="../../../../assets/images/vr.png"
                  v-show="item.taskType == 1"
                  class="mofang-content mofang-img"
                >
                <!-- vr -->
                <img
                  src="../../../../assets/images/pc.png"
                  v-show="item.taskType == 0"
                  class="mofang-content mofang-img"
                >
                <!-- pc -->
                <h2 class="mofang-content">{{item.name}}</h2>
                <!-- 5种种类 -->
                <p class="mofang-content" v-show="item.type == 0">
                  <span style="display:none">{{item.type}}</span>公共基础类
                </p>
                <p class="mofang-content" v-show="item.type == 1">
                  <span style="display:none">{{item.type}}</span>学科基础类
                </p>
                <p class="mofang-content" v-show="item.type == 2">
                  <span style="display:none">{{item.type}}</span>专业课程类
                </p>
                <p class="mofang-content" v-show="item.type == 3">
                  <span style="display:none">{{item.type}}</span>实训类
                </p>
                <p class="mofang-content" v-show="item.type == 5">
                  <span style="display:none">{{item.type}}</span>岗位实践类
                </p>
                <!-- 5种种类 -->
                <p class="mofang-content">
                  需时：
                  <span>{{item.time}}</span>min
                </p>
                <p class="mofang-content">
                  大小：
                  <span>{{item.fileSize}}</span>
                </p>
                <el-button
                  type="primary"
                  plain
                  class="mofang-content-edit"
                  @click="medit(item.id)"
                >编辑</el-button>
                <el-button type="danger" plain class="mofang-content-del" @click="Mdel(item.id)">删除</el-button>
              </div>
              <div class="bottom">
                <p class="mofang-content">
                  创建：
                  <span>{{item.userName}}</span>
                </p>
                <p class="mofang-content">
                  <span>{{item.createTime | formatDate2}}</span>
                </p>
                <p class="mofang-content">
                  编号：
                  <span>{{item.number}}</span>
                </p>
                <p class="mofang-content">
                  版本号：
                  <span>{{item.versionNum}}</span>
                </p>
                <a class="mofang-content-yin">
                  <i class="iconfont">&#xe60b;</i>引用 (
                  <span>{{item.quoteCount}}</span>)
                </a>
                <a class="mofang-content-zan">
                  <i class="iconfont">&#xe64b;</i>赞 (
                  <span>{{item.praiseCount}}</span>)
                </a>
              </div>
            </div>
          </li>
          <!--<el-pagination background layout="total, prev, pager, next, jumper" @current-change="mhandleCurrentChange" :current-page="mcurrentPage" :page-size="mpageSize" :total="mtotal"></el-pagination>-->
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outerVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <!-- 课程添加更多  -->
    <el-dialog title="提示" :visible.sync="addMoreDialog" width="30%" :close-on-click-modal="false">
      <p class="addMore">{{addMore.addTittle}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMoreDialog = false">返回列表</el-button>
        <el-button type="primary" @click="addMoreDialogs">{{addMore.submit}}</el-button>
      </span>
    </el-dialog>
    <!-- 任务添加更多  -->
    <el-dialog
      title="提示"
      :visible.sync="addMoreTaskDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <p class="addMore">{{addMoreTask.addTittle}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMoreTaskDialog = false">返回列表</el-button>
        <el-button type="primary" @click="addMoreTaskDialogs">{{addMoreTask.submit}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import moment from "moment";
import { Loading } from "element-ui";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
import allCites from "../../../../static/mock/city.json";
import $ from "jquery";
export default {
  filters: {
    formatDate2: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      mtotal: 0,
      mpageSize: 2,
      mcurrentPage: 1,
      pageData: [],
      loading: false,
      addUser: false,
      addCourseDialog: false,
      outerVisible: false,
      innerVisible: false,
      loadShow: false,
      formData: null,
      formData2: null,
      searchText: "",
      sectionId: "",
      professionId: "",
      editTittle: "新增课程",
      mtitle: "添加任务",
      activeNames: ["1"],
      addMore: { addTittle: "恭喜你，添加课程成功", submit: "继续添加" },
      addMoreTask: { addTittle: "恭喜你，添加任务成功", submit: "继续添加" },
      courseFrom: {
        name: "",
        nameTips: "",
        id: "",
        sectionId: "",
        sectionName: "",
        sectionIdTips: "",
        professionId: "",
        professionIdTips: "",
        introduction: ""
      },
      mofangFrom: {
        id: "",
        name: "",
        nameTips: "",
        number: "",
        numberTips: "",
        versionNum: "",
        versionNumTips: "",
        typeList: [
          { name: "公共基础类", id: 0 },
          { name: "学科基础类", id: 1 },
          { name: "专业课程类", id: 2 },
          { name: "实训类", id: 3 },
          { name: "岗位实践类", id: 5 }
        ],
        type: "",
        typeTips: "",
        mold: "",
        moldTips: "",
        moldList: [{ name: "PC", id: 0 }, { name: "VR", id: 1 }],
        time: "",
        imgfile: "",
        docfile: [],
        docfile2: [],
        introduction: ""
      },
      topAddShow: true,
      contentShow: false,
      allShows: false,
      mofangImg: "",
      iconShow: [],
      iconShow2: [],
      BoxtaskList: "",
      detailFrom: "",
      editInfo: false,
      mInfo: false,
      mId: "",
      sectionList: [],
      professionList: "",
      imageUrl: require("../../../../assets/images/detail.png"),
      fileUrl: "",
      fileList: [],
      majoyList: {},
      // 新增学段
      addGradeDialog: false,
      renameGradeDialog: false,
      addClassDialog: false,
      renameClassDialog: false,
      addMoreDialog: false,
      addMoreTaskDialog: false,
      downShow: true,
      grade: "",
      submitGradeTips: "",
      renameGradeId: "",
      renameClassId: "",
      addClassId: "",
      systembId: null,
      platformlistold: []
    };
  },
  methods: {
    navListScrollLeft(){
      this.$refs.navlist.scrollLeft <= 0?this.$refs.navlist.scrollLeft == 0 : this.$refs.navlist.scrollLeft = this.$refs.navlist.scrollLeft - 100
    },
    navListScrollRight(){
      this.$refs.navlist.scrollLeft = this.$refs.navlist.scrollLeft + 100
    },
    choseSystem(id) {
      this.systembId = id;
      this.loading = true;
      this.sectionId = "";
      this.professionId = "";
      this.loadData();
      this.getSectionList();
    },
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;font-size:12px;";
    },
    // 时间戳改成时间
    dateFormat(row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD hh:mm");
    },
    // 处理页号改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    // 加载分页数据
    loadData() {
      this.loading = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSysCourseList +
            `?searchText=${this.searchText}&systembId=${
              this.systembId
            }&sectionId=${this.sectionId}&professionId=${
              this.professionId
            }&pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then(res => {
          if (res.data.status === 200) {
            this.pageData = res.data.resultObject.data;
            // this.currentPage = res.data.resultObject.currentPage;
            this.total = res.data.resultObject.totalCount;
            // this.pageSize = res.data.resultObject.pageSize;
            // const {items,currentPage} = res.data.resultObject
          } else if (res.data.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.data.errorMessage);
          }
          this.loading = false;
        });
    },
    // 重置
    resect() {
      this.courseFrom.name = "";
      this.courseFrom.nameTips = "";
      this.courseFrom.sectionId = "";
      this.courseFrom.sectionIdTips = "";
      this.courseFrom.professionId = "";
      this.courseFrom.professionIdTips = "";
      this.courseFrom.introduction = "";
    },
    mresect() {
      this.mofangFrom.name = "";
      this.mofangFrom.nameTips = "";
      this.mofangFrom.number = "";
      this.mofangFrom.numberTips = "";
      this.mofangFrom.versionNum = "";
      this.mofangFrom.versionNumTips = "";
      this.mofangFrom.mold = "";
      this.mofangFrom.moldTips = "";
      this.mofangFrom.type = "";
      this.mofangFrom.time = "";
      this.mofangFrom.imgfile = "";
      this.mofangFrom.introduction = "";
    },
    searchSubmit() {
      this.sectionId = "";
      this.professionId = "";
      this.loadData();
    },
    // 新增
    addCourses() {
      this.addCourseDialog = true;
      this.resect();
      this.editInfo = false;
      this.editTittle = "新增课程";
      this.imageUrl = require("../../../../assets/images/detail.png");
    },
    // 新增魔方任务
    addmofang() {
      this.innerVisible = true;
      if (
        this.mofangFrom.docfile2.name ||
        this.mofangFrom.docfile2.length > 0
      ) {
        this.$refs.uploadFileTwo.clearFiles();
        this.mofangFrom.docfile2 = [];
      }
      if (this.mofangFrom.docfile.name || this.mofangFrom.docfile.length > 0) {
        this.$refs.uploadFileOne.clearFiles();
        this.mofangFrom.docfile = [];
      }
      this.mresect();
      this.mInfo = false;
      this.mtitle = "添加任务";
      this.imageUrl = require("../../../../assets/images/mofang.png");
    },
    //详情
    schoolInfo(index, row) {
      this.outerVisible = true;
      this.mofangFrom.id = row.id;
      this.mofangFrom.type = "";
      this.mofangFrom.taskType = "";
      this.mofangFrom.sectionId = row.sectionId;
      this.mofangFrom.professionId = row.professionId;
      this.imageUrl = require("../../../../assets/images/detail.png");
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSysCourseById +
            "?id=" +
            row.id +
            "&systembId=" +
            this.systembId
        )
        .then(
          res => {
            console.log(res.data.resultObject);
            this.detailFrom = res.data.resultObject;
          },
          err => {
            console.log(err);
          }
        );
      this.$http
        .get(
          this.global.getBoxtaskList +
            `?syscourseId=${this.mofangFrom.id}&systembId=${
              this.systembId
            }&type=${this.mofangFrom.type}&taskType=${
              this.mofangFrom.taskType
            }&sectionId=${this.mofangFrom.sectionId}&professionId=${
              this.mofangFrom.professionId
            }&sort=0&pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then(
          res => {
            this.BoxtaskList = res.data.resultObject.data;
            this.mtotal = res.data.resultObject.totalCount;
          },
          err => {
            console.log(err);
          }
        );
    },
    // 编辑魔方任务
    medit(e) {
      this.mInfo = true;
      this.mtitle = "编辑任务";
      this.mId = e;
      this.$http
        .get(
          this.global.getBoxtaskById +
            "?id=" +
            e +
            "&systembId=" +
            this.systembId
        )
        .then(
          res => {
            console.log(res);
            this.innerVisible = true;
            this.mofangFrom.name = res.data.resultObject.name;
            this.mofangFrom.number = res.data.resultObject.number;
            this.mofangFrom.versionNum = res.data.resultObject.versionNum;
            this.mofangFrom.type = res.data.resultObject.type;
            this.mofangFrom.mold = res.data.resultObject.taskType;
            this.mofangFrom.time = res.data.resultObject.time;
            this.mofangFrom.docfile = [
              {
                name: `${res.data.resultObject.path}`,
                url: res.data.resultObject.path
              }
            ];
            this.mofangFrom.introduction = res.data.resultObject.introduction;
            if (res.data.resultObject.img) {
              this.imageUrl =  res.data.resultObject.img;
            } else {
              this.imageUrl = require("../../../../assets/images/mofang.png");
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    addMoFangSubmit() {
      let namePattern = /^.{2,16}$/;
      let numberPattern = /^.{1,20}$/;
      let NumPattern = /^.{1,20}$/;
      let typePattern = /^.{1,16}$/;
      let timePattern = /^([1-9]|[1-5]\d|60)$/;
      let moldPattern = /^.{1,16}$/;
      if (moldPattern.test(this.mofangFrom.mold) == false) {
        this.mofangFrom.moldTips = "！不能为空";
      } else {
        this.mofangFrom.moldTips = "";
      }
      if (namePattern.test(this.mofangFrom.name) == false) {
        this.mofangFrom.nameTips = "！限2-16个字符";
      } else {
        this.mofangFrom.nameTips = "";
      }
      if (numberPattern.test(this.mofangFrom.number) == false) {
        this.mofangFrom.numberTips = "！限20个字符";
      } else {
        this.mofangFrom.numberTips = "";
      }
      if (NumPattern.test(this.mofangFrom.versionNum) == false) {
        this.mofangFrom.versionNumTips = "！限20个字符";
      } else {
        this.mofangFrom.versionNumTips = "";
      }
      if (typePattern.test(this.mofangFrom.type) == false) {
        this.mofangFrom.typeTips = "！不能为空";
      } else {
        this.mofangFrom.typeTips = "";
      }
      if (timePattern.test(this.mofangFrom.time) == false) {
        this.mofangFrom.timeTips = "时间要<60";
      } else {
        this.mofangFrom.timeTips = "";
      }
      // 魔方编辑及上传
      let mofangApi = this.global.insertBoxtask;
      let mId = this.mofangFrom.id;
      if (this.mInfo) {
        mofangApi = this.global.updateBoxtask;
        mId = this.mId;
        this.addMoreTask.addTittle = "恭喜你，编辑任务成功";
        this.addMoreTask.submit = "添加任务";
      } else {
        this.addMoreTask.addTittle = "恭喜你，添加任务成功";
        this.addMoreTask.submit = "继续添加";
      }
      if (this.mofangFrom.docfile.length <= 0) {
        this.$notify({
          title: "警告",
          message: "请上传任务文件",
          type: "warning"
        });
        return;
      }
      if (this.mtitle == "添加任务" && this.mofangFrom.docfile2.length <= 0) {
        this.$notify({
          title: "警告",
          message: "请上传参数文件",
          type: "warning"
        });
        return;
      }
      this.formData2 = new FormData();
      this.formData2.append("syscourseId", this.mofangFrom.id);
      this.formData2.append("id", mId);
      this.formData2.append("name", this.mofangFrom.name);
      this.formData2.append("number", this.mofangFrom.number);
      this.formData2.append("versionNum", this.mofangFrom.versionNum);
      this.formData2.append("type", this.mofangFrom.type);
      this.formData2.append("taskType", this.mofangFrom.mold);
      this.formData2.append("time", this.mofangFrom.time);
      this.formData2.append("imgfile", this.mofangFrom.imgfile);
      this.formData2.append("docfile", this.mofangFrom.docfile);
      this.formData2.append("paramsFile", this.mofangFrom.docfile2);
      this.formData2.append("introduction", this.mofangFrom.introduction);
      this.formData2.append("systembId", this.systembId);
      //
      if (
        this.mofangFrom.name &&
        this.mofangFrom.number &&
        this.mofangFrom.versionNum &&
        this.mofangFrom.time &&
        this.mofangFrom.nameTips == "" &&
        this.mofangFrom.numberTips == "" &&
        this.mofangFrom.versionNumTips == "" &&
        this.mofangFrom.typeTips == "" &&
        this.mofangFrom.moldTips == "" &&
        this.mofangFrom.timeTips == ""
      ) {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        console.log(this.mofangFrom.imgfile);
        this.loadShow = true;
        this.$http.post(mofangApi, this.formData2).then(
          res => {
            if (res.body.status == 512) {
              this.loadShow = false;
              this.$notify({
                title: "警告",
                message: res.body.errorMessage,
                type: "warning"
              });
            } else {
              this.innerVisible = false;
              this.addMoreTaskDialog = true;
              this.mresect();
              this.formData2 = null;
              this.loadShow = false;
              console.log(res);
              this.$http
                .get(
                  this.global.getBoxtaskList +
                    `?syscourseId=${this.mofangFrom.id}&type=${
                      this.mofangFrom.type
                    }&taskType=${this.mofangFrom.taskType}&systembId=${
                      this.systembId
                    }&sectionId=${this.mofangFrom.sectionId}&professionId=${
                      this.mofangFrom.professionId
                    }&sort=0&pageNum=${this.currentPage}&pageSize=${
                      this.pageSize
                    }`
                )
                .then(
                  res => {
                    this.BoxtaskList = res.data.resultObject.data;
                  },
                  err => {
                    this.$notify({
                      title: "警告",
                      message: res.body.errorMessage,
                      type: "warning"
                    });
                  }
                );
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        console.log("no");
      }
    },
    // 删除魔方任务
    Mdel(e) {
      this.$confirm(
        "您确定从平台删除此任务，删除将不会同步到所有IBOX终端。",
        "删除任务",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log("123");
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteBoxtask,
              { id: e, systembId: this.systembId },
              { emulateJSON: true }
            )
            .then(
              res => {
                this.$http
                  .get(
                    this.global.getBoxtaskList +
                      `?syscourseId=${this.mofangFrom.id}&systembId=${
                        this.systembId
                      }&type=${this.mofangFrom.type}&taskType=${
                        this.mofangFrom.taskType
                      }&sectionId=${this.mofangFrom.sectionId}&professionId=${
                        this.mofangFrom.professionId
                      }&sort=0&pageNum=${this.currentPage}&pageSize=${
                        this.pageSize
                      }`
                  )
                  .then(
                    res => {
                      this.BoxtaskList = res.data.resultObject.data;
                    },
                    err => {
                      console.log(err);
                    }
                  );
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除任务成功",
                    type: "success"
                  });
                }
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 添加秘方任务验证
    MnamePattern() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.mofangFrom.name) == false) {
        this.mofangFrom.nameTips = "！限2-16个字符";
      } else {
        this.mofangFrom.nameTips = "";
      }
    },
    MnumberPattern() {
      let numberPattern = /^.{1,20}$/;
      if (numberPattern.test(this.mofangFrom.number) == false) {
        this.mofangFrom.numberTips = "！限20个字符";
      } else {
        this.mofangFrom.numberTips = "";
      }
    },
    MversionNumPattern() {
      let NumPattern = /^.{1,20}$/;
      if (NumPattern.test(this.mofangFrom.versionNum) == false) {
        this.mofangFrom.versionNumTips = "！限20个字符";
      } else {
        this.mofangFrom.versionNumTips = "";
      }
    },
    MtypePattern() {
      let typePattern = /^.{1,16}$/;
      if (typePattern.test(this.mofangFrom.type) == false) {
        this.mofangFrom.typeTips = "！不能为空";
      } else {
        this.mofangFrom.typeTips = "";
      }
    },
    MmoldPattern() {
      let moldPattern = /^.{1,16}$/;
      if (moldPattern.test(this.mofangFrom.mold) == false) {
        this.mofangFrom.moldTips = "！不能为空";
      } else {
        this.mofangFrom.moldTips = "";
      }
    },
    MtimePattern() {
      let timePattern = /^([1-9]|[1-5]\d|60)$/;
      if (timePattern.test(this.mofangFrom.time) == false) {
        this.mofangFrom.timeTips = "时间要<60";
      } else {
        this.mofangFrom.timeTips = "";
      }
    },
    // 编辑
    changeInfo(index, row) {
      this.addCourseDialog = true;
      this.editInfo = true;
      this.editTittle = "编辑课程";
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSysCourseById +
            "?id=" +
            row.id +
            "&systembId=" +
            this.systembId
        )
        .then(
          res => {
            // console.log(res.data.resultObject)
            this.courseFrom.id = row.id;
            this.courseFrom.name = res.data.resultObject.name;
            this.courseFrom.sectionId = res.data.resultObject.sectionId;
            this.courseFrom.professionId = res.data.resultObject.professionId;
            this.imageUrl = require("../../../../assets/images/detail.png");
            if (res.data.resultObject.photo) {
              this.imageUrl = res.data.resultObject.photo;
            }
            // 获取课程id
            this.$http
              .get(
                this.global.getProfessionList +
                  "?parentId=" +
                  this.courseFrom.sectionId +
                  "&systembId=" +
                  this.systembId
              )
              .then(
                res => {
                  this.professionList = res.data.resultObject.data;
                  // console.log('123')
                  console.log(res.data.resultObject.data);
                },
                err => {
                  console.log(err);
                }
              );
            // 获取课程id结束
          },
          err => {
            console.log(err);
          }
        );
    },
    // 删除
    equipDelete(index, row) {
      this.$confirm(
        "此课程下有" +
          row.taskCount +
          "个魔方任务，您确定删除课程及其魔方任务？",
        "删除课程",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          console.log("123");
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .get(
              this.global.deleteSysCourseById +
                "?id=" +
                row.id +
                "&systembId=" +
                this.systembId
            )
            .then(
              res => {
                console.log(res);
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除课程成功",
                    type: "success"
                  });
                }
                this.loadData();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 选择专业
    getSectionList() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http.get(this.global.getSectionList + "?systembId=" + this.systembId).then(
        res => {
          this.sectionList = res.data.resultObject.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 选择学段
    getSectionId(e) {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getProfessionList +
            "?parentId=" +
            this.courseFrom.sectionId + "&systembId=" + this.systembId
        )
        .then(
          res => {
            this.professionList = res.data.resultObject.data;
          },
          err => {
            console.log(err);
          }
        );
      let sectionIdPattern = /^.{1,15}$/;
      if (sectionIdPattern.test(this.courseFrom.sectionId) == false) {
        this.courseFrom.sectionIdTips = "！不能为空";
      } else {
        this.courseFrom.sectionIdTips = "";
      }
    },
    getProfessionId() {
      console.log(this.courseFrom.professionId);
      let professionIdPattern = /^.{1,15}$/;
      if (professionIdPattern.test(this.courseFrom.professionId) == false) {
        this.courseFrom.professionIdTips = "！不能为空";
      } else {
        this.courseFrom.professionIdTips = "";
      }
    },
    // 图片你上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      // console.log(res)
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 1MB!",
          type: "warning"
        });
        return false;
      }
      this.mofangFrom.imgfile = file;
      console.log(this.mofangFrom.imgfile);
    },
    beforeAvatarUpload1(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning"
        });
        return false;
      }
      this.mofangFrom.imgfile = file;
      console.log(this.mofangFrom.imgfile);
    },
    // 文件上传
    handleRemoveOne(file, fileList) {
      this.mofangFrom.docfile = [];
    },
    handleRemoveTwo(file, fileList) {
      this.mofangFrom.docfile2 = [];
    },
    beforeAvatarUpload2(file) {
      this.mofangFrom.docfile = file;
      console.log(this.mofangFrom.docfile);
    },
    beforeAvatarUpload3(file) {
      this.mofangFrom.docfile2 = file;
      console.log(this.mofangFrom.docfile2);
    },
    // 新建课程
    // 添加课程
    insertSysCourse() {
      let namePattern = /^.{2,16}$/;
      let sectionIdPattern = /^.{1,15}$/;
      let professionIdPattern = /^.{1,15}$/;
      if (namePattern.test(this.courseFrom.name) == false) {
        this.courseFrom.nameTips = "！限2-16个字符";
      } else {
        this.courseFrom.nameTips = "";
      }
      if (sectionIdPattern.test(this.courseFrom.sectionId) == false) {
        this.courseFrom.sectionIdTips = "！请选择学段";
      } else {
        this.courseFrom.sectionIdTips = "";
      }
      if (professionIdPattern.test(this.courseFrom.professionId) == false) {
        this.courseFrom.professionIdTips = "！请选择专业";
      } else {
        this.courseFrom.professionIdTips = "";
      }
      // 编辑切换及图片上传
      let equipApi = this.global.insertSysCourse;
      if (this.editInfo) {
        equipApi = this.global.updateSysCourse;
        this.addMore.addTittle = "恭喜你，编辑课程成功";
        this.addMore.submit = "新增课程";
      } else {
        this.addMore.addTittle = "恭喜你，添加课程成功";
        this.addMore.submit = "继续添加";
      }
      let newName = this.courseFrom.name.replace(/\s*/g, "");
      this.formData = new FormData();
      this.formData.append("file", this.mofangFrom.imgfile);
      this.formData.append("name", newName);
      this.formData.append("sectionId", this.courseFrom.sectionId);
      this.formData.append("professionId", this.courseFrom.professionId);
      this.formData.append("introduction", this.courseFrom.introduction);
      this.formData.append("id", this.courseFrom.id);
      this.formData.append("systembId", this.systembId);
      //
      if (
        this.courseFrom.name &&
        this.courseFrom.sectionId &&
        this.courseFrom.professionId
      ) {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http.post(equipApi, this.formData).then(
          res => {
            this.addCourseDialog = false;
            this.addMoreDialog = true;
            this.mofangFrom.imgfile = "";
            this.resect();
            this.loadData();
            /*
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            */
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        console.log("no");
      }
    },
    // 课程继续添加
    addMoreDialogs() {
      this.addCourseDialog = true;
      this.addMoreDialog = false;
      this.resect();
    },
    // 任务继续添加
    addMoreTaskDialogs() {
      if (
        this.mofangFrom.docfile2.name ||
        this.mofangFrom.docfile2.length > 0
      ) {
        this.$refs.uploadFileTwo.clearFiles();
        this.mofangFrom.docfile2 = [];
      }
      if (this.mofangFrom.docfile.name || this.mofangFrom.docfile.length > 0) {
        this.$refs.uploadFileOne.clearFiles();
        this.mofangFrom.docfile = [];
      }
      this.mresect();
      this.formData2 = null;
      this.addMoreTaskDialog = false;
      this.innerVisible = true;
    },
    //验证
    namePattern() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.courseFrom.name) == false) {
        this.courseFrom.nameTips = "！限2-16个字符";
      } else {
        this.courseFrom.nameTips = "";
      }
    },
    listShow() {
      this.data = [];
    },
    handleChange() {
      this.topAddShow = !this.topAddShow;
      this.contentShow = !this.contentShow;
    },
    allShow() {
      this.allShows = true;
    },
    allUshow() {
      this.allShows = false;
    },
    getMajoy(e, i, m) {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getProfessionList +
            "?parentId=" +
            e +
            "&systembId=" +
            this.systembId
        )
        .then(
          res => {
            /*this.sectionList[i].majoy = res.data.resultObject.data
          this.sectionList=Object.assign({},this.sectionList)
          console.log(m)

          if(this.sectionList[i].majoy == null){
            this.sectionList[i].majoy = res.data.resultObject.data
            this.sectionList=Object.assign({},this.sectionList)
          }else{
            this.sectionList[i].majoy = null
            this.sectionList=Object.assign({},this.sectionList)
          }
          */
          },
          err => {
            console.log(err);
          }
        );
    },
    chooseMajoy(e, id) {
      this.sectionId = id;
      this.professionId = e;
      this.loadData();
    },
    // 新增和提交学段
    addGrade() {
      this.addGradeDialog = true;
      this.submitGradeTips = "";
      this.grade = "";
    },
    submitGrade() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.grade) == false) {
        this.submitGradeTips = "！限2-16个字符";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.insertSectionProfession,
            { name: this.grade, systembId: this.systembId },
            { emulateJSON: true }
          )
          .then(
            res => {
              console.log(res);
              this.addGradeDialog = false;
              this.loadData();
              this.getSectionList();
              this.sectionList = Object.assign({}, this.sectionList);
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    // 新增班级
    addClass(e) {
      this.submitGradeTips = "";
      this.addClassDialog = true;
      this.addClassId = e;
      this.grade = "";
    },
    //重命名学段
    renameGrade(e, n) {
      this.submitGradeTips = "";
      this.renameGradeDialog = true;
      this.renameGradeId = e;
      this.grade = n;
    },
    // 重命名班级
    renameClass(e, n) {
      this.submitGradeTips = "";
      this.renameClassDialog = true;
      this.renameClassId = e;
      this.grade = n;
    },
    // 重命名年级提交
    renameGradeSubmit() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.grade) == false) {
        this.submitGradeTips = "！限2-16个字符";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.updateSectionProfession,
            {
              name: this.grade,
              id: this.renameGradeId,
              systembId: this.systembId
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              console.log(res);
              this.renameGradeDialog = false;
              this.loadData();
              this.getSectionList();
              this.sectionList = Object.assign({}, this.sectionList);
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    // 重命名班级提交
    renameClassSubmit() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.grade) == false) {
        this.submitGradeTips = "！限2-16个字符";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.updateSectionProfession,
            {
              name: this.grade,
              id: this.renameClassId,
              systembId: this.systembId
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              console.log(res);
              this.renameClassDialog = false;
              this.loadData();
              this.getSectionList();
              this.sectionList = Object.assign({}, this.sectionList);
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    // 新增班级提交
    addClassSubmit() {
      let namePattern = /^.{2,16}$/;
      if (namePattern.test(this.grade) == false) {
        this.submitGradeTips = "！限2-16个字符";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.insertSectionProfession,
            {
              name: this.grade,
              parentId: this.addClassId,
              systembId: this.systembId
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              console.log(res);
              this.addClassDialog = false;
              this.loadData();
              this.getSectionList();
              this.sectionList = Object.assign({}, this.sectionList);
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    // 班级下拉显示和隐藏
    isShow(e, i) {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getProfessionList +
            "?parentId=" +
            e +
            "&systembId=" +
            this.systembId
        )
        .then(
          res => {
            /*this.sectionList[i].majoy = res.data.resultObject.data
          this.sectionList=Object.assign({},this.sectionList)
          console.log(m)
          */
            if (this.sectionList[i].majoy == null) {
              this.sectionList[i].majoy = res.data.resultObject.data;
              this.sectionList = Object.assign({}, this.sectionList);
            } else {
              this.sectionList[i].majoy = null;
              this.sectionList = Object.assign({}, this.sectionList);
            }
            this.sectionId = e;
            // this.loadData()
          },
          err => {
            console.log(err);
          }
        );
    },
    // 删除学段
    delGrade(e) {
      console.log(e);
      this.$confirm("你确定删除学段及其专业？", "删除学段", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteSectionProfession,
              { id: e, systembId: this.systembId },
              { emulateJSON: true }
            )
            .then(
              res => {
                console.log(res);
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除学段成功",
                    type: "success"
                  });
                }
                this.loadData();
                this.getSectionList();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 删除班级
    delClass(e) {
      console.log(e);
      this.$confirm("你确定删除该专业？", "删除专业", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("123");
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteSectionProfession,
              { id: e, systembId: this.systembId },
              { emulateJSON: true }
            )
            .then(
              res => {
                console.log(res);
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除专业成功",
                    type: "success"
                  });
                }
                this.loadData();
                this.getSectionList();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 全部学段显示隐藏
    gradeEnter(i, e) {
      this.iconShow[i] = true;
      this.sectionList = Object.assign({}, this.sectionList);
    },
    gradeleave(i, e) {
      this.iconShow[i] = false;
      this.sectionList = Object.assign({}, this.sectionList);
    },
    classEnter(i) {
      this.iconShow2[i] = true;
      this.sectionList = Object.assign({}, this.sectionList);
    },
    classleave(i) {
      this.iconShow2[i] = false;
      this.sectionList = Object.assign({}, this.sectionList);
    }
  },
  created() {
    this.loading = true;

    Vue.http.headers.common["userToken"] = getCookie("userToken");
    this.$http.get(this.global.getSystembs).then(res => {
      if (res.body.status === 200) {
        this.platformlistold = res.body.resultObject;
        this.systembId = res.body.resultObject[0].systembId;
        this.loadData();
        this.getSectionList();
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
  .topBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul {
      display: flex;
      width: 500;
      justify-content: center;
      align-items: center;
      li:first-child {
        text-align: left;
        font-weight: bolder;
        font-size: 16px;
      }
      .searchValue {
        width: 370px;
      }
    }
  }
  .navBox{
    position: relative;
    .scrollLeft{
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      width: 28px;
      cursor: pointer;
      z-index: 999;
      display:flex;
      align-items:center;
      background:rgba(238,238,238,1);
      .leftfont{
        width:18px;
        height:16px;
        margin-left:8px;
        background: url("../../../../assets/images/left.png") no-repeat center;
      }
    }
    .scrollRight{
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      width: 28px;
      cursor: pointer;
      z-index: 999;
      display:flex;
      align-items:center;
      background:rgba(238,238,238,1);
      .rightfont{
         width:18px;
        height:16px;
        background: url("../../../../assets/images/right.png") no-repeat center;
      }
    }
    .navlist {
      width: 100%;
      padding:12px 30px 0;
      overflow-x: auto;
      overflow-y: hidden;
      text-align: left;
      white-space: nowrap;
      margin-bottom: 30px;
      -moz-box-sizing: border-box;
      background:rgba(245,245,245,1);
      border:1px solid rgba(229,229,228,1);
      position: relative;
      box-sizing: border-box;
      li {
        background:rgba(255,255,255,1);
        border:1px solid rgba(201,201,201,1);
        border-radius:10px;
        display: inline-block;
        font-size: 14px;
        margin-left: 5px;
        padding: 10px 20px;;
        margin-bottom: 12px;
        cursor: pointer;
        &.active {
          color: #fff;
          background: #0090ff;
          border:0;
        }
      }
    }
  }
  
  .content {
    display: flex;
    .content-left {
      flex-basis: 300px;
      height: auto;
      margin-top: 14px;
      margin-right: 15px;
      position: relative;
      padding-bottom: 10px;
      width: 230px;
      border: 1px solid rgb(230, 230, 230);
      border-radius: 5px;
      .top {
        font-size: 14px;
        position: relative;
        margin: 10px 0 0 0;
        text-align: left;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      .addGrade {
        font-size: 12px;
        color: #fff;
        background: rgba(243, 87, 23, 1);
        border: 1px solid rgba(211, 74, 18, 1);
        padding: 3px 5px;
        width: 60px;
        text-align: center;
        border-radius: 2px;
        z-index: 999;
        margin-left: 10px;
      }
      .topTittle {
        position: absolute;
        top: 17px;
        left: 85px;
        color: #999;
        font-size: 16px;
        color: #666;
      }
      .topAdd {
        margin-left: 10px;
      }
      .topMin {
        margin-left: 10px;
      }
      .sectionTitle {
        color: #409eff;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 30px;
        padding-left: 30px;
        line-height: 30px;
        .more {
          color: #fff;
          font-size: 12px;
          width: 60px;
          height: 20px;
          line-height: 20px;
          background: rgba(243, 87, 23, 1);
          border: 1px solid rgba(211, 74, 18, 1);
          margin: 0 2px;
          position: absolute;
          left: 130px;
          top: 50%;
          margin-top: -12px;
          z-index: 999;
          &.add {
            left: 190px;
          }
          &.del {
            left: 250px;
          }
        }
        .down {
          color: #999;
          display: flex;
          align-items: center;
          margin-right: 6px;
          a {
            margin-left: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100px;
          }
        }
        .gradeName {
          font-size: 14px;
          text-align: left;
          color: #666;
          z-index: 99;
        }
        .gradeName:hover {
          color: #409eff;
        }
      }
      .classList {
        padding-left: 50px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        height: 30px;
        .content {
          text-align: left;
          height: 30px;
          z-index: 99;
          font-size: 14px;
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          margin-left: 4px;
          margin-right: 6px;
          align-items: center;
          // height: 29px;
          // display: inline-block;
        }
        .content:hover {
          color: #409eff;
        }
        .more {
          color: #fff;
          font-size: 12px;
          width: 60px;
          height: 20px;
          line-height: 20px;
          background: rgba(243, 87, 23, 1);
          border: 1px solid rgba(211, 74, 18, 1);
          margin: 0 2px;
          position: absolute;
          left: 180px;
          top: 50%;
          margin-top: -10px;
          z-index: 9999;
        }

        .del {
          position: absolute;
          left: 240px;
        }
        .down2 {
          color: #999;
          // position: absolute;
          // left: 100px;
          // top: 3px;
        }
      }
    }
    .el-collapse-item {
      border-left: 1px solid rgb(240, 240, 240);
      border-right: 1px solid rgb(242, 242, 242);
    }
    .content-title {
      border-left: 1px solid rgb(240, 240, 240);
      border-right: 1px solid rgb(242, 242, 242);
      color: red;
    }
    .content-right {
      flex: 1;
      overflow-y: scroll;
    }
  }
  .statistics {
    height: 55px;
    line-height: 55px;
    border: 1px solid #dcdcdc;
    position: relative;
    top: 15px;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #999;
    overflow: hidden;
    border-bottom: 0;
    background-color: #f5f5f5;
    span {
      padding: 0 3px;
      font-weight: bolder;
      color: #409eff;
    }
    .green {
      color: rgb(80, 181, 132);
    }
    .yellow {
      color: rgb(212, 167, 95);
    }
    .red {
      color: red;
    }
    .el-button {
      float: right;
      margin: 10px 10px 0 0;
    }
  }
  .el-table {
    margin-top: 15px;
    border-radius: 5px;
  }
  .demo-ruleForm {
    padding-right: 50px;
    .must {
      color: red;
      position: absolute;
      left: -90px;
      top: 0;
    }
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
    left: -90px;
    top: 0;
  }
  .photo {
    position: relative;
    p {
      text-align: left;
      position: absolute;
      right: 0;
      top: 80px;
      line-height: 25px;
    }
  }
  .detaildialog {
    .must {
      color: red;
      position: absolute;
      left: -90px;
      top: 0;
    }
    .detail-content {
      display: flex;
      box-shadow: 0 0 1px #b4b4b4;
      padding: 20px 20px;
      width: 92%;
      margin: 0 auto;
      .detail-left {
        flex-basis: 350px;
        margin-right: 30px;
        img {
          width: 350px;
          height: 200px;
        }
      }
      .detail-right {
        flex: 1;
        text-align: left;
        h2 {
          font-size: 25px;
        }
        p {
          margin-top: 20px;
          font-size: 15px;
          span {
            margin-right: 80px;
            color: #999;
          }
        }
        .introduction {
          span {
            color: #666;
            margin-right: 0;
          }
        }
      }
    }
    .detail-mofang {
      box-shadow: 0 0 1px #b4b4b4;
      min-height: 500px;
      padding: 20px 20px 20px 20px;
      width: 92%;
      margin: 40px auto 0;
      h2 {
        text-align: left;
        font-size: 18px;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        span {
          position: relative;
          top: -10px;
        }
        .el-button {
          float: right;
          position: relative;
        }
      }
      li {
        height: 120px;
        border: 1px solid rgb(230, 230, 230);
        margin-top: 20px;
        border-radius: 5px;
      }
      li:first-child {
        margin-top: 0;
      }
      .detail-mofang-content {
        .top {
          display: flex;
          height: 80px;
          line-height: 80px;
          align-items: center;
          position: relative;
          font-weight: lighter;
          font-size: 18px;
          .mofang-content {
            margin: 0 20px;
          }
          .mofang-img {
            width: 80px;
            height: 40px;
            margin-left: 0;
            margin-top: -10px;
          }
          .mofang-content-edit {
            position: absolute;
            right: 120px;
            top: 20px;
          }
          .mofang-content-del {
            position: absolute;
            right: 30px;
            top: 20px;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        .bottom {
          border-top: 1px solid rgb(230, 230, 230);
          display: flex;
          align-items: center;
          position: relative;
          height: 40px;
          font-size: 14px;
          color: #999;
          font-weight: lighter;
          .mofang-content {
            margin: 0 20px;
          }
          .mofang-content-yin {
            position: absolute;
            right: 120px;
            top: 8px;
          }
          .mofang-content-zan {
            position: absolute;
            right: 30px;
            top: 8px;
          }
          a {
            color: #999;
          }
          i {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>
<style>
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.must {
  color: red;
  position: absolute;
  left: -90px;
  top: 0;
}
.mofangPhoto {
  position: relative;
}
.mofangPhoto p {
  text-align: left;
  position: absolute;
  right: 0;
  top: 80px;
  line-height: 25px;
}
.mofangPhoto .upimg {
  position: relative;
  top: -20px;
  left: 40px;
}
.el-dialog__header {
  text-align: center;
}
.wrongTips {
  display: inline-block;
  text-align: left;
  color: #f56c6c;
  width: 100%;
}
.addMore {
  font-size: 18px;
}
.addSb {
  width: 112px;
  line-height: 33px;
  text-align: center;
  color: #fff;
  height: 33px;
  background: rgba(48, 180, 79, 1);
  border: 1px solid rgba(15, 127, 3, 1);
  border-radius: 4px;
  float: right;
  margin: 10px 10px 0 0;
  cursor: pointer;
}
.el-table {
  margin-top: 15px;
  border-radius: 5px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.green {
  color: #30b44f;
}
.el-table {
  font-size: 12px;
  border-radius: 0;
}
.iconfont-color-blue {
  font-size: 12px;
}
</style>
