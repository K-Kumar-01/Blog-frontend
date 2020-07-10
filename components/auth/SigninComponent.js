import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth.js';
import Router from 'next/router';

const SigninComponent = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = { email, password };
		setValues({ ...values, loading: true });
		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({ ...values, loading: false });
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push('/admin');
					} else {
						Router.push('/user');
					}
				});
			}
		});
	};

	const showLoading = () => {
		return loading ? <div className="alert alert-info">Loading...</div> : '';
	};
	const showError = () => {
		return error ? <div className="alert alert-danger">{error}</div> : '';
	};
	const showMessage = () => {
		return message.length > 0 ? <div className="alert alert-info">{message}</div> : '';
	};

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && (
				<form onSubmit={handleSubmit}>
					<label htmlFor="email" className="font-weight-bold">
						Email
					</label>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Type your email"
							className="form-control"
							value={email}
							onChange={handleChange('email')}
							autoComplete="off"
						/>
					</div>
					<label htmlFor="password" className="font-weight-bold">
						Password
					</label>
					<div className="form-group">
						<input
							type="password"
							name="password"
							placeholder="Type your password"
							className="form-control"
							value={password}
							onChange={handleChange('password')}
							autoComplete="off"
						/>
					</div>
					<div className="text-center">
						<button className="btn btn-primary">Signin</button>
					</div>
				</form>
			)}
		</React.Fragment>
	);
};

export default SigninComponent;
