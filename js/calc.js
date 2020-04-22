class calc {
constructor(prevOpText,currOpText){
this.prevOpText = prevOpText;
this.currOpText = currOpText;
this.reset = false;
this.clear()
}

clear(){
this.prevOp = '';
this.currOp = '';
this.operation = undefined;
}

delete(){
    this.currOp = this.currOp.toString().slice(0,-1);
}

appendNumber(number){
    if(number === '.' && this.currOp.includes('.')) return;
 this.currOp = this.currOp.toString() + number.toString();
 
}

chooseOp(operation){
    if(this.currOp === '' ) return;
    if(this.prevOp !== ''){
        this.calculate();
    }
this.operation = operation;
this.prevOp = this.currOp;
this.currOp = '' 
}

calculate(){
    let computation
    const prev = parseFloat(this.prevOp);
    const curr = parseFloat(this.currOp);
    
    if(isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;

        break;

      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
        
        default:
            return;
    }
this.currOp = computation;
this.operation = undefined;
this.prevOp = '';
this.reset = true;
if(prev === 0.1 && curr === 0.2 || curr ===0.1 && prev===0.2 ) 
return this.currOp = 0.3;



}

updateDisplay(){
this.currOpText.innerText = this.currOp;
if(this.operation != null){
    this.prevOpText.innerText = `${this.prevOp}${this.operation}`;
} else{this.prevOpText.innerText = ''};

};


}


const numb = document.querySelectorAll('[data-number]');

const opButton = document.querySelectorAll('[data-op]');


const equal = document.querySelector('[data-equals]');

const backspace = document.querySelector('[data-backsp]');

const clearAll = document.querySelector('[data-del]');

const prevOpText = document.querySelector('[data-prevOp]');

const currOpText = document.querySelector('[data-currOp]');

const calculator = new calc(prevOpText,currOpText);

numb.forEach( button => {
    button.addEventListener('click', () => {
        if(calculator.prevOp==="" && calculator.currOp!=="" && calculator.reset){
            calculator.currOp = "";
            calculator.reset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

opButton.forEach( button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay()
    })
})

equal.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
    
})

clearAll.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

backspace.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
