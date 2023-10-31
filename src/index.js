//variable declaration
let turn = "X";
let playerXScore = 0;
let playerOScore = 0;
let gameCount = 0;
let moveCount = 0;
let isGameOver = false;

let boxes = Array.from(document.querySelectorAll(".game-box"));

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
    moveCount = 0;
    turn = "X";
    document.querySelector(".result-div").innerHTML = "";
    isGameOver = false;
}


// Function to handle box click
const handleBoxClick = (index) => {
    if (!isGameOver && boxes[index].innerText === "") {
        boxes[index].innerText = turn;
        moveCount++;
        console.log(moveCount);
        checkResult();

        if (!isGameOver) {
            turn = changeTurn();
            document.querySelector(".turn-div").innerHTML = `<h3>Player ${turn} turn </h3>`
        }
    } else {
        console.log("Invalid move");
    }
}

// Add event listeners to each box
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
        console.log(`box ${i + 1} clicked!!`);
        handleBoxClick(i);
    });
}

