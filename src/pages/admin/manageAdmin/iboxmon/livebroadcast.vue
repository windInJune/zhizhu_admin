<template>
	<div class="livebroadcast">
		<video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay>
		    <!-- <source src="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b" type="" />
		    <source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="application/x-mpegURL" /> -->
		    <source src="rtmp://rtmp.open.ys7.com/openlive/a64985d2939949a08805da089a8c1ec0.hd" type="" />
		    <source src="http://hls.open.ys7.com/openlive/a64985d2939949a08805da089a8c1ec0.hd.m3u8" type="application/x-mpegURL" />
		    <source src="wss://wsopen.ys7.com/a64985d2939949a08805da089a8c1ec0" />
		</video>
	</div>
</template>
<script>
export default{
	name:"livebroadcast",
	data(){
		return{

		}
	},
	components:{
      // Navrouter
    },
    // props:['iboxObj'],
	created(){
		
	},
	mounted(){
		let obj={"AppKey":"1f2587a44f814b9b9665914d27ba38c7","AccessToken":"at.9js90u60cpjm2emh6hz21e1s5tp6nk9w-92nv144kox-1yn21zb-15dl2xe2j","Url":"ezopen://open.ys7.com/C54604447/1.hd.live"}

		let player = new EZUIPlayer('myPlayer');
		player.on('error', function(){
	        console.log('error');
	    });
	    player.on('play', function(){
	        console.log('play');
	    });
	    player.on('pause', function(){
	        console.log('pause');
	    });
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
.livebroadcast{
	flex: 1;
	margin:10px;
}
</style>


