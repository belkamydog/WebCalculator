function memoryAdd() {
    document.getElementById("memory").textContent = 'M';
}

function memoryClear() {
    document.getElementById("memory").textContent = '';
}

function deleteSymbol() {
    let expression = document.getElementById("field").value
    if (expression.length > 1) expression = expression.slice(0, -1);
    else expression = "";
    document.getElementById("field").value = expression;
}

function radBtn() {
    document.getElementById("rad").style.backgroundColor = "#ccddff";
    document.getElementById("deg").style.backgroundColor = "#fafafa";
    document.getElementById("mode").textContent = 'rad';
}

function degBtn() {
    document.getElementById("deg").style.backgroundColor = "#ccddff";
    document.getElementById("rad").style.backgroundColor = "#fafafa";
    document.getElementById("mode").textContent = 'deg';
}

function pushBtn(value) {
    let current_state = document.getElementById("field").value;
    if (current_state === 'E') document.getElementById("field").value = "";
    if (current_state === '0' && value !== '.') document.getElementById("field").value = value;
    else if (current_state === '0' && value === '.') document.getElementById("field").value = document.getElementById("field").value + value;
    else document.getElementById("field").value = document.getElementById("field").value + value;
}

function resetBtn() {
    document.getElementById("field").value = '0';
    document.getElementById("xVal").textContent = '0';
    document.getElementById('status').textContent = '';
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }
    document.getElementById('myChart').style.display = 'none';
}

function sendDataToBack() {
    const body = {
        inputData: document.getElementById("field").value,
        mode: document.getElementById('mode').textContent,
        xVal: document.getElementById("xVal").textContent
    };
    $.ajax({
        url: '/engineer',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function (data) {
        }
    });
    $.ajax({
        url: '/calculate',
        method: 'get',
        dataType: 'html',
        success: function (data) {
            let obj = JSON.parse(data)
            if (obj.status === false) document.getElementById('status').textContent = 'err';
            else document.getElementById('status').textContent = '';
            document.getElementById("field").value = obj.result;
        }
    });
}

function calculateXvalue() {
    const body = {
        inputData: document.getElementById("field").value,
        mode: document.getElementById('mode').textContent,
        xVal: document.getElementById("xVal").textContent
    };
    $.ajax({
        url: '/engineer',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function (data) {
        }
    });
    $.ajax({
        url: '/calculate',
        method: 'get',
        dataType: 'text',
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status === false) document.getElementById('status').textContent = 'err';
            else document.getElementById('status').textContent = '';
            document.getElementById("xVal").textContent = obj.result;
        }
    });
}

if (document) {
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Enter') sendDataToBack();
        else document.getElementById('field').focus();
    });
}


