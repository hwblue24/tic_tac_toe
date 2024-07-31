//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [[0,1,2], [0,1,2], [0,1,2]]; 
    
    function createPlayer (initialName, intialMarker) {
        let name = initialName; 
        let marker = intialMarker 
        const getName = () => name;
        const getMarker = () => marker; 
        const setName = (newName) => name = newName;
        const setMarker = (newMarker) => marker = newMarker

        return{getName, getMarker,setName, setMarker}
    
    }
    
    return {gameBoard, createPlayer}

})();  

//IIFE handles gameflow 
const gameController = (function () {
    let round = 1; 
    function playRound () {
        if (round % 2 == 1) { 
            console.log('Player 1 turn');
            console.log(TicTacToe.gameBoard)
            
            insertMarker ('X'); 
            addRound();
            

        } else {
            console.log ('Player 2 turn');
            console.log( TicTacToe.gameBoard)
    
            insertMarker ('O'); 
            addRound();
            
        }
    
    }

    const addRound = () => round++; 
    const getRound = () => round;


    function insertMarker (marker) {
        let subArray = prompt('provide subarray index')
        let index = prompt('provide index number')
        TicTacToe.gameBoard[subArray].splice(index,1, marker );
        console.log(TicTacToe.gameBoard);
    }

    return {playRound, getRound}

})()
