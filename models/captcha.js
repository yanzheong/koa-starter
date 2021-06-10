"use strict";

const config = require("../config.json");

const answerBase = {};

module.exports.createCAPTCHA = async(user) => {
    const rightNumber = 0;
    if (rightNumber == 0) {
        module.exports.createNumberPair(user);
    }
}

module.exports.createNumberPair = async(user) => {
    const questionArray = [];
    const answerArray = [];
    const rightNumber = Math.floor(Math.random() * 12) + 1;
    let suit = Math.floor(Math.random() * 3) + 1;
    var fileString1 = getFileString(rightNumber, suit);
    questionArray.push(fileString1);
    answerArray.push(fileString1);
    suit = Math.floor(Math.random() * 3) + 1;
    var fileString2 = getFileString(rightNumber, suit);
    questionArray.push(fileString2);
    answerArray.push(fileString2);

    while (questionArray.length < 5) {
        var number = Math.floor(Math.random() * 12) + 1;
        while (number == rightNumber) {
            number = Math.floor(Math.random() * 12) + 1;
        }
        suit = Math.floor(Math.random() * 3) + 1;
        var fileString = getFileString(number, suit);
        questionArray.push(fileString);
    }
    answerBase[user] = answerArray;
    return questionArray;
}

module.exports.createSuitPair = async(user) => {

}

module.exports.createSequence = async(user) => {

}

module.exports.createEquation = async(user) => {

}

module.exports.checkCAPTCHA = async(user, userAnswer) => {
    if (userAnswer.equals(answerBase[user])) {
        return "CORRECT";
    } else {
        return "WRONG";
    }
}

function getFileString(number, suit) {
    var fileString = "";
    if (number == 1) {
        fileString += "Ace";
    } else if (number == 11) {
        fileString += "Jack";
    } else if (number == 12) {
        fileString += "Queen";
    } else if (number == 13) {
        fileString += "King";
    } else {
        fileString += number.toString();
    }

    fileString += "_";
    if (suit == 1) {
        fileString += "Diamonds";
    } else if (suit == 2) {
        fileString += "Clubs";
    } else if (suit == 3) {
        fileString += "Hearts";
    } else if (suit == 4) {
        fileString += "Spades";
    }
    return fileString;
}

// might want to split to 