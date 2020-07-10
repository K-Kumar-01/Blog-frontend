import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import SigninComponent from '../components/auth/SigninComponent';

const Signup = () => {
	return (
		<Layout>
			<h2 className="text-center py-4">Signin</h2>
			<div className="row">
				<div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
					<SigninComponent />
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
