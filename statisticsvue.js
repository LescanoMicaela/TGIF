var app = new Vue ({
	el: '#app',
	data: {
		members:[],
		allMembers: [],
		chamber:"",
		fullName:"",
		Rmembers:[],
		Imembers:[],
		Dmembers:[],
		R: "R",
		D: "D",
		I: "I",
		numberDemocrats: 0,
        numberRepublicans: 0,
        numberIndependents: 0,
		democratsVotes : [],
		republicansVotes: [],
		leastLoyal: [],
		mostLoyal: [],
		leastEngaged: [],
		mostEngaged: []
			
	},
	created: function(){
		this.locationPage();
		this.getData();
	
		
		
			
	},
	methods:{
		locationPage: function(){
		if (document.getElementsByTagName("body")[0].getAttribute("data-id")  == "senate"){
		console.log("You are in the senate");
		chamber ="senate"
				}else if ( document.getElementsByTagName("body")[0].getAttribute("data-id") =="house"){
		chamber = "house"
	}
	},
	 	getData: function(){
			fetch("https://api.propublica.org/congress/v1/113/"+chamber+"/members.json",{
			method:"GET",
			headers: {
				'X-API-Key': 'aV58nB7F64h3FlIA3ivirUIQSXuTljDVvHZ8qXzB'
			}	
		}).then(function(response){
	
			return response.json();

		}).then(function(json){
		
			app.members = json.results[0].members;
			console.log(app.members)
			app.allMembers = json.results[0].members;
			app.getNumberofMembersInEachParty("R",app.Rmembers, "numberIndependents")
			app.getNumberofMembersInEachParty("I",app.Imembers, "numberRepublicans")
			app.getNumberofMembersInEachParty("D",app.Dmembers, "numberDemocrats")
			app.makeArrayOfVotes(app.Dmembers, app.democratsVotes)
			app.makeArrayOfVotes(app.Rmembers, app.republicansVotes);
			app.find10pct(app.sortArr(app.members, "votes_with_party_pct"), app.mostLoyal,"votes_with_party_pct")
			app.find10pct(app.sortArrInverted(app.members,"votes_with_party_pct"), app.leastLoyal,"votes_with_party_pct")
			app.find10pct(app.sortArr(app.members,"missed_votes_pct"), app.leastEngaged,"missed_votes_pct")
			app.find10pct(app.sortArrInverted(app.members,"missed_votes_pct"), app.mostEngaged,"missed_votes_pct")
			

		}).catch(function (error){
	 		console.log("Request failed:" + error.message);
		});
		},
		
		getFullName: function (member){
    	return member.first_name +" "+ (member.middle_name || " ") + member.last_name;
		},
	
		getNumberofMembersInEachParty: function(party, partyArray,lenghtarr){
			for ( var i = 0; i < app.members.length; i++ ) {
				if ( app.members[i].party == party){
				partyArray.push(app.members[i])
			
		}
				}
			app[lenghtarr] = partyArray.length;
		},
		
		getAvg: function(arr){
			return (arr.reduce((a,b) => a + b, 0) / arr.length).toFixed(2)	
					
		},
	 	makeArrayOfVotes: function(arr, arrPCT){
		for ( var i= 0; i < arr.length; i++){
			arrPCT.push(arr[i].votes_with_party_pct)
			arrPCT.sort(function(a,b){return b - a});
			}
	 	},
	 	sortArr: function(arr,keyToSort){
		return arr.sort(function(a ,b){return b[keyToSort] - a[keyToSort]});
	 	},

		sortArrInverted: function(arr, keyToSort){
	return arr.sort(function(a,b){return a[keyToSort] - b[keyToSort]});
		 },

		 find10pct: function(arr, finalarr,keyToSort){
			var arrSize = arr.length;
			var numberMembers = Math.round(arrSize * 0.10);
			 for ( var i = 0; i < numberMembers; i++){
				finalarr.push(arr[i])
			 }
			for (var j= 0; j < app.members.length; j++){
			if (finalarr[numberMembers-1][keyToSort] == app.members[j][keyToSort] && finalarr[j] != app.members[j] ){
			finalarr.push(app.members[j])
					}
			}
	 
}
	 }

	
})