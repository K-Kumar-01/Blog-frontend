import React, { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth.js';
import Router  from 'next/router';

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { name, email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = { name, email, password };
		setValues({ ...values, loading: true });
		signup(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name: '',
					password: '',
					email: '',
					error: '',
					loading: false,
					message: data.message,
					showForm: false,
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
		return message.length > 0 ? <div className="alert alert-success">{message}</div> : '';
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
					<label htmlFor="name" className="font-weight-bold">
						Name
					</label>
					<div className="form-group">
						<input
							name="name"
							type="text"
							placeholder="Type your name"
							className="form-control"
							value={name}
							onChange={handleChange('name')}
							autoComplete="off"
						/>
					</div>
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
						<p className="text-muted lead small">Password must be at least 6 characters long</p>
					</div>

					<div className="text-center">
						<button className="btn btn-primary">Signup</button>
					</div>
				</form>
			)}
		</React.Fragment>
	);
};

export default SignupComponent;
