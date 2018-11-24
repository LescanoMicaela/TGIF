var app = new Vue({
	el: '#app',
	data: {
		members: [],
		allMembers: [],
		chamber: "",
		fullName: "",
		Rmembers: [],
		Imembers: [],
		Dmembers: [],
		statistics: {
			numberDemocrats: 0,
			numberRepublicans: 0,
			numberIndependents: 0,
			democratsVotes: [],
			republicansVotes: [],
			leastLoyal: [],
			mostLoyal: [],
			leastEngaged: [],
			mostEngaged: []
		},
		loading : true,
		results: false

	},
	created: function () {
		this.locationPage();
		this.getData();

	},
	methods: {
		locationPage: function () {
			if (document.getElementById("senate")) {
				this.chamber = "senate"
			} else if (document.getElementById("house")) {
				this.chamber = "house"
			}
		},
		getData: function () {
			fetch("https://api.propublica.org/congress/v1/113/" + this.chamber + "/members.json", {
				method: "GET",
				headers: {
					'X-API-Key': 'aV58nB7F64h3FlIA3ivirUIQSXuTljDVvHZ8qXzB'
				}
			}).then(function (response) {

				return response.json();

			}).then(function (json) {
				app.loading = false;
				app.members = json.results[0].members;
				console.log(app.members)
				app.allMembers = json.results[0].members;
				app.getNumberofMembersInEachParty("R", app.Rmembers, "numberRepublicans")
				app.getNumberofMembersInEachParty("I", app.Imembers, "numberIndependents")
				app.getNumberofMembersInEachParty("D", app.Dmembers, "numberDemocrats")
				app.makeArrayOfVotes(app.Dmembers, "democratsVotes")
				app.makeArrayOfVotes(app.Rmembers, "republicansVotes");
				app.find10pct(app.sortArr(app.members, "votes_with_party_pct"), app.statistics.mostLoyal,"votes_with_party_pct");
				app.find10pct(app.sortArrInverted(app.members,"votes_with_party_pct"), app.statistics.leastLoyal,"votes_with_party_pct");
				app.find10pct(app.sortArr(app.members,"missed_votes_pct"), app.statistics.leastEngaged,"missed_votes_pct");
				app.find10pct(app.sortArrInverted(app.members,"missed_votes_pct"), app.statistics.mostEngaged,"missed_votes_pct");
				app.results= true;


			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},

		getFullName: function (member) {
			var middle = (member.middle_name != null ? member.middle_name : " ")

			return `${member.first_name} ${middle} ${member.last_name}`;
		},

		getNumberofMembersInEachParty: function (party, partyArray, lenghtarr) {
			this.members.map(function(member){
				if (member.party == party) {
					partyArray.push(member)

				}
			})
			this.statistics[lenghtarr] = partyArray.length;
				
		},

		getAvg: function (arr) {
			return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)

		},
		makeArrayOfVotes: function (arr, arrPCT) {
			arr.map(function(ar){
				app.statistics[arrPCT].push(ar["votes_with_party_pct"])		
			})
				this.statistics[arrPCT].sort(function (a, b) {
					return b - a
				});
		},
		sortArr: function (arr, keyToSort) {
			return arr.sort(function (a, b) {
				return b[keyToSort] - a[keyToSort]
			});
		},

		sortArrInverted: function (arr, keyToSort) {
			return arr.sort(function (a, b) {
				return a[keyToSort] - b[keyToSort]
			});
		},

		find10pct: function (arr, finalarr, keyToSort) {
			var arrSize = arr.length;
			var numberMembers = Math.round(arrSize * 0.10);
			for (var i = 0; i < numberMembers; i++) {
				finalarr.push(arr[i])
			}
			for (var j = 0; j < this.members.length; j++) {
				if (finalarr[numberMembers - 1][keyToSort] == this.members[j][keyToSort] && finalarr[j] != this.members[j]) {
					finalarr.push(this.members[j])
				}
			}

		}
	}


})