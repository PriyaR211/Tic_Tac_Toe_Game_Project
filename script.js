let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-game");
let card1 = document.querySelector("#card1");
let card2 = document.querySelector("#card2");


let turnO = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    for (let box of boxes) {
        box.style.backgroundColor = "#e2e7e7";
    }
    winRes = false;
}

for (let ele of boxes) {
    ele.addEventListener("click", () => {
        // console.log("Box is clicked");
        if (turnO) {
            card1.style.fontSize = "2rem";
            card1.style.fontWeight = "600";
            card1.innerText = "Player X turn -"
            card2.innerText = "";
            ele.innerText = "O";
            turnO = false;
        }
        else if (!turnO) {
            card2.style.fontSize = "2rem";
            card2.style.fontWeight = "600";
            card2.innerText = "Player O turn -"
            card1.innerText = "";
            ele.innerText = "X";
            ele.style.color = "#00308F";
            turnO = true;
        }
        ele.disabled = true;
        checkWinner();
        checkDraw();
    });
}

let disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

let enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

function showWinner(winner) {
    msg.innerText = `Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    card1.innerText = "";
    card2.innerText = "";
    disableBoxes();
}


let winRes = false;
function checkWinner() {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                winRes = true;
                boxes[pattern[0]].style.backgroundColor = "#4ce64c";
                boxes[pattern[1]].style.backgroundColor = "#4ce64c";
                boxes[pattern[2]].style.backgroundColor = "#4ce64c";
            }
        }

    }

}

function checkDraw() {
    let count = 0;
    for (let box of boxes) {
        if (box.innerText != "") {
            console.log(box.innerText);
            count++;
            console.log("count of box filled", count);
        }
    }
    if (count == 9 && winRes == false) {
        showDraw();
    }
    // console.log("hlo");
}

function showDraw() {
    msg.innerText = `High Competition!! Match is drawn!`;
    msgContainer.classList.remove("hide");
    card1.innerText = "";
    card2.innerText = "";
    disableBoxes();
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);





