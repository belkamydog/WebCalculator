function chartAdd(xValues, yValues){
    let yPosition = 0;
    let min = document.getElementById("xDefMin").value;
    let max = document.getElementById("xDefMax").value;
    if (min < 0 && max >= 0){
        yPosition = Math.abs(min*2);
    }
    return new Chart('myChart', {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0.4,
                data: yValues
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales:{
                y :{
                    border:{
                        color: "black",
                        width: 2
                    },
                    max: Math.round(document.getElementById("fDefMin").value),
                    min: Math.round(document.getElementById("fDefMax").value),
                    position: {
                        x: yPosition
                    },
                },
                x:{
                  position: 'center',
                    border:{
                        color: "black",
                        width: 2
                    },
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
                    // zoom: {
                    //     wheel: {
                    //         enabled: true,
                    //     },
                    //     pinch: {
                    //         enabled: false
                    //     },
                    //     mode: 'xy',
                    // }
                }
            }
        }
    });
}

function sendChartDataToBack(){
    const body = {
        xMin: document.getElementById('xDefMin').value,
        xMax: document.getElementById('xDefMax').value,
        infixExpression: document.getElementById("field").value,
        step: 0.5
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
            drawChart(data.xaxis, data.yaxis);
        }
    });
}

function openChartSettings(){
    let chartSettings = document.getElementById('chartSettings');
    let chartBtn = document.getElementById("createChart");
    if (chartSettings.style.display !== 'flex') {
        chartBtn.style.backgroundColor = '#ccddff';
        document.getElementById('chartSettings').style.display= 'flex';
    }
    else{
        chartBtn.style.backgroundColor = 'lightgrey';
        chartSettings.style.display= 'none';
        document.getElementById("myChart").style.display = 'none';

    }
}

function drawChart(xValues, yValues){
    removeChart();
    let canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    document.getElementById('chart').appendChild(canvas);
    chartAdd(xValues, yValues);
}

function removeChart(){
    let chart = document.getElementById('myChart');
    if (chart) chart.remove();
}

