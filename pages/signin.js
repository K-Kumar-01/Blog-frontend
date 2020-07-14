import React from 'react';
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';
import { withRouter } from 'next/router';

const Signup = ({ router }) => {
	const showRedirectMessage = () => {
		if (router.query.message) {
			return <div className="alert alert-info">{router.query.message}</div>;
		} else {
			return;
		}
	};
	return (
		<Layout>
			<h2 className="text-center py-4">Signin</h2>
			<div className="row">
				<div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">{showRedirectMessage()}</div>
			</div>
			<div className="row">
				<div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
					<SigninComponent />
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Signup);
