import './Tabs.css';
import TabContent from '../TabContent/TabContent';
import React from 'react';

function Tabs({ games, onClickTab, active }) {
	function handleTab(e) {
		onClickTab(Number(e.target.getAttribute('data-time')));
	}

	return (
		<>
			<ul className='tabs__list-time '>
				{
					games.map((n, index) => (
						<li key={index} className={`tabs__item-time ${index === active ? 'tabs__item-time_active' : ''}`} >
							<button className='tabs__btn' onClick={handleTab} data-time={index}>
								{(index === 0 && '30 сек') || (index === 1 && '45 сек') || (index === 2 && '60 сек') || (index === 3 && '1 мин 30 сек')}
							</button>
						</li>
					))
				}
			</ul>

			<ul className='tabs__list'>
				{games[active] && <TabContent games={games[active]} />}
			</ul>
		</>
	)
}

export default Tabs;