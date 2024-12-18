#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
//All questions are in questions.json
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));

let correctAnswer = 0;
const quizLength = questions.length;

// Function to start the trivia game
async function startGame() {
  console.log(chalk.cyanBright.bold("⚾ Welcome to the Baseball Trivia Game! ⚾"));
  console.log(chalk.yellowBright("Answer the following questions correctly to earn points.\n"));

  for (let i = 0; i < quizLength; i++) {
    const currentQuestion = questions[i];

    // Ask the question
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'userAnswer',
        message: currentQuestion.question,
        choices: currentQuestion.choices
      }
    ]);

    // Check the answer
    if (answer.userAnswer === currentQuestion.answer) {
      console.log(chalk.greenBright("Correct!\n"));
      correctAnswer++;
    } else {
      console.log(chalk.redBright(`Incorrect! The correct answer is: ${currentQuestion.answer}\n`));
    }
  }

  // Average calculation
  function average(correct, total) {
    const averageCalculation = (correct / total) * 100;
    return averageCalculation;
  }
  const averageTotal = average(correctAnswer, quizLength);

  // Show final score and average
  // If user received a 70 or above
  if (averageTotal >= 70) {
    console.log(chalk.greenBright.bold(`🏆 Game Over! You got ${correctAnswer}/${quizLength} correct with an average of ${averageTotal}%! 🏆`));
  // Else if user received below a 70
  } else {
    console.log(chalk.redBright.bold(`🤦🏽‍♂️ Game Over. You got ${correctAnswer}/${quizLength} correct with an average of ${averageTotal}%. 🤦🏽‍♂️`));

  }
}

// Start the game
startGame();