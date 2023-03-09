let turn = 'X'; // Define whose turn it is
let history = []; // Array that stores the history of moves

// Undo the last move
function undo(){
    if(history.length > 0){
        document.getElementById(`${history[history.length-1]}`).textContent = '';
        document.getElementById(`${history[history.length-1]}`).style.cssText = 'pointer-events:;';
        history.pop();
        turn = turn === 'X' ? 'O' : 'X';
        document.querySelector('.message').textContent = `Turn: ${turn}`;
    }
}

// Restarts the game
function restart() {
    for(let i=1; i<=9; i++) {
        document.getElementById(`s${i}`).textContent = '';
        document.getElementById(`s${i}`).style.cssText = 'pointer-events:;';
    }    
    history = [];
    turn = 'X';
    
    document.querySelector('.board').style.cssText = 'pointer-events:;';
    document.querySelector('.message').textContent = `Turn: ${turn}`;
}

// Makes the move
function action(id) {
    const square = document.getElementById(`${id}`);

    if(square.textContent === '') {    
        square.style.cssText = 'pointer-events: none;';
        history.push(id);
        square.textContent = turn;

        if(checkWin(turn) === true) {
            document.querySelector('.board').style.cssText = 'pointer-events: none;';
            document.querySelector('.message').textContent = `Player '${turn}' won the game!`;
            setTimeout(() => {restart()}, 2000);
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            document.querySelector('.message').textContent = `Turn: ${turn}`;
            checkTie();
        }
    }
}

// Checks if someone won
function checkWin(turn) {
    const conditionWin = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for(let condition of conditionWin) {
        const [a,b,c] = [condition[0], condition[1], condition[2]];
        if(document.getElementById(`s${a}`).textContent==turn &&
           document.getElementById(`s${b}`).textContent==turn &&
           document.getElementById(`s${c}`).textContent==turn) {
            return true;
        }
    }

    return false;
}

// Checks if the game tied
function checkTie () {
    const squares = [];
    for(id=1; id<=9; id++) {
        squares.push(document.getElementById(`s${id}`).textContent);
    }
    if(!squares.includes("")) {
        document.querySelector('.message').textContent = 'Tie!';
        setTimeout(() => {restart()}, 2000);
    }
    return;
}