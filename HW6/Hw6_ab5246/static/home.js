// display first 3 data items in the home page
$(document).ready(function(){    
    $("#popular-list").empty();
    let idxs = [1,2,3]
    $.each(data, function(index, item){    
        if (jQuery.inArray(item["id"], idxs) > -1){
            let result = $("<div></div>").addClass("row result")
            let title = $("<a href='/view/" + item["id"] + "'>" + item["title"] + "<\a>")
            result.append(title)
            $("#popular-list").append(result)
        }
    });
});