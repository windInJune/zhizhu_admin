<script type="text/javascript">
// 服务器地址
let localAPI;
// 登录
if (process.env.NODE_ENV == 'development') {
    localAPI = 'http://172.16.1.165/ibox'; //线上url
} else {
    localAPI = 'http://172.16.1.165/ibox'; //线上url
}
const userlogin = localAPI + '/user/userLogin'
// 超管端
const getSystemUserList = localAPI + '/user/getSystemUserList'
// 超管端
const getUserList = localAPI + '/user/getUserList'
const insertUser = localAPI + '/user/insertUser'
const deleteUser = localAPI + '/user/deleteUser'
const modifyUserPwd = localAPI + '/user/modifyUserPwd'
const disableUser = localAPI + '/user/disableUser'
// 管理端
const getSchoolList = localAPI + '/school/getSchoolList'
const getCustomUserList = localAPI + '/customerUser/getCustomUserList'
const getCustomUserById = localAPI + '/customerUser/getCustomUserById'
const modifyCustomerUserById = localAPI + '/customerUser/modifyCustomerUserById'
const modifyPassword = localAPI + '/customerUser/modifyPassword'
const getSchools = localAPI + '/school/getSchools'
const getSchoolsDrowDown = localAPI + '/school/getSchoolsDrowDown'
const getGrades = localAPI + '/school/getGrades'
const getClass = localAPI + '/school/getClass'

const insertSchool = localAPI + '/school/insertSchool'
const deleteSchool = localAPI + '/school/deleteSchool'
const editSchool = localAPI + '/school/editSchool'
const getDataStatistics = localAPI + '/school/getDataStatistics'
// 大B平台
const getSystembList = localAPI + '/systermb/getSystembList'
const insertSystemb = localAPI + '/systermb/insertSystemb'
const deleteSystembById = localAPI + '/systermb/deleteSystembById'
const getSystembById = localAPI + '/systermb/getSystembById'
const getSystembs = localAPI + '/systermb/getSystembs'
const updateSystembById = localAPI + '/systermb/updateSystembById'
// ibox
const getIboxList = localAPI + '/iboxInfo/getIboxList'
const getIbox = localAPI + '/iboxInfo/getIbox'
const getUserRecord = localAPI + '/iboxInfo/getUserRecord'
const deleteIboxById = localAPI + '/iboxInfo/deleteIboxById'
const insertIbox = localAPI + '/iboxInfo/insertIbox'
const editIbox = localAPI + '/iboxInfo/editIbox'
const getSearchTexts = localAPI + '/iboxInfo/getSearchTexts'
// 课程管理
const getSysCourseList = localAPI + '/sysCourse/getSysCourseList'
const getSectionList = localAPI + '/sectionProfession/getSectionList'
const getProfessionList = localAPI + '/sectionProfession/getProfessionList'
const insertSysCourse = localAPI + '/sysCourse/insertSysCourse'
const deleteSysCourseById = localAPI + '/sysCourse/deleteSysCourseById'
const getSysCourseById = localAPI + '/sysCourse/getSysCourseById'
const insertSectionProfession = localAPI + '/sectionProfession/insertSectionProfession'
const deleteSectionProfession = localAPI + '/sectionProfession/deleteSectionProfession'
const updateSectionProfession = localAPI + '/sectionProfession/updateSectionProfession'
const updateSysCourse = localAPI + '/sysCourse/updateSysCourse'
const getBoxtaskList = localAPI + '/boxtask/getBoxtaskList'
const insertBoxtask = localAPI + '/boxtask/insertBoxtask'
const getBoxtaskById = localAPI + '/boxtask/getBoxtaskById'
const deleteBoxtask = localAPI + '/boxtask/deleteBoxtask'
const updateBoxtask = localAPI + '/boxtask/updateBoxtask'
//修改用户信息
const editSystemUser = localAPI + '/user/editSystemUser'
 //获取设备设置状态
const getIboxSettingInfo = localAPI + '/iboxInfo/getIboxSettingInfo'
 //设置设备状态
const updateIboxSettingInfo = localAPI + '/iboxInfo/updateIboxSettingInfo'
//查看回放记录
const getVideo = localAPI + '/httpClient/getVideo'
const modifyUserPwdByOldPwd = localAPI + '/user/modifyUserPwdByOldPwd'
export default
{
  modifyUserPwdByOldPwd,
  getVideo,
  getIboxSettingInfo,
  updateIboxSettingInfo,
  editSystemUser,
  getUserRecord,
  getSystemUserList,
  updateSystembById,
  getSystembList,
  getSystembs,
  insertSystemb,
  getSystembById,
  deleteSystembById,
  localAPI,
  userlogin,
  getUserList,
  insertUser,
  deleteUser,
  modifyUserPwd,
  disableUser,
  getSchoolList,
  getCustomUserList,
  insertSchool,
  deleteSchool,
  editSchool,
  getCustomUserById,
  modifyCustomerUserById,
  modifyPassword,
  getSchools,
  getSchoolsDrowDown,
  getGrades,
  getClass,
  getDataStatistics,
  getIboxList,
  deleteIboxById,
  insertIbox,
  getIbox,
  editIbox,
  getSysCourseList,
  getSectionList,
  getProfessionList,
  insertSysCourse,
  getSearchTexts,
  deleteSysCourseById,
  getSysCourseById,
  insertSectionProfession,
  deleteSectionProfession,
  updateSectionProfession,
  updateSysCourse,
  getBoxtaskList,
  getBoxtaskById,
  insertBoxtask,
  deleteBoxtask,
  updateBoxtask
}
</script>
