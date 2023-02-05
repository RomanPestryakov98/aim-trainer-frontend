import './Form.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Preloader from '../Preloader/Preloader';
import { isEmail } from 'validator';
import { useState } from 'react';

function Form({ name, onRegister, onLogin, blockOnSubmit, setBlockOnSubmit }) {
	const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

	const [unknownError, setUnknownError] = useState(false);
	//const [blockOnSubmit, setBlockOnSubmit] = useState(false);

	const clasNameButton = 'form__submit';
	const clasNameButtonValid = 'form__submit Form__submit_valid';

	const onSubmit = (data) => {
		if (name === 'register') {
			onRegister(data)
				.catch(err => {
					if (err.status === 409) {
						return err.json();
					}
					else {
						setUnknownError(true);
						return;
					}
				})
				.then(res => {
					if (res) {
						if (res.message === 'Пользователь с таким логином уже существует') {
							setError('name', { type: 'nameError', message: res.message });
						}
						else {
							setError('email', { type: 'emailError', message: res.message });
						}
					}
				})
				.finally(() => {
					setBlockOnSubmit(false);
					setTimeout(() => {
						setUnknownError(false);
					}, 3000)
				})
		}

		if (name === 'login') {
			let res = {};
			res.password = data.password;

			if (isEmail(data.name)) {
				res.email = data.name;
				res.name = undefined;
			} else {
				res.name = data.name;
				res.email = undefined;
			}

			onLogin(res)
				.catch((err) => {
					if (err?.status === 401) {
						return err.json();
					}
					else {
						setUnknownError(true);
						return;
					}
				})
				.then(res => {
					if (res) {
						setError('name', { type: 'Unauthorized', message: res.message });
						setError('password', { type: 'Unauthorized', message: res.message });
					}
				})
				.finally(() => {
					setBlockOnSubmit(false);
					setTimeout(() => {
						setUnknownError(false);
					}, 3000)
				})
		}
	}

	return (
		<section className='form'>
			<h3 className='form__title'>{name === 'register' ? 'Регистрация' : 'Вход'}</h3>
			<form action="#" name={name} className="form__form" onSubmit={handleSubmit(onSubmit)}>
				{name === 'register' &&
					<label className="form__label">
						<span className='form__label-text'>Почта</span>
						<input type="email" className="form__input" {...register('email', {
							required: 'Обязательное поле',
							validate: value => isEmail(value) || 'Нужно ввести email',
						})} />
						<span className='form__input-error'>
							{errors?.email?.message}
						</span>
					</label>
				}
				<label className="form__label">
					<span className='form__label-text'>Логин</span>
					<input type="name" className="form__input" {...register('name', {
						required: 'Обязательное поле',
						minLength: {
							value: 3,
							message: "Минимальная длина логина 3 символа"
						},
						maxLength: {
							value: 15,
							message: "Максимальная длина логина 15 символов"
						}
					})} />
					<span className='form__input-error'>
						{errors?.name?.message}
					</span>
				</label>
				<label className="form__label">
					<span className='form__label-text'>Пароль</span>
					<input type="password" className="form__input" {...register('password', {
						required: 'Обязательное поле',
						minLength: {
							value: 3,
							message: "Минимальная длина пароля 3 символа"
						}
					})} />
					<span className='form__input-error'>
						{errors?.password?.message}
					</span>
				</label>
				<div className='form__submit-container'>
					{unknownError &&
						<div className='form__input-error form__input-error_center'>Неизвестная ошибка</div>
					}
					<div className='submit-container-preloader'>
						{blockOnSubmit && <Preloader />}
						<input type="submit" disabled={(isValid && !blockOnSubmit) ? false : true} className={`${clasNameButton} ${isValid && clasNameButtonValid}`} value={blockOnSubmit ? '' : (name === 'register' ? 'Зарегистрироваться' : 'Войти')} />
					</div>
					<p className='form__question'>
						{name === 'register' ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
						{name === 'register'
							? <Link className='form__link' to="/login">Войти</Link>
							: <Link className='form__link' to="/register">Регистрация</Link>
						}
					</p>
				</div>
			</form>
		</section>
	)
}
export default Form;

