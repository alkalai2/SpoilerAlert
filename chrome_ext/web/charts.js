window.onload = function () {
    
        var num = 77;
    	CanvasJS.addColorSet("greenShades",
                [//colorSet Array
				"#2B9AA4",
                "#36c0cd",
                "#6BB8BF",               
                ]);
        CanvasJS.addColorSet("greyShades",
                [//colorSet Array
                "#e9e9e9",
                "#d5d5d5",
                "#c1c1c1",
                "#acacac",
                "#969696"
                

                     
                ]);

    
        var barChart = new CanvasJS.Chart("barChartContainer", {
          backgroundColor: "#eee9e0",
          colorSet: "greyShades", 
            title: {
                text: "Your Top Spoilers...",
                fontFamily: "Open Sans",
                fontColor: "#666",
                fontSize: 20

            },
            axisY: {
                tickThickness: 0,
                lineThickness: 0,
                valueFormatString: " ",
                gridThickness: 0                    
            },
            axisX: {
                tickThickness: 0,
                lineThickness: 0,
                labelFontSize: 18,
                labelFontColor: "#666"

            },
            data: [
            {
                indexLabelFontSize: 22,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}</strong></span><span style='\"'font-size: 20px; color:#666 '\"'><strong>{y}</strong></span>",

                indexLabelPlacement: "inside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 200,
                indexLabelFontFamily: "Verdana",
                
                type: "bar",
                dataPoints: [
                    
                    { y: parseInt(localStorage["TotalBlocked02021994SpoilerAlert"]), label: "5", indexLabel: "REAL DATA" },
                    { y: 7, label: "4", indexLabel: "Maps/ Search" },
                    { y: 8, label: "3", indexLabel: "Weather" },
                    { y: 10, label: "2", indexLabel: "Games" },
                  	{ y: 11, label: "1", indexLabel: "The top" }


                ]
            }
            ]
        });
        
        
        var pieChart = new CanvasJS.Chart("pieChartContainer",
            {
                backgroundColor: "transparent",
                colorSet: "greenShades",
                title:{
                    text: "Spoiler Breakdown",
                    fontFamily: "Open Sans",
                    fontColor: "#666",
                    fontSize: 20
                },
                
                data: [
                {        
                    type: "pie",       
                    indexLabelFontFamily: "Open Sans",       
                    indexLabelFontSize: 10,
                    indexLabel: "{label} {y}%",
                    startAngle:-20,      
                    showInLegend: true,
                    toolTipContent:"{legendText} {y}%",
                    dataPoints: [
                        {  y: 53.24, legendText:"Google", label: "Shows" },
                        {  y: 8.16, legendText:"Yahoo!", label: "Teams" },
                        {  y: 38.60, legendText:"Yahoo!", label: "Terms" },
                        
                    ]
                }
                ]
            });



        pieChart.render();
        barChart.render();

        $(".canvasjs-chart-credit").css("display", "none");
    }