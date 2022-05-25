// redirect to search results once the search form is submitted
$(document).ready(function (){
    $("#searchbox").autocomplete({
        source: names
    });

    $("#searchform").submit(function(event){

        event.preventDefault()
        let searchterm = $("#searchbox").val()

        // remove whitespace and check if it is not empty
        if (searchterm.replace(/\s+/g,"").length != 0){
            window.location.href = "/search_results/" + searchterm
        }
        
    });
})