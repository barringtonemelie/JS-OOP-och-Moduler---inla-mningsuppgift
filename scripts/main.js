import Game from "./poker.js"; 

const game = new Game();
//Denna array anges av användaren, samt antalet spelare och hur många rundor spelet ska köras 
const names = ["Britt", "Ulla", "Berit", "Agda"]; 
const howManyPlayers = 4; 
const howManyRounds = 3; 
game.startGame(howManyPlayers, names, howManyRounds); 
