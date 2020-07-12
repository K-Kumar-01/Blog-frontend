import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
import { quillModules, quillFormats } from '../../helpers/quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdate = ({ router }) => {
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [checkedCat, setCheckedCat] = useState([]);
	const [checkedTag, setCheckedTag] = useState([]);
	const [body, setBody] = useState('');
	const [values, setValues] = useState({
		title: '',
		error: '',
		success: '',
		formData: '',
		title: '',
	});
	const { error, success, formData, title } = values;
	const token = getCookie('token');

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initBlog();
		initCategories();
		initTags();
	}, [router]);

	// get data of blog to be updated
	const initBlog = () => {
		if (router.query.slug) {
			singleBlog(router.query.slug)
				.then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setValues({ ...values, title: data.title });
						setBody(data.body);
						setCategoriesArray(data.categories);
						setTagsArray(data.tags);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const setCategoriesArray = (blogCategories) => {
		let ca = [];
		blogCategories.map((c) => {
			ca.push(c._id);
		});
		setCheckedCat(ca);
	};

	const setTagsArray = (blogTags) => {
		let ta = [];
		blogTags.map((t) => {
			ta.push(t._id);
		});
		setCheckedTag(ta);
	};

	const initCategories = () => {
		getCategories()
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setCategories(data);
				}
			})
			.catch((err) => {
				setValues({ ...values, error: 'An unknown error occured' });
			});
	};

	const initTags = () => {
		getTags()
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setTags(data);
				}
			})
			.catch((err) => {
				setValues({ ...values, error: 'An unknown error occured' });
			});
	};

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{ display: error.length > 0 ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((c) => {
				return (
					<li key={c._id} className="list-unstyled">
						<input
							onChange={handleToggleCat(c._id)}
							checked={findOutCategory(c._id)}
							type="checkbox"
							className="mr-2"
						/>
						<label className="form-check-label">{c.name}</label>
					</li>
				);
			})
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((t) => {
				return (
					<li key={t._id} className="list-unstyled">
						<input
							onChange={handleToggleTag(t._id)}
							checked={findOutTag(t._id)}
							type="checkbox"
							className="mr-2"
						/>
						<label className="form-check-label">{t.name}</label>
					</li>
				);
			})
		);
	};

	const findOutCategory = (c) => {
		const result = checkedCat.indexOf(c);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const findOutTag = (t) => {
		const result = checkedTag.indexOf(t);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const handleToggleCat = (c) => () => {
		setValues({ ...values, error: '' });
		const all = [...checkedCat];
		const clickedCategory = checkedCat.indexOf(c);
		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		setCheckedCat(all);
		formData.set('categories', all);
	};
	const handleToggleTag = (t) => () => {
		setValues({ ...values, error: '' });
		const all = [...checkedTag];
		const clickedTag = checkedTag.indexOf(t);
		if (clickedTag === -1) {
			all.push(t);
		} else {
			all.splice(clickedTag, 1);
		}
		setCheckedTag(all);
		formData.set('tags', all);
	};

	const handleBody = (e) => {
		setBody(e);
		formData.set('body', e);
	};

	const handleChange = (name) => (e) => {
		// console.log(e.target.value);
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, error: '', formData, success: '' });
	};

	const editBlog = (e) => {
		e.preventDefault();
		updateBlog(formData, token, router.query.slug)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						sucess: `Blog titled "${data.title}" has been updated successfully`,
					});
					if (isAuth() && isAuth().role === 1) {
						Router.replace(`/admin`);
					} else if (isAuth() && isAuth().role === 0) {
						Router.replace(`/user`);
					}
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err });
			});
	};

	const updateBlogForm = () => {
		return (
			<form onSubmit={editBlog}>
				<div className="form-group">
					<label className="text-muted" htmlFor="title">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="Blog title"
						value={title}
						onChange={handleChange('title')}
					/>
				</div>
				<div className="form-group">
					<ReactQuill
						value={body}
						modules={quillModules}
						formats={quillFormats}
						placeholder="Blog content"
						onChange={handleBody}
					/>
					<h6 className="text-muted">Please ensure that the total size of blog is less than 2MB</h6>
				</div>
				<div>
					<button type="submit" className="btn btn-outline-primary">
						Update
					</button>
				</div>
			</form>
		);
	};

	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8 mb-5">
					<div className="pb-3">
						{showError()}
						<hr />
					</div>
					{updateBlogForm()}
				</div>
				<div className="col-md-4">
					<div className="form-group pb-2">
						<h5>Featured Image</h5>
						<hr />
						<div>
							<small className="text-muted">Max size:1mb </small>
						</div>
						<label className="btn btn-outline-info">
							Upload featured image
							<input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
						</label>
					</div>
					<div>
						<h5>Categories</h5>
						<hr />
						<ul style={{ maxHeight: '200px', overflowY: 'auto' }}>{showCategories()}</ul>
					</div>
					<div>
						<h5>Tags</h5>
						<hr />
						<ul style={{ maxHeight: '200px', overflowY: 'auto' }}>{showTags()}</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(BlogUpdate);
