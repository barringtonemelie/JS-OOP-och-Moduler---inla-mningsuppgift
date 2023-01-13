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
    constructor() {
        this.suits = ["spades", "diamonds", "clubs", "hearts"];
        //Högre index = högre värde på kortet
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        this.deck = [];
    }
    createDeck = function() {
        for (let i = 0; i < this.suits.length; i++) {
            for (let x = 0; x < this.values.length; x++) {
                let card = new Card(this.suits[i], this.values[x], (x+ 1)); //+1 på x för att ett kort inte ska ha värdet 0
                this.deck.push(card); 
            }
        }
        return this.deck; 
    }
}

class Player {
    constructor(name) {
        this.name = name; 
        this.handOfCards = []
    }

    //Method: print cards
    printCards = function() {
        const listOfCards = this.handOfCards.map(card => card.description); 
        console.log(`The cards of ${this.name} are: ${listOfCards.join(", ")}`); 
    }
    //Method: print value of cards
    printCardsValue = function() {
        let cardsTotalValue = 0; 
        this.handOfCards.forEach(card => {
            cardsTotalValue += card.cardWorth; 
        });
        console.log(`${this.name}s totalt card value is: ${cardsTotalValue}`); 
    }
}

class Dealer {
    //Skicka med resultatet av metoden createDeck() från Game
    constructor(currentDeck) {
        this.currentDeck = currentDeck; 
    }

    shuffleDeck = function() {
        //The Fisher-Yates shuffle
        let currentIndex = this.currentDeck.length; 
        let randomIndex; 
        let currentLastCard; 

        while (currentIndex != 0) {
            //Pick a random remaining element 
            randomIndex = Math.floor(Math.random() * currentIndex); 
            currentIndex--; 

            //Swap it with the current last remaining element
            currentLastCard = this.currentDeck[currentIndex]; 
            this.currentDeck[currentIndex] = this.currentDeck[randomIndex]; 
            this.currentDeck[randomIndex] = currentLastCard; 
        }
        return this.currentDeck; 
    }

    dealCards = function (player) {
        const cardsToDeal = this.currentDeck.splice(0, 5); 
        player.handOfCards = cardsToDeal; 
    }

    printDeck = function () {
        console.log(this.currentDeck); 
    }
}

//Playing the game 
const roundOne = new Game(); 
const testDealer = new Dealer(roundOne.createDeck()); 
let playerOne = new Player("Slim"); 
let playerTwo = new Player("Luke"); 



testDealer.shuffleDeck(); 
testDealer.dealCards(playerOne); 
testDealer.dealCards(playerTwo); 
playerOne.printCards(); 
playerTwo.printCards(); 
playerOne.printCardsValue(); 
playerTwo.printCardsValue(); 


