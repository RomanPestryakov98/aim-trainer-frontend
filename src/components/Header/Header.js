import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({ onSignout, isLoggedIn, setIsBurgerOpen, setIsGameStart }) {
	const currentUser = useContext(CurrentUserContext);

	function handleSignout() {
		onSignout();
	}

	function handlePlay() {
		setIsBurgerOpen(false);
		setIsGameStart(false);
	}

	function clickLogo() {
		setIsGameStart(false);
		setIsBurgerOpen(false);
	}
	return (
		<header className='header'>
			<Link to='/' className='header__logo' onClick={clickLogo}>
				<img src={logo} alt="logo" />
				AIM TRAINER
			</Link>
			<ul className='header__list'>
				<li className='header__item'>
					<Link to='/' className='header__link' onClick={handlePlay}>
						Играть
					</Link>
				</li>
				<li className='header__item'>
					<Link to='/leaders' className='header__link' onClick={() => { setIsBurgerOpen(false) }}>
						Список лидеров
					</Link>
				</li>
				{isLoggedIn ?
					<>
						<li className='header__item'>
							<Link to='/profile' className='header__link header__link_nickname' onClick={() => { setIsBurgerOpen(false) }}>
								{`(${currentUser.name})`}
							</Link>

						</li>
						<li className='header__item '>
							<Link to='/' className='header__link no-select' onClick={handleSignout}>
								Выйти
							</Link>
						</li>
					</>
					:
					<>
						<li className='header__item'>
							<Link to='/login' className='header__link' onClick={() => { setIsBurgerOpen(false) }}>
								Вход
							</Link>
						</li>
						<li className='header__item'>
							<Link to='/register' className='header__link' onClick={() => { setIsBurgerOpen(false) }}>
								Регистрация
							</Link>
						</li>
					</>
				}
			</ul>
		</header>
	)
}
export default Header;