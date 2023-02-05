import './Leaderboards.css';
import React, { useEffect, useState } from 'react';
import MainApi from '../../utils/MainApi';
import Tabs from '../Tabs/Tabs';
import Preloader from '../Preloader/Preloader';

function Leaderboards() {
	const [games, setGames] = useState([]);
	const [active, setActive] = useState(0);

	const [isLoading, setIsLoading] = useState(false);

	function clickTab(time) {
		setActive(time)
	}

	useEffect(() => {
		setIsLoading(true)
		Promise.all([
			MainApi.getAllGames(30, localStorage.getItem('token')),
			MainApi.getAllGames(45, localStorage.getItem('token')),
			MainApi.getAllGames(60, localStorage.getItem('token')),
			MainApi.getAllGames(90, localStorage.getItem('token'))
		])
			.then(res => {
				setGames(res);
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<section className='leaderboards'>
			<h1 className='leaderboards__title'>Список лидеров</h1>
			<div className='leaderboards__board tabs'>
				{isLoading && <Preloader />}
				<Tabs games={games} onClickTab={clickTab} active={active} />
			</div>
		</section>
	)
}
export default Leaderboards;