const DIVIDE = String.fromCharCode(247);
const TIMES = String.fromCharCode(215);

document.querySelector('#btn-divide').innerHTML = DIVIDE;
document.querySelector('#btn-multiplication').innerHTML = TIMES;

const equal = document.querySelector('#btn-equal');
const ac = document.querySelector('#btn-ac');
const text = document.querySelector('#text');
const keys = document.querySelectorAll('button[data-value]');

let last = [];

function getValue(e) {
    const data = this.dataset.value;
    if (data === '/') {
        push(DIVIDE);
    } else if (data === '*') {
        push(TIMES);
    } else if (data === 'pi') {
        push(PI);
    } else {
        push(data);
    }

    updateAC();
}

function erase() {

    if (text.value.length > 0 && last.length > 0) {
        text.value = text.value.slice(0, -last.pop());
    }
    updateAC();
}

function updateAC() {
    if (text.value.length > 0) {
        ac.innerHTML = 'CE';
    } else if (text.value.length === 0) {
        ac.innerHTML = 'AC';
    }
}

function changeInput(e) {
    const k = e.key.toLowerCase();
    const key = document.querySelector(`button[data-value="${e.key}"]`);

    if (!key) {
        if (k === 's') {
            push('sin(')
        }

        if (k === 'c') {
            push('cos(');
        }

        if (k === 't') {
            push('tan(');
        }

        if (k === 'g') {
            push('log(');
        }

        if (k === 'l') {
            push('ln(')
        }

        if (k === 'p') {
            push(PI);
        }

        if (k === 'x') {
            push('EXP')
        }

        if (k === 'backspace') {
            erase();
        }
        return;
    }

    if (k === '/') {
        push(DIVIDE);
    } else if (k === '*') {
        push(TIMES);
    } else {
        push(e.key);
    }
}

function push(value) {
    text.value += value;
    last.push(value.length);
}

ac.addEventListener('click', erase);
keys.forEach(key => key.addEventListener('click', getValue));
document.addEventListener('keydown', changeInput);