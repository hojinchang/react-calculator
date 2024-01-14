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
function onAllClearClick(setFirstOperand, setSecondOperand, setOperator) {
    setFirstOperand("0");
    setSecondOperand(null);
    setOperator(null);
}

// Clear the current number
function onClearClick(firstOperand, setFirstOperand, setSecondOperand) {
    if (firstOperand) {
        setSecondOperand(null);
        setCurrentNum("0");
    } else {
        setFirstOperand(null);
    }
}

// Add new digit to the current number
function onNumberClick(maxDigits, newDigit, currentNum, setCurrentNum) {
    let newNum;
    if (currentNum === "0") currentNum = "";   // Delete placeholder "0"        
    (currentNum.length < maxDigits)   // Limit number to max digits
        ? newNum = currentNum + newDigit
        : newNum = currentNum
    
    setCurrentNum(currentNum + newDigit);
}

// Operator button functionality
function onOperatorClick(
    selectedOperator,
    currentOperator,
    currentNum,
    setOperator,
    setFirstOperand,
    setCurrentNum,
) {

    if (!currentOperator) {
        setOperator(selectedOperator);
        setFirstOperand(currentNum);
        setCurrentNum("0");
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