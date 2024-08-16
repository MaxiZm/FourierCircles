import { Circle } from './circle.js';

var canvas = document.getElementById('canvas');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

const DT = 1 / 240;

let time = 0;
let points = []

let circles = [];

let N = Math.floor(Math.random() * 6 + 4);

for (let i = 0; i < N; i++) {
    let radius = Math.random() * (i > 1 ? circles[i - 1].radius - 50 : 50) + 50;
    let tps = Math.random() * 2 + 1;
    circles.push(new Circle(radius, null, tps));

}

function drawCircles() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    let x = width / 2;
    let y = height / 2;

    for (let circle of circles) {
        ctx.strokeStyle = 'gray';

        ctx.beginPath();
        ctx.arc(x, y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(x, y);

        let angle = circle.angle(time);
        x = x + circle.radius * Math.cos(angle);
        y = y + circle.radius * Math.sin(angle);

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    return [x, y];
}

setInterval(() => {
    let [x, y] = drawCircles();
    points.push([x, y]);
    time += DT;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.strokeStyle = 'yellow';
    ctx.stroke();
}, DT);

