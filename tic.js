//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [[0,1,2], [0,1,2], [0,1,2]]; 
    const playerList = []; 

    const getPlayerList = () => playerList; 
    
    function createPlayer (initialName, initialMarker) {
        

        let name = initialName; 
        let marker = initialMarker 
        let a0 = 0; 
        let a1 = 0; 
        let a2 = 0;
        let i0 = 0; 
        let i1 = 0; 
        let i2 = 0;
    
        playerList.push({name, marker});
        
        const getName = () => name;
        const getMarker = () => marker; 
        const getA0 = () => a0;
        const getA1 = () => a1;
        const getA2 = () => a2; 
        const getI0 = () => i0; 
        const getI1 = () => i1; 
        const getI2 = () => i2;
        const incrementA0 = () => a0+=1 ;
        const incrementA1 = () => a1+=1; 
        const incrementA2 = () => a2+=1; 
        const incrementI0 = () => i0+=1 ;
        const incrementI1 = () => i1+=1; 
        const incrementI2 = () => i2+=1; 
        // const setName = (newName) => name = newName;
        // const setMarker = (newMarker) => marker = newMarker
        

        return { getName, 
            getMarker, 
            getA0, 
            getA1, 
            getA2, 
            getI0, 
            getI1, 
            getI2, 
            incrementA0, 
            incrementA1,
            incrementA2,
            incrementI0, 
            incrementI1, 
            incrementI2 };
        
    
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
            incrementArray(array, marker);
            incrementIndex(index, marker);
            winCondition(marker);
            console.log(TicTacToe.gameBoard);
            round +=1; 
            console.log(round);
           

        }

    }

    function incrementArray(array, marker) { 
        if (marker === player1.getMarker()) {
            if (array == 0) {
                player1.incrementA0();
            } else if ( array == 1 ) {
                player1.incrementA1(); 
            } else if (array == 2 ) { 
                player1.incrementA2();
            }

        } else if (marker === player2.getMarker()) {
            if (array == 0){
                player2.incrementA0();
            } else if ( array == 1 ) {
                player2.incrementA1(); 
            } else if (array == 2 ) { 
                player2.incrementA2();
            }
        }
    }

    function incrementIndex(index, marker) { 
        if (marker === player1.getMarker()) {
            if (index == 0) {
                player1.incrementI0();
            } else if ( index == 1 ) {
                player1.incrementI1(); 
            } else if (index == 2 ) { 
                player1.incrementI2();
            }

        } else if (marker === player2.getMarker()) {
            if (index == 0){
                player2.incrementI0();
            } else if ( index == 1 ) {
                player2.incrementI1(); 
            } else if (index == 2 ) { 
                player2.incrementI2();
            }
        }
    }

    function winCondition (marker) { 
        if( round >=5 && marker === player1.getMarker()) {
            //array is the rows. If a row is 3 you win..
            if (player1.getA0() === 3 || player1.getA1() === 3 || player1.getA2 ()=== 3 ) { 
                console.log(`${player1.getName()} is the winner` );
            } else if (player1.getI0() === 3 || player1.getI1() === 3 || player1.getI2() === 3 ) {
                console.log(`${player1.getName()} is the winner` );
            } else if (player1.getA0()+player1.getA1()+player1.getA2()+player1.getI0()+player1.getI1()+player1.getI2()>=6); {
                console.log(`${player1.getName()} is the winner` );

            }
                

        } else if (round >=5 && marker === player2.getMarker()) {
            if (player2.getA0() === 3 || player2.getA1() === 3 || player2.getA2() === 3 ) { 
                console.log(`${player2.getName()} is the winner` );
            } else if (player2.getI0() === 3 || player2.getI1 ()=== 3 || player2.getI2() === 3 ) {
                console.log(`${player2.getName()} is the winner` );
            } else if (player2.getA0()+player2.getA1()+player2.getA2()+player2.getI0()+player2.getI1()+player2.getI2()>=6); {
                console.log(`${player2.getName()} is the winner` );
            }
                

        } 
    }





    return { player1, player2, gameRound }


})()


