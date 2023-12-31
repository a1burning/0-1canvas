function Ball (x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 12;
    this.color = color || '#6699ff';

    this.scaleX = 1;
    this.scaleY = 1;

    this.vx = 1;
    this.vy = 1;
}

Ball.prototype = {
    stroke: function (cxt) {
        cxt.save();
        cxt.scale(this.scaleX, this.scaleY);
        cxt.strokeStyle = this.color;
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180, false);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    },
    fill: function (cxt) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.scale(this.scaleX, this.scaleY);
        cxt.fillStyle = this.color;
        cxt.beginPath();
        cxt.arc(0, 0, this.radius, 0, 360 * Math.PI / 180, false);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    },
    // 圆的外接矩形
    getRect: function () {
        const rect = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        };
        return rect;
    },
    // 点击检测是否捕获了小球
    checkMouse: function(mouse) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius) {
            return true;
        } else {
            return false;
        }
    }
}