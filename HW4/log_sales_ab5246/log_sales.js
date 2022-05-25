var clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

var sales = [
    {
      salesperson: "James D. Halpert",
      client: "Shake Shack",
      reams: 100
    },
    {
      salesperson: "Stanley Hudson",
      client: "Toast",
      reams: 400
    },
    {
      salesperson: "Michael G. Scott",
      client: "Computer Science Department",
      reams: 1000
    }
];
  
const spname = "Atul Balaji";   // name of salesperson

// function to enter sale and add a row along with delete button
function addRow(index, value) {
    let newrow = $("<div></div>").addClass("row");
    let button = $("<button></button>").html("X").addClass("btn btn-warning").prop("id", index);
    newrow.append($("<div></div>").html(value.salesperson).addClass("col-md-2"));
    newrow.append($("<div></div>").html(value.client).addClass("col-md-5"));
    newrow.append($("<div></div>").html(value.reams).addClass("col-md-2"));
    newrow.append($("<div></div>").addClass("col-md-1").append(button));
    return newrow;
}

// add the sales to the page
function makeSales(){
    $("#salelist").empty();
    // add each sale as a row to the salelist
    $.each(sales, function(index, value){
        let newrow = addRow(index, value);
        $("#salelist").append(newrow);
    });
    // if the delete button is clicked, delete the row and call makeSales again
    $(".btn-warning").click(function(){
        sales.splice($(this).attr("id"), 1);
        makeSales();
    });
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
        sales.unshift(
            {
                salesperson: spname,
                client: client,
                reams: reams
              }
        );

        // add the client to the autocomplete list, if not already there
        if (!clients.includes(client)){
            clients.push(client);
        }

        makeSales();
        $("#clientbox").val("");
        $("#reambox").val("");
        $("#clientbox").focus();
    }

    else{
        showWarning(client, reams);
    }
}

// main
$(document).ready(function(){
    makeSales();
    $("#clientbox").autocomplete({source: clients});

    // submit button clicked
    $("#submitbutton").click(function(){
        submitHandler();
    });

    // enter key pressed from the #reams box
    $("#reambox").keyup(function(event){
        if (event.which == 13){
            $("#reambox").val($("#reambox").val().replace(/(\r\n|\n|\r)/gm, ""));   // remove line break
            submitHandler();
        }
    });
});