import { set } from "immutable";

/* 
    Reset the state of the calculator
    Clear the saved numbers and the pending calculations
*/
function onAllClearClick(setCurrentNum, setPreviousNum, setOperator) {
    setCurrentNum("0");
    setPreviousNum("");
    setOperator(null);
}

// Clear the current number
function onClearClick(setCurrentNum) {
    setCurrentNum("");
}

// Add new digit to the current number
function onNumberClick(maxDigits, newDigit, setCurrentNum, currentNum) {
    let newNum;
    if (currentNum === "0") currentNum = "";   // Delete placeholder "0"        
    (currentNum.length < maxDigits)   // Limit number to max digits
        ? newNum = currentNum + newDigit
        : newNum = currentNum
    
    setCurrentNum(currentNum + newDigit)
}

// Math operations
function onOperatorClick(operator, setOperator, currentNum, setPreviousNum, setCurrentNum) {
    setOperator(operator);
    setPreviousNum(currentNum);
    setCurrentNum("0");
}

export {
    onAllClearClick,
    onClearClick,
    onNumberClick,
    onOperatorClick,
}