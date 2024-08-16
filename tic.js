//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [["","",""], ["","",""], ["","",""]]; 
    const playerList = []; 

    const getPlayerList = () => playerList; 
    const getBoard = () => gameBoard; 
    
    //takes player objects adds to list, max 2
    const addPlayer = (name, marker) => {
        if(playerList.length<2) {
            playerList.push({name, marker});
            domLogic.createScoreBoard();

        }else { 
            const dialogFullGame = document.querySelector(".dialogFullGame");
            dialogFullGame.showModal();
            const exitFullMessage = document.querySelector(".dialogFullGame button"); 
            exitFullMessage.addEventListener("click", () => {
                dialogFullGame.close();
            })

        }
    };
    
    
    return {getBoard, getPlayerList, addPlayer}

})();  


//receives name, marker and initializes addPlayer which adds it to a list
function createPlayer (initialName, initialMarker) {
        

    let name = initialName; 
    let marker = initialMarker 

    TicTacToe.addPlayer(name, marker);
  
    
    const getName = () => name;
    const getMarker = () => marker; 
    

    return { getName, getMarker };
    

}




//IIFE handle DOM logic 
const domLogic = (function () { 
    const board = TicTacToe.getBoard();
    const container = document.querySelector(".board");
    (function rendBoard () {
        board.forEach((row) => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add('rows')
            container.appendChild(rowDiv);

            row.forEach(() => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add('cells')
                rowDiv.appendChild(cellDiv);
            });
        });
    })();

    (function createPlayerBtn() {
        //selects create player btn and dialog form and has it pop up, input sent to factory createPlayer
        const createPlayerBtn = document.querySelector(".createPlayer");
        const playerDialog = document.querySelector("#playerDialog");
        createPlayerBtn.addEventListener("click", () => {
            playerDialog.showModal();
        })

        const submit = document.querySelector("#submit"); 
        submit.addEventListener("click", (event) => {
            let initialName = document.querySelector("#name").value;
            let initialMarker = document.querySelector("#marker").value;
            createPlayer(initialName, initialMarker);
            event.preventDefault();
            playerDialog.close();
        });
    })();


    function createScoreBoard () {
        if (TicTacToe.getPlayerList().length === 2) {
            let player1= TicTacToe.getPlayerList()[0].name;
            let player2 = TicTacToe.getPlayerList()[1].name;
            let p1ayer1Marker = TicTacToe.getPlayerList()[0].marker;
            let player2Marker = TicTacToe.getPlayerList()[1].marker;

            const scoreBoard = document.querySelector(".scoreBoard");

            const player1name = document.createElement("div");
            player1name.classList.add('player1');
            player1name.textContent = `${player1} marker:${p1ayer1Marker}`;

            const player2name = document.createElement("div");
            player2name.classList.add('player2');
            player2name.textContent = `${player2} marker:${player2Marker}`;

            scoreBoard.appendChild(player1name);
            scoreBoard.appendChild(player2name);
        }

    }

    return{createScoreBoard}

    
    
    
  
})();


//IIFE handles gameflow 
const gameController = (function () {

    let player1= TicTacToe.getPlayerList()[0];
    let player2 = TicTacToe.getPlayerList()[1];
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
        if(TicTacToe.getBoard()[array][index] === player1.getMarker() || TicTacToe.getBoard()[array][index] === player2.getMarker()) { 
            console.log( `Spot occupied`)
            gameRound();
        }else { 
            TicTacToe.getBoard()[array].splice(index,1, marker );
            winConditionAcross(array, marker);

            console.log(TicTacToe.getBoard());
            round +=1; 
            console.log(round);
            tieCondition(round);
           

        }

    }

   

    function winConditionAcross (array, marker) { 
        let rowMarkerCheck = TicTacToe.getBoard()[array].every((position)=> position === marker); 
        if (rowMarkerCheck) { 
            
            console.log("You win with three across")
        } else {
            winConditionColumn(marker);
        }
    }

    function winConditionColumn (marker) {
        let flatArray = TicTacToe.getBoard().flat();
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
        let flatArray = TicTacToe.getBoard().flat();
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

