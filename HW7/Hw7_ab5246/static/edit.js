function get_feedback(feedback) {
    var template = $("<div class='invalid-feedback'></div>")
    template.html(feedback)
    return template
}

function validate_string(input_s, parent_s, name) {
    var val = $(input_s).val().trim()
    var valid = true
    
    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Please enter " + name + "."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Invalid spaces."))
        valid = false
    }
    return valid
}

function validate_image_url(input_s, parent_s) {
    var val = $(input_s).val().trim()
    var valid = true

    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Please enter URL."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(get_feedback("Invalid spaces."))
        valid = false
    }

    return valid
}

function validate_inputs(){
    var valid = true
    var name = $("#input-name").val().trim()

    if (!validate_string("#input-name", "#form-name", "name")){
        valid = false
    }

    // validate subscribers
    if (!validate_string("#input-subscribers", "#form-subscribers", "subscribers")) {
        valid = false
    }

    // validate views
    if (!validate_string("#input-views", "#form-views", "views")) {
        valid = false
    }

    // validate image url
    if (!validate_image_url("#input-image", "#form-image")) {
        valid = false
    }

    // validate summary
    if (!validate_string("#input-summary", "#form-summary", "summary")) {
        valid = false
    }
    
    // validate genres
    if (!validate_string("#input-genres", "#form-genres", "genres")) {
        valid = false
    }

    return valid
}

$(document).ready(function () {

    $('.alert').hide()

    $("#input-name").val(item["title"])
    $("#input-image").val(item["image"])
    $("#input-summary").val(item["summary"])
    $("#input-link").val(item["link"])
    $("#input-subscribers").val(item["subscribers"])
    $("#input-views").val(item["views"])
    $("#input-genres").val(item["genres"])

    $("#new-form").submit(function(event){
        event.preventDefault()
        console.log("submit");
        
        $(".form-control").removeClass("is-invalid")
        $(".invalid-feedback").remove()
        var valid = validate_inputs()
        console.log(valid);

        if (valid) {
            let item_new = {
                "id": item["id"],
                "title": $("#input-name").val().trim(),
                "image": $("#input-image").val(),
                "summary": $("#input-summary").val().trim(),
                "link": $("#input-link").val().trim(),
                "subscribers": $("#input-subscribers").val().trim(),
                "views": $("#input-views").val().trim(),
                "genres":$("#input-genres").val().trim(),
            }

            $.ajax({
                type: "POST",
                url: "edit_item",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item_new),
                success: function (response) {
                    console.log("success");
                    let url = response["url"]
                    window.location.href = url
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            });
        }
    })

    $("#discard").click(function(){
        if (confirm("Are you sure you want to discard?") == true){
            window.location.href = "/view/" + item["id"]
        }
    });

});