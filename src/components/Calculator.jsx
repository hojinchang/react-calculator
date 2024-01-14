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
} from '../utils/calculatorFunctions';

function Calculator() {
    const [previousNum, setPreviousNum] = useState("");
    const [currentNum, setCurrentNum] = useState("0");   // Current value user input into calculator
    const [operator, setOperator] = useState(null);

    const maxDigits = 13;   // Max number of digits on calculator display

    function onBtnClick(e) {
        const btnType = e.target.dataset.action;
        const btnValue = e.target.value;
        console.log(btnType, btnValue, currentNum)

        switch(btnType) {
            case "allClear":
                onAllClearClick(setCurrentNum, setPreviousNum, setOperator);
                break;
            case "clear":
                onClearClick(setCurrentNum);
                break;
            case "number":
                onNumberClick(maxDigits, btnValue, currentNum, setCurrentNum);
                break;
            case "operator":
                onOperatorClick(btnValue, operator, setOperator, currentNum, setCurrentNum, previousNum, setPreviousNum);
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