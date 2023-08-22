const gameBoard = document.querySelector('#gameboard');
const info = document.querySelector('#info');
let display = "circle";
const startCells = [
    '', '', '', '', '', '', '', '', ''
];

info.textContent = "The circle plays first";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');

        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addPlayerTicTac)

        gameBoard.append(cellElement);
    })
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    const winningSpots = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    winningSpots.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle')
        )

        if(circleWins) {
            info.textContent = "Circle won!";

            allSquares.forEach(square =>
                square.replaceWith(square.cloneNode(true))
            )

            return;
        }
    })

    winningSpots.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross')
        )

        if(crossWins) {
            info.textContent = "Cross won!";

            allSquares.forEach(square =>
                square.replaceWith(square.cloneNode(true))
            )

            return;
        }
    })
}

function addPlayerTicTac(e) {
    const playerDisplay = document.createElement('div');

    playerDisplay.classList.add(display);
    e.target.append(playerDisplay);
    //console.log(e.target);

    display = display === "circle" ? "cross" : "circle";
    info.textContent = "It is now " + display + "'s turn.";
    e.target.removeEventListener('click', addPlayerTicTac);

    checkScore();
}

createBoard();