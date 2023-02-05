class MainApi {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res);
	}

	_checkResponseJSON(res) {
		return res.json()
			.then(json => {
				return res.ok ? json : Promise.reject(json);
			})
	}

	updateDataProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				name: data.name
			})
		})
			.then(this._checkResponseJSON);
	}

	createGame(data) {
		return fetch(`${this._baseUrl}/game`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				time: data.time,
				record: data.record
			})
		})
	}

	getAllGames(time) {
		return fetch(`${this._baseUrl}/game/${time}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(this._checkResponse);
	}
}


const apiMain = new MainApi({
	baseUrl: 'https://api.aim-trained.ru'
})

export default apiMain;
