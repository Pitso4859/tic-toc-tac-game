const cells = document.querySelectorAll("[data-cell]");
const winnerText = document.getElementById("winner-text");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === currentPlayer &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            winnerText.textContent = `${currentPlayer} wins! 🎉`;
            winnerText.style.opacity = "1";
            cells.forEach(cell => cell.classList.add("taken"));
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
        return;
    }

    if (checkDraw()) {
        winnerText.textContent = "It's a Draw! 🤝";
        winnerText.style.opacity = "1";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    winnerText.textContent = "";
    winnerText.style.opacity = "0";
    currentPlayer = "X";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
