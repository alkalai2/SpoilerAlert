 $(document).ready(function () {    
           

        var overview = [
            ['Individual Terms', 44.0],

            ['Shows',  25],                         

            ['Teams', 31]
        ]
        var shows = [
            ['Game of Thones', 63.0],

            ['House of Cards',  20],                         

            ['Arrested Developement', 17]
        ]

        var teams = [
            ['Chicago Blachhawks', 39.0],

            ['Chicago Bulls',  12],                         

            ['Boston Celtics', 18], 

            ['Los Angeles Lakers', 31]

        ]

      // initially render the 'overview' pie chart

      RenderPieChart('container', overview);     
     
     // set up charts for diff data sets
     $('#btnPieChartAll').click(function(){ RenderPieChart('container', overview);});
     $('#btnPieChartShows').click(function(){ RenderPieChart('container', shows);});
     $('#btnPieChartTeams').click(function(){ RenderPieChart('container', teams);});
     
            function RenderPieChart(elementId, dataList) {
                new Highcharts.Chart({
                    chart: {
                        renderTo: elementId,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: true
                     },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                        }
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: dataList
                    }]
                });
            };
        });