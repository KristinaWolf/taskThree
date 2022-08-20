"use strict";

const readlineSync = require('readline-sync');
let sizeNumber,
    bulls = 0,// цифра стоит на месте
    cows = 0; // цифра стоит, но не на месте

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumber() {
    let randomNumber = '', // число компа - строка (полное рандомное число)
        n; //символ который генерирует

    sizeNumber = getRandom(3, 6); //уровень

    for (let i = 0; i < sizeNumber; i++) {
        do { //для того чтобы избежать повтора цифр в итоговм числе
            n = getRandom(0, 9);
        } while (randomNumber.indexOf(n) >= 0);
        randomNumber += n;
    }
    return randomNumber;
}

function getNumber() {
    console.log('\nВведите ваше число:');
    return readlineSync.question('-->  ').slice(0, sizeNumber); // обрежет введёное число пользователя до нужного уровня
}

function compareNumbers(numOne, numTwo) {
    bulls = [];
    cows = [];
    
    for (let i = 0; i < sizeNumber; i++) {
        if (numOne[i] === numTwo[i]) {
            bulls.push(numOne[i]); // прибавит элемент в массив
        } else if (numTwo.indexOf(numOne[i]) >= 0) { // есть ли похожий элемент numOne в строке numTwo
            cows.push(numOne[i]);
        }
    }
}

function play() {
    let numOne = generateRandomNumber();
    // console.log(`Компьютер загадал: ${numOne}`);
    console.log(`\nТебе нужно угадать ${sizeNumber}-значное число.`);    
    
    for (let life = 3; life >= 0; life--) {
        let numTwo = getNumber();
        //console.log(`Ты загадал: ${numTwo}`);
        if (numOne === numTwo) {
            console.log('Ого... Ты выиграл!');
            break;
        }
        
        compareNumbers(numOne, numTwo);
        console.log(`\nКоличество совпавших цифр не на своих местах: ${cows.length} (${cows})\nКоличество совпавших цифр на своих местах: ${bulls.length} (${bulls})\n Осталось жизней: ${life}`);
        
        if (life == 3) {
            console.log('\n Бугага, ты не пройдёшь!');
        } else if (life == 2) {
            console.log('\n Пф, и это всё?');
        } else if (life == 1) {
            console.log('\n Ну-ну');
        } else {
            console.log('\n Ты проиграл! А я говорил!');
        }
    }
}

play();