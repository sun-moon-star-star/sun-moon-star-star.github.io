const CookieExpireTime = 30 * 24 * 60 * 60 * 1000; // 30 days

const APIAddress = "https://81.70.253.240:8765"

function AddCookie(setName, setValue) {
    if (document.cookie == "") {
        var d = new Date();
        d.setTime(d.getTime() + CookieExpireTime);
        var expires = "expires=" + d.toGMTString();
        document.cookie = escape(setName) + "=" + escape(setValue) + "; " + expires;
    } else {
        var parts = document.cookie.split("expires=");
        var arr = parts[0].split(" ");
        var cookieString = "";
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = unescape(arr[i].substring(0, num));
                value = unescape(arr[i].substr(num + 1));
                if (name == setName) {
                    value = setValue;
                }
                if (cookieString != "") {
                    cookieString += " ";
                }
                cookieString = escape(name) + "=" + escape(value);
            }
        }
        document.cookie = cookieString + "; expires=" + parts[1];
    }
}

function GetCookie(queryName) {
    var parts = document.cookie.split("expires=");
    var arr = parts[0].split(" ");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = unescape(arr[i].substring(0, num));
            value = unescape(arr[i].substr(num + 1));
            if (name == queryName) {
                return value;
            }
        }
    }
    return ""
}

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

function SMTPInit() {
    params = GetURLParams();
    email = GetCookie("email");
    if (email == "") {
        alert("请登录");
        window.location.href = "./login.html";
        return
    }

    document.getElementById('email_show').innerHTML = email;
    document.getElementById('count_show').innerHTML = "0";
    document.getElementById('pending_show').innerHTML = "0";
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
    new_template.className = 'col-3';
    new_template.innerHTML = "<div class=\"panel-left well\"><div class=\"center\" ><h2>Good Coder</h2><button class=\"sm-button\" onclick=\"Toggle('roi-show-new')\">展开</button></div ><div id=\"roi-show-new\" ><div class=\"in-well padding-10px center\"><div class=\"input-group\"><label style=\"float:left; width:20%;\">名称</label><input type=\"text\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">唯一标识</label><input type=\"text\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">发件人</label><input type=\"text\" size=\"35\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">调度周期</label><input type=\"text\" size=\"35\" style=\"float:right; width:80%;\"></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">管理员</label><textarea spellcheck=\"false\" rows=\"3\" style=\"float:right; width:80%;\"></textarea></div><div class=\"input-group\"><label style=\"float:left; width:20%;\">收件人</label><textarea spellcheck=\"false\" rows=\"5\" style=\"float:right; width:80%;\"></textarea></div><div class=\"input-group\"><input name=\"Fruit\" type=\"checkbox\" value=\"\">暂停调度</input><input name=\"Fruit\" type=\"checkbox\" value=\"\">只发送最新的</input><input name=\"Fruit\" type=\"checkbox\" value=\"\">邮件合并</input></div><div class=\"input-group\"><button class=\"sm-button\" onclick=\"Toggle('roi-show-new')\">提交</button></div></div></div></div>";
    document.getElementById('templates').appendChild(new_template);
}

/**
 * 发送一个 AJAX JSON 请求
 * @param {String} method 请求方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Function} callback 请求完成过后需要做的事情
 */
function AjaxJsonCall(method, url, params, callback) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new
        ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function () {
        if (this.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (this.status == 200 && this.responseText != null) {
            callback(params, JSON.parse(this.responseText));
        } else {
            alert("status: " + this.status.toString() + "\nresponseText: " + this.responseText);
        }
    };

    xhr.open(method, url, true);
    xhr.withCredentials = true;
    data = JSON.stringify(params);
    xhr.send(data);
}

function RegistSendCodeCallBack(req, resp) {
    document.getElementById('register_label').innerHTML = resp.Msg;
    document.getElementById('register_label').style.display = "block";
}

function RegistSendCode() {
    url = APIAddress + '/smtp/user';
    method = 'POST';
    email = document.getElementById('regist_email_address').value;
    params = {
        Type: 2,
        Email: email
    };
    AjaxJsonCall(method, url, params, RegistSendCodeCallBack);
}

function RegistMainCallBack(req, resp) {
    if (resp.Error.Code == 0) {
        document.getElementById('regist').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('register_label').style.display = "none";
        document.getElementById('login_label').innerHTML = "注册成功";
        document.getElementById('login_label').style.display = "block";
        document.getElementById('login_email_address').value = req.Email;
    } else {
        document.getElementById('register_label').innerHTML = resp.Msg;
        document.getElementById('register_label').style.display = "block";
    }
}

function RegistMain() {
    url = APIAddress + '/smtp/user';
    method = 'POST';
    email = document.getElementById('regist_email_address').value;
    password = document.getElementById('regist_password').value;
    code = parseInt(document.getElementById('regist_code').value);
    params = {
        Type: 3,
        Email: email,
        Password: password,
        Code: code,
    };
    AjaxJsonCall(method, url, params, RegistMainCallBack);
}

function LoginMainCallBack(req, resp) {
    if (resp.Error.Code == 0) {
        document.getElementById('login_label').style.display = "none";
        AddCookie("email", req.Email);
        window.location.href = "./smtp.html";
    } else {
        document.getElementById('login_label').innerHTML = resp.Msg;
        document.getElementById('login_label').style.display = "block";
    }
}

function LoginMain() {
    url = APIAddress + '/smtp/user';
    method = 'POST';
    email = document.getElementById('login_email_address').value;
    password = document.getElementById('login_password').value;
    params = {
        Type: 1,
        Email: email,
        Password: password,
    };
    AjaxJsonCall(method, url, params, LoginMainCallBack);
}