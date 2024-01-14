// React imports
import { useState } from 'react';

// Component imports
import { calculatorButtons } from '../globals/calculator-button-data';
import Button from './CalculatorButtons';

// Helper function imports
import {
    onAllClearClick,
    onClearClick,
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
} from '../utils/calculatorFunctions';

function Calculator() {
    const [firstOperand, setFirstOperand] = useState("0");
    const [secondOperand, setSecondOperand] = useState(null);
    const [currentNum, setCurrentNum] = useState("0");
    const [operator, setOperator] = useState(null);

    const maxDigits = 13;   // Max number of digits on calculator display

    function onBtnClick(e) {
        const btnType = e.target.dataset.action;
        const btnValue = e.target.value;
        console.log(btnType, btnValue, currentNum)

        switch (btnType) {
            case "allClear":
                onAllClearClick(setFirstOperand, setSecondOperand, setOperator);
                break;
            case "clear":
                onClearClick(firstOperand, setFirstOperand, setSecondOperand);
                break;
            case "number":
                onNumberClick(maxDigits, btnValue, currentNum, setCurrentNum);
                break;
            case "operator":
                onOperatorClick(btnValue, operator, currentNum, setOperator, setFirstOperand, setCurrentNum);
                break;
        }

    }

    function renderButtons() {
        return (
            calculatorButtons.map((btnData) => {
                return (<Button btnData={btnData} onBtnClick={onBtnClick} />)
            })
        )
    }

    return (
        <div className="calculator">
            <div className="display">
                {currentNum}
            </div>
            <div className="buttons">
                {renderButtons()}
            </div>
        </div>
    )
}


export default Calculator;