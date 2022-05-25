$(document).ready(function(){
    $("#edit").append("<a class='viewtitle' href='/edit/" + item["id"] + "'>Edit</a>")
    $("#title").append(item["title"]);
    $("#image").append("<img src='" + item["image"] + "' alt='Channel Logo'>")

    $("#subscribers").append(item["subscribers"]);
    $("#views").append(item["views"]);

    $("#link").append("<a href='"+item["link"]+"'>"+item["link"]+"<\a>");
    $("#summary").append(item["summary"]);

    $.each(item["genres"], function (index, value){ 
        let genre = $("<div class='row'></div>").html(value)
        $("#genres").append(genre);
    });
});