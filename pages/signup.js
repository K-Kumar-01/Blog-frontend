import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
	return (
		<Layout>
			<h2 className="text-center py-4">Signup</h2>
			<div className="row">
				<div className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
					<SignupComponent />
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
