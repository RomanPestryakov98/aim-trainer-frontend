export function getTime(time) {
	return time.toString().padStart(2, '0');
}

export function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

export function sortScore(games) {
	return games.sort((a, b) => parseFloat(b.record) - parseFloat(a.record))
}

export function filterTenLeaders(games) {
	return games.filter((game, index) => {
		return index < 10;
	})
}


export function isMinimalTenGames(games) {
	if (games.length < 10) {
		let blanck = 10 - games.length;
		let res = [];

		for (let i = 0; i < games.length; i++) {
			res.push(games[i])
		}

		for (let i = 0; i < blanck; i++) {
			res.push({ creator: { name: null } })
		}

		return res;
	}
	else {
		return games;
	}
}