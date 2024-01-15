// Add 2 numbers together
function add(x, y) {
    return Number(x) + Number(y);
}

// Subtract second number from first number
function subtract(x, y) {
    return Number(x) - Number(y);
}

// Multiply 2 numbers together
function multiply(x, y) {
    return Number(x) * Number(y);
}

// Divide second number from first number
function divide(x, y) {
    return Number(x) / Number(y);
}

// Square root the number
function squareRoot(x) {
    return Math.sqrt(Number(x));
}

// Add decimal to the number
function decimal(x) {
    if (!x.includes(".")) return x + ".";

    return x;
}

// Convert number into a percentage
function percent(x) {
    return Number(x) / 100;
}

// Reverse polarity of a number
function polarity(x) {
    return Number(x) * -1;
}

export { add, subtract, multiply, divide, squareRoot, decimal, percent, polarity };