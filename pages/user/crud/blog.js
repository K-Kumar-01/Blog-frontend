import React from 'react';
import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';

const CreateBlog = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 py-5">
							<h2>Create a new blog</h2>
						</div>
						<div className="col-md-12">
							<BlogCreate />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default CreateBlog;
