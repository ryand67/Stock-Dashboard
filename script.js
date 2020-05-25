$(document).ready(function() {
    //Grabs parts of the page
    let introForm = $("#introForm");
    let introSearchBtn = $("#introSearchBtn");
    let introTimeSelect = $("#introTimeSelect");
    $("#mainStock").hide();

    //When the search button is clicked, trigger the ajax call
    introSearchBtn.on("click", function() {
        event.preventDefault();
        let stockName = $("#introInput").val().toUpperCase();
        let timeInterval = introTimeSelect.val();
        searchStock(stockName, timeInterval);
    })

    //Takes stock symbol and interval and grabs the response, passes it into the function
    const searchStock = (symbol, interval) => {
        let apiURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=" + interval + "&datatype=json&apikey=00RBIHUDUPGDJNNH";
        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            introForm.fadeOut("fast", function() {
                    $("#mainStock").fadeIn("fast");
                    updateMainStock(response, interval)
            });
        })
    }

    //Grabs the stock and updates the main ticker at the top
    const updateMainStock = (response, interval) => {
        $("#stockTitle").text(response['Meta Data']['2. Symbol']);
        setInterval(() => {
            let currentStockInfo = getStockInfo(response, interval);
            $("#lowPriceSpan").text(currentStockInfo[1]['3. low']);
            $("#highPriceSpan").text(currentStockInfo[1]['2. high']);
            $("#openPriceSpan").text(currentStockInfo[1]['1. open']);
            $("#closePriceSpan").text(currentStockInfo[1]['4. close']);
            $("#mainVolSpan").text(currentStockInfo[1]['5. volume']);
        }, 1000)
    }
    
    //Returns the array of info
    const getStockInfo = (response, interval) => {
        let currentMin = parseInt(moment().format("mm"));
        currentMin = roundMinToInterval(currentMin, interval);
        let currentHour = moment().format("hh");
        let weekDay = moment().format("d");
        //If it's the weekend or after/before hours
        if(weekDay === "0" || weekDay === "6") {
            //Grab the last entry if it's during the weekend
            let responseEntries = Object.entries(response['Time Series (' + interval + ')']);
            return responseEntries[responseEntries.length - 1];
        } else if(parseInt(currentHour) > 16 || parseInt(currentHour) < 10) {
            //Grab the last entry if it's during the weekend
            let responseEntries = Object.entries(response['Time Series (' + interval + ')']);
            return responseEntries[responseEntries.length - 1];
        }
        let currentMoment = moment().format("YYYY-MM-DD " + currentHour + ":" + currentMin + ":00");
        return currentMoment;
    }
    
    //Rounds the current minutes to set interval
    const roundMinToInterval = (currentMin, interval) => {
        interval = parseInt(interval.substring(0, interval.length - 3));
        currentMin = Math.floor(currentMin / interval) * interval;
        return currentMin.toString();
    }
})