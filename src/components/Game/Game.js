import './Game.css';
import Circle from '../Circle/Circle';
import { getRandomNumber, getTime } from '../../utils/utils';
import doneAudio from '../../audio/done.mp3'
import missAudio from '../../audio/miss.mp3'
import React, { useState, useEffect } from 'react';
import playIcon from '../../images/play.svg';
import { Link } from 'react-router-dom';

function Game({ time, setIsGameStart, createGame, isLoggedIn }) {
	const doneAudioRef = React.useRef();
	const missAudioRef = React.useRef();

	const [sizePurpose, setSizePurpose] = useState(0);
	const [position, setPosition] = useState({ left: 0, top: 0 });

	const [showResult, setShowResult] = useState(false);

	const [score, setScore] = useState(0);

	const [timeLeft, setTimeLeft] = useState(3);
	const [isCouting, setIsCouting] = useState(true);

	const [timeLeft2, setTimeLeft2] = useState(time);
	const [isCouting2, setIsCouting2] = useState(false);
	const minutes = getTime(Math.floor(timeLeft2 / 60));
	const seconds = getTime(timeLeft2 - minutes * 60);

	useEffect(() => {
		const interval = setInterval(() => {
			isCouting &&
				setTimeLeft(timeLeft => timeLeft - 1);

			if (timeLeft === 0) {
				setIsCouting(false);
				setIsCouting2(true);
				randomCircle();

			}
		}, 1000)

		return () => {
			clearInterval(interval);
		}
	}, [isCouting, timeLeft])

	useEffect(() => {
		const interval2 = setInterval(() => {
			isCouting2 &&
				setTimeLeft2(timeLeft => timeLeft - 1);

			if (timeLeft2 === 1) {
				finishGame();
			}
		}, 1000)

		return () => {
			clearInterval(interval2);
		}
		// eslint-disable-next-line 
	}, [isCouting2, timeLeft2])

	useEffect(() => {
		if (showResult && isLoggedIn) {
			createGame({ time, record: score })
		}
		// eslint-disable-next-line
	}, [showResult])

	function finishGame() {
		setShowResult(true);
		setIsCouting2(false);

	}

	function randomCircle() {
		const sizeBoard = document.querySelector('.board-game').getBoundingClientRect();
		const size = getRandomNumber(25, 45);

		setSizePurpose(size);
		setPosition({ left: getRandomNumber(0, sizeBoard.width - size), top: getRandomNumber(0, sizeBoard.height - size) });
	}

	function clickBoard(e) {
		if (e.target.classList.contains('circle')) {
			randomCircle(e);
			setScore(score => score + 1)
			audio(doneAudioRef);
		}
		else if (e.target.classList.contains('board-game')) {
			audio(missAudioRef);
		}

	}

	function audio(voice) {
		if (voice.current.paused) {
			voice.current.play();
		} else {
			voice.current.currentTime = 0
		}
	}

	function restartGame() {
		setIsGameStart(false);
		document.querySelector('body').classList.remove('custom-cursor');
	}



	function mouseEnterBoard() {
		document.querySelector('body').classList.add('custom-cursor');

	}

	function mouseLeaveBoard() {
		document.querySelector('body').classList.remove('custom-cursor');
	}

	return (
		<section className={`game`}>
			<h1 className='game__title noselect'>Осталось времени {minutes}:{seconds}</h1>
			<div className='game__board board-game' onMouseDown={clickBoard} onMouseEnter={mouseEnterBoard} onMouseLeave={mouseLeaveBoard}>
				{showResult &&
					<div className='board-game__end'>
						<h2 className="board-game__result">Результат: <span>{score}</span></h2>
						<Link className='board-game__restart' to="/" onClick={restartGame}>
							<span>Начать заново</span>
							<img src={playIcon} alt="Играть" />
						</Link>
					</div>
				}

				<div className='board-game__time-to-start noselect'>
					{timeLeft > 0 && timeLeft}
					{timeLeft === 0 && <h2 style={{ fontSize: '150px' }}>Старт</h2>}
				</div>

				{isCouting2 && <Circle position={position} sizePurpose={sizePurpose} setScore={setScore} />}

				<audio src={doneAudio} ref={doneAudioRef} />
				<audio src={missAudio} ref={missAudioRef} />
			</div>
		</section >
	)
}
export default Game;