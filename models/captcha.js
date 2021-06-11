"use strict";

const config = require("../config.json");

const answerBase = {};

module.exports.createCAPTCHA = (user) => {
    const rightNumber = 0;
    if (rightNumber == 0) {
        return module.exports.createNumberPair(user);
    }
}

module.exports.createNumberPair = (user) => {
    const questionArray = [];
    const answerArray = [];
    const numSet = new Set();
    const rightNumber = Math.floor(Math.random() * 12) + 1;
    let suit = Math.floor(Math.random() * 3) + 1;
    const fileString1 = getFileString(rightNumber, suit);
    questionArray.push(fileString1);
    suit = Math.floor(Math.random() * 3) + 1;
    const fileString2 = getFileString(rightNumber, suit);
    questionArray.push(fileString2);
    numSet.add(rightNumber);
    while (questionArray.length < 5) {
        let number = Math.floor(Math.random() * 12) + 1;
        while (number == rightNumber || numSet.has(number)) {
            number = Math.floor(Math.random() * 12) + 1;
        }
        suit = Math.floor(Math.random() * 3) + 1;
        let fileString = getFileString(number, suit);
        questionArray.push(fileString);
        numSet.add(number);
    }
    const correctIndex1 = Math.floor(Math.random() * 5);
    let correctIndex2 = Math.floor(Math.random() * 5);
    while (correctIndex2 == correctIndex1) {
        correctIndex2 = Math.floor(Math.random() * 5);
    }
    answerArray.push(correctIndex1);
    answerArray.push(correctIndex2);
    questionArray[0] = questionArray[correctIndex1];
    questionArray[1] = questionArray[correctIndex2];
    questionArray[correctIndex1] = fileString1;
    questionArray[correctIndex2] = fileString2;
    answerBase[user._id] = answerArray;
    return questionArray;
}

module.exports.createSuitPair = (user) => {

}

module.exports.createSequence = (user) => {

}

module.exports.createEquation = (user) => {

}

module.exports.checkCAPTCHA = (user, userAnswer) => {
    userAnswer.sort(function(a, b){return a - b});
    correctAnswer = answerBase[user];
    if (userAnswer[0] == correctAnswer[0] && userAnswer[1] == correctAnswer[1]) {
        return "CORRECT";
    } else {
        return "WRONG";
    }
}

function getFileString(number, suit) {
    let fileString = "card";
    if (suit == 1) {
        fileString += "Diamonds";
    } else if (suit == 2) {
        fileString += "Clubs";
    } else if (suit == 3) {
        fileString += "Hearts";
    } else if (suit == 4) {
        fileString += "Spades";
    }
    if (number == 1) {
        fileString += "A";
    } else if (number == 11) {
        fileString += "J";
    } else if (number == 12) {
        fileString += "Q";
    } else if (number == 13) {
        fileString += "K";
    } else {
        fileString += number;
    }
    return fileString;
}