import Time from '../Time/Time';
import Game from '../Game/Game';
import GameOff from '../GameOff/GameOff';

function MainScreen({ setTime, time, createGame, isLoggedIn, isGameStart, setIsGameStart }) {
	return (
		<>
			<GameOff />
			{isGameStart
				?
				<Game time={time} setIsGameStart={setIsGameStart} createGame={createGame} isLoggedIn={isLoggedIn} />
				:
				<Time setTime={setTime} setIsGameStart={setIsGameStart} />}
		</>
	)
}
export default MainScreen;