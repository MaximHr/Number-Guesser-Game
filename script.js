const container = document.querySelector('.container');
const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const randomNumber = 1 + Math.floor(Math.random() * 10);
let lives = 3, win = false;

const setMessage = (text, color, isInfinity) => {
    if(container.childElementCount === 4){
       container.removeChild(container.lastChild);
    }
    const newEl = document.createElement('p');
    newEl.appendChild(document.createTextNode(text));
    newEl.className = 'alert';
    newEl.style.color = color;
   container.appendChild(newEl);
    let alpha = 1;
    if(!isInfinity){ 
        setInterval(()=>{
            setInterval(()=>{
                alpha -= 0.1;
                newEl.style.opacity = alpha;
            }, 50)
        }, 1500)
        setTimeout(()=>{
            newEl.remove();
            input.style.border = '1px #000 solid';
        }, 2200)
    }
}

submit.addEventListener('click', ()=>{
    if(input.value != '' && JSON.parse(input.value) > 0 && JSON.parse(input.value) <= 10){ 
        check(JSON.parse(input.value));
    }else{
        setMessage('Please choose a number between 1 and 10', 'red', false);
        input.style.border = '1px red solid';
    }
    input.value = '';
    if(submit.innerHTML.toLowerCase() === 'play again'){
        location.reload();
    }
})

function check(yourNumber){
    if(lives > 0){ 
        if(yourNumber === randomNumber){
            setMessage(`${yourNumber} is correct, you win !`, 'green', true);
            input.style.border = '1px #32CD32 solid';
            setTimeout(()=>{
            submit.innerText = 'Play Again';
            }, 100);
            win = true;
        }else{ 
            lives--;
            if(lives >= 1){
                setMessage(`${yourNumber} is not correct, you have ${lives} guesses left`, 'red', false);
            }else{
                setMessage(`Sorry, game over, the correct answer was ${randomNumber}`, 'red', true);
                input.style.border = '1px red solid';
                setTimeout(()=>{
                    submit.innerText = 'Play Again';
                }, 100);
            }
        }
    }
}

input.addEventListener('focus', ()=>{
    if(lives > 0 && win === false){ 
        input.style.border = '1px rgb(117, 197, 236) solid';
    }
    if(lives === 0 || win === true){
        input.setAttribute('readonly', true);
    }
})
