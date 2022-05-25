$(document).ready(function(){
    $("#title").append(item["title"]);
    $("#image").append("<img src='" + item["image"] + "'>")

    $("#subscribers").append(item["subscribers"]);
    $("#views").append(item["views"]);

    $("#link").append(item["link"]);
    $("#summary").append(item["summary"]);

    $.each(item["genres"], function (index, value){ 
        let genre = $("<div class='row'></div>").html(value)
        $("#genres").append(genre);
    });
});