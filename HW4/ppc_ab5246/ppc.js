var nonppc = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ]
var ppc = []

// update the ppc and nonppc lists and make the names draggable
function makeNames(){
    $("#nonppclist").empty()
    $("#ppclist").empty()

    $.each(nonppc, function(index, name){
        $("#nonppclist").append($("<div></div>").html((index + 1) + ": " + name).addClass("name"))
    })
    $.each(ppc, function(index, name){
        $("#ppclist").append($("<div></div>").html((index + 1) + ": " + name).addClass("name"))
    })

    // make background color yellow if hover
    $(".name").hover(
        function(){$(this).addClass("highlight")},
        function(){$(this).removeClass("highlight")}
    )

    // make name draggable and change headers to a darker color
    $(".name").draggable({
        revert: true,
        start: function(event, ui){
            $("#nonppc").addClass("darker")
            $("#ppc").addClass("darker")
        },
        stop: function(event, ui){
            $("#nonppc").removeClass("darker")
            $("#ppc").removeClass("darker")
        }
    })
}

// drop a name to a list
function dragdropHandler(ui, curr){
    let name = ui.draggable.html().slice(3)
    let parent = ui.draggable.parent().attr('id')
    let todrop = curr.attr('id')
    curr.removeClass("darkest")

    // drop from nonppc to ppc
    if (parent == "nonppclist" && todrop == "ppc"){
        nonppc.splice(nonppc.indexOf(name), 1)
        ppc.push(name)
    }

    // drop from ppc to nonppc
    else if (parent == "ppclist" && todrop == "nonppc"){
        ppc.splice(ppc.indexOf(name), 1)
        nonppc.push(name)
    }
    makeNames()
}

// main
$(document).ready(function(){
    makeNames()
    $("#ppc").droppable({
        over: function (event, ui){
            // change color to even darker only when adding from opposite section
            if (ui.draggable.parent().attr('id') == "nonppclist"){
                $(this).addClass("darkest")
            }
        },
        out: function (event, ui){
            $(this).removeClass("darkest")
        },
        drop: function (event, ui){
            dragdropHandler(ui, $(this))
        }
    })
    $("#nonppc").droppable({
        over: function (event, ui){
            if (ui.draggable.parent().attr('id') == "ppclist"){
                $(this).addClass("darkest")
            }
        },
        out: function (event, ui){
            $(this).removeClass("darkest")
        },
        drop: function (event, ui){
            dragdropHandler(ui, $(this))
        }
    })
})