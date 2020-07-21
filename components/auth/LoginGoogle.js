import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../config';

const LoginGoogle = () => {
	const responseGoogle = (response) => {
		// console.log(response);
		const tokenId = response.tokenId;
		const user = { tokenId };

		loginWithGoogle(user).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
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

	const responseGoogleFAIL = (response) => {
		console.log(`response failure is ${response}`);
	};
	return (
		<div className="pb-3">
			<GoogleLogin
				clientId={`${GOOGLE_CLIENT_ID}`}
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogleFAIL}
				theme="dark"
			/>
		</div>
	);
};

export default LoginGoogle;
