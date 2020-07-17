import React, { useState } from 'react';
import { forgotPassword } from '../../../actions/auth';
import Layout from '../../../components/Layout';

const ForgotPassword = () => {
	const [values, setValues] = useState({
		email: '',
		message: '',
		error: '',
		showForm: true,
	});

	const { email, message, showForm, error } = values;

	const handleChange = (name) => (e) => {
		setValues({ error: false, message: '', [name]: e.target.value, showForm: true });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, message: '', error: false });
		forgotPassword({ email })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, message: '' });
				} else {
					setValues({ ...values, error: false, message: data.message, showForm: false, email: '' });
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err, message: '' });
			});
	};

	const showError = () => {
		return error ? <div className="alert alert-danger">{error}</div> : '';
	};

	const showMessage = () => {
		return message && message.length > 0 ? <div className="alert alert-success">{message}</div> : '';
	};

	const passwordForgotForm = () => {
		return (
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="form-group pt-5">
						<label htmlFor="email" className="lead">
							Email
						</label>
						<input
							type="email"
							name="email"
							onChange={handleChange('email')}
							className="form-control"
							placeholder="Enter your email"
							value={email}
							required
						/>
					</div>
					<div>
						<button className="btn btn-primary">Send Password Reset Link</button>
					</div>
				</form>
			</div>
		);
	};
	return (
		<Layout>
			<div className="container">
				<h2>Forgot Password</h2>
				<hr />
				{showError()}
				{showMessage()}
				{showForm && passwordForgotForm()}
			</div>
		</Layout>
	);
};

export default ForgotPassword;
