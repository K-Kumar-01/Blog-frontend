import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import moment from 'moment';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import { userPublicProfile } from '../../actions/user';
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query }) => {
	const head = () => {
		return (
			<Head>
				<title>
					{user.name} | {APP_NAME}
				</title>
				<meta name="description" content={`Blogs by ${user.username}`} />
				<link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
				<meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
				<meta property="og:description" content={`Blogs by ${user.username}`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
				<meta property="og:site_name" content={APP_NAME} />

				<meta property="og:image" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:type" content="image/jpeg" />
				<meta property="fb:app_id" content={FB_APP_ID} />
			</Head>
		);
	};

	const showUserBlogs = () => {
		return blogs.map((blog) => {
			return (
				<div className="my-4" key={blog._id}>
					<Link href={`/blogs/${blog.slug}`}>
						<a className="lead">{blog.title}</a>
					</Link>
				</div>
			);
		});
	};
	return (
		<div>
			{head()}
			<Layout>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-8">
											<h5>{user.name}</h5>
											<p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
										</div>
										<div className="col-md-4">
											<img
												src={`${API}/user/photo/${user.username}`}
												className="img-fluid img mb-3"
												style={{ maxHeight: '100px', maxWidth: '100%' }}
												alt="user profile"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<div className="card-title px-4 py-4 bg-primary text-white">
										Recent blogs by {user.name}
									</div>
									<div>{showUserBlogs()}</div>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<div className="card-title px-4 py-4 bg-primary text-white">
										Message {user.name}
									</div>
									<br />
									<ContactForm authorEmail={user.email} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

UserProfile.getInitialProps = ({ query }) => {
	return userPublicProfile(query.username)
		.then((data) => {
			if (data.error) {
				console.log(data.error);
				return { error: data.error };
			} else {
				return { user: data.user, blogs: data.blogs, query: query };
			}
		})
		.catch((err) => {
			console.log(err);
			return { error: err };
		});
};

export default UserProfile;
