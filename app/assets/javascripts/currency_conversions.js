// ajax call to fetch json
var loadData = function(data, url){
    debugger
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: url,
        dataType: 'json',
        data: data,
        success: function(data){
            drawBarPlot(data);
        },
        failure: function(result){
            error();
        }
    });
};

function error() {
    console.log("Something went wrong!");
}

// draw bar plot
function drawBarPlot(data){};

// fetch data on page load
    $(document).on('click', '#submit-search-btn', function () {
        debugger;
        var url = $(this).attr('data-url');
        var currency = $('#currency');
        var startDate = $('#_start_date');
        var endDate = $('#_end_date');
        var data = {currency: currency, start_date: startDate, end_date: endDate};
        loadData(data, url);
    });