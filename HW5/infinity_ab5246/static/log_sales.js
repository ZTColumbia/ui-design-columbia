// take array of sales and display them on UI
function display_sales_list(sales){
    $("#salelist").empty();
    $.each(sales, function(index, value){
        $("#salelist").append(addRow(index, value));
    });
    $(".btn-warning").click(function(){
        delete_sale($(this).attr("id")) 
    });
}

// save a new sale
function save_sale(new_sale){
    $.ajax({
        type: "POST",
        url: "save_sale",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(new_sale),
        success: function(result){
            let sales = result["sales"]
            display_sales_list(sales);
            $("#clientbox").autocomplete({source: result["clients"]});
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

// delete the sale corresponding to the given id
function delete_sale(id){
    let data_to_save = {"id": id}
    $.ajax({
        type: "POST",
        url: "delete_sale",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_save),
        success: function(result){
            let sales = result["sales"]
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

// HW4 functions with changes to use above functions

const spname = "Atul Balaji";   // name of salesperson

// function to enter sale and add a row along with delete button
function addRow(index, value){
    let newrow = $("<div></div>").addClass("row");
    let button = $("<button></button>").html("X").addClass("btn btn-warning").prop("id", index);
    newrow.append($("<div></div>").html(value.salesperson).addClass("col-md-2"));
    newrow.append($("<div></div>").html(value.client).addClass("col-md-5"));
    newrow.append($("<div></div>").html(value.reams).addClass("col-md-2"));
    newrow.append($("<div></div>").addClass("col-md-1").append(button));
    return newrow;
}

// check if information entered is valid
function isValid(client, reams){
    // no input
    if (typeof client == "undefined" || typeof reams == "undefined"){
        return false;
    }
    // only spaces in client/reams or reams not a number 
    else if (client.replace(/\s+/g,"").length==0 || reams.replace(/\s+/g,"").length==0 || !/^\d+$/.test(reams.replace(/\s+/g,""))){
        return false
    }
    else{
        return true;
    }
}

// warning is shown if input is invalid
function showWarning(client, reams){
    $("#clientwarning").empty();
    $("#reamwarning").empty();

    // no text in client or only spaces
    if (client.replace(/\s+/g, "").length == 0) {
        $("#clientwarning").append($("<div></div>").html("Please fill client"));
        $("#clientbox").focus();
    }

    // no text in reams or only spaces
    if (reams.replace(/\s+/g, "").length == 0) {
        $("#reamwarning").append($("<div></div>").html("Please fill # reams"));
        $("#reambox").focus();
    }

    // reams input not a number
    else if (!/^\d+$/.test(reams.replace(/\s+/g, ""))) {
        $("#reamwarning").append($("<div></div>").html("Please fill a number"));
        $("#reambox").focus();
    }
}

// when data is submitted, check it and take appropriate action
function submitHandler() {
    let client = $("#clientbox").val();
    let reams = $("#reambox").val();

    if (isValid(client, reams)){
        $("#clientwarning").empty();
        $("#reamwarning").empty();

        // add the new entry to the sales variable
        let new_sale = {
            "salesperson": spname,
            "client": client,
            "reams": reams
        }
        
        save_sale(new_sale)

        $("#clientbox").val("");
        $("#reambox").val("");
        $("#clientbox").focus();
    }

    else{
        showWarning(client, reams);
    }
}

// main
$(document).ready(function () {
    display_sales_list(all_sales)
    $("#clientbox").autocomplete({
        source: all_clients
    });

    $("#submitbutton").click(function() {
        submitHandler();
    });

    $("#reambox").keyup(function(event) {
        if (event.which == 13) {
            $("#reambox").val($("#reambox").val().replace(/(\r\n|\n|\r)/gm, ""));
            submitHandler();
        }
    });
});