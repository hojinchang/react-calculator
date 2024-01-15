import {
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    decimal,
    percent,
    polarity
} from './operations';

/* 
    Helper Functions
*/
const MAX_DIGITS = 15;   // Max number of digits on calculator display

// Truncate result to not exceed the max digits
function truncateResult(result) {
    result = String(result);
    if (result.length >= MAX_DIGITS) {
        result = result.slice(0, MAX_DIGITS);
    }

    return result;
}

function resetMemoryStates(
    lastActionMemorySaved, 
    lastActionMemoryRecalled,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    if (lastActionMemorySaved) setLastActionMemorySaved(false);
    if (lastActionMemoryRecalled) setLastActionMemoryRecalled(false);
}

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
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {
    setOutput("0");
    setFirstOperand(null);
    setSecondOperand(null);
    setOperator(null);
    setPerformedOperation(false);
    setLastActionMemorySaved(false);
    setLastActionMemoryRecalled(false);
}

// Clear the current displayed number
function onClearClick(
    performedOperation, 
    setOutput, 
    setFirstOperand, 
    setSecondOperand, 
    setOperator,
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {
    // If an operation has just been perform, reset the calculator state
    if (performedOperation) {
        resetState(
            setOutput, 
            setFirstOperand, 
            setSecondOperand, 
            setOperator, 
            setPerformedOperation, 
            setLastActionMemorySaved, 
            setLastActionMemoryRecalled
        );

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
    newDigit, 
    output,
    lastActionOperatorSelect,
    performedOperation,
    lastActionMemorySaved,
    lastActionMemoryRecalled,
    setOutput,
    setOperator,
    setLastActionOperatorSelect,
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    if (isNaN(output)) output = "";   // Reset output if output is NaN

    if (lastActionOperatorSelect) setLastActionOperatorSelect(false);

    /* 
        If the last action was to save a number into memory or recall it,
        clicking a number button overwrite the calculator's output
    */
    if (lastActionMemorySaved || lastActionMemoryRecalled) {
        setOutput(newDigit);
        setPerformedOperation(false);
        setOperator(null);

        resetMemoryStates(
            lastActionMemorySaved, 
            lastActionMemoryRecalled,
            setLastActionMemorySaved,
            setLastActionMemoryRecalled
        );
    } 
    // Else, perform normal operation
    else { 
        // Reset operation if number button is pressed after an operation
        if (performedOperation) {
            setOperator(null);
            setPerformedOperation(false);
            output = "";
        }
    
        let newNum;
        if (output === "0") output = "";   // Delete placeholder "0"        
        (output.length < MAX_DIGITS)   // Limit number to max digits
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
    lastActionMemorySaved,
    lastActionMemoryRecalled,
    setOutput,
    setFirstOperand,
    setOperator,
    setLastActionOperatorSelect,
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    // If this is a new operation, set the first operand and prepare for next operand input
    if (!currentOperator) {
        setOutput("0");
        setOperator(selectedOperator);
        setFirstOperand(output);
    }

    // If the memory has been recalled, set it as the first operand
    if (lastActionMemoryRecalled) {
        setFirstOperand(output);
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


    setLastActionOperatorSelect(true);
    resetMemoryStates(
        lastActionMemorySaved, 
        lastActionMemoryRecalled,
        setLastActionMemorySaved,
        setLastActionMemoryRecalled
    );
}

// Perform operation
function onEqualsClick(
    operator, 
    output, 
    firstOperand,
    secondOperand,
    lastActionOperatorSelect,
    performedOperation,
    lastActionMemoryRecalled,
    setOutput,
    setFirstOperand,
    setSecondOperand,
    setLastActionOperatorSelect,
    setPerformedOperation,
    setLastActionMemoryRecalled,
) {

    /*
        If the first operand is not set, dont perform any operation
        (basically disable the equal button if an operator hasent been pressed yet).
    */
    if (!firstOperand) {
        return;
    }


    /*
        If the user recalls from memory and clicks equal, set the first operand to be the recalled number
        It handles this specific use flow:
            ex. 
                1. The value of 5 is stored into memory
                2. The user inputs 2*3, the result is 6.
                3. The user clicks memory, then clicks equal
                4. The result of the operation should be 5*3 = 30 (based on windows calculator app) 
    */
    if (lastActionMemoryRecalled) {
        if (lastActionOperatorSelect) {
            secondOperand = output;
        } else {
            firstOperand = output;
        }
        setLastActionOperatorSelect(false);
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

        result = truncateResult(result);

        setOutput(result);
        setFirstOperand(result);
        setLastActionOperatorSelect(false);
        setPerformedOperation(true);
        setLastActionMemoryRecalled(false);
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
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    let result;
    switch (btnValue) {
        case "memorySave":
            setMemory(output);
            setLastActionMemorySaved(true);
            break;
        case "memoryRecall":
            if (memory) {
                if (operator) {
                    setOutput(memory);   // If operation is in progress, set the memory to be the calculator ouput
                } else {
                    setFirstOperand(memory);   // If no operation in progress, set it as first operand
                    setOutput(memory);
                    setPerformedOperation(false);   // Reset the performed operation
                }
                
                // setOperator(null);   // Reset the current operator
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

// Inplace operators
function onInplaceOperatorClick(
    btnValue,
    outputNum,
    lastActionOperatorSelect,
    performedOperation,
    lastActionMemorySaved,
    lastActionMemoryRecalled,
    setOutput,
    setFirstOperand,
    setLastActionOperatorSelect,
    setPerformedOperation,
    setLastActionMemorySaved,
    setLastActionMemoryRecalled
) {

    if (lastActionOperatorSelect) setLastActionOperatorSelect(false);

    let result
    switch (btnValue) {
        case "polarity":
            result = polarity(outputNum);
            break;
        case "decimal":
            result = decimal(outputNum);
            break;
        case "percent":
            result = percent(outputNum);
            break;
        case "squareRoot":
            result = squareRoot(outputNum);
            break;
    }

    result = truncateResult(result);
    setOutput(result);

    /*
        If the user performs an inplace operation after a regular operation, 
        set the first operand to be the result of the inplace operation.
        It handles this specific use flow:
            ex. 
                1. The user performs a normal operation like 2*3 = 6
                2. The user performs an inplace operation
                3. The user clicks equal
                4. The result of the operation should be sqrt(6)*3 = 2.449 (based on windows calculator app) 
    */
    if (performedOperation) {
        setFirstOperand(result);
    } else {
        setPerformedOperation(false);
    }

    resetMemoryStates(
        lastActionMemorySaved, 
        lastActionMemoryRecalled,
        setLastActionMemorySaved,
        setLastActionMemoryRecalled
    );
}



export {
    resetState,
    onClearClick,
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
    onMemoryClick,
    onInplaceOperatorClick,
}