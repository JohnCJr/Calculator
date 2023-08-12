//create functions to handle
// 1. addition:
function addNum(a, b) {
  return Number(a) + Number(b);
}

// 2. subtraction
function subtractNum(a, b) {
  return a - b;
}

// 3. multiplication
function multiplyNum(a, b) {
  return a * b;
}

// 4. division
function divideNum(a, b) {
  if (b === "0") {
    return "Can't Do That!";
  }
  return a / b;
}

// 5. sum of all operations entered
function calculate(operator, a, b) {
  switch (operator) {
    case "+":
      return Math.round(addNum(a, b) * 1000) / 1000;
    case "-":
      return Math.round(subtractNum(a, b) * 1000) / 1000;
    case "*":
      return Math.round(multiplyNum(a, b) * 1000) / 1000;
    case "/":
      return Math.round(divideNum(a, b) * 1000) / 1000;
    default:
      return "Not a valid operator";
  }
}

function editDisplay(text) {
  let display = document.getElementById("displayText");
  display.innerHTML = text;
}

function useCalculator(input) {
  if (input === "=") {
    if (firstNum === "" || operator === "" || secondNum === "") {
      editDisplay("Syntax Error");
    } else {
      displayValue = calculate(operator, firstNum, secondNum);
      editDisplay(displayValue);
    }
    firstNum = displayValue;
    operator = "";
    secondNum = "";
    displayValue = "";
  } else if (input === "clear") {
    firstNum = "";
    operator = "";
    secondNum = "";
    displayValue = "0";
    editDisplay(displayValue);
    displayValue = ""; // prevents a zero from being added as the first value
  } else if (!["+", "-", "*", "/"].includes(input) && operator === "") {
    firstNum += input;
    displayValue += input;
    editDisplay(displayValue);
  } else if (["+", "-", "*", "/"].includes(input) && secondNum === "") {
    operator = input;
    displayValue = "";
  } else if (!["+", "-", "*", "/"].includes(input) && operator !== "") {
    secondNum += input;
    displayValue += input;
    editDisplay(input);
  } else if (
    firstNum !== "" &&
    secondNum !== "" &&
    operator !== "" &&
    ["+", "-", "*", "/"].includes(input)
  ) {
    firstNum = calculate(operator, firstNum, secondNum);
    editDisplay(firstNum);
    operator = input;
    displayValue = "";
    secondNum = "";
  }
}

let displayValue = "";
let firstNum = "";
let secondNum = "";
let operator = "";

let buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    let value = button.id === "clear" ? button.id : button.value;
    useCalculator(value);
  })
);

window.addEventListener("keydown", (e) => {
  let num = new RegExp("[0-9]", "g");
  let op = new RegExp("[-=/*+]", "g");
  if (
    num.test(e.key) ||
    op.test(e.key) ||
    e.key === "Clear" ||
    e.key === "Enter"
  ) {
    let value = "";
    if (e.key === "Enter") {
      value = "=";
    } else if (e.key === "Clear") {
      value = "clear";
    } else {
      value = e.key;
    }
    useCalculator(value);
  }
});
