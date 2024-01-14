import {
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    percent,
    polarity
} from './operations';

/* 
    Reset the state of the calculator
    Clear the saved numbers and the pending calculations
*/
function onAllClearClick(setDisplayNum, setFirstOperand, secondOperand, setOperator) {
    setDisplayNum("0");
    setFirstOperand(null);
    secondOperand(null);
    setOperator(null);
}

// Clear the current number
function onClearClick(firstOperand, setFirstOperand, secondOperand) {
    if (firstOperand) {
        setDisplayNum("0");
        secondOperand(null);
    } else {
        setFirstOperand(null);
    }
}

// Add new digit to the current number
function onNumberClick(maxDigits, newDigit, displayNum, setDisplayNum) {
    let newNum;
    if (displayNum === "0") displayNum = "";   // Delete placeholder "0"        
    (displayNum.length < maxDigits)   // Limit number to max digits
        ? newNum = displayNum + newDigit
        : newNum = displayNum
    
    setDisplayNum(displayNum + newDigit);
}

// Operator button functionality
function onOperatorClick(
    selectedOperator,
    currentOperator,
    displayNum,
    setOperator,
    setFirstOperand,
    setDisplayNum,
) {

    if (!currentOperator) {
        setOperator(selectedOperator);
        setFirstOperand(displayNum);
        setDisplayNum("0");
    } else {
        setOperator(selectedOperator);
    }
}


export {
    onAllClearClick,
    onClearClick,
    onNumberClick,
    onOperatorClick,
}