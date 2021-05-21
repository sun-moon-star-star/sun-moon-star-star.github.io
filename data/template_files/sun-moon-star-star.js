function GetURLParams() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    var params = new Map();
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params.set(name, value);
        }
    }
    return params;
}

function Toggle(id) {
    if (document.getElementById(id).style.display == 'none') {
        document.getElementById(id).style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'none';
    }
}


function NewTemplate() {

    var new_template = document.createElement('div');
    document.getElementById('templates').appendChild(new_template);
    alert(JSON.stringify(new_template));
    new_template.className = 'col-3';
    new_template.innerHTML = "<div class=\"panel-left well\"><div class=\"center\" ><h2>Good Coder</h2><button class=\"sm-button\" onclick=\"Toggle('roi-show-new')\">展开</button></div ><div id=\"roi-show-new\" style=\"display: none;\"><div class=\"in-well padding-10px center\"><div class=\"input-group\"><label style=\"float:left; width:20%;\">名称</label><input type=\"text\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">唯一标识</label><input type=\"text\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">发件人</label><input type=\"text\" size=\"35\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">调度周期</label><input type=\"text\" size=\"35\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">管理员</label><textarea spellcheck=\"false\" rows=\"3\" style=\"float:right; width:80%;\"></textarea></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">收件人</label><textarea spellcheck=\"false\" rows=\"5\" style=\"float:right; width:80%;\"></textarea></div><div class=\"input-group\"><input name=\"Fruit\" type=\"checkbox\" value=\"\">暂停调度</input><input name=\"Fruit\" type=\"checkbox\" value=\"\">只发送最新的</input><input name=\"Fruit\" type=\"checkbox\" value=\"\">邮件合并</input></div><div class=\"input-group\"><button class=\"sm-button\" onclick=\"Toggle('roi-show-new')\">提交</button></div></div></div></div>";
}