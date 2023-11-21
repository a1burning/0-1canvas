function Arrow (x, y, color, angle) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || '#ff0099';
    this.angle = angle || 0;
}

Arrow.prototype = {
    stroke: function (cxt) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.rotate(this.angle);
        cxt.strokeStyle = this.color;
        this.drawArrow(cxt);
        cxt.stroke();
        cxt.restore();
    },
    fill: function (cxt) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.rotate(this.angle);
        cxt.fillStyle = this.color;
        this.drawArrow(cxt);
        cxt.fill();
        cxt.restore();
    },
    // 定义绘制箭头
    drawArrow: function(cxt) {
        cxt.beginPath();
        cxt.moveTo(-20, -10);
        cxt.lineTo(0, -10);
        cxt.lineTo(0, -20);
        cxt.lineTo(20, 0);
        cxt.lineTo(0, 20);
        cxt.lineTo(0, 10);
        cxt.lineTo(-20, 10);
        cxt.closePath();
    }
}