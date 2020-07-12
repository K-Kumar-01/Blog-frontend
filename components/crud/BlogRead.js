import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';
import { remove } from '../../../../backend/models/tag';

const BlogRead = () => {
	const [blogs, setBlogs] = useState([]);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState('');
	const token = getCookie('token');

	const loadBlogs = () => {
		list()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
					if (data.error.length > 0) {
						setErrors(data.error);
					} else {
						setErrors('Could not load blogs');
					}
				} else {
					setBlogs(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		loadBlogs();
	}, []);

	const deleteBlog = (slug) => {
		setLoading(true);
		removeBlog(slug, token).then((data) => {
			if (data.error) {
				console.log(data.error);
				setLoading(false);
				setErrors('There occurred an error in deleting the blog. Please try again later ');
			} else {
				setMessage(data.message);
				setLoading(false);
				loadBlogs();
			}
		});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm('Are you sure you want to delete the blog?');
		if (answer) {
			deleteBlog(slug);
		} else {
		}
	};

	const showMessage = () => {
		return <div className="alert alert-warning">{message}</div>;
	};

	const showErrors = () => {
		if (errors.length > 0) {
			return <div className="alert alert-danger">{errors}</div>;
		}
	};

	const showLoading = () => {
		if (loading) {
			return <div className="alert alert-dark">Please wait while the blog is being deleted</div>;
		}
	};

	const showUpdateButton = (blog) => {
		if (isAuth() && isAuth().role === 0) {
			return (
				<Link href={`/user/crud/${blog.slug}`}>
					<a className="btn btn-sm btn-warning text-uppercase">Update</a>
				</Link>
			);
		} else if (isAuth() && isAuth().role === 1) {
			return (
				<Link href={`/admin/crud/${blog.slug}`}>
					<a className="btn btn-sm btn-warning text-uppercase">Update</a>
				</Link>
			);
		}
	};

	const showAllBlogs = () => {
		return blogs.map((blog) => {
			return (
				<div key={blog._id} className="mt-2 pb-2">
					<h3>{blog.title}</h3>
					<p className="mark">
						Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
					</p>
					<button
						className="btn btn-sm btn-danger text-uppercase mr-3"
						onClick={() => {
							deleteConfirm(blog.slug);
						}}
					>
						Delete
					</button>
					{showUpdateButton(blog)}
				</div>
			);
		});
	};
	return (
		<React.Fragment>
			<div className="row">
				<div className="col-md-12">
					{message && showMessage()}
					{showErrors()}
					{loading && showLoading()}
					{showAllBlogs()}
				</div>
			</div>
		</React.Fragment>
	);
};

export default BlogRead;
