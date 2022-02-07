//functions
function drawField(){
    ctx.fillStyle = gridColor;
    ctx.fillRect(feildX, fieldY, fieldWidth, fieldHeight);
    drawGrid();
};

function drawGrid(){
    let i = 0;
    for (x = feildX + offset; x < feildX + fieldWidth; x += cellWidth + offset){
        for (y = fieldY + offset; y < fieldY + fieldHeight; y += cellHeight + offset){
            drawCell(x, y, gridCellColor);
            cell[i] = {x: x, y: y, color: ctx.fillStyle};
            ++i;
        }
    }
};

function drawMenu(){
    menu.fillStyle = gridCellColor;
    menu.fillRect(0, 0, 250, 150);
    menu.fillStyle = gridColor;
    menu.fillRect(4, 4, 242, 142);
    menu.fillStyle = gridCellColor;
    menu.font = "20px serif";
    menu.fillText("PLAYER 1:", 30, 35);
    menu.fillText("PLAYER 2:", 30, 75);
    menu.fillStyle = firstPlayerColor;
    menu.fillRect(130, 15, 30, 30);          
    menu.fillStyle = secondPlayerColor;
    menu.fillRect(130, 55, 30, 30);
    button.fillStyle = gridCellColor;
    button.fillRect(0, 0, 100, 30);
    button.fillStyle = gridColor;
    button.font = "15px serif";
    button.fillText("NEW GAME", 10, 20);
};

function drawCell(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellWidth, cellHeight);
};

function cellCounter(ind, n, color){
    let k = 0;
    while((ind < cellNum && ind >= 0) && cell[ind].color == color){
        ++k;
        ind += n;
    }
    return k;
};

function checkWin(ind, color){
    const stepWays = [1, 8, 9, 10];
    stepWays.forEach(step => {
        if (cellCounter(ind, -step, color) + cellCounter(ind, step, color) - 1 == 5){
            stepWinWay = step;
        }
    });
};

function highlightingTheWinningPath(ind, step, color){
    while (ind >= 0 && ind < cellNum && cell[ind].color == color){
        drawCell(cell[ind].x, cell[ind].y, winColor);
        ind += step;
    }
};

function endOfGame(ind, color){
    flagUsageClick = false;
    highlightingTheWinningPath(ind, stepWinWay, color);
    highlightingTheWinningPath(ind, -stepWinWay, color);
    menu.fillStyle = gridCellColor;
    menu.font = "20px serif";
    if (color == firstPlayerColor) 
        menu.fillText("WIN!", 165, 35);
    else if (color == secondPlayerColor)
        menu.fillText("WIN!", 165, 75);
    else
        menu.fillText("TIE!", 165, 55);
    player = 1;
};

//main
let menu = document.getElementById("canvasMenu").getContext("2d");
let button = document.getElementById("canvasButton").getContext("2d");
let ctx = document.getElementById("canvasField").getContext("2d");
let fieldWidth = 500, fieldHeight = 500,
    cellWidth = 50, cellHeight = 50,
    feildX = 0, fieldY = 0, offset = 5,
    firstPlayerColor = "#8B008B", secondPlayerColor = "#FF6347", winColor = "#006400"
    gridCellColor = "#ffffff", gridColor = "#000000", player = 1, cellNum = 81;
let cell = [], cellFree = cellNum, color, x, y,
    flagUsageClick = true, stepWinWay = 0;

canvasField.width = fieldWidth;
canvasField.height = fieldHeight;
canvasButton.width = 100;
canvasButton.height = 30;
drawField();
drawMenu();

canvasField.onclick = function(event){
    if (flagUsageClick){
        x = event.clientX - fieldWidth;
        y = event.clientY - fieldHeight/5;
        for (i = 0; i < cellNum; ++i){
            if (cell[i].color == gridCellColor && cell[i].x <= x && cell[i].x + cellWidth >= x
                && cell[i].y <= y && cell[i].y + cellHeight >= y){
                color = (player % 2 == 0) ? secondPlayerColor : firstPlayerColor;
                cell[i].color = color;
                drawCell(cell[i].x, cell[i].y, color);
                --cellFree;
                ++player;
                checkWin(i, color);
                if (stepWinWay > 0) endOfGame(i, color);
                else if (cellFree == 0) endOfGame(gridCellColor, 0, 0);
            }
        }
    }
};

canvasButton.onclick = function(event){
        cellFree = cellNum;
        flagUsageClick = true;
        stepWinWay = 0;
        drawGrid();
        drawMenu();
};