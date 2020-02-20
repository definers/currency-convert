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
//= require currency_conversions
//= require_tree

// ajax call to fetch json data and draw charts
var loadData = function(data, url){
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: url,
        dataType: 'json',
        data: data,
        success: function(data){
            if( data != null){
                var dateArray = Object.keys(data);
                var xAxis = ['x'].concat(dateArray);
                var currencies = Object.keys(data[Object.keys(data)[0]]);
                var conversioRateArr = [xAxis];
                for (var j = 0; j < currencies.length; j++){
                    var innerArray = [currencies[j]];
                    for (var i = 0; i < dateArray.length; i++){
                        innerArray.push(data[dateArray[i]][currencies[j]]);
                    }
                    conversioRateArr.push(innerArray);
                }
                var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        columns:
                        conversioRateArr
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%Y-%m-%d'
                            }
                        },
                        y: {
                            tick: 3,
                        }
                    }
                });
            }else{
                $('#chart').html("<p> Something Went Wrong");
            }
        },
        failure: function(result){
            error();
        }
    });
};
// fetch data on page load
function calculateDates () {
    var url = event.target.dataset.url;
    var currency = $('#base_currency').val()
    var startDate = $('#_start_date').val();
    var endDate = $('#_end_date').val();
    var data = {currency: currency, start_date: startDate, end_date: endDate};
    loadData(data, url);
}

