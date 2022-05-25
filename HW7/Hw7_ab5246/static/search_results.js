$(document).ready(function(){
    $("#searchresults").empty();
    
    let toprow = $("<div></div>").addClass("row toprow")
    toprow.html("Search Results for '" + searchkey + "'")
    $("#searchresults").append(toprow)

    if (results.length == 0){
        let errormsg = $("<div></div>").addClass("row result").html("No results found")
        $("#searchresults").append(errormsg)
    }
    else{
        let numresults = $("<div></div>").addClass("row result").html(results.length + " results found")
        $("#searchresults").append(numresults)
    }

    $.each(results, function(index, item){ 
        let result = $("<div></div>").addClass("row eachresult")
        let st = item["start"]
        let en = item["end"]
        if (item["matched"] == "title"){
            let name = item["title"]
            let title_highlight = [name.slice(0, st), "<span class='highlight-result border-secondary'>", name.slice(st, en), "</span>", name.slice(en)].join('')
            let title = $("<a href='/view/" + item["id"] + "'>" + title_highlight + "<\a>").addClass("titlesearch")
            result.append(title)
        }
        else{
            let title = $("<a href='/view/" + item["id"] + "'>" + item["title"] + "<\a>").addClass("titlesearch")
            result.append(title)
            result.append("<br>")
            let extra = item["extra"]
            let extra_highlight = [extra.slice(0, st), "<span class='highlight-result border-secondary'>", extra.slice(st, en), "</span>", extra.slice(en)].join('')
            result.append(extra_highlight)
        }
        result.append("<br")
        $("#searchresults").append(result)
    });
})