import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { singleCategory } from '../../actions/category';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import LazyLoad from 'react-lazy-load';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
	const head = () => {
		return (
			<Head>
				<title>
					{category.name} | {APP_NAME}
				</title>
				<meta name="description" content={`Programming tutorials and blogs related to ${category.name}`} />
				<link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
				<meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
				<meta
					property="og:description"
					content={`Programming tutorials and blogs related to ${category.name}`}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
				<meta property="og:site_name" content={APP_NAME} />

				<meta property="og:image" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/display.jpg`} />
				<meta property="og:image:type" content="image/jpeg" />
				<meta property="fb:app_id" content={FB_APP_ID} />
			</Head>
		);
	};
	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<div className="container-fluid text-center">
						<header>
							<div className="col-md-12 pt-3">
								<h1 className="display-4 font-weight-bold">{category.name}</h1>
								{blogs.map((blog) => {
									return (
										<div key={blog._id}>
											<Card blog={blog} />
											<hr />
										</div>
									);
								})}
							</div>
						</header>
					</div>
				</main>
			</Layout>
		</React.Fragment>
	);
};

Category.getInitialProps = ({ query }) => {
	return singleCategory(query.slug)
		.then((data) => {
			if (data.error) {
				console.log(data.error);
				return { error: data.error };
			} else {
				return { category: data.category, blogs: data.blogs, query };
			}
		})
		.catch((err) => {
			return { error: err };
		});
};

export default Category;
