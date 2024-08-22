function memoryAdd() {
    saveExpression();
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
    let chartStatus = document.getElementById("myChart");
    if (chartStatus !== undefined) {
        chartStatus.innerHTML = "";
    }
    document.getElementById('myChart').style.display = 'none';
}

function sendDataToBack() {
    const body = {
        inputData: document.getElementById("field").value,
        mode: document.getElementById('mode').textContent,
        xVal: document.getElementById("xVal").textContent
    };
    let history_token = document.createElement("p");
    $.ajax({
        url: '/engineer',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function (data) {
            history_token.textContent = document.getElementById("field").value;
            document.getElementById("history").appendChild(history_token);
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
            let field = document.getElementById("field").value = obj.result;
            history_token.innerHTML = history_token.textContent + "=" + field;
            document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
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

function saveExpression() {
    const body = {
        expression: document.getElementById("field").value
    };
    $.ajax({
        url: '/engineer/save',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function (data) {
        }
    });
}

function getExpression() {
    $.ajax({
        url: '/engineer/show',
        method: 'get',
        dataType: 'html',
        success: function (data) {
            console.log(data)
        }
    });
}

if (document) {
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Enter') sendDataToBack();
        else document.getElementById('field').focus();
    });
}


