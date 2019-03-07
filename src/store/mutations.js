import { USERINFO,USERNAME,USERIMG } from './mutation-types'

export default {
    //这里的data就是vuex的state
    [USERINFO](state, userdata) {
        state.userdata = userdata;
    },
    [USERNAME](state, username) {
        state.username = username;
        sessionStorage.setItem('username',username)
    },
    [USERIMG](state, userimg) {
        state.userimg = userimg;
        sessionStorage.setItem('userimg',userimg)

    }
}