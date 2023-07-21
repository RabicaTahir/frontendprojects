
const links = document.querySelectorAll("link");
const toggleBtns = document.querySelectorAll("input");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const restBtn = document.querySelector("[data-reset]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");

let prevOperand = prevOperandText.innerText;
let CurrentOperand = currentOperandText.innerText;
let operation;


//Theme Change Function
function themeChange(i) {
    if(i === "0"){
        links[2].setAttribute("href", "");
    } else {
        links[2].setAttribute("href", `css/style${i}.css`);
    }
}

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    themeChange(btn.value);
  });
});

//Reset Function
function reset(){
  prevOperand = "";
  CurrentOperand = "";
  operation = undefined;
}

//Delete Operand Function
function deleteOperand(){
  CurrentOperand = CurrentOperand.toString().slice(0, -1);
}

//Delete Operand Function
function addNumber(number){
  if(number === "." && CurrentOperand.includes(".")) return;
  CurrentOperand = CurrentOperand.toString() + number.toString();
}

//Operation Selection Function
function operationSelection(operate) {
  if(currentOperandText === "") return;
  if(prevOperandText !== "") {
      calculatorOperation();
  }
  operation = operate;
  prevOperand = CurrentOperand;
  CurrentOperand = "";
}

//Calculator Operation Function
function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(CurrentOperand);
  if(isNaN(prev) || isNaN(current)) return;

  switch(operation){
      case "+":
          result = prev + current;
          break;

      case "-":
          result = prev - current 
          break;

      case "×":
          result = prev * current; 
          break; 

      case "/":
          result = prev / current;
          break;

      default: 
          return;
  } 
  CurrentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
}

//Display Number Function
function displayNum() {
  currentOperandText.innerText = CurrentOperand.toLocaleString("en");
  if(operation !== undefined) {
      prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
      prevOperandText.innerText = prevOperand;
  }
}   

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      themeChange(btn.value);
  });
})

restBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach(operand => {
  operand.addEventListener("click", () => {
      addNumber(operand.innerText);
      displayNum();
  });
});
  
operatorBtn.forEach(btn => {
  btn.addEventListener("click", () => {
      operationSelection(btn.innerText);
      displayNum();        
  })
})

resultBtn.addEventListener("click", () => {
  calculatorOperation();
  displayNum();
});
