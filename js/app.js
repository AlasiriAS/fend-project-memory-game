/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const myCard = document.querySelectorAll('.card');

let cardIcons = [];
let chechMatch = [];

const myMoves = document.querySelector('.moves');
const myStars = document.querySelector('.stars');
const myRestart = document.querySelector('.restart');
const myTime = document.querySelector('.time');
myMoves.textContent = 0; //reset the moves 
let numberOfMoves = 0;
let numberOfStars = 3;
let numberOfMatched = 0;
let sec = 0;
let min = 0;
// Time Interval
let myTimeInterval = setInterval(updateTime, 1000);

// retart icon
myRestart.addEventListener('click', retry);
retry();

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("playAgain");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    retry();
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// function to make all the cards closed down
function closeCards() {
    for (card of myCard) {
        card.classList.remove('open', 'show', 'match');
    }
}

// function to add icons and events listener to the cards
function addIcons() {
    for (card of myCard) {
        let icons = card.children[0];
        cardIcons.push(icons.className);
        card.addEventListener('click', cardClick);
    }
}

// function to Shuffle Cards
function shuffleCards() {
    cardIcons = shuffle(cardIcons);
    let i = 0;
    for (card of myCard) {
        let cardName = card.children[0];
        cardName.className = cardIcons[i];
        i++;
    }
}

function cardClick() {
    if (chechMatch.length <= 1) {
        if (this.className === 'card open show') {
            // same opened card, don't take it again
        } else {
            this.className = 'card open show';
            chechMatch.push(this);
        }
    }

    if (chechMatch.length > 1) {
        if (chechMatch[0].children[0].className === chechMatch[1].children[0].className) {
            currectMatch(); // calling function 
        } else {
            wrongMatch(); // calling function 
        }
    }
}

// function for the currect match
function currectMatch() {
    // correct try, add match to them, and remove the EventListener
    chechMatch[0].classList.toggle('match');
    chechMatch[1].classList.toggle('match');
    chechMatch[0].removeEventListener('click', cardClick);
    chechMatch[1].removeEventListener('click', cardClick);
    chechMatch = []; // reset the array
    updateMove();
    numberOfMatched++;
    allMatched(); // to check if all are matched
}
// function for the wrong match
function wrongMatch() {
    // wrong try , close them and empty the array
    updateMove();
    // little time to fold the card down.
    setTimeout(() => {
        chechMatch[0].classList.remove('open', 'show');
        chechMatch[1].classList.remove('open', 'show');
        chechMatch = [];
    }, 1000);
}

// function for the increment of move
function updateMove() {
    numberOfMoves++;
    myMoves.textContent = numberOfMoves;

    // if from 8-11 : 3 stars! , 12-17 2, rest 1 star
    if (numberOfMoves === 12) {
        numberOfStars--;
        myStars.children[0].style.visibility = "collapse";
    } else if (numberOfMoves === 18) {
        numberOfStars--;
        myStars.children[1].style.visibility = "collapse";
    }
}

// function to update time
function updateTime() {
    sec++;
    // for incrementing minutes
    if (sec === 60) {
        sec = 0;
        min++;
    }
    if (sec < 10) {
        myTime.textContent = min + ':0' + sec;
    } else {
        myTime.textContent = min + ':' + sec;
    }

}
// checking if all cards are matched
function allMatched() {
    if (numberOfMatched === 8) {
        // stop time counter
        clearInterval(myTimeInterval);
        //showing message model 
        document.querySelector('.starNum').innerHTML = numberOfStars;
        document.querySelector('.timer').innerHTML = myTime.textContent;
        document.querySelector('.movesNum').innerHTML = numberOfMoves;
        modal.style.display = "block";
    }
}

// function to restart 
function retry() {
    addIcons();
    shuffleCards();
    closeCards();
    myMoves.textContent = 0;
    numberOfMoves = 0;
    numberOfMatched = 0;
    // reseting stars
    numberOfStars = 3;
    myStars.children[0].style.visibility = "visible";
    myStars.children[1].style.visibility = "visible";
    // reseting time
    clearInterval(myTimeInterval);
    myTimeInterval = setInterval(updateTime, 1000);
    sec = 0;
    min = 0;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */