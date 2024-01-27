//STORAGE
//Global
const session = 0;
const local = 1;

function saveItem(storage, key, value) {
    if (Array.isArray(value)) {
        value = value.stringify;
    }

    switch (storage) {
        case session:
            if (sessionStorage && !sessionStorage.getItem(key)) {
                console.log('Live reload enabled.');
                sessionStorage.setItem(key, value)
            }
            break;
        case local:
            localStorage.setItem(key, value);
            break;
    }
}
function readItem(storage, key) {
    let value;
    switch (storage) {
        case session:
            value = sessionStorage.getItem(key)
            break;
        case local:
            value = localStorage.getItem(key)
            break;
    }
    if (Array.isArray(value)) {
        value = value.parse;
    }
    return value;
}
function readValueByIndex(storage, index) {
    switch (storage) {
        case session:
            return sessionStorage.key(index);
            break;
        case local:
            return localStorage.key(index);
            break;
    }
    return null;
}
function removeItem(storage, key) {
    switch (storage) {
        case session:
            sessionStorage.removeItem(key)
            break;
        case local:
            localStorage.removeItem(key);
            break;
    }
}
function clearAllItems(storage) {
    switch (storage) {
        case session:
            sessionStorage.clear();
            break;
        case local:
            localStorage.clear();
            break;
    }
}
function countItems(storage) {
    switch (storage) {
        case session:
            return sessionStorage.length;
            break;
        case local:
            return localStorage.length;
            break;
    }
}