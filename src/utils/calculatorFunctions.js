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
function onNumberClick(maxDigits, newDigit, currentNum, setCurrentNum) {
    let newNum;
    if (currentNum === "0") currentNum = "";   // Delete placeholder "0"        
    (currentNum.length < maxDigits)   // Limit number to max digits
        ? newNum = currentNum + newDigit
        : newNum = currentNum
    
    setCurrentNum(currentNum + newDigit)
}

// Math operations
function onOperatorClick(
    selectedOperator,
    currentOperator, 
    setOperator, 
    currentNum, 
    setCurrentNum,
    previousNum,
    setPreviousNum
) {

    // If the calculator is in "reset" (no operands) state, ignore operation button clicks
    if (currentNum === "0" && previousNum === "") {
        return;
    }

    /* 
        If there is no operator set, update operator state to selected operator
        Save the current number in the previous number state to allow user to input new operand
    */
    if (!currentOperator) {
        setOperator(selectedOperator);
        setPreviousNum(currentNum);
        setCurrentNum("0");
    } else {   // Keep number states but change the operator
        setOperator(selectedOperator);
    }
}

export {
    onAllClearClick,
    onClearClick,
    onNumberClick,
    onOperatorClick,
}