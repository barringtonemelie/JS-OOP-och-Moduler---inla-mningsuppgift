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

class Game {
    //TODO: Härifrån ska hela spelet köras sen 
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
    }

    //Prints the players current hand of cards to the console
    printCards = function() {
        const listOfCards = this.handOfCards.map(card => card.description); 
        console.log(`The cards of ${this.name} are: ${listOfCards.join(", ")}`); 
    }
    
    //Prints the value of the players current hand of cards to the console
    printCardsValue = function() {
        let cardsTotalValue = 0; 
        this.handOfCards.forEach(card => {
            cardsTotalValue += card.cardWorth; 
        });
        console.log(`${this.name}s total card value is: ${cardsTotalValue}`); 
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

//Playing the game 

const dealerOne = new Dealer(); 

const playerOne = new Player("Slim"); 
const playerTwo = new Player("Luke"); 

dealerOne.shuffleDeck(); 

dealerOne.printDeck(); 

dealerOne.dealCards(playerOne, 5); 
dealerOne.dealCards(playerTwo, 5); 

playerOne.printCards(); 
playerTwo.printCards(); 

playerOne.printCardsValue(); 
playerTwo.printCardsValue(); 


dealerOne.throwCards(playerOne, 2); 
dealerOne.throwCards(playerTwo, 2); 


playerOne.printCards(); 
playerTwo.printCards(); 

dealerOne.dealCards(playerOne, 2); 
dealerOne.dealCards(playerTwo, 2); 

playerOne.printCards(); 
playerTwo.printCards(); 

dealerOne.printDeck();

playerOne.printCardsValue(); 
playerTwo.printCardsValue(); 

dealerOne.throwCards(playerOne, 5); 
dealerOne.throwCards(playerTwo, 5); 

playerOne.printCardsValue(); 
playerTwo.printCardsValue(); 

dealerOne.returnThrowCards(); 

dealerOne.printDeck(); 


dealerOne.shuffleDeck(); 
dealerOne.printDeck(); 

dealerOne.shuffleDeck(); 
dealerOne.printDeck(); 