import {
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    percent,
    polarity
} from './operations';


function _resetState(setFirstOperand, setSecondOperand, setOperator) {
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
}

/* 
    Reset the state of the calculator
    Clear the saved numbers and the pending calculations
*/
function onAllClearClick(setDisplayNum, setFirstOperand, setSecondOperand, setOperator) {
    setDisplayNum("0");
    _resetState(setFirstOperand, setSecondOperand, setOperator);
}

// Clear the current displayed number
function onClearClick(operator, setDisplayNum, setFirstOperand, setSecondOperand, setOperator) {
    // If an operation has just been perform, reset the calculator state
    if (operator) {
        _resetState(setFirstOperand, setSecondOperand, setOperator);
    }

    setDisplayNum("0");
}

// Add new digit to the current number
function onNumberClick(
    maxDigits, 
    newDigit, 
    displayNum, 
    performedCalculation, 
    setDisplayNum,
    setFirstOperand,
    setSecondOperand, 
    setOperator,
    setPerformedCalculation
) {
    
    /*
        Checks whether a previous operation was performed.
        If so, reset the current displayed number and set the calculation flag to false

        This allows the user to enter in a new number during chains of operations
    */
    if (performedCalculation) {
        displayNum = "";
        setPerformedCalculation(false);
    }

    
    
    let newNum;
    if (displayNum === "0") displayNum = "";   // Delete placeholder "0"        
    (displayNum.length < maxDigits)   // Limit number to max digits
        ? newNum = displayNum + newDigit
        : newNum = displayNum
    
    setDisplayNum(newNum);
}

// Operator button functionality
function onOperatorClick(
    selectedOperator,
    displayNum,
    firstOperand,
    secondOperand,
    performedCalculation,
    setOperator,
    setFirstOperand,
    setDisplayNum,
) {

    // if (!firstOperand) {
    //     setOperator(selectedOperator);
    //     setFirstOperand(displayNum);
    //     setDisplayNum("0");
    // } else {
    //     setOperator(selectedOperator);
    // }


    if (!firstOperand) {
        setOperator(selectedOperator);
        setFirstOperand(displayNum);
        setDisplayNum("0");
    } else if (firstOperand && performedCalculation) {   // Update the operator to perform chain of operations
        setOperator(selectedOperator);
    }
}


function onEqualsClick(
    operator, 
    displayNum, 
    firstOperand,
    secondOperand,
    performedCalculation,
    setDisplayNum,
    setFirstOperand,
    setSecondOperand,
    setOperator,
    setPerformedCalculation,
) {

    // If the first operand is not set, dont perform any calculation 
    if (!firstOperand) {
        return;
    }

    /*
        If the second operand is not set, 
        OR if the second operand is set or a previous calculation wasnt performed,
        set the second operand to be the current displayed number

        The second case allows the second operand to be set to the current displayed number
        if a chain of operations is being performed.
    */
    if (!secondOperand || (secondOperand || !performedCalculation)) {
        secondOperand = displayNum;
        setSecondOperand(secondOperand);
    }

    let result;   // Hold the calculation result
    // Operations
    switch (operator) {
        case "add":
            result = add(firstOperand, secondOperand);
            break;
        case "subtract":
            result = subtract(firstOperand, secondOperand);
            break;
        case "multiply":
            result = multiply(firstOperand, secondOperand);
            break;
        case "divide":
            result = divide(firstOperand, secondOperand);
            break;
    }

    setFirstOperand(String(result));
    setDisplayNum(String(result));
    setPerformedCalculation(true);
}


export {
    onAllClearClick,
    onClearClick,
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
}