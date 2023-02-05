import './Circle.css';
import React from 'react';
import purpose from '../../images/logo.png';

const Circle = React.memo(({ position, sizePurpose }) => {
	return (
		<img src={purpose} alt='Цель' draggable='false' className='circle' style={{
			left: position.left + 'px',
			top: position.top + 'px',
			width: sizePurpose + 'px',
			height: sizePurpose + 'px'
		}}
		/>
	)
})

export default Circle;