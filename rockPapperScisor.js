const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let humanScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};

const getHumanChoice = (input) => {
  const formattedInput = input.toLowerCase();
  if (choices.includes(formattedInput)) {
    return formattedInput;
  } else {
    console.log("Invalid choice! Please choose rock, paper, or scissors.");
    return null;
  }
};

const playRound = (humanChoice, computerChoice) => {
  console.log(`Computer chose: ${computerChoice}`);
  console.log(`Human chose: ${humanChoice}`);

  if (computerChoice === humanChoice) {
    console.log(`It's a tie! Both chose ${computerChoice}`);
  } else if (
    (computerChoice === 'rock' && humanChoice === 'scissors') ||
    (computerChoice === 'paper' && humanChoice === 'rock') ||
    (computerChoice === 'scissors' && humanChoice === 'paper')
  ) {
    console.log(`Computer wins! ${computerChoice} beats ${humanChoice}`);
    computerScore++;
  } else {
    console.log(`Human wins! ${humanChoice} beats ${computerChoice}`);
    humanScore++;
  }

  console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);
};

const askForChoice = () => {
  rl.question('Enter your choice (rock, paper, scissors) or type "exit" to quit: ', (input) => {
    if (input.trim() === 'exit') {
      rl.close();
    } else {
      const humanChoice = getHumanChoice(input);
      if (humanChoice) {
        const computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
        if (humanScore + computerScore < 5) {
          askForChoice(); // Ask for the next choice if the game is not over
        } else {
          console.log('Game over! Final Score - Human: ' + humanScore + ', Computer: ' + computerScore);
          rl.close();
        }
      } else {
        askForChoice(); // Ask again if the input was invalid
      }
    }
  });
};

console.log('Rock, Paper, Scissors (type exit to close the game):');
askForChoice();

rl.on('close', () => {
  console.log('Goodbye!');
});
