$(document).ready(function() {
    let introForm = $("#introForm");
    let introSearchBtn = $("#introSearchBtn");
    let introTimeSelect = $("#introTimeSelect");

    introSearchBtn.on("click", function() {
        event.preventDefault();
        let stockName = $("#introInput").val().toUpperCase();
        let timeInterval = introTimeSelect.val();
        searchStock(stockName, timeInterval);
    })

    const searchStock = (symbol, interval) => {
        let apiURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=" + interval + "&datatype=json&apikey=00RBIHUDUPGDJNNH"
        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            console.log(response['Meta Data']);
            
        })
    }
})