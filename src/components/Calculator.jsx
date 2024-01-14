import { useState } from 'react';

import { calculatorButtons } from '../globals/calculator-button-data';
import Button from './CalculatorButtons';

function Calculator() {
    const [currentNum, setCurrentNum] = useState("0");   // Current value user input into calculator
    const [previousNum, setPreviousNum] = useState(""); 

    const maxDigits = 13;

    function onBtnClick(e) {
        const btnType = e.target.dataset.action;
        const btnValue = e.target.value;

        if (btnType === "number") {
            setCurrentNum(currentNum => {   // Update number
                if (currentNum === "0") currentNum = "";   // Delete placeholder "0"        
                return (
                    (currentNum.length < maxDigits)   // Limit number to max digits
                        ? currentNum + btnValue
                        : currentNum
                );
            });
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