import { memo } from 'react';
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
    setPerformedOperation,
    setLastActionMemorySaved
) {
    setOutput("0");
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
    setPerformedOperation(false);
    setLastActionMemorySaved(false);
}

// Clear the current displayed number
function onClearClick(
    performedOperation, 
    setOutput, 
    setFirstOperand, 
    setSecondOperand, 
    setOperator,
    setPerformedOperation,
    setLastActionMemorySaved
) {
    // If an operation has just been perform, reset the calculator state
    if (performedOperation) {
        resetState(setOutput, setFirstOperand, setSecondOperand, setOperator, setPerformedOperation, setLastActionMemorySaved);
        setPerformedOperation(false);
    }

    setOutput("0");
}

/*
    Add new digit to the current number.
    If a number button is clicked immediately after performing an operation,
    reset the operation so we can start a new operation with the newly inputted number.
*/
function onNumberClick(
    maxDigits, 
    newDigit, 
    output,
    performedOperation,
    lastActionMemorySaved,
    lastActionMemoryRecalled,
    setOutput,
    setOperator,
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    // If the last action was to save a number into memory, clicking a number button will set the calculator output to be that digit
    if (lastActionMemorySaved) {
        setOutput(newDigit);
        setLastActionMemorySaved(false);
    } 
    // If the last action was to recall a number, clicking a number button will set the calculator output to be that digit
    else if (lastActionMemoryRecalled) {
        setOutput(newDigit);
        setLastActionMemoryRecalled(false);
    } 
    // Else, perform normal operation
    else {
        // Reset operation
        if (performedOperation) {
            setOperator(null);
            setPerformedOperation(false);
            output = "";
        }
    
        let newNum;
        if (output === "0") output = "";   // Delete placeholder "0"        
        (output.length < maxDigits)   // Limit number to max digits
            ? newNum = output + newDigit
            : newNum = output
        setOutput(newNum);
    }
}

/* 
    When the operator button is clicked, it takes the current output number on the calculator
    as the first operand.
*/
function onOperatorClick(
    selectedOperator,
    currentOperator,
    output,
    performedOperation,
    setOutput,
    setFirstOperand,
    setOperator,
    setPerformedOperation
) {

    // If this is a new operation
    if (!currentOperator) {
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
        This case only allows the user to change the operator when no number is inputted into the calculator
        ie. It doesnt allow the user to change the operator once their second operand is being inputted
    */
    else if (output === "0") {
        setOperator(selectedOperator);
    }
}

// Perform operation
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

    /*
        If the first operand is not set, dont perform any operation
        (basically disable the equal button if an operator hasent been pressed yet).
    */
    if (!firstOperand) {
        return;
    }

    /*
        1. If the second operand is not set, 
        OR 
        2. if the second operand is set and a previous operation wasnt performed,
        set the second operand to be the current displayed number

        Case 2 allows the user to continuous press the equal button to perform the same operation as the previous.
        
        ex. If the user inputs the operation 1+1. Continously pressing equal will add 1 to 
        the current output.
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

// Handle memory button logic
function onMemoryClick(
    btnValue, 
    memory, 
    output,
    operator, 
    setOutput,
    setMemory,
    setFirstOperand,
    setMemorySaved,
    setLastActionMemoryRecalled
) {

    let result;
    switch (btnValue) {
        case "memorySave":
            setMemory(output);
            setMemorySaved(true);
            break;
        case "memoryRecall":
            if (memory) {
                if (operator) {
                    setOutput(memory);   // If operation is in progress, set the memory to be the calculator ouput
                } else {
                    setFirstOperand(memory);   // If no operation in progress, set it as first operand
                    setOutput(memory);
                }

                setLastActionMemoryRecalled(true);
            }
            break;
        case "memoryClear":
            if (memory) setMemory(null);
            break;
        case "memoryAdd":
            if (memory) {
                result = String(add(memory, output));
                setMemory(result);
            }
            break;
        case "memorySubtract":
            if (memory) {
                result = String(subtract(memory, output));
                setMemory(result);
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