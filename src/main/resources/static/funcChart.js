function chartAdd(xValues, yValues){
     return new Chart('myChart', {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0.4,
                backgroundColor: "rgb(169,169,248)",
                borderColor: "rgb(10,10,11)",
                    data: yValues
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales:{
                y :{
                    max : 10000,
                    min: -10000,
                }
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                zoom: {
                    pan:{
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: false
                        },
                        mode: 'xy',
                    }
                }
            }
        }
    });
}

function sendChartDataToBack(){
    const body = {
        infixExpression: document.getElementById("field").value,
    };
    $.ajax({
        url: '/chart',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function(data){
        }
    });
    $.ajax({
        url: '/chart',
        method: 'get',
        dataType: 'json',
        success: function(data){
            createChart(data.xaxis, data.yaxis);
        }
    });
}

function createChart(xValues, yValues){
    document.getElementById('myChart').remove();
    let canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    document.getElementById('chart').appendChild(canvas);
    document.getElementById('myChart').style.display = 'block';
    chartAdd(xValues, yValues);
}

