import { calculatorButtons } from '../globals/calculator-button-data';
import Button from './CalculatorButtons';

function Calculator() {
    function renderButtons() {
        return (
            calculatorButtons.map((btnData) => {
                return (<Button btnData={btnData} />)
            })
        )
    }

    return (
        <div className="calculator">
            <div className="display"></div>
            <div className="buttons">
                {renderButtons()}
            </div>
        </div>
    )
}


export default Calculator;