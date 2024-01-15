// React imports
import { useState } from 'react';

// Component imports
import { calculatorButtons } from '../globals/calculator-button-data';
import Button from './CalculatorButtons';

// Helper function imports
import {
    resetState,
    onClearClick,
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
    onMemoryClick,
    onSpecialOperatorClick,
} from '../utils/calculatorFunctions';

function Calculator() {
    const maxDigits = 13;   // Max number of digits on calculator display

    // Basic calculator functionality
    const [firstOperand, setFirstOperand] = useState(null);
    const [secondOperand, setSecondOperand] = useState(null);
    const [output, setOutput] = useState("0");
    const [operator, setOperator] = useState(null);
    const [performedOperation, setPerformedOperation] = useState(false);

    // Memory
    const [memory, setMemory] = useState(null);
    const [lastActionMemorySaved, setLastActionMemorySaved] = useState(false);
    const [lastActionMemoryRecalled, setLastActionMemoryRecalled] = useState(false);

    function onBtnClick(e) {
        const btnType = e.target.dataset.action;
        const btnValue = e.target.value;

        switch (btnType) {
            case "allClear":
                resetState(
                    setOutput, 
                    setFirstOperand, 
                    setSecondOperand, 
                    setOperator,
                    setPerformedOperation,
                    setLastActionMemorySaved,
                );
                break;
            case "clear":
                onClearClick(
                    performedOperation, 
                    setOutput, 
                    setFirstOperand, 
                    setSecondOperand, 
                    setOperator,
                    setPerformedOperation,
                    setLastActionMemorySaved,
                );
                break; 
            case "number":
                onNumberClick(
                    maxDigits, 
                    btnValue, 
                    output,
                    performedOperation,
                    lastActionMemorySaved,
                    lastActionMemoryRecalled,
                    setOutput, 
                    setOperator,
                    setPerformedOperation,
                    setLastActionMemorySaved,
                    setLastActionMemoryRecalled,
                );
                break;
            case "operator":
                onOperatorClick(
                    btnValue,
                    operator,
                    output, 
                    performedOperation,
                    setOutput,
                    setFirstOperand,
                    setOperator,
                    setPerformedOperation,
                );
                break;
            case "equal":
                onEqualsClick(
                    operator, 
                    output, 
                    firstOperand, 
                    secondOperand,
                    performedOperation,
                    setOutput, 
                    setFirstOperand, 
                    setSecondOperand,
                    setPerformedOperation
                );
                break;
            case "memory":
                onMemoryClick(
                    btnValue, 
                    memory, 
                    output,
                    operator,
                    setOutput,
                    setMemory,
                    setFirstOperand,
                    setLastActionMemorySaved,
                    setLastActionMemoryRecalled
                );
                break;
            case "special-operator":
                onSpecialOperatorClick(
                    btnValue,
                    output,
                    setOutput,
                );
                break;
        }

    }

    function renderButtons() {
        return (
            calculatorButtons.map((btnData) => {
                return (<Button key={btnData.className} btnData={btnData} onBtnClick={onBtnClick} />)
            })
        )
    }

    return (
        <div className="calculator">
            <div className="display">
                {output}
            </div>
            <div className="buttons">
                {renderButtons()}
            </div>
        </div>
    )
}


export default Calculator;