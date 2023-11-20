const getMouse = function (element) {
    const mouse = { x: 0, y: 0 };
    element.addEventListener('mousemove', function (e) {
        let x;
        let y;
        e = e || window.event;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    })
    return mouse;
}

const getKey = function () {
    const key = {
        direction: ''
    };
    window.addEventListener('keydown', function (e) {
        if (e.keyCode === 38 || e.keyCode === 87) {
            key.direction = 'up';
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            key.direction = 'right';
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            key.direction = 'down';
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            key.direction = 'left';
        } else {
            key.direction = '';
        }
    }, false);
    return key;
}

// 定义绘制小球
const drawBall = function (cxt, x, y, r = 20, color = '#6699FF') {
    cxt.beginPath();
    cxt.arc(x, y, r, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fillStyle = color;
    cxt.fill();
}

// 清空画布
const clearCanvas = function(cnv, cxt) {
    cxt.clearRect(0, 0, cnv.width, cnv.height);
}

// requestAnimationFrame的兼容代码
window.requestAnimationFrame = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback)
    {
        return window.setTimeout(callback, 1000 / 60);
    }
)