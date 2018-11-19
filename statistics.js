var members = data.results[0].members
var democrats = [];
var democratsVotes = [];
var republicans = [];
var republicansVotes = [];
var independents = [];
var leastLoyal = [];
var mostLoyal = [];
var leastEngaged = [];
var mostEngaged = [];


 
getNumberofMembersInEachParty("R", republicans)
getNumberofMembersInEachParty("D", democrats)
getNumberofMembersInEachParty("I", independents)
makeArrayOfVotes(republicans, republicansVotes)
makeArrayOfVotes(democrats, democratsVotes)
find10pct(sortArr(members, "votes_with_party_pct"), mostLoyal,"votes_with_party_pct")
find10pct(sortArrInverted(members,"votes_with_party_pct"), leastLoyal,"votes_with_party_pct")
find10pct(sortArr(members,"missed_votes_pct"), leastEngaged,"missed_votes_pct")
find10pct(sortArrInverted(members,"missed_votes_pct"), mostEngaged,"missed_votes_pct")
createTable("most-loyal",mostEngaged,"missed_votes","missed_votes")
createTable("least-loyal",mostEngaged,"missed_votes","missed_votes_pct")
createTable("most-engaged",mostEngaged,"missed_votes","missed_votes_pct")
createTable("least-engaged",leastEngaged,"missed_votes","missed_votes_pct")

var statistics = {
                     "number-of-Democrats": democrats.length,
                     "number-of-Replublicans": republicans.length,
                     "number-of-Independents": independents.length,
                     "R-votes-with-party": getAvg(democratsVotes).toFixed(2),
                     "D-votes-with-party":  getAvg(republicansVotes).toFixed(2),

                     "members-most-often-vote-with-party": mostLoyal,
                     "members-least-ofen-vote-with-party": leastLoyal,
                     "members-most-missed-vote": leastEngaged,
                     "members-least-missed-vote": mostEngaged,
                 }


fillTablePreview("TRR","number-of-Replublicans","R-votes-with-party")
fillTablePreview("TRD","number-of-Democrats","D-votes-with-party")
fillTablePreview("TRI","number-of-Independents",)

function getFullName(member){
     if ( member.middle_name === null){
            member.middle_name = "";
        }
    return member.first_name +" "+ member.middle_name +" "+ member.last_name;
}

function getNumberofMembersInEachParty(party, partyArray){
	for ( var i = 0; i < members.length; i++ ) {
		if ( members[i].party == party){
			partyArray.push(members[i])
			
		}
	}
}

function getAvg(arr){
	return arr.reduce((a,b) => a + b, 0) / arr.length
}

function makeArrayOfVotes(arr, arrPCT){
	for ( var i= 0; i < arr.length; i++){
		arrPCT.push(arr[i].votes_with_party_pct)
		arrPCT.sort(function(a,b){return b - a});
	}
}
function sortArr(arr,keyToSort){
	return arr.sort(function(a ,b){return b[keyToSort] - a[keyToSort]});
}

function sortArrInverted(arr, keyToSort){
	return arr.sort(function(a,b){return a[keyToSort] - b[keyToSort]});
}

function find10pct(arr, finalarr,keyToSort){
	var arrSize = arr.length;
	var numberMembers = Math.round(arrSize * 0.10);

	for ( var i = 0; i < numberMembers; i++){
		finalarr.push(arr[i])

	}
		for (var j= 0; j < members.length; j++){
		if (finalarr[numberMembers-1][keyToSort] == members[j][keyToSort] && finalarr[j] != members[j] ){
			finalarr.push(members[j])
					
		}
	}
	console.log(finalarr.length) 
}

function createTable(tbodyid,arr,key2,key3){
	var tbody = document.getElementById(tbodyid);
	if (tbody == undefined){
		return;
	}else{
	for (var i = 0; i < arr.length; i++){
		var tr = document.createElement("tr");
		createTD(getFullName(arr[i]),tr)
		createTD(arr[i][key2],tr)
		createTD(arr[i][key3],tr)
		tbody.appendChild(tr)
	}
}
	}

function createTD(text,tr){
	var td= document.createElement("td");
	td.textContent = text;
	tr.appendChild(td)
}

function fillTablePreview(trid,key,key2){
	var tr = document.getElementById(trid)
		if( statistics[key2] == null){
			statistics[key2] = "/"
		}
		createTD(statistics[key],tr)
		createTD(statistics[key2],tr)	
}




