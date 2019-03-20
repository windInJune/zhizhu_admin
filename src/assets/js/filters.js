const totimestr = value => {
	if (value) {
		let date = new Date(value);
		let Y = date.getFullYear() + '-';
		let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
		let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
		let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
		let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
		let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return Y + M + D + h + m + s;
	} else {
		return '/';
	}
}
const getuserSex = value => {
	if (value==1){
		return '男'
	}else if(value==2){
		return '女'
	}else{
		return '保密'
	}
}
const getuserType = value => {
	if (value==1){
		return '管理员'
	}else if(value==2){
		return '学员'
	}else{
		return '超级管理员'
	}
}
const getiboxstatus = value => {
	if (value==0){
		return '空闲'
	}else if(value==1){
		return '忙碌'
	}else if (value==2){
		return '离线'
	}else if(value==3){
		return '实时检测'
	}
}
const gettaskstatus = value => {
	if(value==''){
		return '未知'
	}else if (value==0){
		return '待完成'
	}else if(value==1){
		return '待预约'
	}else if (value==2){
		return '已完成'
	}else if(value==3){
		return '已结束'
	}
}
const settimems=value=>{
	if(value=='' || !value){
		return '--';
	}else{
		let m=parseInt(value/60),s=value%60;
		// if(s<10){
		// 	s='0'+s;
		// }
		return m+"'"+s+"''";
	}
}

export {
	totimestr,getuserSex,getuserType,getiboxstatus,gettaskstatus,settimems
}