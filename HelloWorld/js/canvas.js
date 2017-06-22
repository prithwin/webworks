var c;
var circle;
var density = 100;
var G = 1;
var dampningFactor = 0.85;
var circleA = [];
var ballA = [];

var mouse = {
    mouseX: undefined,
    mouseY: undefined
}
window.onmousemove = function (event) {
    mouse.mouseX = event.x;
    mouse.mouseY = event.y;
}

function Circle(x,y,dx,dy,radius,style) {
    this.x = x;
    this.y = y; 
    this.dx = dx;
    this.dy = dy;
    this.frame = 0;
    this.radius = radius;
    this.originalRadius = radius;
    this.style = style;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.style;
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
        
    }
    this.update = function () {
        if (this.x > window.innerWidth || this.x < 0) {
            this.dx = -1 * this.dx;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.dy = -1 * this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.frame++;
        if (Math.abs(this.x - mouse.mouseX) < 50 && Math.abs(this.y - mouse.mouseY) < 50) {
            console.log('caught');
            this.radius+=5;
        } else {
            if (this.radius > this.originalRadius) {
                this.radius-=5;
            }
        } 


    }
}


function Ball(x, y, dx, dy, radius, style) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.frame = 0;
    this.radius = radius;
    this.originalRadius = radius;
    this.originalHeight = y;
    this.style = style;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.style;
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();

    }
    this.update = function () {
        if (this.x > window.innerWidth || this.x < 0) {
            this.dx = -1 * this.dx;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.dy = -1 * this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.frame++;
        if (Math.abs(this.x - mouse.mouseX) < 50 && Math.abs(this.y - mouse.mouseY) < 50) {
            console.log('caught');
            this.radius += 5;
        } else {
            if (this.radius > this.originalRadius) {
                this.radius -= 5;
            }
        }


    }

    this.drop = function () {
        if (this.y + this.radius + this.dy > window.innerHeight) {
            this.dy = -1 * this.dy * dampningFactor;
            this.dx *= dampningFactor;
        } else {
            this.dy += G;
        }

        if (this.x + this.radius + this.dx > window.innerWidth || 
            this.x - this.radius + this.dx < 0 ) {
            this.dx = -1 * this.dx * dampningFactor;
        }
        this.y += this.dy;
        this.x += this.dx;
    }
}


function pureResize() {
    var canvas = document.querySelector('#c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c = canvas.getContext('2d');
    console.log(c);
}

function draws() {
    for (i = 0; i < density; i++) {
        radius = Math.random() * 70;
        if (radius < 12) {
            radius = 12;
        }
        var style = 'rgba(' + Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ',1.0)';
        console.log(style);
        //circleA.push(new Circle(Math.random() * window.innerWidth,
        //    Math.random() * window.innerHeight,
        //    (Math.random() - 0.5) * 5,
        //    (Math.random() - 0.5) * 5,
        //    radius,
        //    style));

        ballA.push(new Ball(getRandomNumberBetween(0, window.innerWidth),
            getRandomNumberBetween(0, window.innerHeight - radius),
            getFRRandomNumberBetween(-15,15),
            1,
            radius,
            style));
    }
    animate();
}

function getRandomNumberBetween(from, to) {
    number = to * Math.random();
    if (number < from) {
        return from;
    }
    return number;
}

function getFRRandomNumberBetween(from, to) {
    number = to * (Math.random() - 0.5);
    if (number < from) {
        return from;
    }
    return number;
}
function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (i = 0; i < density; i++) {
        //circleA[i].draw();
        //circleA[i].update();

        ballA[i].draw();
        ballA[i].drop();
    }   
    requestAnimationFrame(animate);
}