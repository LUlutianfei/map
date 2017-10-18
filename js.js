window.addEventListener('load', disappear, false);


var colors = {
    1: '#e7dedb',
    2: '#ededee',
    3: '#f5fbe7',
    4: '#f6e4fa',
    5: '#f8f5e6',
    6: '#f1ffed',
    7: '#eaedff',
    8: '#f3fde5',
    9: '#f8e6fc',
    10: '#fbf5f7',
    11: '#f8f5e6',
    12: '#eaedff'
};

var text = {
    1: '阿拉善盟',
    2: '乌海市',
    3: '鄂尔多斯',
    4: '巴彦淖尔盟',
    5: '包头',
    6: '呼和浩特市',
    7: '乌兰察布市',
    8: '锡林郭勒盟',
    9: '赤峰市',
    10: '通辽市',
    11: '兴安盟',
    12: '呼伦贝尔盟'
}

var imgW = [256, 17 / 0.8, 152, 127, 59, 45, 121, 241, 126, 122, 107, 265];

var imgH = [242, 24 / 0.8, 125, 85, 98, 71, 127, 197, 154, 132, 128, 230];

var curIndex = 0;

// let num = Math.floor(Math.random() * 12 + 1);
// console.log(num);

function disappear() {
    function drawImg() {
        for (var i = 0; i < 12; i++) {
            var img = document.getElementById('img' + (i + 1));
            img.src = text[i + 1] + '.png';
            img.height = imgH[i] * 0.8;
            img.width = imgW[i] * 0.8;
            console.log(img);
        }
    }
    drawImg();
    for (var i = 1; i <= 12; i++) {
        console.log(i);
        var ids = document.getElementById('div' + i);
        ids.style.fill = '#ffffff';
    }
    //先声明一个异步请求对象
    var xmlHttpReg = null;
    if (window.ActiveXObject) { //如果是IE
        xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttpReg = new XMLHttpRequest(); //实例化一个xmlHttpReg
    }
    //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
    if (xmlHttpReg != null) {
        xmlHttpReg.open("get", "http://106.15.228.191/num.php", true);
        xmlHttpReg.send(null);
        xmlHttpReg.onreadystatechange = doResult; //设置回调函数
    }
    //回调函数
    //一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应
    //设定函数doResult()
    function doResult() {
        if (xmlHttpReg.readyState == 4) { //4代表执行完成
            if (xmlHttpReg.status == 200) { //200代表执行成功
                //将xmlHttpReg.responseText的值赋给ID为resText的元素
                document.getElementById("visit").innerHTML = '当前访问人数' + xmlHttpReg.responseText;
            }
        }
    }



    drags('img1', 'images');
    drags('img2', 'images');
    drags('img3', 'images');
    drags('img4', 'images');
    drags('img5', 'images');
    drags('img6', 'images');
    drags('img7', 'images');
    drags('img8', 'images');
    drags('img9', 'images');
    drags('img10', 'images');
    drags('img11', 'images');
    drags('img12', 'images');
    // var ids = document.getElementById('div' + num);
    // ids.style.fill = '#ffffff';
    // ids.style.stroke = '#ffffff';
    // var drag = document.getElementById('drag' + num);
    // drag.style.display = "block";
}

function change(id) {
    if (curIndex == 12) {
        var ids = document.getElementById('div' + id);
        ids.style.fill = '#ff0000';
    }
}

function change1(id) {
    if (curIndex == 12) {
        var ids = document.getElementById('div' + id);
        ids.style.fill = colors[id];
        ids.style.stroke = '#ff03ff';
    }
}

function allowDrop(ev) {

    // ev.preventDefault();
    if (ev && ev.preventDefault) {
        ev.preventDefault();
    } else {
        window.event.returnValue = false; //注意加window
    }

}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    if (ev && ev.preventDefault) {
        ev.preventDefault();
    } else {
        window.event.returnValue = false; //注意加window
    }
    var data = ev.dataTransfer.getData("Text");
    if (data.slice(3) == ev.target.id.slice(3)) {
        ev.target.appendChild(document.getElementById(data));
        ev.target.style.fill = colors[ev.target.id.slice(3)];
        curIndex++;
    }
}

function context(id) {
    var ids = document.getElementById('context');
    ids.innerHTML = '';
    var video = document.createElement('video');
    ids.appendChild(video);
    video.setAttribute("src", "sing.webm");
    video.style.width = '100%';
    video.style.height = '100%';
    video.autoplay = true;
    var txt = document.getElementById('txt');
    txt.innerHTML = text[id];
}



function drags(objs, parentNode) {
    var obj = document.getElementById(objs);
    if (arguments.length == 1) {
        var parentNode = window.self;
        var pWidth = parentNode.innerWidth,
            pHeight = parentNode.innerHeight;
    } else {
        var parentNode = document.getElementById(parentNode);
        var pWidth = parentNode.clientWidth,
            pHeight = parentNode.clientHeight;
    }
    obj.addEventListener('touchstart', function a(event) {
        //当只有一个手指时              .
        if (event.touches.length == 1) {
            //禁止浏览器默认事
            event.preventDefault();
        };
        var touch = event.targetTouches[0];
        var disX = touch.clientX - obj.offsetLeft,
            disY = touch.clientY - obj.offsetTop;
        var oWidth = obj.offsetWidth,
            oHeight = obj.offsetHeight;

        obj.addEventListener('touchmove', function b(event) {
            var touch = event.targetTouches[0];
            obj.style.left = touch.clientX - disX + 'px';
            obj.style.top = touch.clientY - disY + 'px';
            //左侧
            if (obj.offsetLeft <= 0) {
                obj.style.left = 0;
            };
            //右侧
            if (obj.offsetLeft >= pWidth - oWidth) {
                obj.style.left = pWidth - oWidth + 'px';
            };
            //上面
            // if (obj.offsetTop <= 0) {
            //     obj.style.top = 0;
            // };
            //下面
            if (obj.offsetTop >= pHeight - oHeight) {
                obj.style.top = pHeight - oHeight + 'px';
            };
            var imgLD = [0, 240, 160, 160, 325, 360, 360, 350, 480, 600, 600, 400];
            var imgLX = [150, 280, 320, 320, 375, 410, 420, 580, 640, 670, 680, 600];
            var imgTD = [-300, -150, -170, -240, -260, -200, -290, -420, -360, -370, -450, -700];
            var imgTX = [-200, -90, -80, -170, -170, -120, -170, -280, -210, -250, -330, -460];
            if (obj.style.left.slice(0, 3) > imgLD[objs.slice(3) - 1] && obj.style.left.slice(0, 3) < imgLX[objs.slice(3) - 1] && obj.style.top.slice(0, 4) < imgTX[objs.slice(3) - 1] && obj.style.top.slice(0, 4) > imgTD[objs.slice(3) - 1]) {

                console.log(obj.style.left.slice(0, 3) > imgLD[objs.slice(3) - 1]);
                console.log(obj.style.left.slice(0, 3) < imgLX[objs.slice(3) - 1])
                console.log(obj.style.top.slice(0, 4) < imgTX[objs.slice(3) - 1])
                console.log(obj.style.top.slice(0, 4) > imgTD[objs.slice(3) - 1])

                obj.style.display = 'none';
                var id = document.getElementById('div' + objs.slice(3))
                id.style.fill = colors[objs.slice(3)];
                console.log(obj.display);
            }
        });
        // obj.addEventListener('touchend', function (event) {
        //     //obj.removeEventListener('touchmove');
        //     //obj.removeEventListener('touchend');
        // })
    });
}