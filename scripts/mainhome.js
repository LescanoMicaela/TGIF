var app = new Vue ({
	el: '#app',
	data:{
		moreText: false,		
	},
	methods:{
		readMore:function(){
			((this.moreText) ? this.moreText = false : this.moreText = true)
			
		}
	
	}
	

})

