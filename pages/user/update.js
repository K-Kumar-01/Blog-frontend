import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Private from '../../components/auth/Private';

const UserProfileUpdate = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<ProfileUpdate />
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default UserProfileUpdate;
