function getData(data){
    var members = data.results[0].members;
    var dataTabla = document.getElementById("senate_data");
    for (i = 0; i<members.length; i++){
        var row = document.createElement("tr");
            var column1 = document.createElement("td");
            
            if (data.results[0].members[i].middle_name == null){
                var stringinDatas = " ";
            }
            else if(data.results[0].members[i].middle_name != null){
                var stringinDatas = data.results[0].members[1].middle_name;
            }
			var senateNames = data.results[0].members[i].first_name +" " + stringinDatas + " " + data.results[0].members[i].last_name;
            
            column1.textContent = senateNames;
    
            var column2 = document.createElement("td");
            var senateParty = data.results[0].members[i].party;
            column2.textContent = senateParty;
       
            var column3 = document.createElement("td");
            var senateState = data.results[0].members[i].state;
            column3.textContent = senateState;
            
            var column4 = document.createElement("td");
            var senateVotes = data.results[0].members[i].votes_with_party_pct + "%"
            column4.textContent = senateVotes;
            
        row.appendChild(column1);
        row.appendChild(column2);
        row.appendChild(column3);
        row.appendChild(column4);
        
       
    dataTabla.appendChild(row);    
    }
    
    }


getData(data)