//handles game assets 
const TicTacToe = (function () {
    const gameboard = [[0,1,2], [0,1,2], [0,1,2]]; 
    const player1 = {
        name: 'player 1',
        marker: "X",

    }; 

    const player2 = { 
        name: 'player 2',
        marker: "O", 
    };
 
    return {gameboard}

})();


//IIFE handles gameflow 
const gameController = (function () {
    let round = 1; 
    function playRound () {
        if (round % 2 == 1) { 
            console.log('Player 1 turn');
            console.log(TicTacToe.gameboard)
            
            insertMarker ('X'); 
            addRound();
            

        } else {
            console.log ('Player 2 turn');
            console.log( TicTacToe.gameboard)
    
            insertMarker ('O'); 
            addRound();
            
        }
    
    }

    const addRound = () => round++; 
    const getRound = () => round;


    function insertMarker (marker) {
        let subArray = prompt('provide subarray index')
        let index = prompt('provide index number')
        TicTacToe.gameboard[subArray].splice(index,1, marker );
        console.log(TicTacToe.gameboard);
    }

    return {playRound, getRound}

})()
