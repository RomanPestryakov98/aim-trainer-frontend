import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import MainScreen from '../MainScreen/MainScreen';
import { Route, Routes } from 'react-router-dom';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Burger from '../Burger/Burger';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Leaderboards from '../Leaderboards/Leaderboards';
import * as auth from '../../utils/auth.js';
import MainApi from '../../utils/MainApi';
import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [time, setTime] = useState(0);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [blockOnSubmit, setBlockOnSubmit] = useState(false);
	const [isGameStart, setIsGameStart] = useState(false);
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		tokenCheck();
		// eslint-disable-next-line
	}, [isLoggedIn])

	function tokenCheck(isLogin) {
		auth.tokenCheck()
			.then(data => {
				if (data) {
					setIsLoggedIn(true);
					setCurrentUser({ email: data.email, name: data.name });
					!isLogin && navigate(location.pathname);
				}
			})
			.catch(err => {
				console.log("err")
			})

	}

	function signout() {
		auth.signout()
			.then(() => {
				setIsLoggedIn(false);
				navigate('/');
				setCurrentUser({});
			})
			.catch(err => {
				console.log(err)
			})
	}

	function register(data) {
		setBlockOnSubmit(true);
		return auth.regApi(data.email, data.name, data.password)
			.then((res) => {
				console.log(res)
				login(data);
			})
			.catch((err) => {
				return Promise.reject(err)
			})
	}

	function login(data) {
		setBlockOnSubmit(true);
		return auth.loginApi(data.email, data.name, data.password)
			.then(res => {
				if (res) {
					tokenCheck(true);
					navigate('/')
				}
			})
			.catch((err) => {
				return Promise.reject(err)
			})
	}

	function updateProfile(data) {
		return MainApi.updateDataProfile(data, localStorage.getItem('token'));
	}

	function createGame(data) {
		MainApi.createGame(data, localStorage.getItem('token'))
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className={`container ${isBurgerOpen ? 'menu-open' : ''}`} >
				<Burger setIsBurgerOpen={setIsBurgerOpen} isBurgerOpen={isBurgerOpen} />
				<Header
					setIsBurgerOpen={setIsBurgerOpen}
					onSignout={signout}
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					setCurrentUser={setCurrentUser}
					setIsGameStart={setIsGameStart} />
				<Routes>
					<Route
						path="/"
						element={<MainScreen
							isGameStart={isGameStart}
							isLoggedIn={isLoggedIn}
							setTime={setTime}
							time={time}
							createGame={createGame}
							setIsGameStart={setIsGameStart} />} />
					<Route path="/register" element={<Registration onRegister={register} blockOnSubmit={blockOnSubmit} setBlockOnSubmit={setBlockOnSubmit} />} />
					<Route path="/login" element={<Login onLogin={login} blockOnSubmit={blockOnSubmit} setBlockOnSubmit={setBlockOnSubmit} />} />
					<Route path="/leaders" element={<Leaderboards />} />
					<Route
						path="/profile"
						element={<ProtectedRouteElement
							element={Profile}
							isLoggedIn={isLoggedIn}
							setCurrentUser={setCurrentUser}
							currentUser={currentUser}
							onUpdateProfile={updateProfile}
						/>}
					/>
				</Routes>
			</div>
		</CurrentUserContext.Provider >
	)
}

export default App;
