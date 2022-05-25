function error_message(feedback) {
    var template = $("<div class='invalid-feedback'></div>")
    template.html(feedback)
    return template
}

function validate_string(input_s, parent_s, name) {
    var val = $(input_s).val().trim()
    var valid = true
    
    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(error_message("Please enter " + name + "."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(error_message("Invalid spaces."))
        valid = false
    }
    return valid
}

function validate_image_url(input_s, parent_s) {
    var val = $(input_s).val().trim()
    var valid = true

    if (val.length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(error_message("Please enter URL."))
        valid = false;
    } else if (val.replace(/\s+/g, "").length == 0) {
        $(input_s).addClass("is-invalid")
        $(parent_s).append(error_message("Invalid spaces."))
        valid = false
    }
    return valid
}

function validate_inputs(){
    var valid = true
    var name = $("#input-name").val().trim()
    var included = false

    $.each(names, function (index, name_used){
        name_used = name_used.toLowerCase()
        if (name.toLowerCase() == name_used){
            included = true
        }
    });

    if (included){
        $("#input-name").addClass("is-invalid")
        $("#form-name").append(error_message("Name is already taken. Please enter a different one."))
        valid = false;
    }
    else if (!validate_string("#input-name", "#form-name", "name")){
        valid = false
    }

    if (!validate_string("#input-subscribers", "#form-subscribers", "subscribers")) {
        valid = false
    }

    if (!validate_string("#input-views", "#form-views", "views")) {
        valid = false
    }

    if (!validate_image_url("#input-image", "#form-image")) {
        valid = false
    }

    if (!validate_image_url("#input-link", "#form-link")) {
        valid = false
    }

    if (!validate_string("#input-summary", "#form-summary", "summary")) {
        valid = false
    }
    
    if (!validate_string("#input-genres", "#form-genres", "genres")) {
        valid = false
    }

    return valid
}

$(document).ready(function () {

    $('.alert').hide()

    $("#new-form").submit(function(event){
        event.preventDefault()
        console.log("submit");
        
        $(".form-control").removeClass("is-invalid")
        $(".invalid-feedback").remove()
        var valid = validate_inputs()
        console.log(valid);

        if (valid) {
            var item = {
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
                url: "add_item",
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                success: function (response) {
                    console.log("success");
                    $('.alert').show()
                    $("#success-notification").empty()
                    $("#success-notification").html("New channel successfully created. <a href='" + response["url"] + "'>See it here<\a>")
                    $(".form-control").val("")
                    $("#input-name").focus();
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
});