function setHTML() {
    var canvas2 = document.createElement("canvas");
    let _canvas = document.querySelector('html');
    document.querySelector(".downHtml").style.display = "none";
    var w = parseInt(window.getComputedStyle(_canvas).width);
    var h = parseInt(window.getComputedStyle(_canvas).height);
    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 4;
    canvas2.height = h * 4;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    var context = canvas2.getContext("2d");
    context.scale(4, 4);

    html2canvas(document.querySelector('html'), { canvas: canvas2 }).then(function (canvas) {
        document.querySelector(".downHtml").setAttribute('href', canvas.toDataURL());
        document.querySelector(".downHtml").style.display = "block";
        document.querySelector(".downHtml").click();
    });
}
function downloadHTML() {
    setHTML();
}
setHTML();