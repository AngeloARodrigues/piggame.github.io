'use strict';

//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {

    //starting conditions

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
};



//rolling dice functionality
btnRoll.addEventListener('click', function () {
    //1. generete a random dice roll
    if (playing) {

        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. display the dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`

        //3. check for a rolled 1: if its true switch for next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    //1 add current score to active player
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2 check if current player score >=100
        //finish the game

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEL.classList.add('hidden');
        } else {
            //switch next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);