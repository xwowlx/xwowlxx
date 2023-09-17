


window.onload = function () {
    var imgList = document.querySelector('.imgList');
    var cir = document.querySelector('.cir');
    var thisIndex = 0;
    var imgListLi = imgList.children;
    var cirA = cir.children;
    var flag = true;
    imgList.style.width = imgList.children.length * 600 + 'px';
    for (var i = 0; i < imgList.children.length; i++) {
        var aNode = document.createElement('a');
        aNode.setAttribute('index', i);	//设置自定义属性
        if (i == 0) {
            aNode.className = 'hover';
        }
        cir.appendChild(aNode);
    }

    
  cir.addEventListener('click', function (e) {
    if (flag) {
        flag = false;
        if (e.target.nodeName != 'A') {
            return false;
        }
        thisIndex = e.target.getAttribute('index');
        slow(imgList, -thisIndex * 600, function () {
            flag = true;
        });
        circleChange();
    }

})
function autoChange() {
    setInterval(function () {
        if (flag) {
            flag = false;
            if (thisIndex >= cirA.length) {
                thisIndex = 0;
            }
            slow(imgList, -thisIndex * 600, function () {
                flag = true;
            });
            circleChange();
            thisIndex++; 
        }
    }, 3000);
}
function circleChange() {
    for (var i = 0; i < cirA.length; i++) {
        cirA[i].className = '';
    }
    cirA[thisIndex].className = 'hover';
}
function slow(obj, target, callback) {
    obj.myInter = setInterval(function () {
        var offsetLeft = obj.offsetLeft;
        var num = (target - offsetLeft) / 10;
        num > 0 ? num = Math.ceil(num) : num = Math.floor(num);
        if (offsetLeft == target) {
            clearInterval(obj.myInter);
            callback && callback();
        } else {
            obj.style.left = offsetLeft + num + 'px';
        }
    }, 10)
}
autoChange();
}
