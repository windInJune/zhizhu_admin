import { USERINFO,USERNAME } from './mutation-types'

export default {
    //这里的data就是vuex的state
    [USERINFO](state, userdata) {
        console.log(userdata)
        state.userdata = userdata;
    },
    [USERNAME](state, username) {
        console.log(username)
        state.username = username;
    }
}