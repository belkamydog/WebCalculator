function chartAdd(xValues, yValues){
    new Chart('myChart', {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                    data: yValues
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
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
            console.log("success");
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
    document.getElementById('myChart').style.display = 'block';
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus === undefined) {
        chartAdd(xValues, yValues);
    }
    Chart.defaults.plugins.legend.display = false;
}