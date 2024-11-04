let money = 25;
let highest = 0;
let drawnNumbers = [];
let s1 = 0;
let s2 = 0;

const messageElement = document.getElementsByClassName("mb-4")[0]; 
const addCard = document.getElementById('btn1');
const dealer = document.getElementById('message-el');
const cards = document.getElementById('cards-el'); 
const fund = document.getElementById('sum-el');
const endGameButton = document.getElementById('btn2'); 

function startGame() { 
    messageElement.textContent = "Blackjack";
    dealer.textContent = "Dealer: ";
    cards.textContent = "Yours: ";
    fund.textContent = "Money: " + money + "$";

    drawnNumbers = [];
    s1 = 0;
    s2 = 0;

    addCard.textContent = "Add Card";
    addCard.onclick = function() {
        playerAdd();
    };
    endGameButton.textContent = "Give up";
    endGameButton.onclick = function() {
        endGame();
    };
}

function playerAdd() {
    if (money <= 0) {
        endGame();
        return;
    }

    let player;

    do {
        player = Math.floor(Math.random() * 13 + 1);
    } while (drawnNumbers.filter(num => num === player).length >= 2);

    drawnNumbers.push(player);
    s1 += player;

    cards.textContent += player + ' ';
    theHouse();
}

function theHouse() {
    let house;

    do {
        house = Math.floor(Math.random() * 13 + 1);
    } while (drawnNumbers.filter(num => num === house).length >= 2);

    drawnNumbers.push(house);
    s2 += house;
    console.log("Player Score:", s1, "Dealer Score:", s2);

    dealer.textContent += house + ' ';
    victory();
}

function victory() {
    if (s1 === 21) {
        messageElement.textContent = "You win with 21!";
        addCard.disabled = true;
        endGameButton.disabled = true;
        money += 10; 
        setTimeout(() => {
            startGame();
            addCard.disabled = false;
            endGameButton.disabled = false;
        }, 1000);
    } else if (s1 > 21) {
        messageElement.textContent = "You lost!";
        addCard.disabled = true;
        endGameButton.disabled = true;
        money -= 8;
        if (money <= 0) {
            setTimeout(() => {
                endGame();
            }, 1000);
        } else {
            setTimeout(() => {
                startGame();
                addCard.disabled = false;
                endGameButton.disabled = false;
            }, 1000);
        }
    } else if (s2 > 21) {
        messageElement.textContent = "You win!";
        addCard.disabled = true;
        endGameButton.disabled = true;
        money += 5; 
        setTimeout(() => {
            startGame();
            addCard.disabled = false;
            endGameButton.disabled = false;
        }, 1000);
    }
}

function endGame() {
    highest = money;
    messageElement.textContent = "Game over";
    fund.textContent = "Last Round: " + highest + "$";
    addCard.textContent = "Start Over";
    addCard.onclick = function() {
        money = 15;
        startGame();
    };
}

function Rules() {
    let container = document.getElementsByClassName("container mt-5")[0];
    if (container) {
        container.innerHTML = '';
    }

    const title = document.createElement('h1');
    title.className = "mb-4"; 
    title.textContent = "Blackjack"; 

    const sub = document.createElement('h2');
    sub.className = "mb-4"; 
    sub.textContent = "Game rules"; 

    const rule1 = document.createElement('p');
    rule1.textContent = "Aim to beat the dealer by having a hand value as close to 21 as possible without exceeding it.";

    const rule2 = document.createElement('p');
    rule2.textContent = "We will only use two suits, so 26 cards in total. Getting 21 gets you 10$, losing -8, winning +5.";

    const btn = document.createElement('button');
    btn.className = "btn"; 
    btn.onclick = function() {
        location.reload();
    };    
    btn.textContent = "START GAME";

    container.appendChild(title);
    container.appendChild(sub);
    container.appendChild(rule1);
    container.appendChild(rule2);
    container.appendChild(btn);
}
