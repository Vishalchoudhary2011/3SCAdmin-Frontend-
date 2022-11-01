/*
Session Management 
-- Add item to session storage
-- Remove an Item from session storage
-- Retrieve item from session storage
-- Clear entire session
*/


// To add an item to session
export const setSessionItem = (key, value) => {
    if (key && value) {
        sessionStorage.setItem(key, JSON.stringify(value));
        return {
            status: 200,
            message: 'Session created successfully'
        }
    }
    return {
        status: 500,
        message: 'There must be a key and value to create session'
    }
}

// To pick an item from session
export const getSessionItems = () => {
    let arr = [];
    if (sessionStorage !== undefined) {
        Object.keys(sessionStorage).map(key => (
            arr.push({
                id: key,
                value: sessionStorage.getItem(key)
            })
        ))
        return arr;
    }
    return {
        status: 400,
        message: 'Session Does not exists'
    };
}

// To pick an item from session
export const getSessionItem = (key) => {
    if (sessionStorage !== undefined) {
        let data = sessionStorage.getItem(key)
        return {
            status: 200,
            data: JSON.parse(data)
        };
    }
    return {
        status: 400,
        message: 'Session Does not exists'
    };
}

// To remove a particular item from session
export const removeSessionItem = (key) => {
    if (sessionStorage !== undefined) {
        sessionStorage.removeItem(key)
        return {
            status: 200,
            message: 'Item removed successfully from session'
        };
    }
    return {
        status: 400,
        message: 'Invalid Key to remove value from session'
    };
}


// To destroy the entire session
export const clearSession = () => {
    if(sessionStorage!== undefined){
        sessionStorage.clear();
        return {
            status: 200,
            message: 'Session cleared successfully'
        }
    }
    return {
        status: 400,
        message: 'No session found'
    }
}


export const length = () => {
    return sessionStorage.length;
}



