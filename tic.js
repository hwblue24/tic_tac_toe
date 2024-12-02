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
            domLogic.createScoreBoard(name, marker);
            if (playerList.length === 2 ) { 
                gameController.startGame();
            }
          
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


//IIFE handles creating board with rows and columns and handles player creation 
const domLogic = (function () { 
    const board = TicTacToe.getBoard();
    const container = document.querySelector(".board");
    (function rendBoard () {
        board.forEach((row, index) => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add(`rows`,`${index}`)
            container.appendChild(rowDiv);

            row.forEach((_, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add(`cells`, `${index}`)
                rowDiv.appendChild(cellDiv);
            });
        });
    })();

    (function createPlayerBtn() {
        //selects create player btn and dialog form and has it pop up, input sent to factory createPlayer
        const createPlayerBtn = document.querySelector(".createPlayer");
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



//receives name, marker and initializes addPlayer which adds it to a list
function createPlayer (initialName, initialMarker) {

    let name = initialName; 
    let marker = initialMarker 

    TicTacToe.addPlayer(name, marker);
    

}

    function createScoreBoard (name, marker) {

        const name1 = name;
        const marker1 = marker; 

        const scoreBoard = document.querySelector(".scoreBoard");
        
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.textContent = `${name1} marker:${marker1}`

        scoreBoard.appendChild(playerDiv);
        

    }

    return{createScoreBoard}

  
})();


//IIFE handles gameflow 
const gameController = (function() {

    let round = 1; 
    
    
    const getRound = () => round; 

    function startGame () {
        let player1obj= TicTacToe.getPlayerList()[0];
        let player2obj = TicTacToe.getPlayerList()[1];

        const boardContainer = document.querySelector(".board")

        boardContainer.addEventListener("click", (event) => {
            const target = event.target; 
            if( round % 2 === 1 && target.textContent === "" ) {
                target.textContent = player1obj.marker;
                marker = player1obj.marker
                trackInput(target, marker);
                round++
                console.log(round)

            }else if ( round % 2 === 0 && target.textContent === "") { 
                target.textContent = player2obj.marker;
                marker = player2obj.marker 
                trackInput(target, marker);
                round++
                console.log(round)

            }
                
               
        })

    //figured out how to get row and cell number based on click event. Now if I could input that into splice method I should be fine
        function trackInput (target, marker) { 
            board = TicTacToe.getBoard();
            row = target.parentElement.classList
            column = target.classList
            r = row[1]; 
            c = column[1]
            board[r][c] = marker
            console.log(board);
    
    
        }

    
        
    }

    // function gameBoardLimiter (array, index, marker) { 
    //     if (array>=0 && array<=2 && index>=0 && index<=2) { 
    //         insertMarker(array,index, marker); 
    //     }else { 
    //         console.log("Pick a number between 0 and 2")
    //         gameRound();
    //     }
    // }

   

    // function insertMarker (array,index,marker) {
    //     if(TicTacToe.getBoard()[array][index] === player1.getMarker() || TicTacToe.getBoard()[array][index] === player2.getMarker()) { 
    //         console.log( `Spot occupied`)
    //         gameRound();
    //     }else { 
    //         TicTacToe.getBoard()[array].splice(index,1, marker );
    //         winConditionAcross(array, marker);

    //         console.log(TicTacToe.getBoard());
    //         round +=1; 
    //         console.log(round);
    //         tieCondition(round);
           

    //     }

    // }

   

    // function winConditionAcross (array, marker) { 
    //     let rowMarkerCheck = TicTacToe.getBoard()[array].every((position)=> position === marker); 
    //     if (rowMarkerCheck) { 
            
    //         console.log("You win with three across")
    //     } else {
    //         winConditionColumn(marker);
    //     }
    // }

    // function winConditionColumn (marker) {
    //     let flatArray = TicTacToe.getBoard().flat();
    //     let columnOne = [flatArray[0],flatArray[3],flatArray[6]]
    //     let columnTwo = [flatArray[1],flatArray[4],flatArray[7]]
    //     let columnThree = [flatArray[2],flatArray[5],flatArray[8]]
    //     if (columnOne.every((position)=> position === marker)|| columnTwo.every(position => position === marker) || columnThree.every(position => position === marker)) {
            
    //         console.log("You win with 3 vertical")
    //     } else { 
    //         winConditionDiagonal(marker);
    //     }

    // }

    // function winConditionDiagonal (marker) { 
    //     let flatArray = TicTacToe.getBoard().flat();
    //     let diagLeftToRight = [flatArray[0], flatArray[4], flatArray[8]]
    //     let diagRightToLeft = [flatArray[2], flatArray[4], flatArray[6]]
    //     if (diagLeftToRight.every((position) => position === marker) || diagRightToLeft.every((position)=> position === marker)) {
            
    //         console.log('You win with 3 diagonal')
    //     } 

    // }

    // function tieCondition (round) {
    //     if(round === 10) { 
    //         console.log ("Tie game")

    //     }


    // }

 
    return {startGame, getRound };


})();

