var app = new Vue ({
	el: '#app',
	data:{
		moreText: false,
			
	},
	created: function(){
		
	},

	methods:{
		readMore: function(){
			if(this.moreText){
				this.moreText = false;
			}else{
				this.moreText = true;
			}
		}
	
	}
	

})

