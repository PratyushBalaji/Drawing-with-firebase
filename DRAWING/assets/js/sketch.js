const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');     
const color_picker = document.querySelector('.color-picker');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;


canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);

clearButton.addEventListener('click', clearCanvas);

function start(e){
    isDrawing = true;
    draw(e);
}

function setup(){
    canvas.parent('canvascontainer');

    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);
    
    var config = {
    apiKey: "AIzaSyAYhETMgIvcmKRSKvNJkWjYG17ENvsGBx0",
    authDomain: "drawing-app-bb2fb.firebaseapp.com",
    databaseURL: "https://drawing-app-bb2fb.firebaseio.com",
    projectId: "drawing-app-bb2fb",
    storageBucket: "drawing-app-bb2fb.appspot.com",
    messagingSenderId: "263090176655",
    appId: "1:263090176655:web:c5d8fbd7093507d4e766fa"
    }
}

function draw({clientX: x, clientY: y}){
    if(!isDrawing) return;
    ctx.lineWidth = stroke_weight.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = color_picker.value;

    ctx.lineTo(x, y)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stop(){
    isDrawing = false;
    ctx.beginPath();
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function saveDrawing(){
    var ref = database.ref('drawings');
    var data = {
        name: "Pratyush",
        drawing: drawing
    }
    var result = ref.push(data, dataSent);
    console.log(result.key);
    
    function dataSent(status){
        console.log(status);
    }
}

resizeCanvas();