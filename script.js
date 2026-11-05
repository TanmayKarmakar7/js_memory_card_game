const gameBoard = document.querySelector("#game-board");
const movesDisplay = document.querySelector("#moves");
const restartBtn = document.querySelector("#restart");
const message = document.querySelector("#message");

const emojis = ["🍎", "🐶", "🚀", "🎈", "🌙", "⚽", "🎸", "🍕"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;


// Shuffle function
function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


// Game Board function
function createBoard(){
    gameBoard.innerHTML = "";

    const cards = shuffle([...emojis, ...emojis]);

    cards.forEach((emoji) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}


// Flip Card function
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    if(this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.emoji;

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}


// Check for a match
function checkMatch(){
    if(firstCard.dataset.emoji === secondCard.dataset.emoji) {
        handleMatch();
    } else {
        handleMisMatch();
    }
}


// Card Matched
function handleMatch(){
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    resetTurn();

    if(matchedPairs === emojis.length){
        message.textContent = "You won in " + moves + " moves!";
    }
}

// Card MisMatched
function handleMisMatch(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";

        resetTurn();

    }, 1000)
}


// reset turn
function resetTurn(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}


// Restart the game
function restartGame(){
    moves = 0;
    matchedPairs = 0;
    movesDisplay.textContent = moves;
    message.textContent = "";
    resetTurn();
    createBoard();
}

restartBtn.addEventListener("click", restartGame);

// Start the game
createBoard();