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
    const [currentNum, setCurrentNum] = useState("0");   // Current value user input into calculator
    const [previousNum, setPreviousNum] = useState("");
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
                onNumberClick(maxDigits, btnValue, setCurrentNum, currentNum);
                break;
            case "operator":
                onOperatorClick(btnValue, setOperator, currentNum, setPreviousNum, setCurrentNum);
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