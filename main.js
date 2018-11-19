var data;
var members;
var states =["ALL"];
var filteredMembers = [];
//locationPage();
var chamber;
locationPage();

fetch("https://api.propublica.org/congress/v1/113/"+chamber+"/members.json",{
	method:"GET",
	headers: {
		'X-API-Key': 'aV58nB7F64h3FlIA3ivirUIQSXuTljDVvHZ8qXzB'
	}	
}).then(function(response){
		if (response.ok){
	return response.json();
}
throw new Error(response.statusText);
}).then(function(json){
		data = json;
		members = data.results[0].members;
		console.log(data)
		createTable(members);
		selectingFilters("I",members);
		selectingFilters("R",members);
		selectingFilters("D",members);
		selectingFilters("states",members);
		createStateDropDown(members);
		
}).catch(function (error){
	 console.log("Request failed:" + error.message);
});




function getFullName(member){
     if ( member.middle_name === null){
            member.middle_name = "";
        }
    return member.first_name +" "+ member.middle_name +" "+ member.last_name;
}

function createTD(text,tr){
	var td= document.createElement("td");
	td.textContent = text;
	tr.appendChild(td);
}

function createTable(members){
    var tbody = document.getElementById("data-tbody"); 
    tbody.innerHTML= "";
    for (var i=0; i < members.length; i++){
        var tr = document.createElement("tr");
        var td0= document.createElement("td");
        var td1= document.createElement("td");
        var td2= document.createElement("td");
        var td3= document.createElement("td");
        var td4= document.createElement("td");
        
        var fullName= getFullName(members[i]);
        var link = document.createElement("a");
        link.setAttribute("href", members[i].url);
        link.textContent = fullName;
       
        var party = members[i].party;
        var state = members[i].state;
        var seniority = members[i].seniority;
        var votesWithParty = members[i].votes_with_party_pct + "%";
        
        td0.appendChild(link);
        td1.textContent = party;
        td2.textContent = state;
        td3.textContent = seniority;
        td4.textContent = votesWithParty;
        tr.setAttribute("class",party);
        tr.setAttribute("class",state);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        
        tbody.appendChild(tr);
		   

	
		
//		FilterResultsHideShow("I", tdck, trck)
//		FilterResultsHideShow("D", tdck, trck)
//		FilterResultsHideShow("R", tdck, trck)
    
    
    }
}

function checkOnClick(ck){
	 document.getElementById(ck).onclick = function(){
	
			 var tbody = document.getElementById("data-tbody")
			for ( var i = 0; i < tbody.children.length; i++){
				if ( tbody.children[i].className == ck && document.getElementById(ck).checked == true){
			 	tbody.children[i].style.display = "table-row";
				}else if (tbody.children[i].className == ck && document.getElementById(ck).checked == false) {
					tbody.children[i].style.display = "none";
			}
			 
		 
	 }
}
}

function selectingFilters(element,members){
    document.getElementById(element).onclick = function(){
    filteredMembers = [];
    filterResults("R", members);   
    filterResults("I",members);   
    filterResults("D",members);  
    createTable(filteredMembers);
        
    }
}

function filterResults(ck, members){
    var checkbox = document.getElementById(ck);
    var dropDown = document.getElementById("states");
    for (var i=0; i < members.length; i++){
        if ( checkbox.checked == true && members[i].party == ck && dropDown.value == "ALL" ){
            filteredMembers.push(members[i]) 
        } else if ( (checkbox.checked == true && members[i].party == ck) &&  dropDown.value ==  members[i].state ){
			  filteredMembers.push(members[i]) 
		} 
        }
}

function createStateDropDown(members){
	for ( var i= 0; i < members.length; i++){
		if ( states.indexOf(members[i].state) === -1){
			states.push(members[i].state)
			}
		}
	var dropSelect = document.getElementById("states")
	for (var i = 0; i < states.length; i++){
		var option= document.createElement("option");
		option.setAttribute("value", states[i]);
		option.textContent = states[i];
		dropSelect.appendChild(option);
	}
}

function locationPage(){
	if (document.getElementsByTagName("body")[0].getAttribute("data-id")  == "senate"){
		console.log("You are in the senate");
		chamber ="senate"
//		var members = data.results[0].members;
//		createTable(members);
//		selectingFilters("I",members);
//		selectingFilters("R",members);
//		selectingFilters("D",members);
//		selectingFilters("states",members);
//		createStateDropDown(members);

		
	}else if ( document.getElementsByTagName("body")[0].getAttribute("data-id") =="house"){
		chamber = "house"
//		var members = data.results[0].members;
//		createTable(members);
//		selectingFilters("I",members);
//		selectingFilters("R",members);
//		selectingFilters("D",members);
//		selectingFilters("states",members);
//		createStateDropDown(members);
		
	}
}

