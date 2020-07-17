import Link from 'next/link';
import { emailContactForm } from '../../actions/form';
import React, { useState } from 'react';

const ContactForm = ({ authorEmail }) => {
	const [values, setValues] = useState({
		message: '',
		name: '',
		email: '',
		success: false,
		sent: false,
		buttonText: 'Send Message',
		error: false,
	});

	const { name, email, message, success, error, sent, buttonText } = values;

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Sending...' });

		emailContactForm({ authorEmail, name, email, message })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, buttonText: 'Send Message' });
				} else {
					setValues({
						...values,
						sent: true,
						success: true,
						name: '',
						email: '',
						message: '',
						error: false,
						buttonText: 'Sent',
					});
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err, buttonText: 'Send Message' });
			});
	};

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message' });
	};

	const showContactForm = () => {
		return (
			<form onSubmit={clickSubmit} className="pb-5">
				<div className="form-group">
					<label htmlFor="message" className="lead">
						Message
					</label>
					<textarea
						onChange={handleChange('message')}
						className="form-control"
						rows="10"
						value={message}
						required
						name="message"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="name" className="lead">
						Name
					</label>
					<input
						type="text"
						onChange={handleChange('name')}
						className="form-control"
						value={name}
						required
						name="name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="lead">
						Email
					</label>
					<input
						type="email"
						name="email"
						onChange={handleChange('email')}
						className="form-control"
						value={email}
						required
					/>
				</div>
				<div>
					<button className="btn btn-primary">{buttonText}</button>
				</div>
			</form>
		);
	};

	const showSuccess = () => {
		return success && <div className="alert alert-success">Thank you for contacting us</div>;
	};

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	return (
		<div>
			{showSuccess()}
			{showError()}
			{showContactForm()}
		</div>
	);
};

export default ContactForm;
