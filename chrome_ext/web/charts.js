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
                
                "#d5d5d5",
                "#c1c1c1",
                "#acacac",
                "#969696",
                "#808080"
                
                     
                ]);

    
        var barChart = new CanvasJS.Chart("barChartContainer", {
          backgroundColor: "#eee9e0",
          colorSet: "greyShades", 
            title: {
                text: "Your Top Spoilers...",
                fontFamily: "Open Sans",
                fontColor: "#16494e",
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
                    
                    { y: 3, label: "5", indexLabel: "REAL DATA" },
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
                colorSet: "greyShades",
                title:{
                    text: "Spoiler Breakdown",
                    fontFamily: "Open Sans",
                    fontColor: "#16494e",
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
                        {  y: (parseInt(localStorage["Totalshows02021994SpoilerAlert"])) / (parseInt(localStorage["TotalBlocked02021994SpoilerAlert"])), legendText:"Shows", label: "Shows" },
                        {  y: (parseInt(localStorage["Totalsports02021994SpoilerAlert"])) / (parseInt(localStorage["TotalBlocked02021994SpoilerAlert"])) , legendText:"Teams", label: "Teams" },
                        {  y: (parseInt(localStorage["Totalindividual02021994SpoilerAlert"]))  / (parseInt(localStorage["TotalBlocked02021994SpoilerAlert"]))  , legendText:"Terms", label: "Terms" },
                        
                    ]
                }
                ]
            });



        pieChart.render();

        barChart.render();

        $(".canvasjs-chart-credit").css("display", "none");
    }