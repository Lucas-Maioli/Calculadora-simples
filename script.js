'use strict';

const display = document.getElementById('display');
let numbers = document.querySelectorAll('[id *= key]');
let operators = document.querySelectorAll('[id *= operator]');

let newNumber = true;
let operator;
let previousNumber;

const pandingOperation = () => operator != undefined;

const calc = () =>{
    if (pandingOperation ()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        newNumber = true;
        let result = eval(`${previousNumber}${operator}${currentNumber}`);
        refreshDisplay(result);
    }
}

let refreshDisplay = (texto) =>{
    if(newNumber){
        display.textContent = texto.toLocaleString('BR');
        newNumber = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
}

let insertNumber = (evento) => refreshDisplay(evento.target.textContent);

numbers.forEach (number => number.addEventListener('click', insertNumber));

let insertOperators = (evento) =>{
    if(!newNumber){
        calc();
        newNumber = true;
        operator = evento.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',', '.'));
        
    }
}

operators.forEach (operator => operator.addEventListener('click', insertOperators));

const activateEqual = () =>{
    calc();
    operator = undefined;
}

document.getElementById('equal').addEventListener('click', activateEqual);

const clearDisplay = () => display.textContent = '';

document.getElementById('clearNumber').addEventListener('click', clearDisplay)

const clearCalc = () =>{
    clearDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}

document.getElementById('clear').addEventListener('click', clearCalc);

const clearLast = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById('backspace').addEventListener('click', clearLast);

const reverse = () => {
    newNumber = true;
    refreshDisplay (display.textContent * -1);
}

document.getElementById('reverse').addEventListener('click', reverse);

const existDenary = () => display.textContent.indexOf('.') != -1;
const value = () => display.textContent.length > 0;
const denary = () =>{
    if (!existDenary()) {
        if (value ()) {
            refreshDisplay (',');
        }else{
            refreshDisplay ('0,')
        }
    }
}

document.getElementById('comma').addEventListener('click', denary);


const keyboard = {
    '0'         : 'key0',
    '1'         : 'key1',
    '2'         : 'key2',
    '3'         : 'key3',
    '4'         : 'key4',
    '5'         : 'key5',
    '6'         : 'key6',
    '7'         : 'key7',
    '8'         : 'key8',
    '9'         : 'key9',
    '+'         : 'operatorSum',
    '-'         : 'operatorSubtract',
    '*'         : 'operatorMultiply',
    '/'         : 'operatorShare',
    'Enter'     : 'equal',
    '='         : 'equal',
    ','         : 'comma',
    'c'         : 'clear',
    'Escape'    : 'clearNumber',
    'Backspace' : 'backspace'
}

const mapKeyboard = (evento) => {
    const Key = evento.key;

    const allowedKey = () => Object.keys(keyboard).indexOf(Key) != -1;
    if(allowedKey()) document.getElementById(keyboard[Key]).click();
}
document.addEventListener('keydown', mapKeyboard);