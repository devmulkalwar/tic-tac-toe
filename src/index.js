const turnElement = document.querySelector(".turn-div")
turnElement.innerHTML = `<h3>Player X Turn </h3>`;
let turn = "X";
let gameCount = 0;
let playerXScore = 0;
let playerOScore = 0;
let isGameOver = false;

//function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

//function to check win 
const checkWin = () => {
    let boxtext = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector(".result-div").innerHTML = `<h3>Player ${boxtext[e[0]].innerText} Won!!</h3>`;
            if (boxtext[e[0]].innerText === "X") {
                playerXScore++;
                document.querySelector(".player-x-div").innerHTML += `<h3>${playerXScore}</h3>`
            }
            else {
                playerOScore++;
                document.querySelector(".player-o-div").innerHTML += `<h3>${playerOScore}</h3>`
            }
            gameCount++;
            isGameOver = true;
        }
    })
}

//function to reset game
const reset = () => {

}

let boxes = document.getElementsByClassName("game-box");
console.log(boxes);
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!isGameOver) {
                turnElement.innerHTML = `<h3>Player ${turn} Turn </h3>`;
            }
        }
    })
});
