import './Time.css';

function Time({ setTime, setIsGameStart }) {
	function clickTime(e) {
		if (e.target.classList.contains('board-time__item')) {
			setTime(parseInt(e.target.getAttribute('data-time')));
			setIsGameStart(true);
		}
	}

	return (
		<section className={`time`}>
			<h1 className='time__title'>Выберите время</h1>
			<div className='time__board board'>
				<ul className='board-time__list' onClick={clickTime}>
					<li className='board-time__item' data-time="30">30 сек</li>
					<li className='board-time__item' data-time="45">45 сек</li>
					<li className='board-time__item' data-time="60">1 мин</li>
					<li className='board-time__item' data-time="90">1 мин 30 сек</li>
				</ul>
			</div>
		</section>
	)
}
export default Time;