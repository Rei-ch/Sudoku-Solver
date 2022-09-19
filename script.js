const gridCanvas = document.querySelector('#grid');
const ctx = gridCanvas.getContext('2d');

const size = 9;
const boxSize = gridCanvas.width / size;

let row;
let col;

let prevRow = -1;
let prevCol = -1;

let matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]


function drawLineWidth(pos){
    if (pos%150 === 0)
        ctx.lineWidth = 3;
    else 
        ctx.lineWidth = 1;
}

function drawGrid(canvas, ctx){
    for (let y = 0; y <= canvas.height; y+=boxSize){
        ctx.beginPath();
        ctx.moveTo(y, 0);
        ctx.lineTo(y, canvas.height);
        drawLineWidth(y);
        ctx.stroke();
    }

    for (let x = 0; x <= canvas.width; x+=boxSize){
        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(canvas.width, x);
        drawLineWidth(x);
        ctx.stroke();
    }
}

function handleInput(e){
    const key = Number(e.key);
    if (isNaN(key)) return;
    matrix[row][col] = key;
}

gridCanvas.addEventListener("click", evt => {
    evt.target.style.cursor = "pointer";
    col = ~~(evt.offsetX/boxSize);
    row = ~~(evt.offsetY/boxSize);

    console.log(row, col);
})

document.addEventListener('keypress', handleInput);
drawGrid(gridCanvas, ctx);