$(document).ready(function(){   
    $("#popular-list").empty();
    let idxs = [1,2,3]
    $.each(data, function(index, item){    
        if (jQuery.inArray(item["id"], idxs) > -1){
            let result = $("<div></div>").addClass("col-md-4 result")
            let title = $("<a href='/view/" + item["id"] + "'>" + item["title"] + "<\a>")
            result.append(title)
            result.append("<br><br>")
            result.append("<a href='/view/" + item["id"] + "'>" + "<img src='" + item["image"] + "' alt='Channel Image'>" + "<\a>")
            $("#popular-list").append(result)
        }
    });    
});