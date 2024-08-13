//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [["","",""], ["","",""], ["","",""]]; 
    const playerList = []; 

    const getPlayerList = () => playerList; 
    
    function createPlayer (initialName, initialMarker) {
        

        let name = initialName; 
        let marker = initialMarker 
      
    
        playerList.push({name, marker});
        
        const getName = () => name;
        const getMarker = () => marker; 
        
        // const setName = (newName) => name = newName;
        // const setMarker = (newMarker) => marker = newMarker
        

        return { getName, getMarker, };
        
    
    }
    
    return {gameBoard, createPlayer, getPlayerList}

})();  

//need this line otherwise player1 and player2 are empty.
let player1= TicTacToe.createPlayer('haroon','H');
let player2 = TicTacToe.createPlayer('dureti','D')

//IIFE handles gameflow 
const gameController = (function () {

    let round = 1; 
    

    function gameRound () { 
        if(round%2 ==1 ) { 
            console.log(`${player1.getName()}'s turn`)
            
            let marker = player1.getMarker();
            playerInputs (marker);
            
        }else { 
            console.log( `${player2.getName()}'s turn`)
            let marker = player2.getMarker(); 
            playerInputs (marker);
        

        }
    }

    function playerInputs (marker) { 
        console.log( `Pick an array and its index to mark`)
        let array = prompt('choose an array'); 
        let index = prompt('choose an index');
        gameBoardLimiter (array, index, marker);
        
    }

    function gameBoardLimiter (array, index, marker) { 
        if (array>=0 && array<=2 && index>=0 && index<=2) { 
            insertMarker(array,index, marker); 
        }else { 
            console.log("Pick a number between 0 and 2")
            gameRound();
        }
    }


    function insertMarker (array,index,marker) {
        if(TicTacToe.gameBoard[array][index] === player1.getMarker() || TicTacToe.gameBoard[array][index] === player2.getMarker()) { 
            console.log( `Spot occupied`)
            gameRound();
        }else { 
            TicTacToe.gameBoard[array].splice(index,1, marker );
            winConditionAcross(array, marker);

            console.log(TicTacToe.gameBoard);
            round +=1; 
            console.log(round);
            tieCondition(round);
           

        }

    }

   

    function winConditionAcross (array, marker) { 
        //every method checks if it is true that the entire row only has the player marker in it
        let rowMarkerCheck = TicTacToe.gameBoard[array].every((position)=> position === marker); 
        if (rowMarkerCheck) { 
            
            console.log("You win with three across")
        } else {
            winConditionColumn(marker);
        }
    }

    function winConditionColumn (marker) {
        let flatArray = TicTacToe.gameBoard.flat();
        let columnOne = [flatArray[0],flatArray[3],flatArray[6]]
        let columnTwo = [flatArray[1],flatArray[4],flatArray[7]]
        let columnThree = [flatArray[2],flatArray[5],flatArray[8]]
        if (columnOne.every((position)=> position === marker)|| columnTwo.every(position => position === marker) || columnThree.every(position => position === marker)) {
            
            console.log("You win with 3 vertical")
        } else { 
            winConditionDiagonal(marker);
        }

    }

    function winConditionDiagonal (marker) { 
        let flatArray = TicTacToe.gameBoard.flat();
        let diagLeftToRight = [flatArray[0], flatArray[4], flatArray[8]]
        let diagRightToLeft = [flatArray[2], flatArray[4], flatArray[6]]
        if (diagLeftToRight.every((position) => position === marker) || diagRightToLeft.every((position)=> position === marker)) {
            
            console.log('You win with 3 diagonal')
        } 

    }

    function tieCondition (round) {
        if(round === 10) { 
            console.log ("Tie game")

        }


    }

 




    return { gameRound }


})()


