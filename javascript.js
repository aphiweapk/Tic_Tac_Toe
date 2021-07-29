// player X history Games
    // player X moves
    // player X winning combination
//Player O history Games
    // player X moves
    // player X winning combination

// // Main game plays
//     //  X here
// let countWinsX = 0;
// let countLossesX = 0;
// let countDraws = 0;

//     //  O here
// let countWinsO = 0;
// let countLossesO = 0;


class Game {

    constructor(){
        this.turn = "X"
        this.board = new Array(9).fill(null)
    }

    nextTurn(){
        if(this.turn === 'X'){
            this.turn = 'O'
        }else{
            this.turn = 'X'
        }
    }

    makeMove(i){

        if(this.endOfGame()){
            return;
        }

        if(this.board[i]){
            return;
        }

        this.board[i] = this.turn; // X or O
        let winning = this.findWinningCombinations();
        if(!winning){
            this.nextTurn();
        }
    }

    findWinningCombinations(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]


        for(const combination of winningCombinations){
            const [a, b, c] = combination;
                // Player X wins here
            if( this.board[a] === 'X' && (this.board[a] === this.board[b] && this.board[a] === this.board[c])){
                document.querySelector('.playerO').textContent = 'Wins!'
                document.querySelector('.playerO').style.transform = 'scale(1.5)'

                // add wins history
                let winsC = document.querySelector('.winsX');
                let loseC = document.querySelector('.lossesO');
                
                winsC.textContent = Number.parseInt(winsC.textContent) + 1;
                loseC.textContent = Number.parseInt(loseC.textContent) + 1;
                 let tiles = document.querySelectorAll('.col')
                tiles.forEach(tile => {
                    tile.removeEventListener('click', execute)
                    console.log("reach here")
                });
                return combination;

                // Player O wins here
            } else if(this.board[a] === 'O' && (this.board[a] === this.board[b] && this.board[a] === this.board[c])){
                let container = document.querySelector('#left-table')
                document.querySelector('.playerX').textContent = 'Wins!'
                document.querySelector('.playerX').style.transform = 'scale(1.5)'
                

                // add wins history

                let winsC = document.querySelector('.winsO');
                let loseC = document.querySelector('.lossesX');

                winsC.textContent = Number.parseInt(winsC.textContent) + 1;
                loseC.textContent = Number.parseInt(loseC.textContent) + 1;
                
                let tiles = document.querySelectorAll('.col')
                tiles.forEach(tile => {
                    tile.removeEventListener('click', execute)
                    console.log("reach here")
                });

                return combination;
            } else {
                let tiles = document.querySelectorAll('.col')
                tiles.forEach(tile => {
                    tile.removeEventListener('click', execute)
                })
                ;
            }
        }
        return null;
    }

    endOfGame(){
        let winner = this.findWinningCombinations();
        if(winner){
            return true
        }else{
            return false
        }

    }
}

// Updating Board class

class GameView{
    constructor(){
        console.log('working')
    }

    updateBoard(game){
        for(let i = 0; i < game.board.length; i++){
            let tile = document.querySelector(`.col[data-index="${i}"]`);
            tile.textContent = game.board[i];
            if(game.board[i] === 'X'){
                tile.style.color = 'white';
            }else{
                tile.style.color = 'rgb(80, 80, 80)'
            }
        }
    }
}

let game = new Game();
let gameView = new GameView();

document.querySelector('#start').addEventListener('click', () => {
    onRestartClick();
})

let tiles = document.querySelectorAll('.col')

function execute() {
onTileClick(tile.dataset.index)
}

tiles.forEach(tile => {
    tile.addEventListener('click', execute)
});

function onTileClick(index){
    // make move
    game.makeMove(index)
    // update board
    gameView.updateBoard(game)

}

function onRestartClick(){
    game = new Game();
    gameView.updateBoard(game)
    document.querySelector('.playerO').textContent = 'Player O'
    document.querySelector('.playerX').textContent = 'Player X'
    document.querySelector('.playerO').style.transform = 'scale(1)'
    document.querySelector('.playerX').style.transform = 'scale(1)'
    gameView.updateBoard(game)
    document.querySelector('.playerX').style.borderBottom = '5px solid grey'
    document.querySelector('.playerO').style.borderBottom = '5px solid grey'
    gameView.updateBoard(game)
}
