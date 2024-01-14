// React imports
import { useState } from 'react';

// Component imports
import { calculatorButtons } from '../globals/calculator-button-data';
import Button from './CalculatorButtons';

// Helper function imports
import {
    allClear,
    clear,
    setNumber,
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

        if (btnType === "number") {
            setNumber(maxDigits, btnValue, setCurrentNum);
        } else if (btnType === "allClear") {
            allClear(setCurrentNum, setPreviousNum, setOperator);
        } else if (btnType === "clear") {
            clear(setCurrentNum);
        }
    }

    function renderDisplay(updatedNumber) {
        if (currentNum === 0) {
            return updatedNumber;
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