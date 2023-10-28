let turn = "X";
let playerXScore = 0;
let playerOScore = 0;
let gameCount = 0;
let isGameOver = false;

//changes players turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
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

        if((boxes[idx1].innerText===boxes[idx2].innerText)&&(boxes[idx2].innerText===boxes[idx3].innerText))
        {
            if((boxes[idx1].innerText!=="")&&(boxes[idx2].innerText!=="")&&(boxes[idx3].innerText!==""))
            {
                document.querySelector(".result-div").innerHTML=`<h3> Player ${boxes[idx1].innerText} won !!</h3>`
                console.log(`Player ${boxes[idx1].innerText}  won`)
                isGameOver = true;
            }
        }

    }
}

let boxes = Array.from(document.querySelectorAll(".game-box"));

for (let i = 0; i < 9; i++) {
    const element = boxes[i];
    let isClicked = isGameOver?true:false;
  
    element.addEventListener("click", () => {
        console.log(`box ${i + 1} clicked!!`);
        if (!isClicked) {
            if (element.innerText === "") {
                element.innerText = turn;
            }
            checkWin();

            if (!isGameOver) {
                turn = changeTurn();
                document.querySelector(".turn-div").innerHTML = `<h3>Player ${turn} turn </h3>`
            }
            isClicked = true;
        }
        else {
            console.log("element is already clicked");
        }
    })
}
