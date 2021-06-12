// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}

	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  scorerPrompt(input.question("Let's play some Scrabble!\n\nEnter a word to score: "));
};

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: function(word){
      return word.length;
    }
};

let vowelBonusScore = {
  name: "Bonus Vowels",
  description: "Vowels are 3pts, consonants are 1pt.",
  scorerFunction: function(word){
    word = word.toUpperCase();
    let letterPoints = 0;

    for(let i = 0; i < word.length; i++){
      if(word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U"){
        letterPoints += 3;
      } else {
        letterPoints += 1;
      }
    }

    return letterPoints
    }
};

let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: function(word){
    word = word.toUpperCase();
    let letterPoints = 0;

    for(let i = 0; i < word.length; i++){
      letterPoints += newPointStructure[word[i]];
    }

    return letterPoints
  }
};

const scoringAlgorithms = [scrabbleScore, simpleScore, vowelBonusScore];

function scorerPrompt(word) {
  if(word.match(/^[A-Za-z ]+$/)){

    let chosenScoring = Number(input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per characte\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: uses scrabble point system\nEnter 0, 1, or 2: "));

    if(chosenScoring === 0){
      console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
      return scoringAlgorithms[1]
    } else if (chosenScoring === 1){
      console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
      return scoringAlgorithms[2]
    } else if (chosenScoring === 2){
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
      return scoringAlgorithms[0]
    } else {
      console.log("Please enter a valid option.");
      scorerPrompt(word);
    }

  } else {
    console.log("Please enter a valid word.");
    initialPrompt();
  }
}

function transform(pointStructure) {
  let rebuiltStructure = {};
  for (key in pointStructure){
    pointStructure[key].map(function(n){
      rebuiltStructure[n] = Number(key);
    })
  }
  rebuiltStructure[' '] = 0;
  return rebuiltStructure
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  console.clear();
  initialPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

