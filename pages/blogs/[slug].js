import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import LazyLoad from 'react-lazy-load';
import { Alert } from 'reactstrap';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
	const [errors, setErrors] = useState(false);
	const [related, setRelated] = useState([]);
	const loadRelated = () => {
		listRelated({ _id: blog._id, categories: blog.categories })
			.then((data) => {
				if (data.error) {
					setErrors(data.error);
				} else {
					// console.log(data);
					setRelated(data);
				}
			})
			.catch((err) => {
				console.log(err);
				setErrors('There was a problem in loading the related blogs');
			});
	};
	useEffect(() => {
		loadRelated();
	}, []);

	const onDismissError = () => {
		setErrors(false);
	};

	const showErrors = () => {
		let w;
		if (errors) {
			w = errors.length > 0;
		} else {
			w = false;
		}
		return (
			<Alert color="danger" isOpen={w} toggle={onDismissError} fade={true}>
				{errors}
			</Alert>
		);
	};

	const head = () => {
		return (
			<Head>
				<title>
					{blog.title} | {APP_NAME}
				</title>
				<meta name="description" content={`${blog.mdesc}`} />
				<link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
				<meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
				<meta property="og:description" content={blog.mdesc} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
				<meta property="og:site_name" content={APP_NAME} />

				<meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
				<meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
				<meta property="og:image:type" content="image/jpeg" />
				<meta property="fb:app_id" content={FB_APP_ID} />
			</Head>
		);
	};
	const showBlogCategories = () => {
		return blog.categories.map((c) => {
			return (
				<Link key={c._id} href={`/categories/${c.slug}`}>
					<a className="btn btn-outline-info mx-1 mt-3">{c.name}</a>
				</Link>
			);
		});
	};

	const showBlogTags = () => {
		return blog.tags.map((t) => {
			return (
				<Link key={t._id} href={`/tags/${t.slug}`}>
					<a className="btn btn-info mx-1 mt-3">{t.name}</a>
				</Link>
			);
		});
	};

	const showRelatedBlogs = () => {
		if (related.length > 0) {
			return related.map((blog) => {
				return (
					<div className="col-md-4" key={blog._id}>
						<article>
							<SmallCard blog={blog} />
						</article>
					</div>
				);
			});
		}
	};

	const showComments = () => {
		return (
			<div>
				<DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
			</div>
		);
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<article>
						<div className="container-fluid">
							<section>
								<div className="row" style={{ marginTop: '-30px' }}>
									<img
										src={`${API}/blog/photo/${blog.slug}`}
										alt={blog.title}
										className="img img-fluid featured-image"
									/>
								</div>
							</section>
							<section>
								<div className="container">
									<h1 className="display-2 py-3 text-center font-weight-bold text-capitalize">
										{blog.title}
									</h1>
									<p className="lead py-1 mt-2 mark">
										Written by{' '}
										<Link href={`/profile/${blog.postedBy.username}`}>
											<a>{blog.postedBy.username}</a>
										</Link>{' '}
										| Published : {moment(blog.updatedAt).fromNow()}
									</p>
									<div className="pb-3">
										{showBlogCategories()}
										{showBlogTags()}
									</div>
									<br />
								</div>
							</section>
						</div>
						<div className="container">
							<section>
								<div className="col-md-12 lead">{renderHTML(blog.body)}</div>
							</section>
						</div>
						<div className="container pb-5">
							<h4 className="text-center py-5 h2">Related blogs</h4>
							<hr />
							{errors && showErrors()}
							{showRelatedBlogs()}
						</div>
						<div className="container pb-5">{showComments()}</div>
					</article>
				</main>
			</Layout>
		</React.Fragment>
	);
};

SingleBlog.getInitialProps = ({ query }) => {
	return singleBlog(query.slug)
		.then((data) => {
			if (data.error) {
				console.log(data.error);
				return { error: data.error };
			} else {
				return { blog: data, query };
			}
		})
		.catch((err) => {
			console.log(err);
			return { error: err };
		});
};

export default SingleBlog;
