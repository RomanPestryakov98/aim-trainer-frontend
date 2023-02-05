export const BASE_URL = 'https://api.aim-trained.ru';

function checkResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(res)
}

export const signout = () => {
	return fetch(`${BASE_URL}/signout`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse);
}

export const regApi = (email, name, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, name, password })
	})
		.then(checkResponse)
};


export const loginApi = (email, name, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, name, password })
	})
		.then(checkResponse)
};

export const tokenCheck = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then(checkResponse);
}
