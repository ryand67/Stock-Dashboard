$(document).ready(function() {
    let introForm = $("#introForm");
    let introSearchBtn = $("#introSearchBtn");
    let searchSymbol;

    introSearchBtn.on("click", function() {
        event.preventDefault();
        searchSymbol = $("#introInput").val();
        console.log(searchSymbol);
    })
})