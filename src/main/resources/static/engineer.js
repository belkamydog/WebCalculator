let memory = 0;

function memoryAdd() {
    document.getElementById("memory").textContent = 'M';
    memory = document.getElementById("field").value;
}

function memoryClear() {
    document.getElementById("memory").textContent = '';
    memory = "";
}

function memoryR(){
    document.getElementById("field").value = memory;
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
    saveExpression();
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

function getHistoryExpressions() {
    $.ajax({
        url: '/engineer/show',
        method: 'get',
        dataType: 'html',
        success: function (data) {
            console.log(data);
            const obj = JSON.parse(data);
            createDialog(obj);
            document.getElementById("dialogHistory").showModal();

        }
    });
}

function closeDialog(){
    document.getElementById("dialogHistory").close();
}

function createDialog(data){
    let parentDialog = document.getElementById("dialogData");
    parentDialog.innerHTML = "";
    let table = document.createElement("table");
    for (let i = 0; i < data.length; i++){
        let tr = document.createElement("tr");
        let del = document.createElement("td");
        let delBtn = document.createElement("button");
        delBtn.id = "delTokenHistoryBtn";
        delBtn.innerText = "x";
        delBtn.addEventListener("click", function (){
            deleteHistoryToken(data[i].id);
        })
        del.appendChild(delBtn);
        let expression = document.createElement("td");
        expression.className = "historyTokenExpression";
        expression.innerHTML = data[i].expression;
        let help = document.createElement("span");
        expression.appendChild(help);
        tr.appendChild(del);
        tr.appendChild(expression);
        table.appendChild(tr);
    }
    parentDialog.appendChild(table)
}

function deleteAllHistory(){
    $.ajax({
        url: '/calculate/engineer/delete-all-history',
        method: 'post',
        dataType: 'text',
        success: function () {
            closeDialog();
            getHistoryExpressions();
        }
    });
}

function deleteHistoryToken(tokenId){
    let data = {"tokenId": tokenId};
    $.ajax({
        url: '/calculate/engineer/delete-history-token',
        method: 'post',
        data: data,
        dataType: 'text',
        success: function () {
            closeDialog();
            getHistoryExpressions();
        }
    });
}

if (document) {
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Enter') sendDataToBack();
        else {
            if (document.getElementById("chartSettings").style.display === 'none'){
                document.getElementById('field').focus();
            }
        }
    });
    document.addEventListener('click', function (event){
        const div = document.querySelector("#dialogData")
        const modal = event.composedPath().includes(div);
        const control = event.composedPath().includes(document.querySelector("#controlHistory"))
        if (!modal && !control){
            closeDialog();
        }
    });
    document.addEventListener("click", function (event){
        if (event.target.className === "historyTokenExpression"){
            let element = event.target;
            navigator.clipboard.writeText(
                element.innerText
            ).then(r => "");
        }
    });
}



