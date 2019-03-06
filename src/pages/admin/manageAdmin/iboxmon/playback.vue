<template>
	<div class="playback">
		<video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay>
		    <source src="rtmp://rtmp.open.ys7.com/openlive/a64985d2939949a08805da089a8c1ec0.hd" type="" />
		    <source src="http://hls.open.ys7.com/openlive/a64985d2939949a08805da089a8c1ec0.hd.m3u8" type="application/x-mpegURL" />
		    <source src="wss://wsopen.ys7.com/a64985d2939949a08805da089a8c1ec0" />
		</video>
		<div class="againbox">
			<span class="demonstration">开始时间：</span>
		    <el-date-picker
		      v-model="timedata.startTime"
		      type="datetime"
		      placeholder="选择开始时间">
		    </el-date-picker>
		    <span class="demonstration">结束时间：</span>
		    <el-date-picker
		      v-model="timedata.endTime"
		      type="datetime"
		      placeholder="选择结束时间">
		    </el-date-picker>
		    <el-button type="primary">播放</el-button>
		    <el-button plain>下载</el-button>
		</div>
	</div>
</template>
<script>
export default{
	name:"playback",
	data(){
		return{
			value1:'',
			value2:'',
			searchdata:{}
		}
	},
	components:{
      // Navrouter
    },
    props:['timedata'],
	created(){
		console.log(this.timedata)
	},
	mounted(){
		let player = new EZUIPlayer('myPlayer');
		// player.on('error', function(){
	 //        console.log('error');
	 //    });
	 //    player.on('play', function(){
	 //        console.log('play');
	 //    });
	 //    player.on('pause', function(){
	 //        console.log('pause');
	 //    });
	    // player.CapturePicture(lpPictureName);
	},
	methods:{
		
	}	
}

</script>
<style scoped lang="less">
#myPlayer{
	height:600px;
	width:100%;
}
.playback{
		flex: 1;
	margin:10px;
	.againbox{
		height:94px;
		background: #F5F5F5;
		padding:29px;
	}
}
</style>
<style lang="less">
.playback{
	
}
</style>


