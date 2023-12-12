//variable declaration
let turn = "X";
let playerXScore = 0;
let playerOScore = 0;
let gameCount = 0;
let moveCount = 0;
let isGameOver = false;
let currentMode = 2;
let boxes = Array.from(document.querySelectorAll(".game-box"));

console.log("Welcome to tic tac toe game");

//changes players turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a winner or draw
const checkResult = () => {
    checkDraw();
    checkWin();
}

//checks for winner
const checkWin = () => {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < 8; i++) {

        let idx1 = wins[i][0];
        let idx2 = wins[i][1];
        let idx3 = wins[i][2];

        if ((boxes[idx1].innerText === boxes[idx2].innerText) && (boxes[idx2].innerText === boxes[idx3].innerText)) {
            if ((boxes[idx1].innerText !== "") && (boxes[idx2].innerText !== "") && (boxes[idx3].innerText !== "")) {
                document.querySelector(".result-div").innerHTML = `<h3> Player ${boxes[idx1].innerText} won !!</h3>`;
                console.log(`Player ${boxes[idx1].innerText}  won`);

                if (boxes[idx1].innerText === "X") {
                    playerXScore++;
                    console.log(`Player X : ${playerXScore}`);
                    document.querySelector(".player-x-score").innerHTML = playerXScore;
                }
                else {
                    playerOScore++;
                    console.log(`Player O : ${playerOScore}`);
                    document.querySelector(".player-o-score").innerHTML = playerOScore;
                }
                gameCount++;
                document.querySelector(".game-count").innerHTML = `Game Count : ${gameCount}`;
                isGameOver = true;
            }
        }

    }
}

// Function to check for a draw
const checkDraw = () => {
    if (!isGameOver && moveCount === 9) {
        document.querySelector(".result-div").innerHTML = `<h3> It's a draw! </h3>`;
        console.log("It's a draw!");
        gameCount++;
        document.querySelector(".game-count").innerHTML = `Game Count : ${gameCount}`;
        isGameOver = true;
    }
}

//function to reset game
const reset = () => {
    resetGrid();
    document.querySelector(".player-x-score").innerHTML = 0;
    document.querySelector(".player-o-score").innerHTML = 0;
    document.querySelector(".result-div").innerHTML = "";
    document.querySelector(".game-count").innerHTML = "Game Count : 0";
    turn = "X";
    playerXScore = 0;
    playerOScore = 0;
    gameCount = 0;
    moveCount = 0;
    isGameOver = false;
}

//function to reset game grid
const resetGrid = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = "";
    }
    document.querySelector(".result-div").innerHTML = "";
    moveCount = 0;
    isGameOver = false;

    // Reset the turn to "X" before updating the display
    turn = "X";

    if (currentMode === 1) {
        if (gameCount % 2 === 0) {
            turn = "X";
            document.querySelector(".turn-div").innerHTML = `<h3>Player ${turn} turn </h3>`;
        } else {
            turn = "O";
            document.querySelector(".turn-div").innerHTML = `<h3>Player ${turn} turn </h3>`;
        }
    } else {
        vsBotMode();
    }
};



// Function to handle box click
const handleBoxClick = (index) => {
    if (!isGameOver && boxes[index].innerText === "") {
        boxes[index].innerText = turn;
        moveCount++;
        console.log("move count : " + moveCount);
        checkResult();

        if (!isGameOver) {

            turn = changeTurn();
            document.querySelector(".turn-div").innerHTML = `<h3>Player ${turn} turn </h3>`;
            if (moveCount % 2 === 0 && currentMode === 2) {
                botMoveGenerator();
            }
        }
    }
    else {
        console.log("Invalid move");
    }
}

// function to check empty boxes
const findEmptyBox = () => {
    let index = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            index[i] = i;
        }
    }
    return index;
}

//function to generate bot moves
const botMoveGenerator = () => {
    let randomMove = Math.floor(Math.random() * 9);
    console.log("random move : " + randomMove);
    if (findEmptyBox().includes(randomMove)) {
        turn = "X";
        handleBoxClick(randomMove);
    }
    else {
        botMoveGenerator();
    }
}

const vsHumanMode = () => {
    console.log('Switching to Vs Human Mode');
    // Add event listeners to each box

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", () => {
            console.log(`box ${i + 1} clicked!!`);
            handleBoxClick(i);
        });
    }
}

const vsBotMode = () => {
    if (moveCount % 2 === 0) {
        console.log('Switching to Vs Bot Mode');
        botMoveGenerator();
    }

    else {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener("click", () => {
                console.log(`box ${i + 1} clicked!!`);
                handleBoxClick(i);
            });
        }
    }

}

//function to toggle between vsBotMode and vsHumanMode
const toggleMode = () => {
    const button = document.querySelector('.toggle-btn');
    currentMode = (currentMode === 1) ? 2 : 1;

    if (currentMode === 1) {
        button.innerText = 'Vs Human Mode';
        button.classList.add('vs-human-mode');
        button.classList.remove('vs-bot-mode');
        resetGrid();
        reset();
        vsHumanMode();
    } else {
        button.innerText = 'Vs Bot Mode';
        button.classList.remove('vs-human-mode');
        button.classList.add('vs-bot-mode');
        resetGrid();
        reset();
        vsBotMode();
    }
}

toggleMode();
