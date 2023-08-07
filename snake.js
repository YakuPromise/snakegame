
//board
var blocksize = 25;
var row = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX =  0;
var velocityY = 0;

var snakeBody = [];

//Food
var foodX;
var foodY;

var gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); //for drawing on the board

    palcefood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 150/1); //100 milliseconds
}

function update(){
    if (gameover)
    {
        return;
    }

    context.fillStyle="black"
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="Red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY])
        palcefood();
    }

    for (let i = snakeBody.length-1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length)
    {
        snakeBody[0] =[snakeX, snakeY];
    }
    context.fillStyle="green";       
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    //game over condition
    if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > row*blocksize )
    {
        gameover = true;
        alert("!! GAME OVER !!");
    }

    for (let i = 0; i < snakeBody.length; i++)
    {
        if ( snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        {
            gameover = true;
            alert("!! GAME OVER !!");
        }
    }
}
function changeDirection(e){
    if (e.code =="ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code =="ArrowDown" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else  if (e.code =="ArrowLeft" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else  if (e.code =="ArrowRight" && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}
 
function palcefood(){

    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * cols) * blocksize;
}
