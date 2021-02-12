const cookie = require('js-cookie');

const setCookie = (key, value) => {//Function for setting cookie
    if(window != 'undefined'){//check if window is open
        cookie.set(key, value, {
            expires: 1
        })
    }
}

const saveToLocalstorage = (key, value) => {//Function for saving to localstorage
    if(window != 'undefined'){//Check if window is open
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const authenticateUser = (response, next) => {//Function for saving user info to storage 
    setCookie('token', response.data.token);
    saveToLocalstorage('user', response.data.user);
    next();
}

export {setCookie, saveToLocalstorage, authenticateUser}