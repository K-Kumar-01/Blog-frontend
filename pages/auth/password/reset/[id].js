import React, { useState } from 'react';
import { resetPassword } from '../../../../actions/auth';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';

const ResetPassword = ({ router }) => {
	const [values, setValues] = useState({
		name: '',
		newPassword: '',
		error: '',
		message: '',
		showForm: true,
	});

	const { showForm, name, message, error, newPassword } = values;

	const handleSubmit = (e) => {
		e.preventDefault();
		resetPassword({
			newPassword,
			resetPasswordLink: router.query.id,
		})
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, message: '', showForm: true, newPassword: '' });
				} else {
					setValues({ ...values, error: false, message: data.message, showForm: false, newPassword: '' });
				}
			})
			.catch((err) => {
				if (err) {
					setValues({ ...values, error: err, message: '', showForm: true, newPassword: '' });
				}
			});
	};

	const showError = () => {
		return error ? <div className="alert alert-danger">{error}</div> : '';
	};

	const showMessage = () => {
		return message && message.length > 0 ? <div className="alert alert-success">{message}</div> : '';
	};

	const passwordResetForm = () => {
		return (
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="form-group pt-5">
						<label htmlFor="password" className="lead">
							New Password
						</label>
						<input
							type="password"
							name="password"
							onChange={(e) => {
								setValues({ ...values, newPassword: e.target.value });
							}}
							className="form-control"
							placeholder="Enter your new password"
							value={newPassword}
							required
						/>
					</div>
					<div>
						<button className="btn btn-primary">Set Password</button>
					</div>
				</form>
			</div>
		);
	};

	return (
		<Layout>
			<div className="container">
				<h2>Reset Password</h2>
				<hr />
				{showError()}
				{showMessage()}
				{showForm && passwordResetForm()}
			</div>
		</Layout>
	);
};

export default withRouter(ResetPassword);
