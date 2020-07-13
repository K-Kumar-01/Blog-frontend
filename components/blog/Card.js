import React from 'react';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
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
	return (
		<div className="lead pb-4">
			<header>
				<Link href={`/blogs/${blog.slug}`}>
					<a>
						<h2 className="py-3 font-weight-bold">{blog.title}</h2>
					</a>
				</Link>
			</header>
			<section>
				<p className="mark ml-1 py-2">
					Written by{' '}
					<Link href={`/profile/${blog.postedBy.username}`}>
						<a>{blog.postedBy.username}</a>
					</Link>{' '}
					| Published : {moment(blog.updatedAt).fromNow()}
				</p>
			</section>
			<section className="mb-3">
				{showBlogCategories()}
				{showBlogTags()}
			</section>
			<div className="row">
				<div className="col-md-4">
					<section>
						<img
							className="img img-fluid"
							style={{ maxHeight: '300px', width: '100%' }}
							src={`${API}/blog/photo/${blog.slug}`}
							alt={blog.title}
						/>
					</section>
				</div>
				<div className="col-md-8">
					<section>
						<div className="pb-3">{renderHTML(blog.excerpt)}</div>
						<Link href={`/blogs/${blog.slug}`}>
							<a className="btn btn-outline-primary pt-2">Read More</a>
						</Link>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Card;
