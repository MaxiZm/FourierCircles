import { Circle } from './circle.js';
import {fourier} from './fourier.js';

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
const slow_factor = 10;

let time = 0;
let points = []

let circles = [];
let user_points = [];


function double_points(points) {
    let double_points = [];
    for (let i = 0; i < points.length - 1; i++) {
        double_points.push(points[i]);
        double_points.push([points[i][0]/2 + points[i+1][0]/2, points[i][1]/2 + points[i+1][1]/2]);
    }
    double_points.push(points[points.length - 1]);
    return double_points;

}

canvas.addEventListener('mousedown', (event) => {
    user_points = [];
});
canvas.addEventListener('mousemove', (event) => {
    if (event.buttons === 1) {
        user_points.push([event.clientX - width/2, event.clientY - height/2]);
    }
});

canvas.addEventListener('mouseup', (event) => {
    circles = [];
    points = [];

    while (user_points.length < 1000) {
        user_points = double_points(user_points);
    }


    let parent = null;

    let i = 0;
    const N = parseInt(document.getElementById('text').value) || 0;

    while (i < N) {
        const coefficient = fourier(user_points, user_points.length, i);
        const radius = math.abs(coefficient);
        const phase = math.arg(coefficient);
        const tps = i;  // This could be adjusted based on your specific needs

        const circle = new Circle(radius, phase, parent, tps);
        circles.push(circle);
        console.log(radius, phase, tps)
        parent = circle;  // Set this circle as the parent for the next one
        if (i > 0) i *= -1;
        else i = (i * (-1)) + 1;
    }
});

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

        ctx.strokeStyle = 'darkgray';
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
    time += DT / slow_factor;

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.strokeStyle = 'yellow';
    ctx.stroke();

    if (user_points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(user_points[0][0] + width/2, user_points[0][1] + height/2);
        for (let i = 1; i < user_points.length; i++) {
            ctx.lineTo(user_points[i][0] + width/2, user_points[i][1] + height/2);
        }

        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
}, DT);

