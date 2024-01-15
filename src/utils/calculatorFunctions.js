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
function resetState(
    setOutput, 
    setFirstOperand, 
    setSecondOperand, 
    setOperator,
    setPerformedOperation
) {
    setOutput("0");
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
    setPerformedOperation(false);
}

// Clear the current displayed number
function onClearClick(
    performedOperation, 
    setOutput, 
    setFirstOperand, 
    setSecondOperand, 
    setOperator,
    setPerformedOperation
) {
    // If an operation has just been perform, reset the calculator state
    if (performedOperation) {
        resetState(setOutput, setFirstOperand, setSecondOperand, setOperator, setPerformedOperation);
        setPerformedOperation(false);
    }

    setOutput("0");
}

// Add new digit to the current number
function onNumberClick(
    maxDigits, 
    newDigit, 
    output,
    performedOperation,
    setOutput,
    setFirstOperand, 
    setSecondOperand, 
    setOperator,
    setPerformedOperation
) {

    // Reset the calculator is a number button is clicked after an operation
    if (performedOperation) {
        // resetState(setOutput, setFirstOperand, setSecondOperand, setOperator, setPerformedOperation);
        setOperator(null);
        output = "";
    }

    let newNum;
    if (output === "0") output = "";   // Delete placeholder "0"        
    (output.length < maxDigits)   // Limit number to max digits
        ? newNum = output + newDigit
        : newNum = output
    
    setOutput(newNum);
}

/* 
    When the operator button is clicked, it takes the current output number on the calculator
    as the first operand.
*/
function onOperatorClick(
    selectedOperator,
    operator,
    output,
    firstOperand,
    performedOperation,
    setOutput,
    setFirstOperand,
    setOperator,
    setPerformedOperation
) {


    if (!operator) {
        setOperator(selectedOperator);
        setFirstOperand(output);
        setOutput("0");
    }

    /*
        This if case allows the user to chain operations one after another
    */
    if (performedOperation) {
        setOutput("0");
        setPerformedOperation(false);   // Set the performedOperation state to false to allow user to perform another operation
        setOperator(selectedOperator);
    } 
    /* 
        This case only allows the user to change the operator when nothing is input into the calculator
        ie. It doesnt allow the user to change the operator once their second operand is inputted
    */
    // Only reset the operator when nothing is input yet 
    else if (output === "0") {
        setOperator(selectedOperator);
    }
}


function onEqualsClick(
    operator, 
    output, 
    firstOperand,
    secondOperand,
    performedOperation,
    setOutput,
    setFirstOperand,
    setSecondOperand,
    setPerformedOperation,
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
    if (!secondOperand || (secondOperand && !performedOperation)) {
        secondOperand = output;
        setSecondOperand(secondOperand);
    }

    // Operations
    if (operator) {
        let result;   // Hold the calculation output
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
        setOutput(String(result));
        setPerformedOperation(true);
    }

}

function onMemoryClick(
    btnValue, 
    memory, 
    output, 
    setOutput, 
    setFirstOperand, 
    setSecondOperand,
    setOperator, 
    setPerformedOperation,
    setMemory
) {
    switch (btnValue) {
        case "memorySave":
            setMemory(output);
            setOutput("0");
            break;
        case "memoryRecall":
            setOutput(memory);
            setOperator(null);   // Reset operation
            break;
        case "memoryClear":
            setMemory("0");
            break;
        case "memoryAdd":
            if (memory !== "0") {
                const firstOperand = memory;
                const secondOperand = output;
                const result = String(add(firstOperand, secondOperand));
    
                setOutput(result);
                setFirstOperand(firstOperand);
                setSecondOperand(secondOperand);
                setPerformedOperation(true);
            }
            break;
        case "memorySubtract":
            if (memory !== "0") {
                const firstOperand = memory;
                const secondOperand = output;
                const result = String(subtract(firstOperand, secondOperand));
    
                setOutput(result);
                setFirstOperand(firstOperand);
                setSecondOperand(secondOperand);
                setPerformedOperation(true);
            }
            break;
    }
}



export {
    resetState,
    onClearClick,
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
    onMemoryClick,
}