/* A deck of cards is: 
In total 52 cards
Four suits: clubs (all black), diamonds(all red), hearts(all red), spades (all black)
Each suit includes 13 cards: Numerical cards from 1 to 10, Jack, Queen, King and Ace. 
*/ 

/*
Triss: Tre kort av samma valör (vid oavgjort: 1. högsta triss, 2. högst sidokort, 3. högst andra sidokort)
Tvåpar: Två kort av samma valör x2 (vid oavgjort: 1. högsta paret vinner, 2. högsta andra paret vinner, 3. högsta sidokortet)
Par: Två kort av samma valör (vid oavgjort: 1. högsta paret vinner, 2. högst sidokort, 3. högst andra sidokort, 4. högst tredje sidokort)
*/


class Card {
    constructor(suit, value, cardWorth) {
        this.suit = suit; 
        this.value = value; 
        this.cardWorth = cardWorth; 
        this.description = `${this.value} of ${this.suit}`; 
    }
}

class Deck {
    constructor() {
        this.suits = ["spades", "diamonds", "clubs", "hearts"];
        //Högre index = högre värde på kortet (läggs till i loopen nedan)
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        this.deck = [];
        //Generating the deck 
        for (let i = 0; i < this.suits.length; i++) {
            for (let x = 0; x < this.values.length; x++) {
                let card = new Card(this.suits[i], this.values[x], (x+ 1)); //+1 på x för att ett kort inte ska ha värdet 0
                this.deck.push(card); 
            }
        }
        this.throwStack = []; 
    }
}

class Player {
    constructor(name) {
        this.name = name; 
        this.handOfCards = []
        this.totalCardWorth = 0; 
    }

    //Prints the players current hand of cards to the console
    printCards = function() {
        const listOfCards = this.handOfCards.map(card => card.description); 
        console.log(`The cards of ${this.name} are: ${listOfCards.join(", ")}`); 
    }

    sortCards = function() {
        //Sorterar korten från lägst värde till högst
        this.handOfCards.sort((a, b) => {
            if (a.cardWorth < b.cardWorth) {
                return -1; 
            }
            if (a.cardWorth > b.cardWorth) {
                return 1; 
            }
            return 0; 
        });
    }

}

class Dealer {
    
    constructor() {
        //Note to self: är en array med objekt nu - för att komma åt deck-arrayen blir "sökvägen" currentdeck.deck
        this.currentDeck = new Deck(); 
    }

    shuffleDeck = function() {
        //The Fisher-Yates shuffle
        let currentIndex = this.currentDeck.deck.length; 
        let randomIndex; 
        let currentLastCard; 

        while (currentIndex != 0) {
            //Pick a random remaining element 
            randomIndex = Math.floor(Math.random() * currentIndex); 
            currentIndex--; 

            //Swap it with the current last remaining element
            currentLastCard = this.currentDeck.deck[currentIndex]; 
            this.currentDeck.deck[currentIndex] = this.currentDeck.deck[randomIndex]; 
            this.currentDeck.deck[randomIndex] = currentLastCard; 
        }
        return this.currentDeck; 
    }

    //Deals a chosen number of cards to the players 
    dealCards = function (player, numOfCards) {
        const cardsToDeal = this.currentDeck.deck.splice(0, numOfCards); 
        if (player.handOfCards.length != 0) {
            player.handOfCards = player.handOfCards.concat(cardsToDeal); 
        }
        else {
            player.handOfCards = cardsToDeal;
        }
    }

    //Let players throw away a chosen number of cards
    throwCards = function (player, numOfCards, userChoice) {
        //Jag förutsätter att spelaren vill slänga kortet med lägst "värde" - men hade jag ett UI skulle jag ge spelaren möjlighet att välja 

        this.currentDeck.throwStack = this.currentDeck.throwStack.concat(player.handOfCards.splice(0, numOfCards));
    }

    //Add thrown cards back to deck
    returnThrowCards = function () {
        this.currentDeck.deck = this.currentDeck.deck.concat(this.currentDeck.throwStack); 
    }

    printDeck = function () {
        console.log(this.currentDeck.deck); 
    }
}

class Validation {

    //TODO: Skapa en mer verklig validering
    static validatePlayersCards (players) {

        let previousPlayerValue = 0; 
        let winner = ""; 

        players.forEach(player => {
            player.handOfCards.forEach(card => {
                player.totalCardWorth += card.cardWorth; 
            });

            console.log(`${player.name}s total card value is: ${player.totalCardWorth}`); 

            if (previousPlayerValue < player.totalCardWorth) {
                previousPlayerValue = player.totalCardWorth; 
                winner = player.name; 
            }
        });
        
        console.log(`~~~~~****And the winner is: ${winner}****~~~~~`); 
    }
}

class Game {
    constructor() {
        this.playerList = []; 
        this.dealer = new Dealer(); 
    }

    addPlayers = function () {
        console.log("Please enter number of players (at least two), number of rounds, and names of players."); 
    }

    startGame = function (numOfPlayers, playerNames, numOfRounds) {
        game.addPlayers(); 
        //Skapa spelare och lägg in i this.playerList 
        for (let i = 0; i < numOfPlayers; i++) {
            this.playerList.push(new Player(playerNames[i])); 
        }

        //Kör spelet en gång om rounds inte är angivna 
        if (numOfRounds === undefined) {
            //Ge spelarna varsin hand
            this.dealer.shuffleDeck(); 
            this.playerList.forEach(player => {
                this.dealer.dealCards(player, 5); 
                player.printCards(); 
            });

            //Validerar korten och skriver ut vinnaren 
            Validation.validatePlayersCards(this.playerList); 
        }
        //Kör spelet i flera omgångar enligt numOfRounds
        else {
            for (let round = 1; round <= numOfRounds; round++) {
                console.log(`-------ROUND ${round}-------`)
                this.dealer.shuffleDeck(); 

                //Ge spelarna varsin hand
                console.log("--dealing cards--")
                this.playerList.forEach(player => {
                    this.dealer.dealCards(player, 5); 
                    player.printCards(); 
                });

                //Slängningsrunda

                console.log("--throwing cards--"); 
                this.playerList.forEach(player => {
                    console.log(`${player.name}, please choose which cards you would like to throw.`); 
                    //Jag förutsätter att spelaren vill slänga kortet med lägst värde - men hade jag ett UI skulle jag ge spelaren möjlighet att välja 
                    player.sortCards(); 
                    
                    this.dealer.throwCards(player, 2); 
                    player.printCards(); 
                });

                console.log("--dealing new cards--"); 
                //Hade jag kunnat lösa att ha dem i samma loop? Sure, om effektivitet och prestanda var viktigt, men nu blir det här snyggare kod och snyggare i konsolen :) 
                this.playerList.forEach(player => {
                    //Nya kort efter att ha slängt två
                    this.dealer.dealCards(player, 2); 
                    player.printCards(); 
                });
                

                //Validerar korten och skriver ut vinnaren 
                Validation.validatePlayersCards(this.playerList);

                //Resetting the game for next round 
                this.playerList.forEach(player => {
                    this.dealer.throwCards(player, 5); 
                    player.totalCardWorth = 0; 
                });
                this.dealer.returnThrowCards(); 
            }
        }
    }
}

const game = new Game();
//Denna array anges av användaren, samt antalet spelare och hur många rundor spelet ska köras 
const names = ["Britt", "Ulla", "Berit", "Agda"]; 
const howManyPlayers = 4; 
const howManyRounds = 3; 
game.startGame(howManyPlayers, names, howManyRounds); 
