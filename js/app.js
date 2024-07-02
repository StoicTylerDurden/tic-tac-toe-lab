/*-------------------------------- Constants --------------------------------*/
const winningCombos =
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ]



/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""]
let turn = "X"
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector("#reset")

/*-------------------------------- Functions --------------------------------*/



const placePiece = (index)=>{
    board[index] = turn
}


const render = ()=>{
    updateBoard()
    updateMessage()

}


const init = ()=>{
    board = ["", "", "", "", "", "", "", "", ""]
    turn = "X"
    winner = false
    tie = false
    render()


}

const updateBoard = () => {
    board.forEach((element, index) => {
        // Assign the value from board array to innerText of squareEls
        squareEls[index].innerText = element;
    });
};



const updateMessage = ()=>{
    // If both winner and tie have a value of false (meaning the game is still in progress), render whose turn it is.
    // If winner is false, but tie is true, render a tie message.
    // Otherwise, render a congratulatory message to the player that has won.
    let message = ""
    if(winner === false && tie === false){
        message =`It's ${turn} turn`;
    }
    else if(winner === false && tie === true){
        message = "It's a tie";
    }
    else{
        if (turn === 'X'){
            message = `O Won!`;
        }
        else{
            message =`X Won!`
        }

    }
    messageEl.innerText = message    
}




const handleClick = (event) => {
    const squareIndex = event.target.id;

    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return ("The square is full")
    }

    if (winner === true) {
        console.log("The game is over");
        return
    }
};



const checkForWinner = ()=>{
    winningCombos.forEach(winningCombination=>{
        const [a, b, c] = winningCombination
        if(board[a] !== "" && board[a] === board[b] && board[a]===board[c]){
            winner = true;
            console.log("Winner Found!")
        }
    });
};



const checkForTie = ()=>{

    for(let i=0; i<board.length; i++) {
        if(checkForWinner()){
            return;
        }
        else if(board[i] === ""){
            tie = false
        }
        else{
            console.log("I'm inside the else condition");
            tie = true; 
        }
    }//for loop

} // function

const switchPlayerTurn = ()=>{

        if(turn==='X'){
            turn = 'O'
        }
        else{   
            turn = 'X'
        }
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

init()

