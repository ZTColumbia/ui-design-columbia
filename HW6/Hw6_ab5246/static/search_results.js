$(document).ready(function(){
    $("#searchresults").empty();
    
    let toprow = $("<div></div>").addClass("row toprow")
    toprow.html("Search Results for '" + searchkey + "'")
    $("#searchresults").append(toprow)

    if (results.length == 0){
        let errormsg = $("<div></div>").addClass("row result").html("No results found")
        $("#searchresults").append(errormsg)
    }

    $.each(results, function(index, item){ 
        let result = $("<div></div>").addClass("row result")
        let title = $("<a href='/view/" + item["id"] + "'>" + item["title"] + "<\a>")
        result.append(title)
        $("#searchresults").append(result)
    });
})