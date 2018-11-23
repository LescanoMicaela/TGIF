var app = new Vue({
	el: '#app',
	data: {
		members: [],
		allMembers: [],
		states: ["ALL"],
		chamber: "",
		fullName: "",
		filterByNameMembers :[],
		loading: true,
		results: false

	},
	created: function () {
		this.locationPage();
		this.getData(this.chamber);
	},

	methods: {
		locationPage: function () {
			if (document.getElementById("senate")) {
				this.chamber = "senate";
			} else if (document.getElementById("house")) {
				this.chamber = "house";
			}
		},
		getData: function (chamber) {
			fetch("https://api.propublica.org/congress/v1/113/" + chamber + "/members.json", {
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
				app.getStates();


			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});

		},

		getFullName: function (member) {
			var middle = (member.middle_name != null ? member.middle_name : " ")

			return member.first_name + " " + (middle + " " ) + member.last_name;
		},

		filter: function () {
			this.results = false;
			this.members = this.allMembers;
			var input = document.getElementById("inputSearch");;
			var states = document.getElementById("stateselect").value
			var checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')).map(function (el) {
				return el.value;
			})
			var resultMembers = this.members.filter(function (member) {
				var filter1 = checkedBoxes.includes(member.party) || checkedBoxes.length == 0;
				var filter2 = member.state == states || states == "ALL";
				var filter3 = (app.getFullName(member).toLowerCase().includes(input.value.toLowerCase()))
				return filter1 && filter2 && filter3;
			});
			//Asignamos ese valor a nuestro campo "members" que es el que se muestra en la tabla
			this.members = resultMembers;
			if(this.members.length === 0){
				this.results = true;
			}

		},

		getStates: function () {
			var allStates = ["ALL"];
			for (var i = 0; i < this.members.length; i++) {
				if (allStates.indexOf(this.members[i].state) === -1) {
					allStates.push(this.members[i].state)
				}

			}
			this.states = allStates;
		},

	
	}

})