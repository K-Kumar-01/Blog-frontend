import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { isAuth, signup } from '../../../../actions/auth';
import { withRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Loading from '../../../../components/loading/Loading';

const ActivateAccount = ({ router }) => {
	const [values, setValues] = useState({
		name: '',
		token: '',
		error: '',
		message: '',
		loading: false,
		success: false,
		showButton: true,
	});

	const { name, token, error, showButton, loading, success, message } = values;

	useEffect(() => {
		let token = router.query.id;
		if (token) {
			const { name } = jwt.decode(token);
			setValues({ ...values, token, name });
		}
	}, [router]);

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false, message: false });
		signup({ token })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, loading: false, error: data.error });
				} else {
					setValues({ ...values, loading: false, success: true, showButton: false });
				}
			})
			.catch((err) => {
				setValues({ ...values, loading: false, error: err });
			});
	};

	const showLoading = () => {
		return loading ? <Loading /> : '';
	};

	const showError = () => {
		console.log(error);
		return <div className="alert alert-danger">{error}</div>;
	};

	const showButtonElement = () => {
		return (
			<button className="btn btn-lg btn-outline-primary" onClick={clickSubmit}>
				Activate Account
			</button>
		);
	};

	return (
		<Layout>
			<div className="container">
				<h3 className="pb-3">Hey {name}, Ready to activate your account?</h3>
				{showLoading()}
				{error && showError()}
				{success && (
					<div className="alert alert-success">
						You have successfully activated the account. Please sign in now
					</div>
				)}
				{showButton && showButtonElement()}
			</div>
		</Layout>
	);
};

export default withRouter(ActivateAccount);
