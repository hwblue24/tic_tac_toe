//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [[0,1,2], [0,1,2], [0,1,2]]; 
    const playerList = []; 

    const getPlayerList = () => playerList; 
    
    function createPlayer (initialName, initialMarker) {
        

        let name = initialName; 
        let marker = initialMarker 

    
        playerList.push({name, marker});
        
        const getName = () => name;
        const getMarker = () => marker; 
        const setName = (newName) => name = newName;
        const setMarker = (newMarker) => marker = newMarker
        

        return { getName, getMarker, setName, setMarker };
        
    
    }
    
    return {gameBoard, createPlayer, getPlayerList}

})();  

//need this line otherwise player1 and player2 are empty.
let haroon = TicTacToe.createPlayer('haroon','H');
let dureti = TicTacToe.createPlayer('dureti','D')

//IIFE handles gameflow 
const gameController = (function () {


    let player1 = TicTacToe.getPlayerList()[0];
    let player2 = TicTacToe.getPlayerList()[1];
    let round = 1; 

    function gameRound () { 
        if(round%2 ==1 ) { 
            console.log(`${player1.name}'s turn`)
            console.log(TicTacToe.gameBoard);
            console.log( `Pick an array and its index to mark`)
            let array = prompt('choose an array'); 
            let index = prompt('choose an index');
            let marker = player1.marker 
            indexArrayCheck (array, index, marker);
            round +=1
            
        }else { 
            console.log( `${player2.name}'s turn`)
            console.log(TicTacToe.gameBoard);
            console.log( `Pick an array and its index to mark)`)
            let array = prompt('choose an array'); 
            let index = prompt('choose an index');
            let marker = player2.marker 
            indexArrayCheck (array, index, marker);
            round +=1

        }
    }

    function insertMarker (array,index,marker) {
        if(TicTacToe.gameBoard[array][index] === player1.marker || TicTacToe.gameBoard[array][index] === player2.marker) { 
            console.log( `Spot occupied`)
            gameRound();
        }else { 
            TicTacToe.gameBoard[array].splice(index,1, marker );
        }

         
    }

    function indexArrayCheck (array, index, marker) { 
        if (array>=0 && array<=2 && index>=0 && array<=2) { 
            insertMarker(array,index, marker); 
        }else { 
            console.log("Pick a number between 0 and 2")
            gameRound(); 
        }
    }



    return { player1, player2, gameRound, insertMarker  }


})()


//handles changing nested array values 

//TicTacToe.gameBoard[subArray].splice(index,1, marker );