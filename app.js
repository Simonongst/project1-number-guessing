/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let randomNumber = 0;
let attempt = 10;
let currentScore = 0;
let highScore = 0;

/*------------------------ Cached Element References ------------------------*/
const startBtnEl = document.querySelector('#start');
const restartBtnEl = document.querySelector('#restart');
const checkBtnEl = document.querySelector('#check');

const hintEl = document.querySelector('#hint');
const guessInputEl = document.querySelector('#guess');
const attemptsEl = document.querySelector('#attempts');

const mainDisplayEl = document.querySelector('main');
const randomNumberDisplayEL = document.querySelector('#randomNumber');
const highScoreDisplayEl = document.querySelector('#score');

/*-------------------------------- Functions --------------------------------*/
function hideMain(){
    mainDisplayEl.style.display = 'none';
};

hideMain()

function generateRandomNumber(){
    randomNumber = Math.ceil(Math.random() * 100);
};

function initGame(){
    generateRandomNumber();
    console.log(randomNumber);
    highScoreDisplayEl.innerHTML = highScore;
    attemptsEl.innerHTML = attempt;
    startBtnEl.style.display = 'none';
    restartBtnEl.style.display = 'none';
    mainDisplayEl.style.display = 'block';
};

function checkInput() {
    const guess = Number(guessInputEl.value);

    if(attempt === 0){
        guessInputEl.value = '';
        guessInputEl.disabled = true;
        hintEl.innerHTML = `No more guesses left, the number was ${randomNumber}. 
        Game Over!`;
        document.body.style.backgroundColor = '#ff0000'
        randomNumberDisplayEL.innerHTML = randomNumber;
        restartBtnEl.style.display = 'block';
        restartBtnEl.style.margin = '0 auto';
        return;
    }

    if(isNaN(guess) || guess < 1 || guess > 100) {
        hintEl.innerHTML = 'Please enter a number between 1 to 100!';
        guessInputEl.value = '';
    } else if(guess < randomNumber){
        hintEl.innerHTML = 'Your guess is too low!';
        attempt--;
        guessInputEl.value = '';
        result();
    } else if (guess > randomNumber) {
        hintEl.innerHTML = 'Your guess is too high!';
        attempt--;
        guessInputEl.value = '';
        result();
    } else if(guess === randomNumber){
        hintEl.innerHTML = '🎉 Correct! You guessed the number!';
        randomNumberDisplayEL.innerHTML = randomNumber;
        updateScore();
        result();
        document.body.style.backgroundColor = '#59ff00';
        restartBtnEl.style.display = 'block';
        restartBtnEl.style.margin = '0 auto';
    } else {

    }
}

function updateScore(){
    currentScore = attempt;
    if(currentScore > highScore){
       highScore = currentScore;
    };
};

function result(){
    attemptsEl.innerHTML = attempt;
    highScoreDisplayEl.innerHTML = highScore;
};

function resetGame(){
    generateRandomNumber();
    console.log(randomNumber);
    randomNumberDisplayEL.innerHTML = '?';
    guessInputEl.disabled = false;
    guessInputEl.value = '';
    hintEl.innerHTML = '';
    attempt = 10;
    result();
};

/*----------------------------- Event Listeners -----------------------------*/
startBtnEl.addEventListener('click', initGame);
checkBtnEl.addEventListener('click', checkInput);
restartBtnEl.addEventListener('click', resetGame);