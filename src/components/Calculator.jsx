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
} from '../utils/calculatorFunctions';

function Calculator() {
    const [firstOperand, setFirstOperand] = useState(null);
    const [secondOperand, setSecondOperand] = useState(null);
    const [displayNum, setDisplayNum] = useState("0");
    const [operator, setOperator] = useState(null);
    const [performedCalculation, setPerformedCalculation] = useState(false);

    const maxDigits = 13;   // Max number of digits on calculator display

    function onBtnClick(e) {
        const btnType = e.target.dataset.action;
        const btnValue = e.target.value;
        // console.log(btnType, btnValue, displayNum)

        switch (btnType) {
            case "allClear":
                resetState(
                    setDisplayNum, 
                    setFirstOperand, 
                    setSecondOperand, 
                    setOperator,
                    setPerformedCalculation
                );
                break;
            case "clear":
                onClearClick(
                    performedCalculation, 
                    setDisplayNum, 
                    setFirstOperand, 
                    setSecondOperand, 
                    setOperator,
                    setPerformedCalculation
                );
                break; 
            case "number":
                onNumberClick(
                    maxDigits, 
                    btnValue, 
                    displayNum,
                    performedCalculation,
                    setDisplayNum,
                    setFirstOperand, 
                    setSecondOperand, 
                    setOperator,
                    setPerformedCalculation
                );
                break;
            case "operator":
                onOperatorClick(
                    btnValue, 
                    displayNum, 
                    firstOperand,
                    performedCalculation,
                    setDisplayNum,
                    setFirstOperand,
                    setOperator,
                    setPerformedCalculation   
                );
                break;
            case "equal":
                onEqualsClick(
                    operator, 
                    displayNum, 
                    firstOperand, 
                    secondOperand,
                    performedCalculation,
                    setDisplayNum, 
                    setFirstOperand, 
                    setSecondOperand,
                    setPerformedCalculation
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
                {displayNum}
            </div>
            <div className="buttons">
                {renderButtons()}
            </div>
        </div>
    )
}


export default Calculator;