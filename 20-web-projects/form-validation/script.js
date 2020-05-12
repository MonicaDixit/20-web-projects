const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

 function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small').innerText=message;
 }

 function showSuccess(input) {
     const formControl = input.parentElement;
     formControl.className = 'form-control success';
}


//check valid email 

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check input length
function checkLength(input, min, max) {
    let value = input.value.length;
    if (value > max || value < min) {
        let message = `${getFieldName(input)} is invalid length `
       showError(input, message);
    }

}

function checkRequired(inputArr) {
    inputArr.forEach((input) => {

    if (!input.value.trim()) {
        let message = `Missing ${getFieldName(input)}`
        showError(input, message)
    }
    else {
        showSuccess(input);
    }
    });
}

function checkEmail(email) {
    if (!isValidEmail(email.value)) {
        showError(email, 'Not a valid email');
    }
    else {
        showSuccess(email);
    }
}

function checkPasswordsMatch(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, 'passwords dont match');
    }
    else {
        showSuccess(password2);
    }
}

//Event listeners
form.addEventListener('submit', (e)=> {
    e.preventDefault();

    checkRequired([username,email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
