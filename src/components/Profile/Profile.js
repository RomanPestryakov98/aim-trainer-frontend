import './Profile.css';
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from 'react';
import { isEmail } from 'validator';
import Preloader from '../Preloader/Preloader';

function Profile({ onUpdateProfile, currentUser, setCurrentUser }) {
	const { reset, register, setError, handleSubmit, formState: { errors, isValid, isDirty } }
		= useForm({
			mode: 'onChange', defaultValues: useMemo(() => {
				return currentUser;
			}, [currentUser])
		});

	const [unknownError, setUnknownError] = useState(false);
	const [blockOnSubmit, setBlockOnSubmit] = useState(false);

	const clasNameButton = 'form__submit';
	const clasNameButtonValid = 'form__submit Form__submit_valid';

	function onSubmit(data) {
		setBlockOnSubmit(true)
		onUpdateProfile(data)
			.then(data => {
				setCurrentUser({ email: data.email, name: data.name });
				reset();
			})
			.catch(err => {
				if (err.message === 'Пользователь с таким логином уже существует') {
					setError('name', { type: 'loginError', message: 'Логин уже используется' });
				}
				else if (err.message === 'Пользователь с такой почтой уже существует') {
					setError('email', { type: 'emailError', message: 'Почта уже используется' });
				}
				else {
					setUnknownError(true)
				}
			})
			.finally(() => {
				setBlockOnSubmit(false)
			})
	}

	useEffect(() => {
		reset(currentUser);
		// eslint-disable-next-line
	}, [currentUser]);

	return (
		<section className='profile'>
			<h1 className='form__title'>Мой профиль</h1>
			<div className='form'>
				<form action="#" className="form__form" onSubmit={handleSubmit(onSubmit)}>
					<label className="form__label">
						<span className='form__label-text'>Почта</span>
						<input type="email" className="form__input" {...register('email', {
							validate: value => isEmail(value) || 'Нужно ввести email',
						})} />
						<span className='form__input-error'>
							{errors?.email?.message}
						</span>
					</label>
					<label className="form__label">
						<span className='form__label-text'>Логин</span>
						<input type="name" className="form__input" {...register('name', {
							minLength: {
								value: 3,
								message: "Минимальная длина пароля 3 символа"
							}
						})} />
						<span className='form__input-error'>
							{errors?.name?.message}
						</span>
					</label>
					<div className='form__submit-container'>
						{unknownError &&
							<div className='form__input-error form__input-error_center'>Неизвестная ошибка</div>
						}
						<div className='submit-container-preloader'>
							{blockOnSubmit && <Preloader />}
							<input type="submit" disabled={(isDirty && isValid && !blockOnSubmit) ? false : true} className={`${clasNameButton} ${isDirty && isValid && clasNameButtonValid}`} value={blockOnSubmit ? '' : 'Обновить'} />
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Profile;