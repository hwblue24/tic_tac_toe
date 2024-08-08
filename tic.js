//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [[0,1,2], [0,1,2], [0,1,2]]; 
    const playerList = []; 

    const getPlayerList = () => playerList; 
    
    function createPlayer (initialName, initialMarker) {
        

        let name = initialName; 
        let marker = initialMarker 
        let rowArray = [];
        let columnIndex = [];
    
        playerList.push({name, marker});
        
        const getName = () => name;
        const getMarker = () => marker; 
        const getRowArray = () => rowArray;
        const getColumnIndex = () => columnIndex;
        // const setName = (newName) => name = newName;
        // const setMarker = (newMarker) => marker = newMarker
        

        return { getName, getMarker, getRowArray, getColumnIndex };
        
    
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
        gameBoardLimiter (array, index, marker)
        
    }

    function gameBoardLimiter (array, index, marker) { 
        if (array>=0 && array<=2 && index>=0 && array<=2) { 
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
            //rowIndexTracker(array, index, marker)
            console.log(TicTacToe.gameBoard);
            round +=1; 
            console.log(round);

        }

    }

    /*function rowIndexTracker (array, index, marker) {
        if( marker === player1.getMarker()) { 
            player1.getRowArray().push(array);
            player1.getColumnIndex().push(index);

        } else { 
            player2.getRowArray().push(array);
            player2.getColumnIndex().push(index);

        }


    }*/


    return { player1, player2, gameRound, insertMarker  }


})()
