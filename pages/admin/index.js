import React from 'react';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';

const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 py-5">
							<h2>Admin Dashboard</h2>
						</div>
						<div className="col-md-4">
							<ul className="list-group">
								<li className="list-group-item">
									<Link href="/admin/crud/category-tag">
										<a>Create Category</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/category-tag">
										<a>Create Tag</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/blog">
										<a>Create Blog</a>
									</Link>
								</li>
								<li className="list-group-item">
									<Link href="/admin/crud/blogs">
										<a>Update/Delete Blogs</a>
									</Link>
								</li>
								{/* <li className="list-group-item">Dapibus ac facilisis in</li>
								<li className="list-group-item">Morbi leo risus</li>
								<li className="list-group-item">Porta ac consectetur ac</li>
								<li className="list-group-item">Vestibulum at eros</li> */}
							</ul>
						</div>
						<div className="col-md-8">right</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default AdminIndex;
