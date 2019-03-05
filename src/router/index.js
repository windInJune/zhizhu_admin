import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/admin/index'
import BigB from '@/pages/admin/manageAdmin/components/bigB'
import addBigB from '@/pages/admin/manageAdmin/components/addBigB'
import editBigB from '@/pages/admin/manageAdmin/components/editBigB'
import bigBadmin from '@/pages/admin/manageAdmin/components/bigBadmin'
import SuperAdmin from '@/pages/admin/superAdmin/superAdmin'
import ManageAdmin from '@/pages/admin/manageAdmin/manageAdmin'
import AdminList from '@/pages/admin/superAdmin/components/adminList'
import ManageList from '@/pages/admin/manageAdmin/components/manageList'
import SchoolList from '@/pages/admin/manageAdmin/components/schoolList'
import AdministratorsList from '@/pages/admin/manageAdmin/components/administratorsList'
import IBOXList from '@/pages/admin/manageAdmin/components/IBOXList'
import CourseList from '@/pages/admin/manageAdmin/components/CourseList'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/superAdmin',
      name: 'SuperAdmin',
      component: SuperAdmin,
      redirect: '/superAdmin/adminList',
      children: [
        {
          path: 'adminList',
          name: 'AdminList',
          component: AdminList
        }
      ]
    },
    {
      path: '/manageAdmin',
      name: 'ManageAdmin',
      component: ManageAdmin,
      redirect: '/manageAdmin/bigb',
      children: [
        {
          path: 'bigbadmin',
          name: 'bigbadmin',
          component: bigBadmin
        },
        {
          path: 'addbigb',
          name: 'addbigb',
          component: addBigB
        },
        {
          path: 'editbigb',
          name: 'editbigb',
          component: editBigB
        },
        {
          path: 'bigb',
          name: 'bigb',
          component: BigB
        },
        {
          path: 'manageList',
          name: 'ManageList',
          component: ManageList
        },
        {
          path: 'schoolList',
          name: 'SchoolList',
          component: SchoolList
        },
        {
          path: 'administratorsList',
          name: 'AdministratorsList',
          component: AdministratorsList
        },
        {
          path: 'iboxList',
          name: 'IBOXList',
          component: IBOXList
        },
        {
          path: 'courseList',
          name: 'CourseList',
          component: CourseList
        }
      ]
    }
  ]
})
