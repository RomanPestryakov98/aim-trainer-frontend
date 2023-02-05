import './TabContent.css';
import React, { useContext } from 'react';
import { sortScore, filterTenLeaders, isMinimalTenGames } from '../../utils/utils';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function TabContent({ games }) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			{
				isMinimalTenGames(filterTenLeaders(sortScore(games))).map((game, index) => (
					<div key={index} className={`tab-content__item ${game?.creator?.name === currentUser?.name ? 'tab-content__item_active' : ''}`}>
						<div className='tab-content__num'>{`${index + 1}. `}</div>
						<div className='tab-content__name'>{game?.creator?.name}</div>
						<div className='tab-content__score'>{game?.record}</div>
					</div>
				))
			}
		</>
	)
}

export default TabContent;