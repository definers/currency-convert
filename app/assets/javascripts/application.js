// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require popper
//= require bootstrap-sprockets
//= require turbolinks
//= require c3
//= require d3
//= require_tree

// ajax call to fetch json
var loadData = function(data, url){
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: url,
        dataType: 'json',
        data: data,
        success: function(data){
            debugger
            // drawBarPlot(data);
            var chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 50, 20, 10, 40, 15, 25, 20, 10, 40, 15],
                        ['data3', 50, 20, 10, 40, 15, 25,  20, 10, 40, 15],
                        ['data4', 50, 20, 10, 20, 10, 40, 15, 40, 15, 25, ],
                        ['data5',  20, 10, 40, 15,50, 20, 10, 40, 15, 25],
                        ['data6',  20, 10, 40, 15,50, 20, 10, 40, 15, 25,6,7,12,23,45]
                    ]
                }
            });
            console.log(data);
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
    var url = $(this).attr('data-url');
    var currency = $('#base_currency').val()
    var startDate = $('#_start_date').val();
    var endDate = $('#_end_date').val();
    var data = {currency: currency, start_date: startDate, end_date: endDate};
    loadData(data, url);
});
