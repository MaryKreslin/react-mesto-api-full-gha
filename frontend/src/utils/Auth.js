export const baseUrl = "https://auth.nomoreparties.co";

const _checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(_checkResponse)
};

export const authorize = (password, email) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(_checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })

};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(_checkResponse)
        .then(data => data)
} 