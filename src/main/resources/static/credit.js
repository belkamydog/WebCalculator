function createPieChart(loanAmount, overpayment){
    let la = Math.ceil((loanAmount*100)/(loanAmount+overpayment));
    let op = 100 - la;
    let chartStatus = Chart.getChart("pie-chart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["overpayment", "main dept"],
            datasets: [{
                label: "overpayment & main dept",
                backgroundColor: ["#f76157","#5ef75c"],
                data: [op, la]
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
                    labels:{
                        font: {
                            size: 18
                        }
                    }
                },
            },
        },
        plugins: [ChartDataLabels]
    });
}

function createDateArr(data){
    let dateArr = [];
    for (let i = 0; i < data.length; i++){
        dateArr.push(data[i].date);
    }
    return dateArr;
}

function createInterestArr(data){
    let interestArr = [];
    for (let i = 0; i < data.length; i++){
        interestArr.push(data[i].accruedInterest);
    }
    return interestArr;
}

function createAmountArr(data){
    let amountArr = [];
    for (let i = 0; i < data.length; i++){
        amountArr.push(data[i].amount);
    }
    return amountArr;
}

function createLineDiagram(data){
    let chartStatus = Chart.getChart("diagramBar");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    new Chart(document.getElementById("diagramBar"), {
        type: 'bar',
        data: {
            labels: createDateArr(data),
            datasets: [{
                label: 'interest',
                backgroundColor: "red",
                data: createInterestArr(data),
            }, {
                label: 'month payment',
                backgroundColor: "#c9c9c9",
                data: createAmountArr(data),
            }],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Payment schedule',
                    font: {
                        size: 20
                    }
                },
            },
            scales: {
                x: {
                    display: false,
                    stacked: true,
                },
                y: {
                    stacked: false
                }
            }
        }
    });
}

function createTable(parent, size, data) {
    let table = document.createElement('table');
    table.id = 'statTable';
    let head = document.createElement('thead');
    head.id ='statHead';
    let headNames = ["date", "month payment", "main debt", "accrued interest", "outstanding balance"];
    for (let i = 0; i < 5; i++){
        let td = document.createElement('td');
        td.innerHTML = headNames[i];
        head.appendChild(td);
    }
    table.appendChild(head);
    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        let arr = [data[i].date, data[i].amount, data[i].mainDebt, data[i].accruedInterest, data[i].outstandingBalance]
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
            td.className = 'statTd';
            td.innerHTML = arr[j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let trTotal = document.createElement('tr');
    trTotal.id = 'resultTr';
    let td1 = document.createElement('td');
    td1.className = 'statTd';
    td1.innerHTML = 'Total:';
    let td2 = document.createElement('td');
    td2.className = 'statTd';
    td2.innerHTML = document.getElementById("fullCost").innerText;
    let td3 = document.createElement('td');
    td3.className = 'statTd';
    td3.innerHTML = document.getElementById('loanAmount').value;
    let td4 = document.createElement('td');
    td4.className = 'statTd';
    td4.innerHTML = document.getElementById('overpayment').innerText
    let td5 = document.createElement('td');
    td5.className = 'statTd';
    trTotal.appendChild(td1);
    trTotal.appendChild(td2);
    trTotal.appendChild(td3);
    trTotal.appendChild(td4);
    table.appendChild(trTotal);
    parent.appendChild(table);
}

function setResult(minp, maxp, op, fc){
    if (minp!= maxp) document.getElementById("monthPayment").textContent = minp + '...' + maxp;
    else document.getElementById("monthPayment").textContent = minp;
    document.getElementById("overpayment").textContent = op;
    document.getElementById("fullCost").textContent = fc;
}

function sendLoanDataToBack(){
    console.log(document.getElementById("loanDate").value);
    if (document.querySelector('table')) document.querySelector('table').remove()
    console.log(document.getElementById("paymentType").value);
    console.log(document.getElementById("loanAmount").value);
    console.log(document.getElementById("loanTerm").value);
    const body = {
        paymentType: document.getElementById("paymentType").value,
        loanAmount: document.getElementById("loanAmount").value,
        interestRate: document.getElementById("interestRate").value,
        loanTerm: document.getElementById("loanTerm").value,
        loanTermType: document.getElementById("termSelect").value,
        loanDate: document.getElementById("loanDate").value
    };
    $.ajax({
        url: '/credit',
        method: 'post',
        dataType: 'html',
        data: body,
        async: false,
        success: function(data){
        }
    });
    $.ajax({
        url: '/credit/calculate',
        method: 'get',
        dataType: 'text',
        success: function(data){
            console.log(data);
            const obj = JSON.parse(data);
            setResult(obj.credit.minMonthPayment, obj.credit.maxMonthPayment, obj.credit.overpayment, obj.credit.fullCost);
            let elem = document.getElementById("table");
            createLineDiagram(obj.credit.monthPayments);
            createTable(elem, obj.credit.loanTerm, obj.credit.monthPayments);
            createPieChart(obj.credit.loanAmount, obj.credit.overpayment);
        }
    });
}