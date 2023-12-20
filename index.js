const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const greater = document.getElementById('greater');
const lower = document.getElementById('lower')
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  

  if(guess < 0){
    greater.style.display = 'none';
    lower.style.display = 'none';
    numberOfGuessesMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    greater.style.color = 'red';
    greater.style.display = '';
  }else if(guess >= 100){
    greater.style.display = 'none';
    lower.style.display = 'none';
    numberOfGuessesMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    lower.style.color = 'red';
    lower.style.display = '';
  }else if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    greater.style.display = 'none';
    lower.style.display = 'none';
    numberOfGuessesMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    correctMessage.style.display = '';
    // It would be unfair for me to reduce attempts to the user for not reading well :D
    attempts = attempts + 1;

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guess !== targetNumber) {
    // It would be unfair for me to reduce attempts to the user for not reading well :D
    attempts = attempts + 1;

    greater.style.display = 'none';
    lower.style.display = 'none';
    numberOfGuessesMessage.style.display = 'none';
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else if(guess > targetNumber) {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
      if(remainingAttempts > 1){
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
      }else{
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
      }
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';


  
 
}
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
} 

hideAllMessages();
  

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
