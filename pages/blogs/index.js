import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';

import Card from '../../components/blog/Card';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import Loading from '../../components/loading/Loading';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogSkip, blogsLimit, router }) => {
	// SEO for the page using Head from next
	const head = () => {
		return (
			<Head>
				<title>Programming blogs and tutorials</title>
				<meta
					name="description"
					content="Programming blogs and tutorials on Angular, React, Vue, Next, Nuxt and other web development techniques"
				/>
				<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
				<meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`} />
				<meta
					property="og:description"
					content="Programming blogs and tutorials on Angular, React, Vue, Next, Nuxt and other web development techniques"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
				<meta property="og:site_name" content={APP_NAME} />

				<meta property="og:image" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:type" content="image/jpeg" />
				<meta property="fb:app_id" content={FB_APP_ID} />
			</Head>
		);
	};

	// state
	const [limit, setLimit] = useState(blogsLimit);
	const [skip, setSkip] = useState(blogSkip);
	const [size, setSize] = useState(totalBlogs);
	const [loadedBlogs, setLoadedBlogs] = useState([]);
	const [values, setValues] = useState({
		error: '',
		loading: false,
	});
	const { loading, error } = values;

	const loadMore = () => {
		let toSkip = skip + limit;
		setValues({ ...values, loading: true, error: '' });
		listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
			if (data.error) {
				if (data.error.length === 0) {
					setValues({ ...values, error: 'An unknown error happened' });
				} else {
					setValues({ ...values, error: data.error });
				}
			} else {
				setLoadedBlogs([...loadedBlogs, ...data.blogs]);
				setSize(data.size);
				setSkip(toSkip);
				setValues({ ...values, loading: false });
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className="btn btn-primary btn-large">
					Load More
				</button>
			)
		);
	};

	const showAllBlogs = () => {
		return blogs.map((blog) => {
			return (
				<article key={blog._id}>
					<Card blog={blog} />
					<hr />
				</article>
			);
		});
	};

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog) => (
			<article key={blog._id}>
				<Card blog={blog} />
			</article>
		));
	};

	const showAllCategories = () => {
		return categories.map((c) => {
			return (
				<Link key={c._id} href={`/categories/${c.slug}`}>
					<a className="btn btn-outline-info mx-1 mt-3">{c.name}</a>
				</Link>
			);
		});
	};

	const showAllTags = () => {
		return tags.map((t) => {
			return (
				<Link key={t._id} href={`/tags/${t.slug}`}>
					<a className="btn btn-info mx-1 mt-3">{t.name}</a>
				</Link>
			);
		});
	};
	const showError = () => {
		return (
			<div className="alert alert-danger" style={{ display: error.length > 0 ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<div className="container-fluid">
						<header>
							<div className="col-md-12 pt-3">
								<h1 className="display-4 font-weight-bold text-center">
									Programming blogs and tutorials
								</h1>
							</div>
							<section>
								<div className="pb-5 justify">
									{showAllCategories()}
									<br />
									{showAllTags()}
								</div>
							</section>
						</header>
					</div>
					<div className="container-fluid">{showAllBlogs()}</div>
					<div className="container-fluid">{showLoadedBlogs()}</div>
					{loading && <Loading />}
					{error.length > 0 && showError()}
					<div className="text-center pt-5 pb-5">{!loading && loadMoreButton()}</div>
				</main>
			</Layout>
		</React.Fragment>
	);
};

Blogs.getInitialProps = () => {
	let limit = 2,
		skip = 0;
	return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				totalBlogs: data.size,
				blogsLimit: limit,
				blogSkip: skip,
			};
		}
	});
};

export default withRouter(Blogs);
