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

// ajax call to fetch data from exchangeratesapi and draw charts with c3
var loadData = function (data, url) {
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        url: url,
        dataType: 'json',
        data: data,
        success: function (response) {
            if (response != null) {
                $('#selectedCurrency').html(data["currency"]);
                $("#charts_div").find('#individualChart').find('.text-primary').removeClass('hidden');
                var conversionRateArr = getCurrencyRates(response);
                drawChartForEachCurrency(conversionRateArr);
                drawChartForAllCurrency(conversionRateArr, data["currency"]);
            } else {
                $('#chart').html("<p id='fail_call' class='alert alert-danger'> Something Went Wrong");
            }
        },
        failure: function (result) {
            error();
        }
    });
};

//Utility function to get conversion rate for each currency on different dates
// It returns Array of Object [['date1', 'date2', 'date3'], ['USD', '1.22', '2.33', 1.1], ['CAD', 2.9, 3.11, 4.01]]
function getCurrencyRates(data) {
    var dateArray = Object.keys(data);
    var xAxis = ['x'].concat(dateArray);
    var currencies = Object.keys(data[Object.keys(data)[0]]);
    var conversionRateArr = [xAxis];
    for (var j = 0; j < currencies.length; j++) {
        var innerArray = [currencies[j]];
        for (var i = 0; i < dateArray.length; i++) {
            innerArray.push(data[dateArray[i]][currencies[j]]);
        }
        conversionRateArr.push(innerArray);
    }
    return conversionRateArr
}

// Draw Graphs for a selected currency against each individual currency to see more closure look of the fluctuation
function drawChartForEachCurrency(conversionRateArr) {
    for (i = 0; i < conversionRateArr.length - 1; i++) {
        var chartId = 'chart' + i;
        $('#charts_div').append("<div id=" + chartId + " > </div>");
        var chart = c3.generate({
            bindto: '#chart' + i + '',
            data: {
                x: 'x',
                columns: [
                    conversionRateArr[0],
                    conversionRateArr[i + 1]
                ]
            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    },
                    label: 'Dates'
                },
                y: {
                    label: 'Currency Rates'
                }
            }
        });
    }
}

// Draw Graphs for a selected currency against all other currencies
function drawChartForAllCurrency(conversionRateArr, currency) {
    var Id = conversionRateArr.length;
    var chartId = 'chart' + Id;
    $('#charts_div').append("<div id=" + chartId + " > </div>");
    $('#charts_div').append("<div id='allChart' class='text-center'> <h3 class='text-primary'>Graphs of " + currency + " Currency VS All Other Currencies</h3></div>");
    $('#charts_div').find('#allChart').find('#selectedCurrency').html(currency);
    var chart = c3.generate({
        bindto: '#chart' + Id + '',
        data: {
            x: 'x',
            columns:
            conversionRateArr
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                },
                label: 'Date'
            },
            zoom: {
                enabled: true
            },
            y: {
                tick: 3,
                label: 'Currency Rates'
            }
        }
    });
}

// make ajax call on  search  button click
function calculateDates() {
    var url = event.target.dataset.url;
    var currency = $('#base_currency').val()
    var startDate = $('#start_date').val();
    var endDate = $('#end_date').val();
    var data = {currency: currency, start_date: startDate, end_date: endDate};
    loadData(data, url);
}

//Input validation before ajax call
$(document).on('input', '#start_date, #end_date', function () {
    var startDate = $('#start_date').val();
    var endDate = $('#end_date').val();
    if (startDate && endDate && startDate <= endDate) {
        $('#submit-search-btn').removeClass('disable_custom');
        $('.start_date_err').addClass('hidden');
        $('.end_date_err').addClass('hidden');
        $('.start_date_not_selected').addClass('hidden');
    } else if (startDate && !endDate) {
        $('.end_date_err').removeClass('hidden');
    } else if (!startDate && endDate) {
        $('.start_date_not_selected').removeClass('hidden');
    }
    if (startDate && endDate && startDate > endDate) {
        $('.end_date_err').addClass('hidden');
        $('.start_date_not_selected').addClass('hidden');
        $('.start_date_err').removeClass('hidden');
        $('#submit-search-btn').addClass('disable_custom');
    }
});

