import React from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Link from 'next/link';
import Category from '../../../components/crud/category';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 py-5">
							<h2>Manage Categories and Tags</h2>
						</div>
						<div className="col-md-6">
							<h3>Categories</h3>
							<div>
								<Category />
							</div>
						</div>
						<div className="col-md-6">
							<h3>Tags</h3>
							<div>
								<Tag />
							</div>
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default CategoryTag;
