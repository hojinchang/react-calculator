/* 
    Reset the state of the calculator
    Clear the saved numbers and the pending calculations
*/
function allClear(setCurrentNum, setPreviousNum, setOperator) {
    setCurrentNum("0");
    setPreviousNum("");
    setOperator(null);
}

// Clear the current number
function clear(setCurrentNum) {
    setCurrentNum("");
}

// Add new digit to the current number
function setNumber(maxDigits, newDigit, setCurrentNum) {
    setCurrentNum(currentNum => {   // Update number
        if (currentNum === "0") currentNum = "";   // Delete placeholder "0"        
        return (
            (currentNum.length < maxDigits)   // Limit number to max digits
                ? currentNum + newDigit
                : currentNum
        );
    });
}

export {
    allClear,
    clear,
    setNumber,
}