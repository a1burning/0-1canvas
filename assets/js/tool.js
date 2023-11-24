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

// 绘制坐标系
function drawPostion(cnv) {
    const cxt = cnv.getContext('2d');
    const centerX = cnv.width / 2;
    const centerY = cnv.height / 2;
    cxt.save();
    cxt.beginPath();
    cxt.setLineDash([3, 3]);
    cxt.moveTo(0, centerY);
    cxt.lineTo(cnv.width, centerY);
    cxt.stroke();
    cxt.moveTo(centerX, 0);
    cxt.lineTo(centerX, cnv.height);
    cxt.stroke();
    cxt.restore();
}

// 清空画布
const clearCanvas = function(cnv) {
    const cxt = cnv.getContext('2d');
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

// 定义边界检测函数 - 边界限制
const checkBorder = function(cnv, ball) {
    // 上
    if ( ball.y < ball.radius) {
        ball.y = ball.radius;
    // 下
    } else if (ball.y > cnv.height - ball.radius) {
        ball.y = cnv.height - ball.radius;
    }
    // 左
    if (ball.x < ball.radius) {
        ball.x = ball.radius;
    // 右
    } else if (ball.x > cnv.width - ball.radius) {
        ball.x = cnv.width - ball.radius;
    }
}

// 定义边界检测函数 - 边界环绕
const checkRound = function(cnv, ball) {
    // 上
    if ( ball.y < -ball.radius) {
        ball.y = cnv.height + ball.radius;
    // 下
    } else if (ball.y > cnv.height + ball.radius) {
        ball.y = -ball.radius;
    }
    // 左
    if (ball.x < -ball.radius) {
        ball.x = cnv.width + ball.radius;
    // 右
    } else if (ball.x > cnv.width + ball.radius) {
        ball.x = -ball.radius;
    }
}

const isBeyondBoundary = function(cnv, ball) {
    return  (ball.x < -ball.radius ||
    ball.x > cnv.width + ball.radius ||
    ball.y < -ball.radius ||
    ball.y > cnv.height + ball.radius)
}

const BoundaryRebound = function(cnv, ball) {
    if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vx = -ball.vx;
    } else if (ball.x > cnv.width - ball.radius) {
        ball.x = cnv.width - ball.radius;
        ball.vx = -ball.vx;
    }
    if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vy = -ball.vy;
    } else if (ball.y > cnv.height - ball.radius) {
        ball.y = cnv.height - ball.radius;
        ball.vy = -ball.vy;
    }
}

// 获取随机颜色的函数
const getRandomColor = function() {
    return '#' + 
    (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
        && (color.length == 6) ? color : arguments.callee(color);  // 递归调用，直到返回6位颜色值为止。
    })('');
}

// 获取随机速度的函数  -1 ~ 1
const getRandomSpeed = function(speed = 1) {
    return (Math.random() * 2 - 1) * speed; // -speed ~ speed中间的数值
}