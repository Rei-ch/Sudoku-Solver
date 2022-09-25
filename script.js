const gridCanvas = document.querySelector('#grid');
const ctx = gridCanvas.getContext('2d');

ctx.font = "40px courier";
ctx.textBaseLine = "bottom";

const size = 9;
const boxSize = gridCanvas.width / size;

let row;
let col;

let prevRow = -1;
let prevCol = -1;
let prevX;
let prevY;

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

function drawGridLines(canvas, ctx){
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

function drawSelected(ctx, row, col){
    let x = col * boxSize;
    let y = row * boxSize;
    let empty = true;

    if (prevCol == -1 && prevRow == -1){
        prevRow = row;
        prevCol = col;
        prevX = prevCol * boxSize;
        prevY = prevRow * boxSize;
    }

    if (matrix[row][col] !== 0){
        console.log("first")
        ctx.fillStyle = "#b8e7f3";
        ctx.fillRect(x+3, y+3, boxSize-7, boxSize-7);
        drawNum(row, col, matrix[row][col]);
        empty = false;
        if (matrix[prevRow][prevCol] != 0)
            drawNum(prevRow, prevCol, matrix[prevRow][prevCol]);
    }

    if (prevRow === row && prevCol === col && empty){
        console.log("second")
        ctx.fillStyle = "#b8e7f3";
        ctx.fillRect(x+3, y+3, boxSize-7, boxSize-7);
    }
    else if (prevRow === row && prevCol === col && !empty){console.log("third"); return;}
    

    else{
        console.log("fourth")
        ctx.clearRect(prevX + 3, prevY + 3, boxSize - 7, boxSize -7);
        if(empty){
            ctx.fillStyle = "#b8e7f3";
            ctx.fillRect(x+3, y+3, boxSize-7, boxSize-7);
        }    
        if (matrix[prevRow][prevCol] != 0)
            drawNum(prevRow, prevCol, matrix[prevRow][prevCol], true);
    }
    
    prevRow = row;
    prevCol = col;
    prevX = prevCol * boxSize;
    prevY = prevRow * boxSize;
    
}

function drawNum(row, col, num, prev=false){
    let x = col * boxSize;
    let y = row * boxSize;
    if (num == 0){
        ctx.clearRect(x + 3, y + 3, boxSize - 7, boxSize -7);
        ctx.fillStyle = "#b8e7f3";
        ctx.fillRect(x+3, y+3, boxSize-7, boxSize-7);
        return;
    }
    else if (!prev){
        ctx.fillStyle = "#b8e7f3";
        ctx.fillRect(x+3, y+3, boxSize-7, boxSize-7);
        ctx.fillStyle = "#4090a7";
        ctx.fillText(num, x+15, y+40);
    }
    else{
        ctx.fillStyle = "#4090a7";
        ctx.fillText(num, x+15, y+40);
    }
}

function handleInput(e){
    const key = Number(e.key);
    if (isNaN(key)) return;
    if (matrix[row][col] == key) return;
    drawNum(row, col, key);
    matrix[row][col] = key;
}

gridCanvas.addEventListener("click", evt => {
    evt.target.style.cursor = "pointer";
    col = ~~(evt.offsetX/boxSize);
    row = ~~(evt.offsetY/boxSize);

    drawSelected(ctx, row, col);
    console.log(row, col);
})

document.addEventListener('keypress', handleInput);
drawGridLines(gridCanvas, ctx);