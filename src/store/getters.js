export default{
    userNames: state => {//通过方法访问
        if(!state.username){
            state.username = sessionStorage.getItem('username')
        }
        return state.username
    },
    userImgs:state => {
        if(!state.userimg){
            state.userimg = sessionStorage.getItem('userimg')
        }
        return state.userimg
    }
}