import './Burger.css';
import React from 'react';

const Burger = React.memo(({ setIsBurgerOpen, isBurgerOpen }) => {
	return (
		<button type="button" className="icon-menu" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
			<span></span>
		</button>
	);
});

export default Burger;