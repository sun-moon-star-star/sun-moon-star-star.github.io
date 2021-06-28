function randomString() {
    return Math.random() * 100000000;
}

function jsonObjectSyntaxHighlightImpl(obj, space_num) {
    var id = randomString();
    var result = '<a class="json-button" data-toggle="' + id + '">+</a><label id="' + id + '">';
    var is_array = 0;

    if (obj == null) {
        return '<span class="json-null">' + obj + '</span>';
    } else if (typeof obj == "boolean") {
        return '<span class="json-boolean">' + value + '</span>';
    } else if (typeof obj == "number") {
        return '<span class="json-number">' + value + '</span>';
    } else if (typeof obj == "string") {
        return '<span class="json-string">"' + value + '"</span>';
    } else if (typeof obj == "array") {
        is_array = 1;
    }

    var idx = 0;
    for (var key in obj) {
        value = key;
        if (is_array == 1) {
            key = idx;
            idx = idx + 1;
        } else {
            value = obj[key];
        }
        result += "\n";

        for (var i = 0; i < space_num; ++i) {
            result += " ";
        }
        result += '<span class="json-key">"' + key + '"</span>: ';
        result += jsonObjectSyntaxHighlightImpl(value, space_num + 4);
    }
    if (result != "") {
        result += "\n";
        for (var i = 4; i < space_num; ++i) {
            result += " ";
        }
    }

    if (is_array) {
        return "[" + result + "</label>]";
    } else {
        return "{" + result + "</label>}";
    }
}

function jsonObjectSyntaxHighlight(obj) {
    return jsonObjectSyntaxHighlightImpl(obj, 4);
}

function initJson() {
    var cells = document.getElementsByTagName("json");
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "<pre>" + jsonObjectSyntaxHighlight(JSON.parse(cells[i].innerHTML)) + "</pre>";
    }

    var btns = document.getElementsByClassName("json-button");
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            id = this.getAttribute("data-toggle");
            element = document.getElementById(id);
            if (element.style.display == 'none') {
                element.style.display = 'inline';
            } else {
                element.style.display = 'none';
            }
        };
    }
}

initJson();

