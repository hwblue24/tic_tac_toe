//handles game assets 
const TicTacToe = (function () {
    const gameBoard = [[0,1,2], [0,1,2], [0,1,2]]; 
    let playerList = []; 

    const getPlayerList = () => playerList; 
    
    function createPlayer (initialName, intialMarker) {
        

        let name = initialName; 
        let marker = intialMarker 

    
        playerList.push(name)
        

        const getPlayerList = () => playerList;
       
        const getName = () => name;
        const getMarker = () => marker; 
        const setName = (newName) => name = newName;
        const setMarker = (newMarker) => marker = newMarker
        

        return{getName, getMarker,setName, setMarker,getPlayerList}
    
    }
    
    return {gameBoard, createPlayer, getPlayerList}

})();  

//IIFE handles gameflow 
const gameController = (function () {


})()


//handles changing nested array values 

//TicTacToe.gameBoard[subArray].splice(index,1, marker );