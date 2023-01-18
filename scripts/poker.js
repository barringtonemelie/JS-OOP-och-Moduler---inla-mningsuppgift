/* A deck of cards is: 
In total 52 cards
Four suits: clubs (all black), diamonds(all red), hearts(all red), spades (all black)
Each suit includes 13 cards: Numerical cards from 1 to 10, Jack, Queen, King and Ace. 


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
    throwCards = function (player, numOfCards) {
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
        
        console.log(`And the winner is: ${winner}`); 
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
                this.playerList.forEach(player => {
                    this.dealer.dealCards(player, 5); 
                    player.printCards(); 
                });

                //Slängningsrunda

                //TODO: Skapa metod för att slänga specifikt kort på viss indexplats (låta spelaren välja vilket kort de ska slänga)
                this.playerList.forEach(player => {
                    this.dealer.throwCards(player, 2); 
                    player.printCards(); 
                });
                //Nya kort efter att ha slängt två 
                this.playerList.forEach(player => {
                    this.dealer.dealCards(player, 2); 
                    player.printCards(); 
                });

                //Validerar korten och skriver ut vinnaren 
                Validation.validatePlayersCards(this.playerList);
            }
        }
    }
}

const game = new Game();
//Denna array anges av användaren, samt antalet spelare och hur många rundor spelet ska köras 
const names = ["Britt", "Ulla", "Berit"]; 
const howManyPlayers = 3; 
const howManyRounds = 3; 
game.startGame(howManyPlayers, names, howManyRounds); 
