function createDebitChart(interestCharges){
    let chartStatus = Chart.getChart("pie-chart");
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }
    var start = document.getElementById('startAmount').value
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["start deposit", "interest charges"],
            datasets: [{
                label: "start deposit & interest charges",
                backgroundColor: ["rgba(106,255,112,0.63)","#c2d2e3"],
                data: [start, interestCharges]
            }]
        },
        options: {
            title: {
                display: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        font:{
                            size: 18
                        }
                    }
                },
            },
        },
        plugins: [ChartDataLabels]
    });
}

function createAddType(parent){
    const select = document.createElement('select');
    select.className = 'inputFields';
    let options = ['once','day', 'month', 'year'];
    for (let i = 0; i < 4; i++){
        let op = document.createElement('option');
        op.text = options[i];
        select.appendChild(op);
    }
    parent.appendChild(select);
}

function createDateInput(parent){
    const dataChoice = document.createElement('input');
    dataChoice.type = 'date';
    dataChoice.valueAsDate = new Date();
    dataChoice.className = 'inputFields';
    parent.appendChild(dataChoice);
}

function createInputSum(parent){
    const sumInp = document.createElement('input');
    sumInp.type = 'number';
    sumInp.className = 'inputFields';
    sumInp.value = 0;
    sumInp.placeholder = 'amount'
    parent.appendChild(sumInp);
}

function createDeleteBtn(parent){
    const del = document.createElement('button');
    del.className = 'addBtn';
    del.id = "deleteBtn";
    del.textContent = '✖';
    del.onclick = function(){
        del.parentNode.parentNode.remove();
        console.log('success');
    }
    parent.appendChild(del);
}

function addFieldForAdd(parent){
    const tr = document.createElement('tr');
    const td0 = document.createElement('td');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    createAddType(td1);
    createDateInput(td2)
    createInputSum(td3);
    createDeleteBtn(td4);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    let table = document.getElementById(parent);
    table.appendChild(tr);
}

function getDataFromTable(table_id){
    let table = document.getElementById(table_id);
    let allRows = table.querySelectorAll("tr");
    for (let i = 0; i < allRows.length; i++){
        let cellsInRow  = allRows[i].querySelectorAll("td");
        let select = cellsInRow[0].querySelector("select");
        let date = cellsInRow[1].querySelector('.inputFields');
        let amount = cellsInRow[2].querySelector('.inputFields');
        let childArr = {
            type: select.value,
            date: date.value,
            amount: amount.value
        };
        $.ajax({
            url: '/debit/'+table_id,
            method: 'post',
            dataType: 'html',
            data: childArr,
            async: false,
            success: function(data){
                console.log(data);
            }
        });
    }
}

function createDebitTable(parent, size, data, interestsCharge, depositAmountResult) {
    let table = document.createElement('table');
    table.id = "statTable";
    let head = document.createElement('thead');
    head.id = 'statHead';
    let headNames = ["Date", "Interests", "Change balance", "Balance"];
    for (let i= 0; i < 4; i++){
        let td = document.createElement('td');
        td.innerHTML = headNames[i];
        head.appendChild(td);
    }
    table.appendChild(head);
    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        tr.className = 'statTr';
        var cb = data[i].changeBalance;
        if (cb == '0') cb = '';
        let date = data[i].date.split("-").reverse().join(".")
        let arr = [date, data[i].interests, cb, data[i].balance]
        for (let j = 0; j < 4; j++) {
            let td = document.createElement('td');
            td.className = 'statTd';
            td.innerHTML = arr[j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let trResult = document.createElement('tr');
    trResult.className = 'statTr';
    let tdResultLabel = document.createElement("td");
    tdResultLabel.innerHTML = 'Total:';
    tdResultLabel.className = 'statTd';
    trResult.appendChild(tdResultLabel);
    let tdResultInterests = document.createElement('td');
    tdResultInterests.className = 'statTd';
    tdResultInterests.id = 'tdResultInterests';
    tdResultInterests.innerHTML = interestsCharge
    trResult.appendChild(tdResultInterests);
    let emptyTdResult = document.createElement('td');
    emptyTdResult.className = 'statTd';
    trResult.appendChild(emptyTdResult);
    let balanceResult = document.createElement('td');
    balanceResult.className = 'statTd';
    balanceResult.id = 'balanceResult';
    balanceResult.innerHTML = depositAmountResult;
    trResult.appendChild(balanceResult);
    table.appendChild(trResult);
    parent.appendChild(table);
}

function setDebitResult(data){
    document.getElementById('interestCharges').textContent = data.interestCharges;
    document.getElementById('depositAmount').textContent = data.resultDepositAmount;
    document.getElementById('capitalGains').textContent = data.capitalGains;
}

function calculate(){
    document.getElementById('table').textContent="";
    const body = {
        startAmount: document.getElementById('startAmount').value,
        placementPeriod: document.getElementById('placementPeriod').value,
        periodType: document.getElementById('termSelect').value,
        interestRate: document.getElementById('interestRate').value,
        taxRate: document.getElementById('taxRate').value,
        capitalisation: document.getElementById('capitalisationSelect').value,
        startDate: document.getElementById('startOfTerm').value,
        paymentType: document.getElementById('paymentType').value
    }
    $.ajax({
        url: '/debit/clear',
        method: 'post',
        dataType: 'html',
        async: false,
        success: function(data){
            console.log('clear success');
        }
    });
    getDataFromTable('addReplenishmentTable')
    getDataFromTable('addWithdrawalTable')
    console.log(body)
    $.ajax({
        url: '/debit',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function(data){
            console.log(data);
        }
    });
    $.ajax({
        url: '/debit/calculate',
        method: 'get',
        dataType: 'html',
        success: function(data){
            const obj = JSON.parse(data);
            console.log(obj);
            setDebitResult(obj);
            createDebitChart(obj.interestCharges);
            createDebitTable(document.getElementById('table'), obj.statistic.length, obj.statistic, obj.interestCharges, obj.resultDepositAmount);
        }
    });
}
