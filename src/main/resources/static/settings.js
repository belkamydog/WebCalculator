function setBackgroundColor(){
    let bgColor = document.getElementById('backgroundColor').value;
    let dColor = document.getElementById('displayColor').value;
    let tColor = document.getElementById('textColor').value;
    let btnColor = document.getElementById('btnColor').value;
    document.getElementsByTagName('body').item(0).style.backgroundColor = bgColor;
    let data ={
        backgroundColor: bgColor,
        displayColor: dColor,
        textColor: tColor,
        btnColor: btnColor
    }
    $.ajax({
        url: '/settings/save',
        method: 'post',
        dataType: 'html',
        data: data,
        async: false,
        success: function(data){
            console.log("success set color");
        }
    });
    getSettings()
}

function getSettings(){
    $.ajax({
        url: '/settings/get',
        method: 'get',
        dataType: 'html',
        async: false,
        success: function(data){
            console.log("success get color")
            const obj = JSON.parse(data);
            console.log(obj.backgroundColor);
            document.getElementsByTagName('body').item(0).style.backgroundColor = obj.backgroundColor;
        }
    });
}