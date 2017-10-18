window.addEventListener('load', disappear, false);

const colors = {
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

const text = {
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

const imgW = [256, 17 / 0.8, 152, 127, 59, 45, 121, 241, 126, 122, 107, 265]

const imgH = [242, 24 / 0.8, 125, 85, 98, 71, 127, 197, 154, 132, 128, 230]

let curIndex = 0;
// let num = Math.floor(Math.random() * 12 + 1);
// console.log(num);

function disappear() {
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

    function drawImg() {
        for (let i = 0; i < 12; i++) {
            const img = document.getElementById('img' + (i + 1));
            img.src = text[i + 1] + '.png';
            img.height = imgH[i] * 0.8;
            img.width = imgW[i] * 0.8;
        }
    }
    drawImg();
    for (let i = 1; i <= 12; i++) {
        const ids = document.getElementById('div' + i);
        ids.style.fill = '#ffffff';
    }
    // const ids = document.getElementById('div' + num);
    // ids.style.fill = '#ffffff';
    // ids.style.stroke = '#ffffff';
    // const drag = document.getElementById('drag' + num);
    // drag.style.display = "block";
}

function change(id) {
    if (curIndex == 12) {
        const ids = document.getElementById('div' + id);
        ids.style.fill = '#ff0000';
    }
}

function change1(id) {
    if (curIndex == 12) {
        const ids = document.getElementById('div' + id);
        ids.style.fill = colors[id];
        ids.style.stroke = '#ff03ff';
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    if (data.slice(3) == ev.target.id.slice(3)) {
        ev.target.appendChild(document.getElementById(data));
        ev.target.style.fill = colors[ev.target.id.slice(3)];
        curIndex++;
    }
}

function context(id) {
    const ids = document.getElementById('context');
    ids.innerHTML = '';
    const video = document.createElement('video');
    ids.appendChild(video);
    video.setAttribute("src", "sing.webm");
    video.style.width = '100%';
    video.style.height = '100%';
    video.autoplay = true;
    const txt = document.getElementById('txt');
    txt.innerHTML = text[id];
}