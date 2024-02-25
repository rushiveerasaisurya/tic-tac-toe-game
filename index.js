let box1=document.getElementById("box1");
let box2=document.getElementById("box2");
let box3=document.getElementById("box3");
let box4=document.getElementById("box4");
let box5=document.getElementById("box5");
let box6=document.getElementById("box6");
let box7=document.getElementById("box7");
let box8=document.getElementById("box8");
let box9=document.getElementById("box9");
let boxes=document.getElementsByClassName("box");
let pvp=document.getElementById("player");
let pvc=document.getElementById("computer");
let turn=document.getElementById("turn");
let msg1=document.getElementById("msg1");
let msg2=document.getElementById("msg2");
let msg=document.getElementById("msg");
let selectionElements=document.getElementById("selectionElements");
let gameBoard=document.getElementById("gameBoard");
let x = "X";
x = "<span style='text-shadow: 0 0 10px #007bff, 0 0 20px #007bff, 0 0 30px #007bff'>" + x + "</span>";
let o = "O";
o = "<span style='text-shadow: 0 0 10px #D22060, 0 0 20px #D22060, 0 0 30px #D22060'>" + o + "</span>";
currentPlayer="X";
turn.textContent="Player 1's turn"
function checkWinner(){
    const lines=
    [
        [box1,box2,box3],
        [box4,box5,box6],
        [box7,box8,box9],
        [box1,box4,box7],
        [box2,box5,box8],
        [box3,box6,box9],
        [box1,box5,box9],
        [box3,box5,box7]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (a.textContent !== "" && a.textContent === b.textContent && a.textContent === c.textContent) {
            return a.textContent; 
        }
    }
    return null;
}
function disableClicks() {
    for (let j = 0; j < boxes.length; j++) {
        boxes[j].onclick = null;
    }
}
function checkdraw(){
    let isDraw = true;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        return "draw";
    }
    return null;
}
pvp.onclick=function(){
    msg1.textContent="player 1 is X";
    msg2.textContent="player 2 is O";
    selectionElements.replaceWith(gameBoard);
    msg.style.display="flex";
    gameBoard.style.display="grid"
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].onclick = function() {
            if (boxes[i].textContent == "") { 
                boxes[i].innerHTML = currentPlayer === "X" ? x : o; 
                currentPlayer = currentPlayer === "X" ? "O" : "X"; 
                turn.textContent = currentPlayer === "X" ? "Player 1's turn" : "Player 2's turn";
                let winner=checkWinner();
                if(winner){
                    turn.textContent = winner === "X" ? "Player 1 is winner!" : "Player 2 is winner!";
                    
                    disableClicks();
                    
                    }
                }
                let draw=checkdraw();
                if(draw){
                    turn.textContent = "its a draw";
                    disableClicks();
                }
            }
        }
        
};
pvc.onclick=function(){
    msg1.textContent="player 1 is X";
    msg2.textContent="computer is O";
    selectionElements.replaceWith(gameBoard);
    msg.style.display="flex";
    gameBoard.style.display="grid"


for (let i = 0; i < boxes.length; i++) {
    boxes[i].onclick = function() {
        if (boxes[i].textContent == "") { 
            boxes[i].innerHTML = currentPlayer === "X" ? x : o; 
            currentPlayer = currentPlayer === "X" ? "O" : "X"; 
            turn.textContent = currentPlayer === "X" ? "Player 1's turn" : "Computer's turn"; 
            

            let winner = checkWinner();
            if (winner) {
                turn.textContent = winner === "X" ? "Player 1 is the winner!" : "Computer is the winner!";
                disableClicks();
            } else {

                setTimeout(computerTurn, 500);
            }
        }
    };
}
};

function computerTurn() {

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent == "") {
            boxes[i].innerHTML = o;
            if (checkWinner() === "O") {
                currentPlayer = "X"; 
                turn.textContent = "Player 1's turn";
                let winner = checkWinner();
                if (winner) {
                    turn.textContent = winner === "X" ? "Player 1 is the winner!" : "Computer is the winner!";
                    disableClicks();
                }
                return; 
            }
            boxes[i].textContent = "";
        }
    }
    

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent == "") {
            boxes[i].innerHTML = x;
            if (checkWinner() === "X") {
                boxes[i].innerHTML = o;
                currentPlayer = "X"; 
                turn.textContent = "Player 1's turn";
                let winner = checkWinner();
                if (winner) {
                    turn.textContent = winner === "X" ? "Player 1 is the winner!" : "Computer is the winner!";
                    disableClicks();
                }
                return; 
            }
            boxes[i].textContent = "";
        }
    }
    
 
    let availableMoves = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent == "") {
            availableMoves.push(i);
        }
    }
    if (availableMoves.length === 0) {
        turn.textContent = "It's a draw!";
        disableClicks();
        return;
    }
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let selectedBox = boxes[availableMoves[randomIndex]];
    selectedBox.innerHTML = o;
    
    currentPlayer = "X"; 
    turn.textContent = "Player 1's turn";
    

    let winner = checkWinner();
    if (winner) {
        turn.textContent = winner === "X" ? "Player 1 is the winner!" : "Computer is the winner!";
        disableClicks();
    }
    let draw=checkdraw();

}






