import React from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';

const Blog = () => {
	return (
		<Layout>
			<Admin>
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
			</Admin>
		</Layout>
	);
};

export default Blog;
